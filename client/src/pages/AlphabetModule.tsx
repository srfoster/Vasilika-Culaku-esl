import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import LetterDisplay from '@/components/LetterDisplay';
import DrawingCanvas from '@/components/DrawingCanvas';
import { alphabet } from '@/utils/alphabet';
import { storage } from '@/data/storage';

const AlphabetModule = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [practiceLowercase, setPracticeLowercase] = useState(false);
  
  const [alphabetProgress, setAlphabetProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const progress = storage.getProgress();
    setAlphabetProgress(progress.alphabet);
  }, []);
  
  // Get the current letter data
  const currentLetter = alphabet[currentLetterIndex];
  
  const updateProgressHandler = (letter: string, completed: boolean) => {
    storage.updateProgress('alphabet', letter, completed);
    const progress = storage.getProgress();
    setAlphabetProgress(progress.alphabet);
  };
  
  // Handle moving to the next letter
  const handleNextLetter = () => {
    if (currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(prev => prev + 1);
    }
  };
  
  // Handle moving to the previous letter
  const handlePrevLetter = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
    }
  };
  
  // Toggle between uppercase and lowercase practice
  const toggleCase = () => {
    setPracticeLowercase(prev => !prev);
  };
  
  // Handle saving the drawing
  const handleSaveDrawing = (data: string) => {
    // Save the drawing progress
    updateProgress.mutate({
      letter: currentLetter.letter,
      completed: true
    });
  };
  
  // Get current letter in the right case for practice
  const practiceLetterDisplay = practiceLowercase 
    ? currentLetter.letter.toLowerCase() 
    : currentLetter.letter.toUpperCase();
  
  return (
    <div className="alphabet-module">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold">Alphabet Learning</h2>
      </div>

      {/* Letter display section */}
      <LetterDisplay 
        letter={currentLetter.letter}
        example={currentLetter.example}
        onNextLetter={currentLetterIndex < alphabet.length - 1 ? handleNextLetter : undefined}
        onPrevLetter={currentLetterIndex > 0 ? handlePrevLetter : undefined}
      />

      {/* Letter navigation */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {alphabet.map((item, index) => (
            <button
              key={index}
              className={`w-12 h-12 rounded-lg ${
                index === currentLetterIndex 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-dark'
              } font-bold text-xl flex items-center justify-center`}
              onClick={() => setCurrentLetterIndex(index)}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Practice section with case toggle */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Practice Writing</h3>
          <button 
            className={`px-4 py-2 rounded-lg ${practiceLowercase ? 'bg-secondary text-white' : 'bg-gray-200'}`}
            onClick={toggleCase}
          >
            {practiceLowercase ? 'Practicing lowercase' : 'Practicing uppercase'}
          </button>
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="text-8xl font-bold text-gray-300 opacity-30">
            {practiceLetterDisplay}
          </div>
        </div>
        
        <DrawingCanvas 
          prompt={`Trace the ${practiceLowercase ? 'lowercase' : 'uppercase'} letter "${practiceLetterDisplay}"`}
          onSave={handleSaveDrawing}
        />
      </div>
    </div>
  );
};

export default AlphabetModule;
