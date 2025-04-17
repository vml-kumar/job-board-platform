import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { withAuth } from '@/utils/withAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axiosInstance from '@/utils/axiosInstance';

type User = {
  name: string;
  email: string;
  role: 'freelancer' | 'recruiter';
  bio?: string;
  skills?: string;
  experience?: string;
  website?: string;
  phone?: string;
  avatar?: string;
};

const ProfilePage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    role: 'freelancer',
    bio: '',
    skills: '',
    experience: '',
    website: '',
    phone: '',
    avatar: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUser(res.data);
      } catch (err: any) {
        console.error('Error fetching profile:', err?.response?.data?.message || err.message);
      }
    };
  
    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put('/user/profile', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.status === 200) {
        setMessage('Profile updated successfully!');
      } else {
        console.error('Failed to update profile:', res.statusText);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };
  
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={user.email} disabled className="w-full p-2 border rounded bg-gray-100" />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <input type="text" name="role" value={user.role} disabled className="w-full p-2 border rounded bg-gray-100" />
        </div>

        <div>
          <label className="block font-medium">Bio</label>
          <textarea name="bio" value={user.bio} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
        </div>

        {user.role === 'freelancer' && (
           <>
          <div>
            <label className="block font-medium">Experience</label>
            <input type="text" name="experience" value={user.experience} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium">Skills (comma-separated)</label>
            <input type="text" name="skills" value={user.skills} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
           </>
        )}

        {user.role === 'recruiter' && (
          <div>
            <label className="block font-medium">Website</label>
            <input type="text" name="website" value={user.website} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        )}

        <div>
          <label className="block font-medium">Phone</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Avatar URL</label>
          <input type="text" name="avatar" value={user.avatar} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Save Changes
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </form>
    </DashboardLayout>
  );
};

export default withAuth(ProfilePage);
