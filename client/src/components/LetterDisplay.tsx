import { useState } from 'react';
import AudioButton from './AudioButton';

interface LetterDisplayProps {
  letter: string;
  example: {
    word: string;
    imageUrl: string;
  };
  onNextLetter?: () => void;
  onPrevLetter?: () => void;
}

const LetterDisplay = ({ 
  letter, 
  example,
  onNextLetter,
  onPrevLetter
}: LetterDisplayProps) => {
  const [showExample, setShowExample] = useState(false);
  
  // Create audio URL for the letter
  const letterAudioUrl = `/api/audio/letter/${letter.toLowerCase()}`;
  
  // Create audio URL for the example word
  const wordAudioUrl = `/api/audio/word/${example.word.toLowerCase()}`;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col items-center">
        {/* Letter display */}
        <div className="text-8xl font-bold text-primary mb-4">
          {letter}
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2 mb-6">
          <AudioButton src={letterAudioUrl} color="accent" />
          
          <button 
            className="bg-secondary text-white rounded-full p-3"
            aria-label="See example"
            onClick={() => setShowExample(!showExample)}
          >
            {showExample ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            )}
          </button>
          
          {/* Navigation buttons for mobile */}
          <div className="flex space-x-2 md:hidden">
            {onPrevLetter && (
              <button 
                className="bg-gray-200 text-dark rounded-full p-3"
                onClick={onPrevLetter}
                aria-label="Previous letter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}
            
            {onNextLetter && (
              <button 
                className="bg-gray-200 text-dark rounded-full p-3"
                onClick={onNextLetter}
                aria-label="Next letter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Examples for the current letter */}
        {showExample && (
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center text-center">
              <img 
                src={example.imageUrl} 
                alt={example.word} 
                className="w-40 h-40 object-cover rounded-lg mb-3"
              />
              <p className="text-2xl font-bold">
                {example.word.split('').map((char, index) => (
                  char.toLowerCase() === letter.toLowerCase() ? 
                    <span key={index} className="text-primary">{char}</span> : 
                    <span key={index}>{char}</span>
                ))}
              </p>
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

export default LetterDisplay;
