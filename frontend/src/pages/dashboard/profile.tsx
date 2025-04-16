// pages/dashboard/profile.tsx

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';

type User = {
  name: string;
  email: string;
  role: 'freelancer' | 'recruiter';
};

const ProfilePage = ({ user }: { user: User }) => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <div className="bg-white shadow p-6 rounded-lg">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(ProfilePage);
