import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LogIn } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Impact Echo Group
        </Link>
        
        <ul className="flex items-center space-x-8">
          <li>
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/news" className="hover:text-blue-600 dark:hover:text-blue-400">
              News
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/material" className="hover:text-blue-600 dark:hover:text-blue-400">
              Material
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            to="/login"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}