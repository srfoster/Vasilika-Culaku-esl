import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { resourceCategories, getResourcesByCategory, ResourceCategory, ResourceItem } from '@/utils/communityResources';
import AudioButton from '@/components/AudioButton';
import { storage } from '@/data/storage';

const CommunityResourcesModule = () => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  // Reset selections when going back to categories
  const resetToCategories = () => {
    setSelectedCategory(null);
    setSelectedResource(null);
  };

  // Reset selected resource when going back to category items
  const resetToCategory = () => {
    setSelectedResource(null);
  };

  // If a resource is selected, show its details
  if (selectedResource) {
    return (
      <div className="community-resources-module">
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
          <h2 className="text-2xl md:text-3xl font-bold">{selectedResource.title}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src={selectedResource.imageUrl} 
                alt={selectedResource.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-2">{selectedResource.title}</h3>
              <div className="text-gray-600 mb-4">{selectedResource.description}</div>
              
              {selectedResource.phoneNumber && (
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-medium">{selectedResource.phoneNumber}</span>
                </div>
              )}
              
              {selectedResource.address && (
                <div className="flex items-start mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{selectedResource.address}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3 mt-2">
                <AudioButton 
                  src={selectedResource.audioUrl}
                  size="md"
                  label="Listen"
                />
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

  // If a category is selected, show all resources in that category
  if (selectedCategory) {
    const resourcesInCategory = getResourcesByCategory(selectedCategory.id);
    
    return (
      <div className="community-resources-module">
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
          <h2 className="text-2xl md:text-3xl font-bold">{selectedCategory.name} Resources</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <p className="text-lg mb-6">{selectedCategory.description}. Click on a resource to learn more.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {resourcesInCategory.map(resource => (
              <div 
                key={resource.id}
                className="bg-light rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 border border-gray-200"
                onClick={() => setSelectedResource(resource)}
                style={{ borderLeftColor: selectedCategory.color, borderLeftWidth: '4px' }}
              >
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{resource.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
                  {resource.phoneNumber && (
                    <p className="text-primary text-sm mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {resource.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render the categories (default view)
  return (
    <div className="community-resources-module">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3 bg-light rounded-full p-2" aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold">Community Resources in Bremerton</h2>
      </div>

      <div className="mb-6 p-6 bg-white rounded-xl shadow-md">
        <p className="text-lg mb-6">Find important services and locations in Bremerton and Kitsap County. Select a category to begin.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map(category => (
            <div 
              key={category.id}
              className="bg-light rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 border border-gray-200"
              onClick={() => setSelectedCategory(category)}
              style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
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

export default CommunityResourcesModule;