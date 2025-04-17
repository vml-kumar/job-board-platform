import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ApplyJobModal from '@/components/job/ApplyJobModal';
import axiosInstance from '@/utils/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  created_at: string;
};

const FindJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
 
  const handleApplyClick = (jobId: number) => {
    setSelectedJobId(jobId);
    setIsApplyOpen(true);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get(`/jobs`, {
          params: {
            search,
            page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = res.data;
        setJobs(data.jobs);
        setTotalPages(data.totalPages > 0 ? data.totalPages : 1);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    fetchJobs();
  }, [search, page]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axiosInstance.get('/jobs/applied', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log(res.data.appliedJobIds);
        setAppliedJobs(res.data.appliedJobIds);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchAppliedJobs();
  }, [token]);

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Find Jobs</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title or location..."
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company} — {job.location}</p>
              <p className="text-sm text-gray-400">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
              {appliedJobs.includes(job.id) ? (
                <span className="text-green-600 font-semibold">Applied</span>
              ) : (
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleApplyClick(job.id)}
                >
                  Apply
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Apply Modal */}
      <ApplyJobModal
        jobId={selectedJobId}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSuccess={() => {
          if (selectedJobId) {
            setAppliedJobs((prev) => [...prev, selectedJobId]); // add job ID to the list
          }
          setIsApplyOpen(false); // close modal
          alert('Application submitted successfully!');
        }}
      />

    </DashboardLayout>
  );
};

export default FindJobsPage;
