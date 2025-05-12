import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AlphabetModule from "@/pages/AlphabetModule";
import NumbersModule from "@/pages/NumbersModule";
import FoodVocabularyModule from "@/pages/FoodVocabularyModule";
import HealthModule from "@/pages/HealthModule";
import DirectionsModule from "@/pages/DirectionsModule";
import EverydayObjectsModule from "@/pages/EverydayObjectsModule";
import CommunityResourcesModule from "@/pages/CommunityResourcesModule";
import SurvivalPhrasesModule from "@/pages/SurvivalPhrasesModule";
import Practice from "@/pages/Practice";
import Progress from "@/pages/Progress";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

function Router() {
  const [location] = useLocation();
  
  // Track if we're on the home page to adjust header styling
  const isHomePage = location === "/";
  
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 pb-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/alphabet" component={AlphabetModule} />
          <Route path="/numbers" component={NumbersModule} />
          <Route path="/food" component={FoodVocabularyModule} />
          <Route path="/health" component={HealthModule} />
          <Route path="/directions" component={DirectionsModule} />
          <Route path="/objects" component={EverydayObjectsModule} />
          <Route path="/resources" component={CommunityResourcesModule} />
          <Route path="/phrases" component={SurvivalPhrasesModule} />
          <Route path="/practice" component={Practice} />
          <Route path="/progress" component={Progress} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <BottomNavigation currentPath={location} />
    </div>
  );
}

function App() {
  // Track if the app has initialized
  const [initialized, setInitialized] = useState(false);
  
  // Simulate an initialization process (loading user data, etc.)
  useEffect(() => {
    // Check if the user exists in the backend or create a new user
    const initializeUser = async () => {
      try {
        // Attempt to get current user, if not found create a new one
        const response = await fetch('/api/users/current', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          // Create a default user
          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: `user_${Math.floor(Math.random() * 10000)}`,
              displayName: 'Student',
            }),
            credentials: 'include',
          });
        }
        
        setInitialized(true);
      } catch (error) {
        console.error("Failed to initialize user:", error);
        // Still mark as initialized so the app can be used
        setInitialized(true);
      }
    };
    
    initializeUser();
  }, []);
  
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-4">LearnNow</div>
          <div className="animate-pulse text-lg">Loading...</div>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
