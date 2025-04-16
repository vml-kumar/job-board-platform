import { useState } from 'react';

type ApplyJobModalProps = {
  jobId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const ApplyJobModal = ({ jobId, isOpen, onClose, onSuccess }: ApplyJobModalProps) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ job_id: jobId, cover_letter: coverLetter }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to apply');
      }

      onSuccess();
      onClose();
      setCoverLetter('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Apply to Job</h2>
        <textarea
          rows={5}
          placeholder="Write a short cover letter (optional)..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleApply} className="px-4 py-2 bg-green-500 text-white rounded" disabled={loading}>
            {loading ? 'Submitting...' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;
