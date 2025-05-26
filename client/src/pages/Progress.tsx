import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import ProgressBar from '@/components/ProgressBar';

interface ModuleProgress {
  id: string;
  title: string;
  progress: number;
  completedItems: number;
  totalItems: number;
}

const Progress = () => {
  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ['/api/users/current'],
  });
  
  // Fetch progress data
  const { data: progress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['/api/progress'],
  });
  
  const userPoints = user?.points || 0;
  const userName = user?.displayName || 'Student';
  
  return (
    <div className="progress-screen">
      <div className="flex items-center mb-6">
        <Link href="/">
          <a className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </a>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold">Your Progress</h2>
      </div>

      {/* User stats card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-primary/10 text-primary rounded-full p-4 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{userName}</h3>
              <p className="text-gray-600">English Learner</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-secondary/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary w-6 h-6 mr-2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-xl font-bold">{userPoints} points</span>
          </div>
        </div>
      </div>

      {/* Overall progress card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Overall Progress</h3>
        <ProgressBar 
          progress={user?.progress || 0} 
          height="h-6"
        />
        
        <div className="mt-4 flex flex-wrap justify-between text-center">
          <div className="p-3">
            <div className="text-2xl font-bold text-primary">{progress?.completedModules || 0}</div>
            <div className="text-sm text-gray-600">Modules<br />Completed</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-bold text-secondary">{progress?.completedExercises || 0}</div>
            <div className="text-sm text-gray-600">Exercises<br />Completed</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-bold text-accent">{progress?.streak || 0}</div>
            <div className="text-sm text-gray-600">Day<br />Streak</div>
          </div>
        </div>
      </div>

      {/* Module progress */}
      <h3 className="text-xl font-bold mb-4">Module Progress</h3>
      
      {isLoadingProgress ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {moduleProgress.map((module: ModuleProgress) => (
            <div key={module.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">{module.title}</h4>
                <span className="font-bold text-primary">{module.progress}%</span>
              </div>
              <ProgressBar progress={module.progress} />
              <p className="mt-2 text-gray-600">
                {module.completedItems} of {module.totalItems} items completed
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;
