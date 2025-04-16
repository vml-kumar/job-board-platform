import { useState } from 'react';
import ApplyJobModal from '@/components/job/ApplyJobModal';

const JobList = () => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const handleApplyClick = (jobId: number) => {
    setSelectedJobId(jobId);
    setIsApplyOpen(true);
  };

  const handleApplySuccess = () => {
    alert('Application submitted successfully!');
    // Optionally refresh job list or status
  };

  return (
    <>
      {/* Job list render example */}
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded mb-3">
          <h3 className="text-xl font-bold">{job.title}</h3>
          <p>{job.company} — {job.location}</p>
          <button
            onClick={() => handleApplyClick(job.id)}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
          >
            Apply
          </button>
        </div>
      ))}

      <ApplyJobModal
        jobId={selectedJobId}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSuccess={handleApplySuccess}
      />
    </>
  );
};
