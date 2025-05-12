import { useState, useEffect } from 'react';
import AudioButton from './AudioButton';
import { useToast } from "@/hooks/use-toast";

interface WordItem {
  id: string;
  word: string;
  imageUrl: string;
  audioUrl: string;
}

interface WordMatchingExerciseProps {
  items: WordItem[];
  onComplete?: (score: number) => void;
}

const WordMatchingExercise = ({
  items,
  onComplete
}: WordMatchingExerciseProps) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [completedPairs, setCompletedPairs] = useState<Set<string>>(new Set());
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  
  // Shuffle words on mount
  useEffect(() => {
    setShuffledWords([...items].sort(() => Math.random() - 0.5));
  }, [items]);
  
  const handleImageClick = (itemId: string) => {
    // Don't allow selecting completed pairs
    if (completedPairs.has(itemId)) return;
    
    setSelectedImage(itemId);
    
    // If a word is already selected, check for a match
    if (selectedWord === itemId) {
      // We have a match!
      handleMatch(itemId);
    }
  };
  
  const handleWordClick = (itemId: string) => {
    // Don't allow selecting completed pairs
    if (completedPairs.has(itemId)) return;
    
    setSelectedWord(itemId);
    
    // If an image is already selected, check for a match
    if (selectedImage === itemId) {
      // We have a match!
      handleMatch(itemId);
    }
  };
  
  const handleMatch = (itemId: string) => {
    // Add to completed pairs
    const newCompletedPairs = new Set(completedPairs);
    newCompletedPairs.add(itemId);
    setCompletedPairs(newCompletedPairs);
    
    // Reset selections
    setSelectedImage(null);
    setSelectedWord(null);
    
    // Show success toast
    toast({
      title: "Good job!",
      description: "You found a match!",
      duration: 1500,
    });
    
    // Check if all pairs are matched
    if (newCompletedPairs.size === items.length) {
      // Exercise completed
      if (onComplete) {
        onComplete(newCompletedPairs.size);
      }
      
      toast({
        title: "Exercise complete!",
        description: `You matched all ${items.length} words!`,
        duration: 3000,
      });
    }
  };
  
  const getItemBgClass = (itemId: string) => {
    if (completedPairs.has(itemId)) {
      return "bg-secondary/20 border-2 border-secondary";
    }
    if (selectedImage === itemId || selectedWord === itemId) {
      return "bg-primary/10 border-2 border-primary";
    }
    return "bg-gray-100";
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Match the Pictures</h3>
      
      {/* Images grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {items.map((item) => (
          <div 
            key={`img-${item.id}`}
            className={`cursor-pointer p-2 rounded-lg ${getItemBgClass(item.id)} transition-all`}
            onClick={() => handleImageClick(item.id)}
          >
            <img 
              src={item.imageUrl} 
              alt={item.word} 
              className="w-full h-32 object-cover rounded-lg mb-2"
              aria-label={`Image for ${item.word}`}
            />
          </div>
        ))}
      </div>
      
      <h3 className="text-xl font-bold mb-4">Select the Matching Word</h3>
      
      {/* Words grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shuffledWords.map((item) => (
          <div 
            key={`word-${item.id}`}
            className={`p-4 rounded-lg text-center ${getItemBgClass(item.id)} transition-all`}
          >
            <div 
              className="font-bold text-lg mb-2 cursor-pointer" 
              onClick={() => handleWordClick(item.id)}
              aria-disabled={completedPairs.has(item.id)}
            >
              {item.word}
            </div>
            <div className="mt-2">
              <AudioButton 
                src={item.audioUrl} 
                size="sm" 
                label="" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordMatchingExercise;
