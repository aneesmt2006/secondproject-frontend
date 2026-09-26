import { User } from "lucide-react";

interface EmptyPatientsProps {
  hasSearchQuery: boolean;
}

export const EmptyPatients = ({ hasSearchQuery }: EmptyPatientsProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 bg-white/40 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem]">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <User className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">No Patients Found</h3>
      <p className="text-[14px] font-medium text-slate-500 mt-2 max-w-sm text-center">
        {hasSearchQuery 
          ? "Try adjusting your search query to find the patient." 
          : "You don't have any booked patients yet."}
      </p>
    </div>
  );
};
