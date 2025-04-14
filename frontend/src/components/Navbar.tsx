import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">FreelancerHub</h1>
      <div className="space-x-4">
        <Link href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
        <Link href="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
        <Link href="/register" className="text-gray-700 hover:text-indigo-600">Register</Link>
      </div>
    </nav>
  )
}
