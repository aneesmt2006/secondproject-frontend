import  { useState } from 'react'
import AdminHeader from '../../../components/AdminHeader';
import AdminDashboard from './adminDashPage';
import UserManagement from './adminUserPage';
import DoctorManagement from './adminDrPage';
import AdminSidebar from '../../../components/AdminSidebar';
import ContentManagement from '../components/ContentManagement';

const AdminMainPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'doctors':
        return <DoctorManagement />;
      case 'appointments':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold text-cocoa">Appointment Management</h1>
            <p className="mt-4 text-cocoa/60">This section is under development.</p>
          </div>
        );
      case 'payments':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold text-cocoa">Payment & Revenue</h1>
            <p className="mt-4 text-cocoa/60">This section is under development.</p>
          </div>
        );
      case 'content':
        return <ContentManagement />;
      case 'ai':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold text-cocoa">AI System Management</h1>
            <p className="mt-4 text-cocoa/60">This section is under development.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold text-cocoa">Report & Analytics</h1>
            <p className="mt-4 text-cocoa/60">This section is under development.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-4xl font-bold text-cocoa">Admin Settings</h1>
            <p className="mt-4 text-cocoa/60">This section is under development.</p>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-cream">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <AdminHeader/>
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminMainPage
