import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-2xl mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="text-gray-300 hover:text-white">
              Overview
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="text-gray-300 hover:text-white">
              Profile
            </Link>
          </li>
          {user?.role === 'freelancer' && (
            <li>
            <Link href="/dashboard/freelancer/findjobs" className="text-gray-300 hover:text-white">
              Find Jobs
            </Link>
          </li>
          )}
          <li>
            <Link href="/dashboard/myjobs" className="text-gray-300 hover:text-white">
              My Jobs
            </Link>
          </li>
          <li>
            <Link href="/dashboard/applications" className="text-gray-300 hover:text-white">
              Applications
            </Link>
          </li>

          {user?.role === 'recruiter' && (
            <li>
            <Link href="/dashboard/postjob" className="text-gray-300 hover:text-white">
              Post a Job
            </Link>
          </li>
          )}
          <li>
            <Link href="/login" className="text-gray-300 hover:text-white">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
