import { useEffect, useState } from 'react';
import { UserCheck, Download } from 'lucide-react';
import { User } from '../types';
import { useUserFilters } from '../hooks/useUserFilters';
import { usePagination } from '../hooks/usePagination';
import Filters from '../components/Filters';
import UserRow from '../components/UserRow';
import Pagination from '../components/Pagination';
import { USERS_PER_PAGE } from '../constants/userManagementConstants';
import { getAllUsers } from '../../../services/api/auth.service';
import { getAllUserProfile } from '../../../services/api/medical.service';
import { pregnantProfile } from '../../userMain/types/profile.type';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [,setProfiles] = useState<pregnantProfile[]>([])
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, profileRes] = await Promise.all([
          getAllUsers(),
          getAllUserProfile()
        ]);

        console.log("Profile data:", profileRes);
        console.log("All users:", usersRes);

        const usersData = usersRes.data ?? [];
        const profilesData = profileRes.data ?? [];

        const filteredUsers = usersData
          .filter((user) => profilesData.some((p) => p.userId === user.id))
          .map((user) => {
            const profile = profilesData.find((p) => p.userId === user.id);
            return { ...user, ...profile };
          });

        setUsers(filteredUsers);
        setProfiles(profilesData);
      } catch (error) {
        console.error("Failed to load users/profile", error);
      }
    };

    loadData();
  }, []);


  const { searchTerm, setSearchTerm, weekFilter, setWeekFilter, conditionFilter, setConditionFilter, dueDateFilter, setDueDateFilter, filteredUsers, resetFilters } =
    useUserFilters(users);

  const { currentPage, totalPages, currentUsers, goToPrevious, goToNext, goToPage } = usePagination(filteredUsers, USERS_PER_PAGE);

  // Placeholder for applyFilters - now handled in hook
  const handleApplyFilters = () => {
    // Filters are applied reactively via useMemo in hook
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-cocoa">User Management</h1>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold">
          <UserCheck className="w-5 h-5" />
          Add New User
        </button>
      </div>

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        weekFilter={weekFilter}
        setWeekFilter={setWeekFilter}
        conditionFilter={conditionFilter}
        setConditionFilter={setConditionFilter}
        dueDateFilter={dueDateFilter}
        setDueDateFilter={setDueDateFilter}
        onApply={handleApplyFilters}
        onReset={resetFilters}
      />

      <div className="flex gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-rose/20 rounded-lg hover:bg-rose/5 transition-all">
          <Download className="w-4 h-4" />
          Export to Excel
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-rose/20 rounded-lg hover:bg-rose/5 transition-all">
          <Download className="w-4 h-4" />
          Export to PDF
        </button>
      </div>

      <div className="bg-white rounded-xl border border-rose/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-rose/10 to-lilac/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">Pregnancy Week</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">Health Condition</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose/10">
              {currentUsers.map((user) => (
                <UserRow key={user.id} user={user} setUsers={setUsers} />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default UserManagement;