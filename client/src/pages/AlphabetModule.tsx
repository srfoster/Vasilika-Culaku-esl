import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import LetterDisplay from '@/components/LetterDisplay';
import DrawingCanvas from '@/components/DrawingCanvas';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { alphabet } from '@/utils/alphabet';

const AlphabetModule = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  
  // Fetch user's alphabet progress
  const { data: progress } = useQuery({
    queryKey: ['/api/progress/alphabet'],
  });
  
  // Get the current letter data
  const currentLetter = alphabet[currentLetterIndex];
  
  // Update progress mutation
  const updateProgress = useMutation({
    mutationFn: (data: { letter: string, completed: boolean }) => {
      return apiRequest('POST', '/api/progress/alphabet', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress/alphabet'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users/current'] });
      queryClient.invalidateQueries({ queryKey: ['/api/modules'] });
    },
  });
  
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
  
  // Handle saving the drawing
  const handleSaveDrawing = (data: string) => {
    // Save the drawing progress
    updateProgress.mutate({
      letter: currentLetter.letter,
      completed: true
    });
  };
  
  return (
    <div className="alphabet-module">
      <div className="flex items-center mb-6">
        <Link href="/">
          <a className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </a>
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

      {/* Practice section */}
      <DrawingCanvas 
        prompt={`Trace the letter "${currentLetter.letter}"`}
        onSave={handleSaveDrawing}
      />
    </div>
  );
};

export default AlphabetModule;
