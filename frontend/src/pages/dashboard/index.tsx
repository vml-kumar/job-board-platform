// pages/dashboard/index.tsx

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';

type FreelancerStats = {
    totalApplications: number;
    messages: number;
    activeJobs: number;
  };
  
  type RecruiterStats = {
    totalJobsPosted: number;
    applicants: number;
    jobStatus: string;
  };
  
type DashboardStats = Partial<FreelancerStats & RecruiterStats>;

type User = {
    name: string;
    email: string;
    role: 'freelancer' | 'recruiter';
  };
  
const DashboardPage = ({ user }: { user: User }) => {
   const [stats, setStats] = useState<DashboardStats | null>(null);


  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/overview', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      } else {
        // Handle error
      }
    };

    fetchDashboardData();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.role === 'freelancer' && (
          <>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold">Total Applications</h3>
              <p className="text-gray-500">{stats.totalApplications}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold">Messages</h3>
              <p className="text-gray-500">{stats.messages}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold">Active Jobs</h3>
              <p className="text-gray-500">{stats.activeJobs}</p>
            </div>
          </>
        )}

        {user.role === 'recruiter' && (
          <>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold">Total Jobs Posted</h3>
              <p className="text-gray-500">{stats.totalJobsPosted}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold">Applicants</h3>
              <p className="text-gray-500">{stats.applicants}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold">Job Status</h3>
              <p className="text-gray-500">{stats.jobStatus}</p>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
