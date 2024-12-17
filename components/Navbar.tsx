import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo/Brand */}
        <Link href="/" className="text-2xl font-extrabold tracking-wider hover:text-yellow-300 transition duration-200">
          Travel<span className="text-yellow-300">Agency</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="hover:text-yellow-300 text-lg font-medium transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-yellow-300 text-blue-800 rounded-md shadow hover:bg-yellow-400 transition duration-200 font-semibold"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
