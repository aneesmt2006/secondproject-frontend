import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileData } from '@/types/profile.type';

interface ProfileImageSectionProps {
  formData: ProfileData;
  handleImageUpload: (file: File) => void;
}

const ProfileImageSection = ({ formData, handleImageUpload }: ProfileImageSectionProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 ring-4 ring-primary/20">
        <AvatarImage
          src={formData.profileImage ?? formData.profileImageLink}
          alt="Profile"
        />
        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
          DR
        </AvatarFallback>
      </Avatar>
      <Label htmlFor="profile-upload" className="cursor-pointer">
        <div className="glass-card px-4 py-2 rounded-xl glass-hover flex items-center gap-2">
          <Upload className="w-4 h-4" />
          <span className="text-sm font-medium">Upload Photo</span>
        </div>
        <Input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </Label>
    </div>
  );
};

export default ProfileImageSection;
