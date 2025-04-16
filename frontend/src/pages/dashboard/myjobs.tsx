import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';
import EditJobModal from '@/components/dashboard/EditJobModal';
import useDebounce from '@/hooks/useDebounce';

import { Job } from '@/types/job';

const MyJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
 
  const debouncedSearch = useDebounce(search, 500);
 
  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedJob: Job) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedJob),
    });
  
    if (res.ok) {
      setJobs((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? { ...job, ...updatedJob } : job))
      );
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (jobId: number) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;
  
    const token = localStorage.getItem('token');
  
    const res = await fetch(`/api/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } else {
      alert("Failed to delete job.");
    }
  };
  

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/jobs/myjobs?search=${encodeURIComponent(search)}&page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setJobs(data.jobs);
      setTotalPages(data.totalPages > 0 ? data.totalPages : 1);
    };

    fetchJobs();
  }, [debouncedSearch, page]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Jobs</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page on search
          }}
          placeholder="Search job title..."
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Location</th>
              <th className="p-3">Posted On</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-3">{job.title}</td>
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{new Date(job.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">No jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <EditJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </DashboardLayout>
  );
};

export default withAuth(MyJobsPage);
