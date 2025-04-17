import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';
import axiosInstance from '@/utils/axiosInstance';

type Application = {
  application_id: number;
  cover_letter: string;
  created_at: string;
  candidate_name: string;
  candidate_email: string;
  job_title: string;
  status: string;
};

const ManageApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get('/applications/recruiter', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log(res.data.applications);
        setApplications(res.data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
  
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (applicationId: number, status: 'Approved' | 'Rejected') => {
    try {
      await axiosInstance.put(
        `/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update local state if successful
      setApplications((prev) =>
        prev.map((app) =>
          app.application_id === applicationId ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.application_id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{app.job_title}</h2>
              <p className="text-gray-700">
                <span className="font-medium">Candidate:</span> {app.candidate_name} ({app.candidate_email})
              </p>
              <p className="text-gray-600"><span className="font-medium">Cover Letter:</span> {app.cover_letter}</p>
              <p className="text-sm text-gray-400">Applied on {new Date(app.created_at).toLocaleDateString()}</p>

              {app.status?.toLowerCase() === 'pending' ? (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(app.application_id, 'Approved')}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.application_id, 'Rejected')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className={`mt-2 font-semibold ${app.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                  {app.status}
                </p>
              )}

            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default withAuth(ManageApplicationsPage);
