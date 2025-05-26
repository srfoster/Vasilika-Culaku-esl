import { Link } from "wouter";
import { useState, useEffect } from "react";
import { storage, User } from "@/data/storage";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = storage.getUser();
    setUser(userData);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            {/* App logo as an SVG for better scaling */}
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                <path d="M3 6v13"></path>
                <path d="M12 6v13"></path>
                <path d="M21 6v13"></path>
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-primary">LearnNow</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Progress indicator */}
          <div className="hidden md:flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-secondary">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="font-bold">{user?.points || 0}</span>
          </div>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-light hover:bg-gray-200"
            aria-label="User profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
