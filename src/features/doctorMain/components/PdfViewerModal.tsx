
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  fileName?: string;
}

const PdfViewerModal = ({ isOpen, onClose, pdfUrl, fileName }: PdfViewerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl h-[90vh] flex flex-col p-6 rounded-3xl " aria-describedby={undefined}>
        <DialogHeader className="flex-shrink-0 mb-4">
            <DialogTitle>{fileName || 'Certificate Viewer'}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full bg-white rounded-xl overflow-hidden shadow-sm border border-border">
             {pdfUrl ? (
                <iframe 
                    src={pdfUrl} 
                    className="w-full h-full"
                    title={fileName || "PDF Document"}
                />
             ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    No document selected
                </div>
             )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;
