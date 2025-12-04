import { Upload, FileText, Eye, X } from "lucide-react";
import { Button } from "../../../shared/components/button";
import { Input } from "../../../shared/components/input";
import { Label } from "../../../shared/components/label";
import { ProfileData } from "../../types/profile.type";

interface CertificateSectionProps {
  formData: ProfileData;
  handleCertificateUpload: (files: FileList | null) => void;
  handleViewCertificate: (url: string, name: string) => void;
  handleRemoveCertificate: (name: string) => void;
}

const CertificateSection = ({
  formData,
  handleCertificateUpload,
  handleViewCertificate,
  handleRemoveCertificate,
}: CertificateSectionProps) => {
  const existingCerts =
    formData.certificateLinks?.map((link) => ({
      id: link,
      name: link.split("/").pop() || link,
      url: link,
      type: "existing",
    })) || [];

  const previewCerts =
    formData.certificates?.map((cert) => ({
      id: cert.id,
      name: cert.name,
      url: cert.url,
      type: "preview",
    })) || [];

  const allCerts = [...existingCerts, ...previewCerts];

  return (
    <div className="glass-card rounded-3xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Qualifications & Certificates
      </h3>

      <Label htmlFor="certificate-upload" className="cursor-pointer">
        <div className="glass-card border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-6 text-center glass-hover transition-colors">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Upload Certificates
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF or DOC files only (Multiple files allowed)
          </p>
        </div>
        <Input
          id="certificate-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          className="hidden"
          onChange={(e) => handleCertificateUpload(e.target.files)}
        />
      </Label>

      {allCerts && allCerts.length > 0 && (
        <div className="space-y-3">
          {allCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium truncate">{cert.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleViewCertificate(cert.url, cert.name)}
                  className="h-8 w-8 rounded-lg glass-hover"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveCertificate(cert.name)}
                  className="h-8 w-8 rounded-lg glass-hover text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateSection;
