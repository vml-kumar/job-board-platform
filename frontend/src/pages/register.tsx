import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Footer from '@/components/common/Footer';
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('freelancer'); // default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword || !role) {
      setError('Please fill out all fields');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful. Please login.');
        router.push('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen py-12 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-600">Create an Account</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 mt-1 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 mt-1 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Are You?</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full p-4 mt-1 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="freelancer">Freelancer</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 mt-1 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-4 mt-1 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all ease-in-out duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sign Up...' : 'Sign Up'}
            </button>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 text-sm">Login</Link>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </Layout>
  );
}
