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
                    // Directly create audio context within a user interaction
                    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    // Connect nodes
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    // Set parameters based on the word
                    oscillator.type = 'sine';
                    
                    // Generate a musical frequency based on the word
                    let hash = 0;
                    for (let i = 0; i < item.word.length; i++) {
                      hash += item.word.charCodeAt(i);
                    }
                    
                    // Use musical tones from a scale for more pleasant sounds
                    const tones = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
                    const baseFreq = tones[hash % tones.length];
                    oscillator.frequency.value = baseFreq;
                    
                    // Configure envelope for a pleasant sound
                    const now = audioContext.currentTime;
                    const duration = 1.2;
                    
                    // Fade in
                    gainNode.gain.setValueAtTime(0, now);
                    gainNode.gain.linearRampToValueAtTime(0.7, now + 0.1);
                    
                    // Hold
                    gainNode.gain.setValueAtTime(0.7, now + 0.1);
                    
                    // Fade out
                    gainNode.gain.linearRampToValueAtTime(0, now + duration);
                    
                    // Play
                    oscillator.start();
                    oscillator.stop(now + duration);
                  } catch (error) {
                    console.error("Audio playback failed:", error);
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
