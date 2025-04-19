import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Reusable Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-4 pt-14 sm:pt-4
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            sm:relative sm:translate-x-0 sm:block`}
        >
          <h2 className="text-2xl mb-6">Dashboard</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="text-gray-300 hover:text-white">Overview</Link>
            </li>
            <li>
              <Link href="/dashboard/profile" className="text-gray-300 hover:text-white">Profile</Link>
            </li>
            {user?.role === 'freelancer' && (
              <>
                <li>
                  <Link href="/dashboard/freelancer/findjobs" className="text-gray-300 hover:text-white">Find Jobs</Link>
                </li>
                <li>
                  <Link href="/dashboard/applications" className="text-gray-300 hover:text-white">My Applications</Link>
                </li>
              </>
            )}
            {user?.role === 'recruiter' && (
              <>
                <li>
                  <Link href="/dashboard/myjobs" className="text-gray-300 hover:text-white">My Jobs</Link>
                </li>
                <li>
                  <Link href="/dashboard/manageapplications" className="text-gray-300 hover:text-white">Manage Applications</Link>
                </li>
                <li>
                  <Link href="/dashboard/postjob" className="text-gray-300 hover:text-white">Post a Job</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-64px-64px)]"> {/* subtracting header & footer height */}
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
