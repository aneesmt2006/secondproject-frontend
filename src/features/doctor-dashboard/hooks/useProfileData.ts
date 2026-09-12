import { useState } from "react";
import {
  ProfileData,
  ProfileErrors,
  CertificatePreview,
} from '@/types/profile.type';
import { ValidationError } from "yup";
import { toast } from "sonner";
import { DRprofileSchema } from "../schemas/dr.profile.schema";
import { readSignedUrl } from "@/services/api/users-management.service";

interface UseProfileDataProps {
  onSubmitCallback: (data: ProfileData) => void;
}

const useProfileData = ({ onSubmitCallback }: UseProfileDataProps) => {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    clinicName: "",
    specialization:"",
    experience: "",
    address: "",
    profileImage: "",
    profileImageLink: "",
    registration: "",
    online_fee: "",
    certificates: [],
    certificateLinks: [],
  });

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);


  // 🔹 Normal input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 🔹 Image upload
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result as string }));
      setProfileImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Certificates upload
  const handleCertificateUpload = (filesList: FileList | null) => {
    if (!filesList) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const previews: CertificatePreview[] = [];
    const validFiles: File[] = [];

    Array.from(filesList).forEach((file) => {
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file. Upload PDF or DOC only");
        return;
      }

      validFiles.push(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push({
          id: file.name,
          name: file.name,
          url: reader.result as string,
          type: file.type,
        });

        setFormData((prev) => ({
          ...prev,
          certificates: [...(prev.certificates || []), ...previews],
        }));
      };

      reader.readAsDataURL(file);
    });

    setCertificateFiles((prev) => [...prev, ...validFiles]);
  };

  // 🔹 Remove certificate
  const handleRemoveCertificate = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates?.filter((c) => c.name !== name),
    }));

    setCertificateFiles((prev) => prev.filter((f) => f.name !== name));
  };

  // 🔹 View certificate
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>('');

  const handleViewCertificate = async (url: string, name: string) => {
    // Check if it's a blob URL (preview)
    if (url.startsWith('blob:') || url.startsWith('data:')) {
      setCurrentPdfUrl(url);
      setCurrentFileName(name);
      setIsPdfViewerOpen(true);
      return;
    }

    // It's a key or remote URL.
    try {
      const response = await readSignedUrl(url);
      if (response.success && response.data) {
         setCurrentPdfUrl(response.data);
         setCurrentFileName(name);
         setIsPdfViewerOpen(true);
      } else {
         toast.error("Failed to retrieve document");
      }
    } catch (error) {
       console.error("Error fetching signed URL:", error);
       toast.error("Error opening document");
    }
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setCurrentPdfUrl(null);
  };
  
  // 🔹 Form submit
  const handleSubmition = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await DRprofileSchema.validate(formData, { abortEarly: false });

      onSubmitCallback({
        ...formData,
        profileImageFile,
        certificateFiles,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: ProfileErrors = {};

        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
        toast.error("Please fill required fields");
      }
    }
  };


  return {
    formData,
    setFormData,
    errors,
    handleChange,
    handleImageUpload,
    handleCertificateUpload,
    handleRemoveCertificate,
    handleViewCertificate,
    handleSubmition,
    // PDF Viewer State helpers
    isPdfViewerOpen,
    currentPdfUrl,
    currentFileName,
    closePdfViewer
  };
};

export default useProfileData;
