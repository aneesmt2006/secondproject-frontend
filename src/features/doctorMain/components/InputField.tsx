import { Input } from "../../shared/components/input";
import { Label } from "../../shared/components/label";

export const ProfileField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  name,
}: {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  name:string
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="glass-card !text-black placeholder:!text-gray-400"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);