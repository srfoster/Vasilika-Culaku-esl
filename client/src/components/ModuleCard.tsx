import { Link } from "wouter";
import ProgressBar from "./ProgressBar";

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  imageUrl: string;
  status: 'completed' | 'in-progress' | 'locked';
  path: string;
}

interface ModuleCardProps {
  module: Module;
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const statusIcons = {
    'completed': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary w-6 h-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    'in-progress': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning w-6 h-6">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
      </svg>
    ),
    'locked': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  };

  // Now we make all modules clickable, even locked ones
  const cardContent = (
    <>
      <img 
        src={module.imageUrl} 
        alt={module.title} 
        className="w-full h-36 object-cover"
      />
      {module.status === 'locked' && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 w-8 h-8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">{module.title}</h3>
          {statusIcons[module.status]}
        </div>
        <p className="text-gray-600 mt-1">{module.description}</p>
        <ProgressBar progress={module.progress} className="mt-3" />
      </div>
    </>
  );

  return (
    <Link href={module.path} className={`card-hover bg-white rounded-xl shadow-md overflow-hidden block relative ${module.status === 'locked' ? 'opacity-90' : ''}`}>
      {cardContent}
    </Link>
  );
};

export default ModuleCard;
