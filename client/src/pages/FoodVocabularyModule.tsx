import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import WordMatchingExercise from '@/components/WordMatchingExercise';
import AudioButton from '@/components/AudioButton';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { foodVocabulary, listeningExercises } from '@/utils/foodVocabulary';

const FoodVocabularyModule = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Fetch user's food vocabulary progress
  const { data: progress } = useQuery({
    queryKey: ['/api/progress/food'],
  });
  
  // Get the current listening exercise
  const currentExercise = listeningExercises[currentExerciseIndex];
  
  // Update progress mutation
  const updateProgress = useMutation({
    mutationFn: (data: { exercise: string, completed: boolean }) => {
      return apiRequest('POST', '/api/progress/food', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress/food'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users/current'] });
      queryClient.invalidateQueries({ queryKey: ['/api/modules'] });
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
                // Directly create audio context within a user interaction
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                
                // Create a more complex multi-tone pattern for sentences
                const oscillator1 = audioContext.createOscillator();
                const oscillator2 = audioContext.createOscillator();
                const oscillator3 = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                // Connect nodes
                oscillator1.connect(gainNode);
                oscillator2.connect(gainNode);
                oscillator3.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Set different waveforms
                oscillator1.type = 'sine';
                oscillator2.type = 'triangle';
                oscillator3.type = 'sine';
                
                // Generate frequencies from sentence
                const sentence = currentExercise.correctSentence;
                let hash = 0;
                for (let i = 0; i < sentence.length; i++) {
                  hash = ((hash << 5) - hash) + sentence.charCodeAt(i);
                }
                hash = Math.abs(hash);
                
                // Base frequency - C4 (middle C)
                const baseFreq = 262;
                
                // Create a chord (C major)
                oscillator1.frequency.value = baseFreq; // C
                oscillator2.frequency.value = baseFreq * 1.25; // E
                oscillator3.frequency.value = baseFreq * 1.5;  // G
                
                // Configure envelope
                const now = audioContext.currentTime;
                const duration = 1.5; // longer for sentences
                
                // Main oscillator (melody)
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.5, now + 0.1);
                gainNode.gain.setValueAtTime(0.5, now + 0.1);
                gainNode.gain.linearRampToValueAtTime(0, now + duration);
                
                // Play each oscillator
                oscillator1.start(now);
                oscillator2.start(now + 0.1);
                oscillator3.start(now + 0.2);
                
                oscillator1.stop(now + duration);
                oscillator2.stop(now + duration - 0.1);
                oscillator3.stop(now + duration - 0.2);
              } catch (error) {
                console.error("Audio playback failed:", error);
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
