interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  height?: string;
  className?: string;
}

const ProgressBar = ({ 
  progress, 
  showPercentage = true, 
  height = "h-4", 
  className = "" 
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div 
          className={`bg-secondary rounded-full ${height} progress-bar`} 
          style={{ width: `${safeProgress}%` }}
        ></div>
      </div>
      {showPercentage && (
        <span className="ml-2 text-sm font-bold">{safeProgress}%</span>
      )}
    </div>
  );
};

export default ProgressBar;
