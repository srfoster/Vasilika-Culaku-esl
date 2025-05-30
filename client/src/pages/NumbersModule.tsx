import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import NumberDisplay from '@/components/NumberDisplay';
import CountingExercise from '@/components/CountingExercise';
import { storage } from '@/data/storage';
import { numbers } from '@/utils/numbers';

const NumbersModule = () => {
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  // Fetch user's number progress (local placeholder)
  const [numberProgress, setNumberProgress] = useState<Record<number, boolean>>({});
  
  // Get the current number data
  const currentNumber = numbers[currentNumberIndex];
  
  // Update progress mutation (local placeholder)
  const updateProgress = {
    mutate: (_data: { number: number, completed: boolean }) => {
      setNumberProgress(prev => ({ ...prev, [_data.number]: _data.completed }));
    },
  };
  
  // Handle moving to the next number
  const handleNextNumber = () => {
    if (currentNumberIndex < numbers.length - 1) {
      setCurrentNumberIndex(prev => prev + 1);
    }
  };
  
  // Handle moving to the previous number
  const handlePrevNumber = () => {
    if (currentNumberIndex > 0) {
      setCurrentNumberIndex(prev => prev - 1);
    }
  };
  
  // Handle completing the counting exercise
  const handleCompleteCountingExercise = (correct: boolean) => {
    if (correct) {
      updateProgress.mutate({
        number: currentNumber.number,
        completed: true
      });
    }
  };
  
  // Generate counting exercise options
  const generateCountingOptions = () => {
    const correctCount = currentNumber.number;
    let options = [correctCount];
    
    // Add some options around the correct number
    if (correctCount > 1) options.push(correctCount - 1);
    options.push(correctCount + 1);
    if (correctCount > 2) options.push(correctCount - 2);
    options.push(correctCount + 2);
    
    // Limit to 5 options and sort
    return Array.from(new Set(options))
      .filter(n => n > 0)
      .sort((a, b) => a - b)
      .slice(0, 5);
  };
  
  return (
    <div className="numbers-module">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold">Number Learning</h2>
      </div>

      {/* Number display section */}
      <NumberDisplay 
        number={currentNumber.number}
        word={currentNumber.word}
        imageUrl={currentNumber.imageUrl}
        count={currentNumber.number}
        onNextNumber={currentNumberIndex < numbers.length - 1 ? handleNextNumber : undefined}
        onPrevNumber={currentNumberIndex > 0 ? handlePrevNumber : undefined}
      />

      {/* Number navigation */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {numbers.map((item, index) => (
            <button
              key={index}
              className={`w-12 h-12 rounded-lg ${
                index === currentNumberIndex 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-dark'
              } font-bold text-xl flex items-center justify-center`}
              onClick={() => setCurrentNumberIndex(index)}
            >
              {item.number}
            </button>
          ))}
        </div>
      </div>

      {/* Counting exercise section */}
      <CountingExercise 
        itemImageUrl={currentNumber.imageUrl}
        itemName={currentNumber.itemName}
        correctCount={currentNumber.number}
        options={generateCountingOptions()}
        onComplete={handleCompleteCountingExercise}
      />
    </div>
  );
};

export default NumbersModule;
