// pages/dashboard/applications.tsx

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';

type User = {
  name: string;
  email: string;
  role: 'freelancer' | 'recruiter';
};

const ApplicationsPage = ({ user }: { user: User }) => {
  if (user.role !== 'freelancer') {
    return (
      <DashboardLayout>
        <h1 className="text-xl text-red-600">Access Denied</h1>
        <p>You are not authorized to view this page.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">My Applications</h1>
      <p className="text-gray-700">Here you can view the jobs you’ve applied for.</p>
      {/* Add applications table or cards here later */}
    </DashboardLayout>
  );
};

export default withAuth(ApplicationsPage);
