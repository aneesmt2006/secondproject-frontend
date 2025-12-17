import { useState } from 'react';
import { UserX, UserCheck, Eye } from 'lucide-react';
import { User } from '../types';
import UserDetailModal from './UserDetailModal';
import { toast } from 'sonner';
import { updateUserStatus } from '../../../services/api/auth.service';


interface UserRowProps {
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}


const UserRow = ({ user,setUsers }: UserRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Placeholder for toggleUserStatus - uncomment and implement with supabase
 const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
  const newStatus = !currentStatus;

  const response = await updateUserStatus(userId, newStatus);

  if (response) {
    toast.success(response.message);

    // Update instantly — TRIGGERS RE-RENDER
    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, status: newStatus } : u
      )
    );
  }
};


  const StatusIcon = user.status === true ? UserCheck : UserX;
  const statusClasses = user.status === true
    ? 'bg-red-100 text-red-600 hover:bg-red-200'
    : 'bg-green-100 text-green-600 hover:bg-green-200';
  const statusTitle = user.status === true ? 'Suspend User' : 'Activate User';

  return (
    <>
      <tr className="hover:bg-cream/50 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={user.profileImage || `https://ui-avatars.com/api/?name=${user.full_name}&background=D4798B&color=fff`}
              alt={user.full_name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-cocoa">{user.full_name}</p>
              <p className="text-sm text-cocoa/60">{user.email}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-cocoa">Week {user.currentWeek}</td>
        <td className="px-6 py-4 text-cocoa">{user.otherHealthIssues ? 'Abnormal':'Normal'}</td>
        <td className="px-6 py-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              user.status === true
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {user.status===true?'Activated':'blocked'}
          </span>
        </td>
        <td className="px-6 py-4 text-cocoa">
          {user.dueDate 
            ? new Date(user.dueDate).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              }) 
            : 'N/A'}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleUserStatus(user.id!, user.status!)}
              className={`p-2 rounded-lg transition-all ${statusClasses}`}
              title={statusTitle}
            >
              <StatusIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      {isModalOpen && (
        <UserDetailModal
          user={user}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserRow;
