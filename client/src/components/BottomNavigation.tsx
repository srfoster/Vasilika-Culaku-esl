import { Link } from "wouter";

interface BottomNavigationProps {
  currentPath: string;
}

const BottomNavigation = ({ currentPath }: BottomNavigationProps) => {
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          <Link href="/">
            <a className={`flex flex-col items-center py-1 px-3 ${isActive('/') ? 'text-primary' : 'text-gray-500'}`} aria-label="Home">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="text-xs mt-1">Home</span>
            </a>
          </Link>

          <Link href="/alphabet">
            <a className={`flex flex-col items-center py-1 px-3 ${isActive('/alphabet') ? 'text-primary' : 'text-gray-500'}`} aria-label="Learn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 9V4H8a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8h-4a4 4 0 0 1-4 4v6"></path>
                <line x1="3" y1="6" x2="6" y2="3"></line>
              </svg>
              <span className="text-xs mt-1">Learn</span>
            </a>
          </Link>

          <Link href="/practice">
            <a className={`flex flex-col items-center py-1 px-3 ${isActive('/practice') ? 'text-primary' : 'text-gray-500'}`} aria-label="Practice">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                <path d="m2 12 5-3-5-3v6Z"></path>
                <path d="M17.5 15.5a8 8 0 0 0 0-7"></path>
                <path d="M22 12h-5"></path>
              </svg>
              <span className="text-xs mt-1">Practice</span>
            </a>
          </Link>

          <Link href="/progress">
            <a className={`flex flex-col items-center py-1 px-3 ${isActive('/progress') ? 'text-primary' : 'text-gray-500'}`} aria-label="Progress">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span className="text-xs mt-1">Progress</span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
