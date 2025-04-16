import { useState, useEffect } from 'react';
import { Job } from '@/types/job';

type Props = {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedJob: Job) => Promise<void>;
};

const EditJobModal = ({ job, isOpen, onClose, onSave }: Props) => {
  const [form, setForm] = useState<Job | null>(job);

  useEffect(() => {
    setForm(job);
  }, [job]);

  if (!isOpen || !form) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form) {
      onSave(form);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
