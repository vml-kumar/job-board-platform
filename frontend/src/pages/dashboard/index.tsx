import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';
import { RootState } from '@/redux/store';

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
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/overview', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.role === 'freelancer' && (
          <>
            <StatCard label="Total Applications" value={stats.totalApplications} />
            <StatCard label="Messages" value={stats.messages} />
            <StatCard label="Active Jobs" value={stats.activeJobs} />
          </>
        )}
        {user.role === 'recruiter' && (
          <>
            <StatCard label="Total Jobs Posted" value={stats.totalJobsPosted} />
            <StatCard label="Applicants" value={stats.applicants} />
            <StatCard label="Job Status" value={stats.jobStatus} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div className="bg-white p-4 shadow rounded-lg">
    <h3 className="text-xl font-semibold">{label}</h3>
    <p className="text-gray-500">{value ?? 0}</p>
  </div>
);

export default withAuth(DashboardPage);
