import { useState } from "react";
import {
  ProfileData,
  ProfileErrors,
  CertificatePreview,
} from "../types/profile.type";
import { ValidationError } from "yup";
import { toast } from "sonner";
import { DRprofileSchema } from "../schemas/dr.profile.schema";

interface UseProfileDataProps {
  onSubmitCallback: (data: ProfileData) => void;
}

const useProfileData = ({ onSubmitCallback }: UseProfileDataProps) => {
  const [formData, setFormData] = useState<ProfileData>({
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
  const handleViewCertificate = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
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
  };
};

export default useProfileData;
