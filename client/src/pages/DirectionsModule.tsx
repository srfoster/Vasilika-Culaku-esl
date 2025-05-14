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
  // Function to render appropriate SVG based on direction term
  const getDirectionSvg = () => {
    switch (term.id) {
      case 'left':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Full arrow pointing left -->
          <path d="M220 150 L100 150" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M130 120 L100 150 L130 180" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="200" font-family="Arial" font-size="24" text-anchor="middle" fill="#1e3a8a">LEFT</text>
        </svg>`;
      case 'right':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Full arrow pointing right -->
          <path d="M80 150 L200 150" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M170 120 L200 150 L170 180" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="200" font-family="Arial" font-size="24" text-anchor="middle" fill="#1e3a8a">RIGHT</text>
        </svg>`;
      case 'straight':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <path d="M150 200 L150 120 L120 150" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M150 120 L180 150" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="230" font-family="Arial" font-size="24" text-anchor="middle" fill="#1e3a8a">STRAIGHT</text>
        </svg>`;
      case 'back':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <path d="M150 120 L150 200 L180 170" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M150 200 L120 170" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="100" font-family="Arial" font-size="24" text-anchor="middle" fill="#1e3a8a">BACK</text>
        </svg>`;
      case 'north':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <circle cx="150" cy="150" r="80" fill="none" stroke="#64748b" stroke-width="2"/>
          <path d="M150 210 L150 90 L130 120" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M150 90 L170 120" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="80" font-family="Arial" font-size="20" text-anchor="middle" fill="#1e3a8a">N</text>
          <text x="150" y="230" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">S</text>
          <text x="80" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">W</text>
          <text x="220" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">E</text>
          <rect x="70" y="240" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="265" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">NORTH</text>
        </svg>`;
      case 'south':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <circle cx="150" cy="150" r="80" fill="none" stroke="#64748b" stroke-width="2"/>
          <path d="M150 90 L150 210 L130 180" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M150 210 L170 180" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="80" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">N</text>
          <text x="150" y="230" font-family="Arial" font-size="20" text-anchor="middle" fill="#1e3a8a">S</text>
          <text x="80" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">W</text>
          <text x="220" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">E</text>
          <rect x="70" y="240" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="265" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">SOUTH</text>
        </svg>`;
      case 'east':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <circle cx="150" cy="150" r="80" fill="none" stroke="#64748b" stroke-width="2"/>
          <path d="M90 150 L210 150 L180 130" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M210 150 L180 170" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="80" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">N</text>
          <text x="150" y="230" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">S</text>
          <text x="80" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">W</text>
          <text x="220" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#1e3a8a">E</text>
          <rect x="70" y="240" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="265" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">EAST</text>
        </svg>`;
      case 'west':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <circle cx="150" cy="150" r="80" fill="none" stroke="#64748b" stroke-width="2"/>
          <path d="M210 150 L90 150 L120 130" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M90 150 L120 170" stroke="#3b82f6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="150" y="80" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">N</text>
          <text x="150" y="230" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">S</text>
          <text x="80" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#1e3a8a">W</text>
          <text x="220" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#64748b">E</text>
          <rect x="70" y="240" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="265" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">WEST</text>
        </svg>`;
      default:
        // Use the default template for other terms
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <text x="150" y="150" font-family="Arial" font-size="24" text-anchor="middle" fill="#1e3a8a">${term.term}</text>
        </svg>`;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-slate-50 overflow-hidden flex items-center justify-center">
        <img 
          src={term.imageUrl.startsWith('http') ? term.imageUrl : 
            `data:image/svg+xml;utf8,${encodeURIComponent(getDirectionSvg())}`
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
  // Function to render campus SVG for location concepts
  const getLocationSvg = () => {
    switch (location.id) {
      case 'campus':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Sky background -->
          <rect x="0" y="0" width="300" height="150" fill="#e0f2fe"/>
          
          <!-- Ground -->
          <rect x="0" y="150" width="300" height="150" fill="#d1fae5"/>
          
          <!-- Main building -->
          <rect x="100" y="80" width="100" height="80" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          <rect x="140" y="130" width="20" height="30" fill="#475569"/>
          <rect x="110" y="95" width="15" height="15" fill="#93c5fd"/>
          <rect x="135" y="95" width="15" height="15" fill="#93c5fd"/>
          <rect x="160" y="95" width="15" height="15" fill="#93c5fd"/>
          <rect x="175" y="95" width="15" height="15" fill="#93c5fd"/>
          
          <!-- Left building -->
          <rect x="40" y="100" width="50" height="60" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          <rect x="45" y="110" width="10" height="10" fill="#93c5fd"/>
          <rect x="60" y="110" width="10" height="10" fill="#93c5fd"/>
          <rect x="75" y="110" width="10" height="10" fill="#93c5fd"/>
          <rect x="60" y="130" width="15" height="30" fill="#475569"/>
          
          <!-- Right building -->
          <rect x="210" y="100" width="50" height="60" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          <rect x="215" y="110" width="10" height="10" fill="#93c5fd"/>
          <rect x="230" y="110" width="10" height="10" fill="#93c5fd"/>
          <rect x="245" y="110" width="10" height="10" fill="#93c5fd"/>
          <rect x="225" y="130" width="15" height="30" fill="#475569"/>
          
          <!-- Paths -->
          <path d="M150 160 L150 200 L100 230" stroke="#94a3b8" stroke-width="4" fill="none"/>
          <path d="M150 160 L150 200 L200 230" stroke="#94a3b8" stroke-width="4" fill="none"/>
          <path d="M150 160 L90 160" stroke="#94a3b8" stroke-width="4" fill="none"/>
          <path d="M150 160 L210 160" stroke="#94a3b8" stroke-width="4" fill="none"/>
          
          <!-- Trees -->
          <circle cx="30" cy="170" r="10" fill="#22c55e"/>
          <rect x="28" y="170" width="4" height="15" fill="#5b5b1e"/>
          <circle cx="270" cy="170" r="10" fill="#22c55e"/>
          <rect x="268" y="170" width="4" height="15" fill="#5b5b1e"/>
          
          <!-- Sign -->
          <rect x="60" y="215" width="180" height="40" fill="#e0f2fe" rx="5" stroke="#334155" stroke-width="2"/>
          <text x="150" y="240" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">COLLEGE CAMPUS</text>
        </svg>`;

      case 'grocery-store':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Store building -->
          <rect x="60" y="80" width="180" height="120" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Entrance -->
          <rect x="125" y="160" width="50" height="40" fill="#475569"/>
          <line x1="150" y1="160" x2="150" y2="200" stroke="#f8fafc" stroke-width="2"/>
          
          <!-- Store sign -->
          <rect x="80" y="60" width="140" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/>
          <text x="150" y="80" font-family="Arial" font-size="16" text-anchor="middle" fill="#ffffff" font-weight="bold">GROCERY STORE</text>
          
          <!-- Shopping cart --> 
          <circle cx="80" cy="220" r="10" fill="#94a3b8"/>
          <circle cx="100" cy="220" r="10" fill="#94a3b8"/>
          <rect x="70" y="190" width="40" height="25" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/>
          <line x1="70" y1="200" x2="110" y2="200" stroke="#1e40af" stroke-width="1"/>
          
          <!-- Groceries -->
          <circle cx="200" cy="220" r="10" fill="#fde68a"/> <!-- Apple/fruit -->
          <rect x="180" y="190" width="15" height="20" fill="#84cc16"/> <!-- Lettuce -->
          <rect x="220" y="190" width="10" height="25" fill="#fef3c7" stroke="#854d0e" stroke-width="1"/> <!-- Bread -->
          
          <!-- Ground -->
          <rect x="30" y="240" width="240" height="10" fill="#94a3b8"/>
          
          <!-- Label -->
          <rect x="70" y="250" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="275" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">GROCERY STORE</text>
        </svg>`;

      case 'pharmacy':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Pharmacy building -->
          <rect x="75" y="80" width="150" height="120" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Door -->
          <rect x="125" y="160" width="50" height="40" fill="#475569"/>
          <line x1="150" y1="160" x2="150" y2="200" stroke="#f8fafc" stroke-width="2"/>
          
          <!-- Pharmacy sign -->
          <rect x="90" y="60" width="120" height="30" fill="#22c55e" stroke="#166534" stroke-width="1"/>
          <text x="150" y="80" font-family="Arial" font-size="16" text-anchor="middle" fill="#ffffff" font-weight="bold">PHARMACY</text>
          
          <!-- Medical cross -->
          <rect x="210" y="100" width="30" height="80" fill="#ef4444"/>
          <rect x="185" y="125" width="80" height="30" fill="#ef4444"/>
          
          <!-- Medicine bottles -->
          <rect x="95" y="220" width="15" height="25" fill="#a78bfa" rx="2"/>
          <rect x="115" y="220" width="15" height="20" fill="#fde68a" rx="2"/>
          <rect x="135" y="220" width="15" height="22" fill="#a7f3d0" rx="2"/>
          
          <!-- Ground -->
          <rect x="30" y="240" width="240" height="10" fill="#94a3b8"/>
          
          <!-- Label -->
          <rect x="70" y="250" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="275" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">PHARMACY</text>
        </svg>`;

      case 'hospital':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Hospital main building -->
          <rect x="50" y="70" width="200" height="130" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Hospital windows -->
          <rect x="70" y="90" width="20" height="20" fill="#93c5fd"/>
          <rect x="100" y="90" width="20" height="20" fill="#93c5fd"/>
          <rect x="130" y="90" width="20" height="20" fill="#93c5fd"/>
          <rect x="160" y="90" width="20" height="20" fill="#93c5fd"/>
          <rect x="190" y="90" width="20" height="20" fill="#93c5fd"/>
          
          <rect x="70" y="120" width="20" height="20" fill="#93c5fd"/>
          <rect x="100" y="120" width="20" height="20" fill="#93c5fd"/>
          <rect x="130" y="120" width="20" height="20" fill="#93c5fd"/>
          <rect x="160" y="120" width="20" height="20" fill="#93c5fd"/>
          <rect x="190" y="120" width="20" height="20" fill="#93c5fd"/>
          
          <rect x="70" y="150" width="20" height="20" fill="#93c5fd"/>
          <rect x="190" y="150" width="20" height="20" fill="#93c5fd"/>
          
          <!-- Entrance -->
          <rect x="125" y="150" width="50" height="50" fill="#475569"/>
          <line x1="150" y1="150" x2="150" y2="200" stroke="#f8fafc" stroke-width="2"/>
          
          <!-- Hospital sign -->
          <rect x="90" y="50" width="120" height="30" fill="#ef4444" stroke="#b91c1c" stroke-width="1"/>
          <text x="150" y="70" font-family="Arial" font-size="16" text-anchor="middle" fill="#ffffff" font-weight="bold">HOSPITAL</text>
          
          <!-- Medical cross -->
          <rect x="140" y="15" width="20" height="40" fill="#ef4444"/>
          <rect x="130" y="25" width="40" height="20" fill="#ef4444"/>
          
          <!-- Ambulance -->
          <rect x="50" y="220" width="60" height="25" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
          <rect x="60" y="205" width="40" height="15" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
          <circle cx="65" cy="245" r="7" fill="#000000"/>
          <circle cx="95" cy="245" r="7" fill="#000000"/>
          <rect x="75" y="225" width="15" height="5" fill="#ef4444"/>
          <path d="M127 220 L113 235 L141 235 Z" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
          
          <!-- Ground -->
          <rect x="30" y="250" width="240" height="5" fill="#94a3b8"/>
          
          <!-- Label -->
          <rect x="70" y="255" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="280" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">HOSPITAL</text>
        </svg>`;

      case 'clinic':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Clinic building -->
          <rect x="80" y="80" width="140" height="120" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Entrance -->
          <rect x="125" y="160" width="50" height="40" fill="#475569"/>
          <line x1="150" y1="160" x2="150" y2="200" stroke="#f8fafc" stroke-width="2"/>
          
          <!-- Windows -->
          <rect x="95" y="100" width="25" height="25" fill="#93c5fd"/>
          <rect x="135" y="100" width="25" height="25" fill="#93c5fd"/>
          <rect x="175" y="100" width="25" height="25" fill="#93c5fd"/>
          
          <!-- Clinic sign -->
          <rect x="100" y="60" width="100" height="30" fill="#0ea5e9" stroke="#0369a1" stroke-width="1"/>
          <text x="150" y="80" font-family="Arial" font-size="14" text-anchor="middle" fill="#ffffff" font-weight="bold">MEDICAL CLINIC</text>
          
          <!-- Medical symbol -->
          <circle cx="230" cy="110" r="20" fill="#ffffff" stroke="#0ea5e9" stroke-width="2"/>
          <path d="M230 95 L230 125 M215 110 L245 110" stroke="#0ea5e9" stroke-width="2"/>
          
          <!-- Doctor and patient -->
          <circle cx="85" cy="225" r="15" fill="#94a3b8"/> <!-- Patient head -->
          <rect x="80" y="240" width="10" height="15" fill="#94a3b8"/> <!-- Patient body -->
          
          <circle cx="115" cy="225" r="15" fill="#0ea5e9"/> <!-- Doctor head -->
          <rect x="110" y="240" width="10" height="15" fill="#0ea5e9"/> <!-- Doctor body -->
          <rect x="95" y="245" width="15" height="1" fill="#0ea5e9"/> <!-- Doctor arm -->
          
          <!-- Ground -->
          <rect x="30" y="255" width="240" height="5" fill="#94a3b8"/>
          
          <!-- Label -->
          <rect x="70" y="260" width="160" height="35" fill="#e0f2fe" rx="5"/>
          <text x="150" y="283" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">MEDICAL CLINIC</text>
        </svg>`;

      case 'school':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- School building -->
          <rect x="60" y="90" width="180" height="110" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Roof -->
          <path d="M50 90 L150 40 L250 90 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
          
          <!-- Bell tower -->
          <rect x="135" y="40" width="30" height="30" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          <path d="M135 40 L165 40 L150 25 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
          <circle cx="150" cy="55" r="5" fill="#f59e0b"/> <!-- Bell -->
          
          <!-- Windows -->
          <rect x="80" y="110" width="25" height="25" fill="#93c5fd"/>
          <rect x="130" y="110" width="25" height="25" fill="#93c5fd"/>
          <rect x="180" y="110" width="25" height="25" fill="#93c5fd"/>
          
          <rect x="80" y="150" width="25" height="25" fill="#93c5fd"/>
          <rect x="180" y="150" width="25" height="25" fill="#93c5fd"/>
          
          <!-- Door -->
          <rect x="130" y="150" width="40" height="50" fill="#475569"/>
          <line x1="150" y1="150" x2="150" y2="200" stroke="#f8fafc" stroke-width="2"/>
          
          <!-- Steps -->
          <rect x="120" y="200" width="60" height="5" fill="#94a3b8"/>
          <rect x="125" y="205" width="50" height="5" fill="#94a3b8"/>
          <rect x="130" y="210" width="40" height="5" fill="#94a3b8"/>
          
          <!-- Flag -->
          <line x1="230" y1="40" x2="230" y2="90" stroke="#334155" stroke-width="2"/>
          <rect x="230" y="40" width="30" height="20" fill="#ef4444"/>
          
          <!-- School supplies -->
          <rect x="70" y="225" width="25" height="30" fill="#fde68a" stroke="#ca8a04" stroke-width="1"/> <!-- Book -->
          <rect x="105" y="225" width="15" height="30" fill="#0ea5e9" stroke="#0369a1" stroke-width="1"/> <!-- Pencil -->
          <circle cx="200" cy="235" r="15" fill="#f43f5e" stroke="#be123c" stroke-width="1"/> <!-- Ball -->
          
          <!-- Ground -->
          <rect x="30" y="255" width="240" height="5" fill="#94a3b8"/>
          
          <!-- Label -->
          <rect x="70" y="260" width="160" height="35" fill="#e0f2fe" rx="5"/>
          <text x="150" y="283" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">SCHOOL</text>
        </svg>`;

      case 'library':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Library building -->
          <rect x="50" y="80" width="200" height="130" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Columns -->
          <rect x="70" y="80" width="15" height="130" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
          <rect x="110" y="80" width="15" height="130" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
          <rect x="175" y="80" width="15" height="130" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
          <rect x="215" y="80" width="15" height="130" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
          
          <!-- Steps -->
          <rect x="40" y="210" width="220" height="10" fill="#cbd5e1"/>
          <rect x="45" y="220" width="210" height="10" fill="#cbd5e1"/>
          <rect x="50" y="230" width="200" height="10" fill="#cbd5e1"/>
          
          <!-- Entrance -->
          <rect x="130" y="160" width="40" height="70" fill="#475569"/>
          <line x1="150" y1="160" x2="150" y2="230" stroke="#f8fafc" stroke-width="2"/>
          
          <!-- Roof/Header -->
          <rect x="45" y="65" width="210" height="25" fill="#0f172a" stroke="#020617" stroke-width="1"/>
          <text x="150" y="83" font-family="Arial" font-size="16" text-anchor="middle" fill="#ffffff" font-weight="bold">LIBRARY</text>
          
          <!-- Books -->
          <rect x="70" y="245" width="10" height="30" fill="#ef4444" stroke="#b91c1c" stroke-width="1"/>
          <rect x="80" y="245" width="10" height="30" fill="#84cc16" stroke="#4d7c0f" stroke-width="1"/>
          <rect x="90" y="245" width="10" height="30" fill="#0ea5e9" stroke="#0369a1" stroke-width="1"/>
          <rect x="100" y="245" width="10" height="30" fill="#f59e0b" stroke="#b45309" stroke-width="1"/>
          <rect x="110" y="245" width="10" height="30" fill="#8b5cf6" stroke="#6d28d9" stroke-width="1"/>
          
          <!-- Reading glasses -->
          <circle cx="200" cy="265" r="8" fill="none" stroke="#334155" stroke-width="2"/>
          <circle cx="225" cy="265" r="8" fill="none" stroke="#334155" stroke-width="2"/>
          <line x1="208" y1="265" x2="217" y2="265" stroke="#334155" stroke-width="2"/>
          <line x1="240" y1="265" x2="233" y2="265" stroke="#334155" stroke-width="2"/>
          
          <!-- Label -->
          <rect x="70" y="280" width="160" height="40" fill="#cbd5e1" rx="5" opacity="0.9"/>
          <text x="150" y="305" font-family="Arial" font-size="18" text-anchor="middle" fill="#0f172a">LIBRARY</text>
        </svg>`;

      case 'near':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Two buildings close together -->
          <rect x="100" y="80" width="50" height="120" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          <rect x="170" y="100" width="50" height="100" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Windows and doors -->
          <rect x="115" y="160" width="20" height="40" fill="#475569"/>
          <rect x="110" y="100" width="15" height="15" fill="#93c5fd"/>
          <rect x="130" y="100" width="15" height="15" fill="#93c5fd"/>
          <rect x="110" y="125" width="15" height="15" fill="#93c5fd"/>
          <rect x="130" y="125" width="15" height="15" fill="#93c5fd"/>
          
          <rect x="185" y="170" width="20" height="30" fill="#475569"/>
          <rect x="180" y="115" width="12" height="12" fill="#93c5fd"/>
          <rect x="200" y="115" width="12" height="12" fill="#93c5fd"/>
          <rect x="180" y="135" width="12" height="12" fill="#93c5fd"/>
          <rect x="200" y="135" width="12" height="12" fill="#93c5fd"/>
          
          <!-- Near indicator -->
          <path d="M155 130 L165 130" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
          
          <!-- Ground -->
          <rect x="80" y="200" width="160" height="10" fill="#94a3b8"/>
          
          <!-- Label -->
          <rect x="70" y="220" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="245" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">NEAR</text>
        </svg>`;

      case 'far':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <!-- Two buildings far apart -->
          <rect x="50" y="100" width="50" height="100" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          <rect x="210" y="120" width="50" height="80" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
          
          <!-- Windows and doors -->
          <rect x="65" y="160" width="20" height="40" fill="#475569"/>
          <rect x="60" y="120" width="12" height="12" fill="#93c5fd"/>
          <rect x="80" y="120" width="12" height="12" fill="#93c5fd"/>
          <rect x="60" y="140" width="12" height="12" fill="#93c5fd"/>
          <rect x="80" y="140" width="12" height="12" fill="#93c5fd"/>
          
          <rect x="225" y="170" width="20" height="30" fill="#475569"/>
          <rect x="220" y="130" width="12" height="12" fill="#93c5fd"/>
          <rect x="240" y="130" width="12" height="12" fill="#93c5fd"/>
          <rect x="220" y="150" width="12" height="12" fill="#93c5fd"/>
          <rect x="240" y="150" width="12" height="12" fill="#93c5fd"/>
          
          <!-- Far indicator -->
          <path d="M110 150 L200 150" stroke="#3b82f6" stroke-width="6" stroke-linecap="round" stroke-dasharray="12,8"/>
          
          <!-- Ground -->
          <rect x="40" y="200" width="220" height="10" fill="#94a3b8"/>
          
          <!-- Label -->
          <rect x="70" y="220" width="160" height="40" fill="#e0f2fe" rx="5"/>
          <text x="150" y="245" font-family="Arial" font-size="18" text-anchor="middle" fill="#0c4a6e">FAR</text>
        </svg>`;

      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#f0f9ff"/>
          <text x="150" y="150" font-family="Arial" font-size="24" text-anchor="middle" fill="#1e3a8a">${location.name}</text>
        </svg>`;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-slate-50 overflow-hidden flex items-center justify-center">
        <img 
          src={location.imageUrl.startsWith('http') ? location.imageUrl : 
            `data:image/svg+xml;utf8,${encodeURIComponent(getLocationSvg())}`
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