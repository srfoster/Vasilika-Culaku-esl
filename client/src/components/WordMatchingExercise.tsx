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
              <button 
                className="bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center p-2 text-sm"
                onClick={() => {
                  try {
                    // Super simple approach - create audio beep directly
                    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
                    
                    // Create oscillator
                    const osc = context.createOscillator();
                    osc.type = 'sine';
                    
                    // Create a basic frequency based on the word
                    const notes = [
                      262, // C4
                      294, // D4
                      330, // E4
                      349, // F4
                      392, // G4
                      440, // A4
                      494, // B4
                      523  // C5
                    ];
                    
                    // Simple hash for the word to choose a note
                    let sum = 0;
                    for (let i = 0; i < item.word.length; i++) {
                      sum += item.word.charCodeAt(i);
                    }
                    
                    // Pick a note
                    const noteIndex = sum % notes.length;
                    osc.frequency.value = notes[noteIndex];
                    
                    // Connect to output
                    const gainNode = context.createGain();
                    gainNode.gain.value = 0.5;
                    osc.connect(gainNode);
                    gainNode.connect(context.destination);
                    
                    // Play a short tone
                    osc.start();
                    
                    // Stop after 0.5 seconds
                    setTimeout(() => {
                      osc.stop();
                      // Clean up
                      osc.disconnect();
                      gainNode.disconnect();
                    }, 500);
                    
                  } catch (error) {
                    console.error("Basic audio failed:", error);
                    
                    // Ultra fallback - browser beep
                    try {
                      const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18AAAAA");
                      audio.play();
                    } catch (e) {
                      console.error("Even basic audio failed:", e);
                    }
                  }
                }}
                aria-label={`Listen to ${item.word}`}
              >
                {/* Audio icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordMatchingExercise;
