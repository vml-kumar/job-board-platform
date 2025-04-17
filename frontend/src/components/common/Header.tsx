import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">JobForge</Link>
      <nav className="space-x-4">
        <Link href="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
