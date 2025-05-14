import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Search, X, Volume2 } from 'lucide-react';
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
import { Input } from "@/components/ui/input";
import BottomNavigation from '@/components/BottomNavigation';

import { 
  directionTerms, 
  locationTypes, 
  directionPhrases,
  getDirectionTermsByCategory,
  DirectionTerm,
  LocationType,
  DirectionPhrase
} from '@/utils/directionsVocabulary';

const DirectionsModule = () => {
  const [location, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('basic-directions');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get direction terms by category
  const basicDirections = getDirectionTermsByCategory('basic');
  const locationPrepositions = getDirectionTermsByCategory('location');
  const transportationTerms = getDirectionTermsByCategory('transportation');
  const questionWords = getDirectionTermsByCategory('question');
  
  // Get phrases by category 
  const askingPhrases = directionPhrases.filter(phrase => phrase.category === 'asking');
  const givingPhrases = directionPhrases.filter(phrase => phrase.category === 'giving');
  const transitPhrases = directionPhrases.filter(phrase => phrase.category === 'public-transit');
  
  // Filter items based on search query
  const filteredBasicDirections = basicDirections.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.example.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredLocationPrepositions = locationPrepositions.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.example.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTransportationTerms = transportationTerms.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.example.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredQuestionWords = questionWords.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.example.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredLocationTypes = locationTypes.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.examples.some(example => example.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredAskingPhrases = askingPhrases.filter(item => 
    item.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGivingPhrases = givingPhrases.filter(item => 
    item.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTransitPhrases = transitPhrases.filter(item => 
    item.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
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
        <h1 className="text-xl font-bold">Directions & Navigation</h1>
      </div>
      
      <main className="flex-1 container max-w-5xl px-4 py-4 md:py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Finding Your Way</h2>
          <p className="text-muted-foreground mb-4">
            Learn important vocabulary and phrases to ask for and give directions, use transportation, and find your way around.
          </p>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search directions vocabulary..."
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
        
        <Tabs defaultValue="basic-directions" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="basic-directions">Direction Terms</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="phrases">Useful Phrases</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          
          {/* Direction Terms Tab */}
          <TabsContent value="basic-directions" className="space-y-4">
            {/* Secondary Tabs for Direction Types */}
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic Directions</TabsTrigger>
                <TabsTrigger value="location">Location Words</TabsTrigger>
                <TabsTrigger value="transportation">Transportation</TabsTrigger>
                <TabsTrigger value="question">Question Words</TabsTrigger>
              </TabsList>
              
              {/* Basic Directions */}
              <TabsContent value="basic">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredBasicDirections.map((term) => (
                    <DirectionTermCard key={term.id} term={term} />
                  ))}
                  
                  {filteredBasicDirections.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No direction terms match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Location Words */}
              <TabsContent value="location">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredLocationPrepositions.map((term) => (
                    <DirectionTermCard key={term.id} term={term} />
                  ))}
                  
                  {filteredLocationPrepositions.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No location terms match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Transportation Terms */}
              <TabsContent value="transportation">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredTransportationTerms.map((term) => (
                    <DirectionTermCard key={term.id} term={term} />
                  ))}
                  
                  {filteredTransportationTerms.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No transportation terms match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Question Words */}
              <TabsContent value="question">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredQuestionWords.map((term) => (
                    <DirectionTermCard key={term.id} term={term} />
                  ))}
                  
                  {filteredQuestionWords.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No question words match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          {/* Locations Tab */}
          <TabsContent value="locations" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredLocationTypes.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
              
              {filteredLocationTypes.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">No locations match your search.</p>
                  <Button variant="link" onClick={clearSearch}>Clear search</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Phrases Tab */}
          <TabsContent value="phrases" className="space-y-4">
            {/* Secondary Tabs for Phrases Types */}
            <Tabs defaultValue="asking" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="asking">Asking for Directions</TabsTrigger>
                <TabsTrigger value="giving">Giving Directions</TabsTrigger>
                <TabsTrigger value="transit">Public Transit</TabsTrigger>
              </TabsList>
              
              {/* Asking for Directions */}
              <TabsContent value="asking">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAskingPhrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} color="blue" />
                  ))}
                  
                  {filteredAskingPhrases.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No asking phrases match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Giving Directions */}
              <TabsContent value="giving">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGivingPhrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} color="green" />
                  ))}
                  
                  {filteredGivingPhrases.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No giving phrases match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Public Transit */}
              <TabsContent value="transit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTransitPhrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} color="purple" />
                  ))}
                  
                  {filteredTransitPhrases.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No transit phrases match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-4">
            <div className="bg-muted p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Practice Directions</h3>
              <p className="mb-6 text-muted-foreground max-w-md mx-auto">
                Practice giving and receiving directions with these interactive exercises.
                Test your knowledge of direction vocabulary and phrases.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Map Reading</CardTitle>
                    <CardDescription>
                      Practice reading a map and finding your way around town.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23f4f4f8'/><rect x='20' y='20' width='160' height='110' fill='%23e2e8f0' stroke='%23718096' stroke-width='1'/><line x1='20' y1='75' x2='180' y2='75' stroke='%2338b2ac' stroke-width='3'/><line x1='100' y1='20' x2='100' y2='130' stroke='%233182ce' stroke-width='3'/><rect x='40' y='40' width='20' height='20' fill='%23fc8181' stroke='%23742a2a' stroke-width='1'/><rect x='140' y='110' width='20' height='20' fill='%2368d391' stroke='%2322543d' stroke-width='1'/><circle cx='50' cy='100' r='10' fill='%23f6ad55' stroke='%23744210' stroke-width='1'/><circle cx='150' cy='50' r='10' fill='%239f7aea' stroke='%234a5568' stroke-width='1'/><text x='100' y='75' font-family='Arial' font-size='10' text-anchor='middle' fill='%232d3748'>City Map</text></svg>"
                      alt="Map exercise"
                      className="w-full h-32 object-contain"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button disabled>Coming Soon</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Conversation Practice</CardTitle>
                    <CardDescription>
                      Practice asking for and giving directions in common scenarios.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23f4f4f8'/><circle cx='60' cy='60' r='25' fill='%23bee3f8' stroke='%232b6cb0' stroke-width='1'/><circle cx='140' cy='60' r='25' fill='%23fed7d7' stroke='%23c53030' stroke-width='1'/><path d='M85 60 L115 60' stroke='%234a5568' stroke-width='2' stroke-dasharray='5,5'/><path d='M70 90 Q100 120 130 90' stroke='%234a5568' stroke-width='2' fill='none'/><text x='60' y='65' font-family='Arial' font-size='10' text-anchor='middle' fill='%232d3748'>?</text><text x='140' y='65' font-family='Arial' font-size='10' text-anchor='middle' fill='%232d3748'>!</text></svg>"
                      alt="Conversation exercise"
                      className="w-full h-32 object-contain"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button disabled>Coming Soon</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation currentPath={location} />
    </div>
  );
};

// Direction Term Card Component
const DirectionTermCard = ({ term }: { term: DirectionTerm }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-slate-50 overflow-hidden flex items-center justify-center">
        <img 
          src={term.imageUrl.startsWith('http') ? term.imageUrl : 
            `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><text x="150" y="150" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">${term.term}</text></svg>`
          }
          alt={term.term}
          className="w-full h-full object-contain"
        />
      </div>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-xl">{term.term}</CardTitle>
        {term.translation && (
          <CardDescription>{term.translation}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground">{term.example}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <button 
          className="bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center p-2 text-sm"
          onClick={() => {
            try {
              // Create simple audio context
              const context = new (window.AudioContext || (window as any).webkitAudioContext)();
              
              // Create oscillator
              const osc = context.createOscillator();
              osc.type = 'sine';
              
              // Create a basic frequency based on the term
              const notes = [
                262, // C4
                294, // D4
                330, // E4
                349, // F4
                392, // G4
                440, // A4
                494, // B4
                523  // C5
              ];
              
              // Simple hash for the term to choose a note
              let sum = 0;
              for (let i = 0; i < term.term.length; i++) {
                sum += term.term.charCodeAt(i);
              }
              
              // Pick a note
              const noteIndex = sum % notes.length;
              osc.frequency.value = notes[noteIndex];
              
              // Connect to output
              const gainNode = context.createGain();
              gainNode.gain.value = 0.5;
              osc.connect(gainNode);
              gainNode.connect(context.destination);
              
              // Play a short tone
              osc.start();
              
              // Stop after 0.7 seconds
              setTimeout(() => {
                osc.stop();
                // Clean up
                osc.disconnect();
                gainNode.disconnect();
              }, 700);
              
            } catch (error) {
              console.error("Audio playback failed:", error);
            }
          }}
          aria-label={`Listen to ${term.term}`}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          <span>Listen</span>
        </button>
      </CardFooter>
    </Card>
  );
};

// Location Card Component
const LocationCard = ({ location }: { location: LocationType }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-slate-50 overflow-hidden flex items-center justify-center">
        <img 
          src={location.imageUrl.startsWith('http') ? location.imageUrl : 
            `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><text x="150" y="150" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">${location.name}</text></svg>`
          }
          alt={location.name}
          className="w-full h-full object-contain"
        />
      </div>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-xl">{location.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground mb-2">Examples:</p>
        <ul className="text-sm list-disc pl-5">
          {location.examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <button 
          className="bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center p-2 text-sm"
          onClick={() => {
            try {
              // Create simple audio context
              const context = new (window.AudioContext || (window as any).webkitAudioContext)();
              
              // Create oscillator
              const osc = context.createOscillator();
              osc.type = 'triangle'; // Different waveform for locations
              
              // Create a basic frequency based on the location name
              const notes = [
                349, // F4
                392, // G4
                440, // A4
                494, // B4
                523, // C5
                587, // D5
                659, // E5
                698  // F5
              ];
              
              // Simple hash for the location to choose a note
              let sum = 0;
              for (let i = 0; i < location.name.length; i++) {
                sum += location.name.charCodeAt(i);
              }
              
              // Pick a note
              const noteIndex = sum % notes.length;
              osc.frequency.value = notes[noteIndex];
              
              // Connect to output
              const gainNode = context.createGain();
              gainNode.gain.value = 0.4;
              osc.connect(gainNode);
              gainNode.connect(context.destination);
              
              // Play a short tone
              osc.start();
              
              // Stop after 0.7 seconds
              setTimeout(() => {
                osc.stop();
                // Clean up
                osc.disconnect();
                gainNode.disconnect();
              }, 700);
              
            } catch (error) {
              console.error("Audio playback failed:", error);
            }
          }}
          aria-label={`Listen to ${location.name}`}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          <span>Listen</span>
        </button>
      </CardFooter>
    </Card>
  );
};

// Phrase Card Component
const PhraseCard = ({ phrase, color }: { phrase: DirectionPhrase, color: string }) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'purple': return 'border-purple-500';
      default: return 'border-gray-200';
    }
  };
  
  return (
    <Card className={`border-l-4 ${getColorClass()} hover:shadow-md transition-shadow`}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{phrase.phrase}</CardTitle>
        {phrase.translation && (
          <CardDescription>{phrase.translation}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2 flex items-center justify-between">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-slate-100 flex items-center justify-center">
          <img 
            src={phrase.imageUrl.startsWith('http') ? phrase.imageUrl : 
              `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f8f9fa"/></svg>`
            }
            alt=""
            className="w-full h-full object-cover" 
          />
        </div>
        <button 
          className="bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center p-2 text-sm"
          onClick={() => {
            try {
              // Create simple audio context
              const context = new (window.AudioContext || (window as any).webkitAudioContext)();
              
              // For phrases, we'll create a sequence of tones to represent the sentence
              
              // Get a number of tones based on word count (up to 3)
              const wordCount = Math.min(3, phrase.phrase.split(" ").length);
              
              // Create oscillators for each word
              for (let i = 0; i < wordCount; i++) {
                setTimeout(() => {
                  try {
                    const osc = context.createOscillator();
                    
                    // Different waveform for each category
                    switch (phrase.category) {
                      case 'asking':
                        osc.type = 'sine';
                        break;
                      case 'giving':
                        osc.type = 'triangle';
                        break;
                      case 'public-transit':
                        osc.type = 'sawtooth';
                        break;
                      default:
                        osc.type = 'sine';
                    }
                    
                    // Base frequency
                    let baseFreq = 440;
                    
                    // Adjust frequency by position
                    osc.frequency.value = baseFreq + (i * 60); 
                    
                    // Connect to output
                    const gainNode = context.createGain();
                    gainNode.gain.value = 0.25;
                    osc.connect(gainNode);
                    gainNode.connect(context.destination);
                    
                    // Play a short tone
                    osc.start();
                    
                    // Stop after 0.3 seconds
                    setTimeout(() => {
                      osc.stop();
                      osc.disconnect();
                      gainNode.disconnect();
                    }, 300);
                  } catch (e) {
                    console.error("Failed to play tone in sequence", e);
                  }
                }, i * 350); // Play tones in sequence
              }
              
            } catch (error) {
              console.error("Audio playback failed:", error);
            }
          }}
          aria-label={`Listen to "${phrase.phrase}"`}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          <span>Listen</span>
        </button>
      </CardContent>
    </Card>
  );
};

export default DirectionsModule;