import { useState } from 'react';
import AudioButton from './AudioButton';

interface NumberDisplayProps {
  number: number;
  word: string;
  imageUrl: string;
  count?: number;
  onNextNumber?: () => void;
  onPrevNumber?: () => void;
}

const NumberDisplay = ({
  number,
  word,
  imageUrl,
  count = 1,
  onNextNumber,
  onPrevNumber
}: NumberDisplayProps) => {
  const [showExample, setShowExample] = useState(false);
  
  // Create audio URL for the number
  const numberAudioUrl = `/api/audio/number/${number}`;
  
  // Create audio URL for the number word
  const wordAudioUrl = `/api/audio/word/${word.toLowerCase()}`;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col items-center">
        {/* Number display */}
        <div className="text-8xl font-bold text-primary mb-4">
          {number}
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2 mb-6">
          <AudioButton src={numberAudioUrl} color="accent" />
          
          <button 
            className="bg-secondary text-white rounded-full p-3"
            aria-label="Show counting example"
            onClick={() => setShowExample(!showExample)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </button>
          
          {/* Navigation buttons for mobile */}
          <div className="flex space-x-2 md:hidden">
            {onPrevNumber && (
              <button 
                className="bg-gray-200 text-dark rounded-full p-3"
                onClick={onPrevNumber}
                aria-label="Previous number"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}
            
            {onNextNumber && (
              <button 
                className="bg-gray-200 text-dark rounded-full p-3"
                onClick={onNextNumber}
                aria-label="Next number"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Visual counting example */}
        {showExample && (
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {[...Array(count)].map((_, index) => (
                  <img 
                    key={index} 
                    src={imageUrl} 
                    alt={`${word} ${index + 1}`} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-center mt-3">{word}</p>
              <AudioButton 
                src={wordAudioUrl} 
                className="mt-2" 
                size="sm"
                label=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberDisplay;
