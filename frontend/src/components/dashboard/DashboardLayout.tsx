import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { Menu } from 'lucide-react'; // Optional: if you're using lucide icons
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { logout } from '@/redux/slices/authSlice';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); // Type-safe dispatch
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (collapsible on small screens) */}
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
            <li>
              <Link href="/dashboard/freelancer/findjobs" className="text-gray-300 hover:text-white">Find Jobs</Link>
            </li>
          )}
          {user?.role === 'recruiter' && (
            <li>
              <Link href="/dashboard/myjobs" className="text-gray-300 hover:text-white">My Jobs</Link>
            </li>
          )}
          {user?.role === 'freelancer' && (
            <li>
              <Link href="/dashboard/applications" className="text-gray-300 hover:text-white">My Applications</Link>
            </li>
          )}
          {user?.role === 'recruiter' && (
            <li>
              <Link href="/dashboard/manageapplications" className="text-gray-300 hover:text-white">Manage Applications</Link>
            </li>
          )}
          {user?.role === 'recruiter' && (
            <li>
              <Link href="/dashboard/postjob" className="text-gray-300 hover:text-white">Post a Job</Link>
            </li>
          )}
          <li>
          <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch(logout());
                router.push('/login');
              }}
              className="text-left w-full text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Sidebar toggle button on mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Main content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
