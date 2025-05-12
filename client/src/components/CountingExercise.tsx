import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import AudioButton from './AudioButton';

interface CountingExerciseProps {
  itemImageUrl: string;
  itemName: string;
  correctCount: number;
  options: number[];
  onComplete?: (correct: boolean) => void;
}

const CountingExercise = ({
  itemImageUrl,
  itemName,
  correctCount,
  options,
  onComplete
}: CountingExerciseProps) => {
  const { toast } = useToast();
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [countedItems, setCountedItems] = useState<Set<number>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Reset the counted items when the correct count changes
  useEffect(() => {
    setCountedItems(new Set());
    setSelectedCount(null);
    setShowFeedback(false);
  }, [correctCount]);
  
  const handleCountItem = (index: number) => {
    const newCountedItems = new Set(countedItems);
    
    if (newCountedItems.has(index)) {
      newCountedItems.delete(index);
    } else {
      newCountedItems.add(index);
    }
    
    setCountedItems(newCountedItems);
  };
  
  const handleSelectAnswer = (count: number) => {
    setSelectedCount(count);
  };
  
  const handleCheck = () => {
    if (selectedCount === null) {
      toast({
        title: "Please select an answer",
        description: "Select how many items you see.",
        variant: "destructive",
      });
      return;
    }
    
    const correct = selectedCount === correctCount;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      toast({
        title: "Correct!",
        description: `Yes, there ${correctCount === 1 ? 'is' : 'are'} ${correctCount} ${itemName}${correctCount !== 1 ? 's' : ''}!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Try again",
        description: `Count carefully and try again.`,
        variant: "destructive",
      });
    }
    
    if (onComplete) {
      onComplete(correct);
    }
  };
  
  // For large numbers (>20), we'll show fewer items with a multiplier
  const isLargeNumber = correctCount > 20;
  
  // If it's a large number like 30, 40, etc., show groups of 10s
  const groupSize = isLargeNumber ? 10 : 1;
  const groupsToShow = isLargeNumber ? Math.min(Math.ceil(correctCount / groupSize), 10) : correctCount;
  
  // Generate array of items to count (now representing groups for large numbers)
  const items = [...Array(groupsToShow)].map((_, index) => index);
  
  // Create audio URL for the instructions
  const instructionAudioUrl = `/api/audio/instruction/count-${itemName}`;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Counting Practice</h3>
        <AudioButton src={instructionAudioUrl} label="" size="sm" />
      </div>
      
      {/* The collection of objects to count */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {items.map((index) => (
          <div 
            key={index}
            className={`cursor-pointer rounded-lg overflow-hidden transition-all relative ${
              countedItems.has(index) ? 'ring-4 ring-primary' : ''
            }`}
            onClick={() => handleCountItem(index)}
          >
            <div className="relative">
              <img 
                src={itemImageUrl} 
                alt={`${itemName} for counting`} 
                className="w-full h-auto"
              />
              {isLargeNumber && (
                <div className="absolute bottom-1 right-1 bg-primary/80 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  x{groupSize}
                </div>
              )}
            </div>
            {countedItems.has(index) && (
              <div className="absolute top-1 right-1 bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                {Array.from(countedItems).indexOf(index) + 1}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <p className="text-xl mb-4">How many {itemName}s do you see?</p>
      {isLargeNumber && 
        <p className="text-sm mb-4 text-gray-500">
          <strong>Note:</strong> Each item represents a group of {groupSize}. 
          Count the number of groups ({groupsToShow}) and multiply by {groupSize} to get the total of {correctCount}.
        </p>
      }
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {options.map((option) => (
            <button
              key={option}
              className={`w-12 h-12 rounded-lg border-2 ${
                selectedCount === option 
                  ? 'border-primary font-bold text-xl text-primary' 
                  : 'border-gray-300 font-bold text-xl'
              } ${
                showFeedback && option === correctCount && isCorrect
                  ? 'bg-green-100 border-green-500'
                  : ''
              } ${
                showFeedback && option === selectedCount && !isCorrect
                  ? 'bg-red-100 border-red-500'
                  : ''
              }`}
              onClick={() => handleSelectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
        
        <button 
          className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-6 rounded-lg inline-flex items-center"
          onClick={handleCheck}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Check
        </button>
      </div>
      
      {showFeedback && (
        <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? (
            <p className="font-bold">Great job! You counted correctly!</p>
          ) : (
            <p className="font-bold">Try again! Count each {itemName} carefully.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CountingExercise;
