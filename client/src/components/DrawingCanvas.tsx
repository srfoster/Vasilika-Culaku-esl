import { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  prompt: string;
  width?: number;
  height?: number;
  brushColor?: string;
  className?: string;
  onSave?: (data: string) => void;
}

const DrawingCanvas = ({
  prompt,
  width = 400,
  height = 400,
  brushColor = '#4A90E2',
  className = '',
  onSave
}: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width, height });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  
  // Adjust canvas size based on container size
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = Math.min(window.innerWidth - 40, width);
      setCanvasSize({
        width: containerWidth,
        height: Math.min(height, containerWidth) // Maintain aspect ratio
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);
  
  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [brushColor]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    
    const position = getEventPosition(e, canvas);
    setLastPosition(position);
    
    // Start by drawing a dot
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(position.x, position.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const currentPosition = getEventPosition(e, canvas);
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();
    
    setLastPosition(currentPosition);
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const getEventPosition = (
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    // Handle both mouse and touch events
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };
  
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !onSave) return;
    
    // Get data URL from canvas
    const dataURL = canvas.toDataURL('image/png');
    onSave(dataURL);
  };
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="border-4 border-dashed border-gray-300 rounded-lg p-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="touch-none bg-white rounded-lg"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="text-gray-600 mt-3 mb-4 text-center">
        <p>{prompt}</p>
      </div>
      
      <div className="flex justify-between w-full">
        <button
          onClick={handleClear}
          className="bg-gray-200 hover:bg-gray-300 text-dark font-bold py-2 px-4 rounded-lg inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m14.5 9-5 5"></path>
            <path d="m9.5 9 5 5"></path>
          </svg>
          Reset
        </button>
        
        <button
          onClick={handleSave}
          className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-6 rounded-lg inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
