import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { ArrowLeft, Volume2, Bookmark, BookmarkCheck } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { PhraseItem, PhraseCategory, phraseCategories, getPhrasesByCategory } from '../utils/survivalPhrases';
import useIsMobile from '../hooks/useMobile';
import { useToast } from '../hooks/use-toast';
import AudioButton from '../components/AudioButton';

export default function SurvivalPhrasesModule() {
  const [location, navigate] = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>(phraseCategories[0].id);
  const [savedPhrases, setSavedPhrases] = useState<string[]>([]);
  
  // Get categories from the API
  const { data: categories, isLoading: categoriesLoading } = useQuery<PhraseCategory[]>({
    queryKey: ['/api/survival-categories'],
    initialData: phraseCategories,
    enabled: false // We're using local data for now
  });
  
  // Get phrases for the selected category (from local data)
  const phrasesForCategory = getPhrasesByCategory(activeCategory);
  
  // Save phrase to favorites
  const toggleSavePhrase = (phraseId: string) => {
    if (savedPhrases.includes(phraseId)) {
      setSavedPhrases(savedPhrases.filter(id => id !== phraseId));
      toast({
        title: "Removed from saved phrases",
        description: "This phrase has been removed from your saved list."
      });
    } else {
      setSavedPhrases([...savedPhrases, phraseId]);
      toast({
        title: "Saved to your phrases",
        description: "You can review this phrase later in your saved phrases."
      });
    }
  };
  
  // Load saved phrases from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('savedPhrases');
    if (savedItems) {
      setSavedPhrases(JSON.parse(savedItems));
    }
  }, []);
  
  // Save phrases to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedPhrases', JSON.stringify(savedPhrases));
  }, [savedPhrases]);
  
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
        <h1 className="text-xl font-bold">Survival English Phrases</h1>
      </div>
      
      <main className="flex-1 container max-w-5xl px-4 py-4 md:py-6">
        <h1 className="text-2xl font-bold mb-4">Essential English Phrases</h1>
        <p className="text-muted-foreground mb-6">
          Learn and practice these important phrases for everyday situations.
        </p>
        
        {/* Category tabs */}
        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="mb-4 w-full h-auto flex flex-wrap gap-2 justify-start bg-transparent">
            {categories?.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-4 py-2 text-sm data-[state=active]:text-white data-[state=active]:shadow-md"
                style={{ 
                  backgroundColor: `${category.id === activeCategory ? category.color : 'transparent'}`,
                  color: `${category.id === activeCategory ? 'white' : 'inherit'}`
                }}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Phrases for the selected category */}
          {categories?.map((category) => (
            <TabsContent 
              key={category.id} 
              value={category.id}
              className="mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phrasesForCategory.map((phrase) => (
                  <Card key={phrase.id} className="mb-4 border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: category.color }}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex justify-between items-center">
                        <span>{phrase.phrase}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleSavePhrase(phrase.id)}
                          aria-label={savedPhrases.includes(phrase.id) ? "Remove from saved phrases" : "Save this phrase"}
                        >
                          {savedPhrases.includes(phrase.id) ? (
                            <BookmarkCheck className="h-5 w-5 text-primary" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </Button>
                      </CardTitle>
                      {phrase.translation && (
                        <CardDescription className="text-md italic">
                          {phrase.translation}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-muted-foreground text-sm mb-2">
                        {phrase.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-0">
                      <div className="flex items-center gap-2">
                        <AudioButton 
                          src={phrase.audioUrl} 
                          size="sm" 
                          color="primary"
                          label="Listen" 
                        />
                        <span className="text-sm text-muted-foreground">
                          Practice saying this phrase
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={phrase.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Practice section */}
              <div className="mt-8 bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Practice Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Listen to each phrase multiple times</li>
                  <li>Practice saying the phrase aloud</li>
                  <li>Try using the phrase in your daily conversations</li>
                  <li>Save important phrases to review later</li>
                </ul>
              </div>
            </TabsContent>
          ))}
          
          {/* Saved phrases tab */}
          <TabsContent value="saved" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedPhrases.length > 0 ? (
                savedPhrases.map(phraseId => {
                  const phrase = getPhraseById(phraseId);
                  if (!phrase) return null;
                  
                  const category = categories?.find(c => c.id === phrase.category);
                  
                  return (
                    <Card 
                      key={phrase.id} 
                      className="mb-4 border-l-4 hover:shadow-md transition-shadow" 
                      style={{ borderLeftColor: category?.color || '#333' }}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex justify-between items-center">
                          <span>{phrase.phrase}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleSavePhrase(phrase.id)}
                            aria-label="Remove from saved phrases"
                          >
                            <BookmarkCheck className="h-5 w-5 text-primary" />
                          </Button>
                        </CardTitle>
                        {phrase.translation && (
                          <CardDescription className="text-md italic">
                            {phrase.translation}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-muted-foreground text-sm mb-2">
                          {phrase.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div className="flex items-center gap-2">
                          <AudioButton 
                            src={phrase.audioUrl} 
                            size="sm" 
                            color="primary"
                            label="Listen" 
                          />
                          <span className="text-sm text-muted-foreground">
                            Practice saying this phrase
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={phrase.imageUrl} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full text-center p-8">
                  <h3 className="text-lg font-medium mb-2">No saved phrases yet</h3>
                  <p className="text-muted-foreground">
                    Click the bookmark icon on any phrase to save it for later review.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation currentPath={location} />
    </div>
  );
}

// Helper function to get a phrase by ID
function getPhraseById(id: string): PhraseItem | undefined {
  return getPhrasesByCategory('greetings')
    .concat(getPhrasesByCategory('emergencies'))
    .concat(getPhrasesByCategory('shopping'))
    .concat(getPhrasesByCategory('healthcare'))
    .concat(getPhrasesByCategory('transportation'))
    .concat(getPhrasesByCategory('work'))
    .find(phrase => phrase.id === id);
}