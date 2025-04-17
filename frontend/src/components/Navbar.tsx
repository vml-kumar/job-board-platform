import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      {/* Logo Section */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        JobForge
      </Link>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link href="/login" className="text-gray-700 hover:text-blue-500">
          Login
        </Link>
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
