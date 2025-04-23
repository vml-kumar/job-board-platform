import { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';
import axiosInstance from '@/utils/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PostJobPage = () => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
    salary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/jobs/post', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Job posted!');
      router.push('/dashboard/myjobs'); // redirect to job listing
    } catch (error: any) {
      console.error('Error posting job:', error);
      const errorMsg = error.response?.data?.message || 'Something went wrong';
      alert(errorMsg);
    }
  };
  
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-lg">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </DashboardLayout>
  );
};

export default withAuth(PostJobPage);
