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
import AudioButton from '@/components/AudioButton';

import { 
  bodyParts, 
  symptoms, 
  getPhrasesByCategory,
  BodyPartItem,
  SymptomItem,
  MedicalPhraseItem
} from '../utils/healthVocabulary';

const HealthModule = () => {
  const [location, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('body-parts');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get phrases for different categories
  const emergencyPhrases = getPhrasesByCategory('emergency');
  const doctorPhrases = getPhrasesByCategory('doctor');
  const pharmacyPhrases = getPhrasesByCategory('pharmacy');
  const insurancePhrases = getPhrasesByCategory('insurance');
  
  // Filter items based on search query
  const filteredBodyParts = bodyParts.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSymptoms = symptoms.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredEmergencyPhrases = emergencyPhrases.filter(item => 
    item.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDoctorPhrases = doctorPhrases.filter(item => 
    item.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPharmacyPhrases = pharmacyPhrases.filter(item => 
    item.phrase.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredInsurancePhrases = insurancePhrases.filter(item => 
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
        <h1 className="text-xl font-bold">Health Vocabulary</h1>
      </div>
      
      <main className="flex-1 container max-w-5xl px-4 py-4 md:py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Medical English</h2>
          <p className="text-muted-foreground mb-4">
            Learn important health vocabulary and phrases to communicate effectively in medical situations.
          </p>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search health vocabulary..."
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
        
        <Tabs defaultValue="body-parts" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="body-parts">Body Parts</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="phrases">Medical Phrases</TabsTrigger>
          </TabsList>
          
          {/* Body Parts Tab */}
          <TabsContent value="body-parts" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredBodyParts.map((part) => (
                <BodyPartCard key={part.id} bodyPart={part} />
              ))}
              
              {filteredBodyParts.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">No body parts match your search.</p>
                  <Button variant="link" onClick={clearSearch}>Clear search</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Symptoms Tab */}
          <TabsContent value="symptoms" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredSymptoms.map((symptom) => (
                <SymptomCard key={symptom.id} symptom={symptom} />
              ))}
              
              {filteredSymptoms.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">No symptoms match your search.</p>
                  <Button variant="link" onClick={clearSearch}>Clear search</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Medical Phrases Tab */}
          <TabsContent value="phrases" className="space-y-4">
            {/* Secondary tabs for phrase categories */}
            <Tabs defaultValue="emergency" className="w-full">
              <TabsList className="mb-4 w-full h-auto flex flex-wrap gap-2 justify-start bg-transparent">
                <TabsTrigger value="emergency" className="bg-red-100 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Emergency
                </TabsTrigger>
                <TabsTrigger value="doctor" className="bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Doctor's Office
                </TabsTrigger>
                <TabsTrigger value="pharmacy" className="bg-green-100 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  Pharmacy
                </TabsTrigger>
                <TabsTrigger value="insurance" className="bg-purple-100 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  Insurance
                </TabsTrigger>
              </TabsList>
              
              {/* Emergency phrases */}
              <TabsContent value="emergency">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEmergencyPhrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} color="red" />
                  ))}
                  
                  {filteredEmergencyPhrases.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No emergency phrases match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Doctor phrases */}
              <TabsContent value="doctor">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDoctorPhrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} color="blue" />
                  ))}
                  
                  {filteredDoctorPhrases.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No doctor's office phrases match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Pharmacy phrases */}
              <TabsContent value="pharmacy">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPharmacyPhrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} color="green" />
                  ))}
                  
                  {filteredPharmacyPhrases.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No pharmacy phrases match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Insurance phrases */}
              <TabsContent value="insurance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredInsurancePhrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} color="purple" />
                  ))}
                  
                  {filteredInsurancePhrases.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">No insurance phrases match your search.</p>
                      <Button variant="link" onClick={clearSearch}>Clear search</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation currentPath={location} />
    </div>
  );
};

// Body Part Card Component
const BodyPartCard = ({ bodyPart }: { bodyPart: BodyPartItem }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={bodyPart.imageUrl} 
          alt={bodyPart.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-xl">{bodyPart.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground">{bodyPart.description}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <AudioButton 
          src={bodyPart.audioUrl} 
          size="sm" 
          label="Listen" 
        />
      </CardFooter>
    </Card>
  );
};

// Symptom Card Component
const SymptomCard = ({ symptom }: { symptom: SymptomItem }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={symptom.imageUrl} 
          alt={symptom.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-xl">{symptom.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground">{symptom.description}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <AudioButton 
          src={symptom.audioUrl} 
          size="sm" 
          label="Listen" 
        />
      </CardFooter>
    </Card>
  );
};

// Medical Phrase Card Component
const PhraseCard = ({ phrase, color }: { phrase: MedicalPhraseItem, color: string }) => {
  const getColorClass = () => {
    switch (color) {
      case 'red': return 'border-red-500';
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
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={phrase.imageUrl} 
            alt=""
            className="w-full h-full object-cover" 
          />
        </div>
        <AudioButton 
          src={phrase.audioUrl} 
          size="sm" 
          label="Listen" 
        />
      </CardContent>
    </Card>
  );
};

export default HealthModule;