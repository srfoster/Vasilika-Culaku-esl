import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import WordMatchingExercise from '@/components/WordMatchingExercise';
import AudioButton from '@/components/AudioButton';
import { storage } from '@/data/storage';
import { foodVocabulary, listeningExercises } from '@/utils/foodVocabulary';

const FoodVocabularyModule = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Fetch user's food vocabulary progress
  const [foodProgress, setFoodProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const progress = storage.getProgress();
    setFoodProgress(progress.food);
  }, []);
  
  // Get the current listening exercise
  const currentExercise = listeningExercises[currentExerciseIndex];
  
  // Update progress mutation
    mutationFn: (data: { exercise: string, completed: boolean }) => {
    },
    onSuccess: () => {
    },
  });
  
  // Handle completing the matching exercise
  const handleCompleteMatching = (score: number) => {
    updateProgress.mutate({
      exercise: 'matching',
      completed: true
    });
  };
  
  // Handle selecting a sentence in the listening exercise
  const handleSelectSentence = (sentence: string) => {
    setSelectedSentence(sentence);
  };
  
  // Handle checking the selected sentence
  const handleCheckSentence = () => {
    if (!selectedSentence) return;
    
    const isCorrect = selectedSentence === currentExercise.correctSentence;
    setShowFeedback(true);
    
    if (isCorrect) {
      updateProgress.mutate({
        exercise: `listening_${currentExerciseIndex}`,
        completed: true
      });
      
      // Move to next exercise if available
      if (currentExerciseIndex < listeningExercises.length - 1) {
        setTimeout(() => {
          setCurrentExerciseIndex(prev => prev + 1);
          setSelectedSentence(null);
          setShowFeedback(false);
        }, 2000);
      }
    }
  };
  
  return (
    <div className="food-vocabulary-module">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.location.href = "/"} 
          className="mr-3 bg-light rounded-full p-2"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </button>
        <h2 className="text-2xl md:text-3xl font-bold">Food Vocabulary</h2>
      </div>

      {/* Word matching exercise */}
      <WordMatchingExercise 
        items={foodVocabulary}
        onComplete={handleCompleteMatching}
      />
      
      {/* Vocabulary practice */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Practice Sentences</h3>
        
        {/* A visual scene with food items in context */}
        <img 
          src={currentExercise.imageUrl} 
          alt="Food scene" 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        
        <div className="mb-4">
          <p className="text-lg mb-2">Listen and select what you hear:</p>
          <button 
            className="bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center p-3 mb-4"
            onClick={() => {
              try {
                // Create simple audio context
                const context = new (window.AudioContext || (window as any).webkitAudioContext)();
                
                // Create simple beep with slight variations for sentences
                const osc1 = context.createOscillator();
                osc1.type = 'sine';
                osc1.frequency.value = 440; // A4
                
                const osc2 = context.createOscillator();
                osc2.type = 'sine';
                osc2.frequency.value = 523; // C5
                
                // Volume control
                const gainNode = context.createGain();
                gainNode.gain.value = 0.3;
                
                // Connect
                osc1.connect(gainNode);
                osc2.connect(gainNode);
                gainNode.connect(context.destination);
                
                // Play two tones in sequence
                osc1.start();
                
                // Stop first tone after 300ms
                setTimeout(() => {
                  osc1.stop();
                  osc1.disconnect();
                  
                  // Play second tone 100ms after first one stops
                  setTimeout(() => {
                    osc2.start();
                    
                    // Stop second tone after 300ms
                    setTimeout(() => {
                      osc2.stop();
                      osc2.disconnect();
                      gainNode.disconnect();
                    }, 300);
                  }, 100);
                }, 300);
                
              } catch (error) {
                console.error("Basic audio failed:", error);
                
                // Super fallback - basic browser audio
                try {
                  const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18AAAAA");
                  audio.play();
                } catch (e) {
                  console.error("Even basic audio failed:", e);
                }
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            Listen
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentExercise.options.map((option, index) => (
              <button
                key={index}
                className={`p-3 rounded-lg text-left ${
                  selectedSentence === option
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${
                  showFeedback && option === currentExercise.correctSentence
                    ? 'bg-green-100 border-2 border-green-500'
                    : ''
                } ${
                  showFeedback && option === selectedSentence && option !== currentExercise.correctSentence
                    ? 'bg-red-100 border-2 border-red-500'
                    : ''
                }`}
                onClick={() => handleSelectSentence(option)}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-6 rounded-lg inline-flex items-center"
            onClick={handleCheckSentence}
            disabled={!selectedSentence || showFeedback}
          >
            {currentExerciseIndex < listeningExercises.length - 1 ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                Next
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Check
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodVocabularyModule;
