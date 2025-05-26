import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { objectCategories, getObjectsByCategory, ObjectCategory, ObjectItem } from '@/utils/everydayObjects';
import AudioButton from '@/components/AudioButton';
import WordMatchingExercise from '@/components/WordMatchingExercise';
import { storage } from '@/data/storage';

const EverydayObjectsModule = () => {
  const [selectedCategory, setSelectedCategory] = useState<ObjectCategory | null>(null);
  const [selectedObject, setSelectedObject] = useState<ObjectItem | null>(null);
  const [showExercise, setShowExercise] = useState(false);
  
  const [objectProgress, setObjectProgress] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const progress = storage.getProgress();
    setObjectProgress(progress.objects);
    setIsLoading(false);
  }, []);
  
  // Get completed objects status
  const getObjectCompletedStatus = (objectId: string): boolean => {
    if (!progressData || !progressData.categories) return false;
    
    const categories = progressData.categories;
    for (const categoryKey in categories) {
      const category = categories[categoryKey];
      if (category && category.items) {
        const item = category.items.find((item: any) => item.id === objectId);
        if (item) {
          return item.completed;
        }
      }
    }
    return false;
  };
  
  // Update object progress mutation
    mutationFn: async (objectId: string) => {
        objectId,
        completed: true
      });
    },
    onSuccess: () => {
      // Invalidate the progress query to refetch the latest data
    }
  });

  // Reset selections when going back to categories
  const resetToCategories = () => {
    setSelectedCategory(null);
    setSelectedObject(null);
    setShowExercise(false);
  };

  // Reset selected object when going back to category items
  const resetToCategory = () => {
    setSelectedObject(null);
    setShowExercise(false);
  };

  // Start the matching exercise for current category
  const startExercise = () => {
    setShowExercise(true);
    setSelectedObject(null);
  };

  // Handle exercise completion
  const handleExerciseComplete = async (score: number) => {
    if (selectedCategory && score > 0) {
      // Mark all objects in this category as completed
      const objects = getObjectsByCategory(selectedCategory.id);
      
      try {
        // Update progress for each object
        await Promise.all(
          objects.map(async (obj) => {
            if (!getObjectCompletedStatus(obj.id)) {
              await updateProgress.mutateAsync(obj.id);
            }
          })
        );
      } catch (error) {
        console.error("Failed to update progress:", error);
      }
    }
    
    setShowExercise(false);
  };

  // Render the exercise component
  if (showExercise && selectedCategory) {
    const objectsInCategory = getObjectsByCategory(selectedCategory.id);
    return (
      <div className="everyday-objects-module">
        <div className="flex items-center mb-6">
          <button 
            onClick={resetToCategory} 
            className="mr-3 bg-light rounded-full p-2"
            aria-label="Go back to category"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
          <h2 className="text-2xl md:text-3xl font-bold">{selectedCategory.name} Practice</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <WordMatchingExercise 
            items={objectsInCategory.map(obj => ({
              id: obj.id,
              word: obj.word,
              imageUrl: obj.imageUrl,
              audioUrl: obj.audioUrl
            }))}
            onComplete={handleExerciseComplete}
          />
        </div>
      </div>
    );
  }

  // Render detailed view of a specific object
  if (selectedObject) {
    return (
      <div className="everyday-objects-module">
        <div className="flex items-center mb-6">
          <button 
            onClick={resetToCategory} 
            className="mr-3 bg-light rounded-full p-2"
            aria-label="Go back to category"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
          <h2 className="text-2xl md:text-3xl font-bold">{selectedObject.word}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src={selectedObject.imageUrl} 
                alt={selectedObject.word}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">{selectedObject.word}</h3>
              <p className="text-gray-600 mb-6">This is a {selectedObject.word.toLowerCase()}. You can find it in the {selectedCategory?.name.toLowerCase()}.</p>
              
              <div className="flex items-center space-x-3">
                <AudioButton 
                  src={selectedObject.audioUrl}
                  size="lg"
                  label="Listen"
                />
                {getObjectCompletedStatus(selectedObject.id) ? (
                  <div className="flex items-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Learned</span>
                  </div>
                ) : (
                  <button 
                    className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary/90"
                    onClick={() => {
                      updateProgress.mutate(selectedObject.id);
                    }}
                    disabled={updateProgress.isPending}
                  >
                    {updateProgress.isPending ? 'Saving...' : 'Mark as Learned'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetToCategory}
            className="bg-accent hover:bg-accent/90 text-white font-bold py-2 px-6 rounded-md mr-3"
          >
            Back to {selectedCategory?.name}
          </button>
        </div>
      </div>
    );
  }

  // Render the list of objects in a category
  if (selectedCategory) {
    const objectsInCategory = getObjectsByCategory(selectedCategory.id);
    
    return (
      <div className="everyday-objects-module">
        <div className="flex items-center mb-6">
          <button 
            onClick={resetToCategories} 
            className="mr-3 bg-light rounded-full p-2"
            aria-label="Go back to categories"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
          <h2 className="text-2xl md:text-3xl font-bold">{selectedCategory.name}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <p className="text-lg mb-6">{selectedCategory.description}. Click on an item to learn more.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {objectsInCategory.map(item => (
              <div 
                key={item.id}
                className={`bg-light rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${getObjectCompletedStatus(item.id) ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedObject(item)}
              >
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.word}
                    className="w-full h-32 object-cover"
                  />
                  {getObjectCompletedStatus(item.id) && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-bold">{item.word}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={startExercise}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-md"
            >
              Practice Matching Words
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the categories (default view)
  return (
    <div className="everyday-objects-module">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold">Everyday Objects</h2>
      </div>

      <div className="mb-6 p-6 bg-white rounded-xl shadow-md">
        <p className="text-lg mb-6">Learn the names of common objects you use every day. Select a category to begin.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectCategories.map(category => (
            <div 
              key={category.id}
              className="bg-light rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedCategory(category)}
            >
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EverydayObjectsModule;