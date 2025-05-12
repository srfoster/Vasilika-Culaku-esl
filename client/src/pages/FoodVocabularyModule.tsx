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
        <Link href="/">
          <a className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </a>
        </Link>
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
          <AudioButton
            src={currentExercise.audioUrl}
            label="Listen"
            color="accent"
            className="mb-4"
          />
          
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
