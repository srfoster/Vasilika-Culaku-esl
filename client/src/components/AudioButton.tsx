import { useState } from 'react';
import useAudio from '@/hooks/useAudio';

interface AudioButtonProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  label?: string;
  className?: string;
}

const AudioButton = ({ 
  src, 
  size = 'md', 
  color = 'accent',
  label = 'Listen',
  className = ''
}: AudioButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { play } = useAudio(src);
  
  const handlePlay = () => {
    setIsPlaying(true);
    play(() => {
      setIsPlaying(false);
    });
  };
  
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };
  
  const colorClasses = {
    primary: 'bg-primary hover:bg-primary/90',
    secondary: 'bg-secondary hover:bg-secondary/90',
    accent: 'bg-accent hover:bg-accent/90'
  };
  
  return (
    <button
      onClick={handlePlay}
      disabled={isPlaying}
      className={`${colorClasses[color]} text-white rounded-full flex items-center justify-center ${sizeClasses[size]} ${className} ${isPlaying ? 'opacity-75' : ''}`}
      aria-label={label}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-pulse">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="10" y1="15" x2="10" y2="9"></line>
          <line x1="14" y1="15" x2="14" y2="9"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      )}
      {label && <span className="ml-2">{label}</span>}
    </button>
  );
};

export default AudioButton;
