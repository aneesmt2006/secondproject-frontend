import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  SignedUrlCreateSubmitToS3,
  // uploadFileToSignedUrl,
  updateProfileDR,
  uploadFileToSignedUrl,
} from '../../../services/api/users-management.service';
import { IselectedFile, ProfileData } from '@/types/profile.type';


export const useDoctorProfileSubmit = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: ProfileData) => {
    setLoading(true);
    try {
      let selectedFiles: IselectedFile[] = [];

      const hasNewCertificates = data.certificateFiles && data.certificateFiles.length > 0;
      const hasNewProfileImage = !!data.profileImageFile;

      const existingCertificateLinks = data.certificateLinks || [];

      if (hasNewCertificates || hasNewProfileImage) {
        if (hasNewCertificates) {
          selectedFiles = data.certificateFiles!.map((file) => ({
            fileName: file.name,
            fileType: file.type,
          }));
        }

        if (hasNewProfileImage) {
          selectedFiles.push({
            fileName: data.profileImageFile!.name,
            fileType: data.profileImageFile!.type,
          });
        }

        const response = await SignedUrlCreateSubmitToS3(selectedFiles);
        const signedData = response.data;

        if (hasNewCertificates) {
          const newLinks = signedData!.map((obj) => obj?.key);

          data.certificateLinks = [...newLinks, ...existingCertificateLinks];
        }

        if (hasNewProfileImage) {
          data.profileImageLink =
            signedData![signedData!.length - 1]?.key;
        }

        const allFiles: File[] = [
          ...(data.certificateFiles || []),
          ...(data.profileImageFile ? [data.profileImageFile] : []),
        ];

        for (let i = 0; i < signedData!.length; i++) {
          await uploadFileToSignedUrl(
            signedData![i].signedUrl,
            allFiles[i],
            allFiles[i].type
          );
        }
      }

      const finalResponse = await updateProfileDR(data);
     
      toast.success(finalResponse.message);
      
      navigate('/doctor/dashboard', { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};
