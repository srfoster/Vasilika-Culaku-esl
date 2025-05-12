import { useQuery } from "@tanstack/react-query";
import ModuleCard, { Module } from "@/components/ModuleCard";
import ProgressBar from "@/components/ProgressBar";
import { Link } from "wouter";

const Home = () => {
  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ['/api/users/current'],
  });
  
  // Fetch modules data
  const { data: modules, isLoading: isLoadingModules } = useQuery({
    queryKey: ['/api/modules'],
    onSuccess: (data) => {
      console.log('Modules data:', data);
    },
  });
  
  const userName = user?.displayName || 'Student';
  const userProgress = user?.progress || 0;
  
  return (
    <div className="home-screen">
      {/* Welcome back section */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
        <div className="bg-white rounded-xl shadow-md p-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Your progress</h3>
            <span className="text-primary font-bold">{userProgress}%</span>
          </div>
          <ProgressBar progress={userProgress} />
          <div className="mt-4 text-center">
            <Link href={user?.lastModule || '/alphabet'} className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Continue Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Learning modules section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Learning Modules</h2>
        
        {isLoadingModules ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md h-64 animate-pulse">
                <div className="bg-gray-200 h-36 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="bg-gray-200 h-6 w-2/3 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-full rounded mb-3"></div>
                  <div className="bg-gray-200 h-3 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules?.map((module: Module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </section>

      {/* Daily practice section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Daily Practice</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Complete today's practice!</h3>
              <p className="text-gray-600">Practice your reading and writing skills for 10 minutes.</p>
              <div className="mt-4">
                <Link href="/practice" className="bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-full inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Start Practice
                </Link>
              </div>
            </div>
            
            {/* SVG illustration of a person studying/practicing */}
            <div className="w-full md:w-1/3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" className="w-full h-auto rounded-lg">
                <rect width="500" height="300" fill="#f5f7fa" rx="10" ry="10" />
                <circle cx="250" cy="150" r="100" fill="#e6efff" />
                <path d="M280 180c0 16.6-13.4 30-30 30s-30-13.4-30-30 13.4-30 30-30 30 13.4 30 30z" fill="#4a90e2" />
                <path d="M210 110h80v70h-80z" fill="#ffffff" />
                <path d="M220 130h60v10h-60z" fill="#4a90e2" />
                <path d="M220 150h60v10h-60z" fill="#4a90e2" />
                <path d="M220 170h40v10h-40z" fill="#4a90e2" />
                <circle cx="330" cy="110" r="20" fill="#50c878" />
                <circle cx="170" cy="110" r="20" fill="#ff9500" />
                <path d="M150 200h200v30h-200z" fill="#f0f0f0" />
                <path d="M160 210h180v10h-180z" fill="#dddddd" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
