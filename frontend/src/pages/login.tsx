import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && user) {
      router.replace('/dashboard/');
    } else {
      setCheckingAuth(false);
    }
  }, [token, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser({ user: data.user, token: data.token }));
      router.push('/dashboard/');
      alert('Login successful');
    } else {
      setError('Invalid credentials');
    }
  };

  if (checkingAuth) return null;

  return (
    <Layout>
      <div className="flex flex-col min-h-screen justify-between bg-gray-100">
        <div className="flex justify-center items-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-600">Login</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-200 hover:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-4 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-200 hover:border-indigo-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all ease-in-out duration-200"
              >
                Login
              </button>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link href="/register" className="text-indigo-600 hover:text-indigo-800 text-sm">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
