import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AudioButton from '@/components/AudioButton';
import BottomNavigation from '@/components/BottomNavigation';
import { emotions, EmotionItem } from '../utils/emotions';

const EmotionsModule = () => {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionItem | null>(null);
  
  // Filter emotions based on search query
  const filteredEmotions = emotions.filter(emotion => 
    emotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emotion.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // Handle selecting an emotion
  const handleSelectEmotion = (emotion: EmotionItem) => {
    setSelectedEmotion(emotion);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-white shadow-md p-4 flex items-center">
        <button 
          onClick={() => navigate('/')} 
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Emotions & Feelings</h1>
      </div>
      
      <main className="flex-1 container max-w-5xl px-4 py-4 md:py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Express How You Feel</h2>
          <p className="text-muted-foreground mb-4">
            Learn to describe different emotions and feelings in English.
          </p>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emotions..."
              className="pl-8 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-2 top-2.5"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        
        {/* Selected emotion display */}
        {selectedEmotion && (
          <div className="mb-8 bg-primary/5 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-7xl md:text-8xl">{selectedEmotion.emoji}</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-2">{selectedEmotion.name}</h3>
                <p className="text-xl mb-4">{selectedEmotion.phrase}</p>
                <div className="flex gap-3">
                  <AudioButton 
                    src={selectedEmotion.audioUrl} 
                    label="Listen"
                    size="lg"
                  />
                  <button 
                    onClick={() => setSelectedEmotion(null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Emotions grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredEmotions.map((emotion) => (
            <EmotionCard 
              key={emotion.id} 
              emotion={emotion} 
              onSelect={handleSelectEmotion}
            />
          ))}
          
          {filteredEmotions.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground">No emotions match your search.</p>
              <button 
                onClick={clearSearch}
                className="mt-2 text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        
        {/* Practice tips section */}
        <div className="mt-10 bg-muted p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Practice Tips</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Click on an emotion card to see more details and hear the phrase.</li>
            <li>Practice saying "I am..." followed by the emotion.</li>
            <li>Try making sentences like "I feel..." with the emotion.</li>
            <li>Use emotions to describe how you feel during daily conversations.</li>
          </ul>
        </div>
      </main>
      
      <BottomNavigation currentPath={location} />
    </div>
  );
};

// Emotion Card Component
const EmotionCard = ({ 
  emotion, 
  onSelect 
}: { 
  emotion: EmotionItem; 
  onSelect: (emotion: EmotionItem) => void;
}) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(emotion)}
    >
      <div className="p-4 flex flex-col items-center text-center">
        <div className="text-4xl mb-2">{emotion.emoji}</div>
        <h3 className="font-bold">{emotion.name}</h3>
        <AudioButton 
          src={emotion.audioUrl} 
          size="sm" 
          label="" 
          className="mt-2"
        />
      </div>
    </Card>
  );
};

export default EmotionsModule;