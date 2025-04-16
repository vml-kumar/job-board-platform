import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  created_at: string;
};

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/jobs/myjobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      if (res.ok) {
        setJobs(data.jobs);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">My Posted Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-gray-500 text-sm mt-2">Location: {job.location}</p>
              <p className="text-gray-500 text-sm">Budget: ${job.salary}</p>
              <p className="text-gray-400 text-xs">Posted on: {new Date(job.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyJobs;
