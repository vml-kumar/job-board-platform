import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';

type User = {
  name: string;
  email: string;
  role: 'freelancer' | 'recruiter';
};

type Application = {
  application_id: number;
  job_title: string;
  company: string;
  location: string;
  cover_letter: string;
  created_at: string;
  status: string;
};

const ApplicationsPage = ({ user }: { user: User }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch('/api/applications/myapplications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications);
      }
    };

    if (user.role === 'freelancer') {
      fetchApplications();
    }
  }, [user.role]);

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

      {applications.length === 0 ? (
        <p className="text-gray-500">You have not applied to any jobs yet.</p>
      ) : (
        <div className="bg-white shadow p-6 rounded-lg space-y-4">
          {applications.map((app) => (
            <div key={app.application_id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{app.job_title}</h2>
              <p className="text-gray-700">{app.company} — {app.location}</p>
              <p className="text-sm text-gray-400">
                Applied on {new Date(app.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Cover Letter:</span> {app.cover_letter}
              </p>
              <p
                className={`mt-2 font-semibold ${
                  app.status === 'Approved'
                    ? 'text-green-600'
                    : app.status === 'Rejected'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                Application {app.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default withAuth(ApplicationsPage);
