import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import DrawingCanvas from '@/components/DrawingCanvas';
import AudioButton from '@/components/AudioButton';
import { storage } from '@/data/storage';

const Practice = () => {
  const [practiceComplete, setPracticeComplete] = useState(false);
  
  const [practiceData, setPracticeData] = useState<any>(null);

  useEffect(() => {
    const practice = storage.getDailyPractice();
    setPracticeData(practice);
  }, []);
  
  // Update practice progress mutation
  const updatePractice = useMutation({
    mutationFn: (data: { completed: boolean }) => {
      return apiRequest('POST', '/api/practice/complete', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/practice/daily'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users/current'] });
      setPracticeComplete(true);
    },
  });
  
  // Handle saving the practice
  const handleSavePractice = (data: string) => {
    updatePractice.mutate({ completed: true });
  };
  
  return (
    <div className="practice-screen">
      <div className="flex items-center mb-6">
        <Link href="/">
          <a className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </a>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold">Daily Practice</h2>
      </div>

      {practiceComplete ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col items-center text-center py-8">
            <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Great Job!</h3>
            <p className="text-gray-600 mb-6">You've completed today's practice. Come back tomorrow for more!</p>
            <Link href="/">
              <a className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Return Home
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Practice instructions */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold">Today's Practice</h3>
              <AudioButton 
                src="/api/audio/instruction/practice"
                className="ml-2"
                size="sm"
                label=""
              />
            </div>
            <p className="text-lg mb-4">Write these letters:</p>
            <div className="flex flex-wrap gap-3 mb-4">
              {['A', 'B', 'C', 'D'].map(letter => (
                <div key={letter} className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold text-primary">
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-gray-600">
              Practice writing each letter. Try to make them look like the examples above.
            </p>
          </div>

          {/* Practice drawing area */}
          <DrawingCanvas 
            prompt="Practice writing the letters"
            onSave={handleSavePractice}
          />
        </>
      )}
    </div>
  );
};

export default Practice;
