import { Search, User } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white border-b border-rose/20 sticky top-0 z-10">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cocoa/40" />
            <input
              type="text"
              placeholder="Search users, doctors, appointments..."
              className="w-full pl-10 pr-4 py-2 bg-cream border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa placeholder:text-cocoa/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-rose to-lilac rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
