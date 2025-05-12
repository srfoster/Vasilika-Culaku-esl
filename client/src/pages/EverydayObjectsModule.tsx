import { useState } from 'react';
import { Link } from 'wouter';
import { objectCategories, getObjectsByCategory, ObjectCategory, ObjectItem } from '@/utils/everydayObjects';
import AudioButton from '@/components/AudioButton';
import WordMatchingExercise from '@/components/WordMatchingExercise';

const EverydayObjectsModule = () => {
  const [selectedCategory, setSelectedCategory] = useState<ObjectCategory | null>(null);
  const [selectedObject, setSelectedObject] = useState<ObjectItem | null>(null);
  const [showExercise, setShowExercise] = useState(false);

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
  const handleExerciseComplete = (score: number) => {
    // In a real app, this would save progress to the backend
    console.log(`Exercise completed with score: ${score}`);
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
                <button 
                  className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary/90"
                  onClick={() => {
                    // In a real app, this would track pronunciation practice
                    console.log('Practice pronunciation');
                  }}
                >
                  Practice Saying It
                </button>
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
                className="bg-light rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedObject(item)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.word}
                  className="w-full h-32 object-cover"
                />
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