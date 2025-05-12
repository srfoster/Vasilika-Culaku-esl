import { useState, useCallback, useEffect, useRef } from 'react';

type OnEndCallback = () => void;

// This hook generates audio tones directly in the browser using Web Audio API
// and falls back to HTML audio if Web Audio API isn't available
const useAudio = (src: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true); // Always loaded since we generate audio
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  
  // Generate a unique frequency based on the src string
  const getFrequency = useCallback((input: string): number => {
    // Extract identifier from the URL
    const parts = input.split('/');
    const identifier = parts[parts.length - 1]; // Get the last part of the URL
    
    if (input.includes('/letter/')) {
      // For letters, map to a musical scale (A=440Hz, etc.)
      const letter = identifier.toLowerCase();
      const charCode = letter.charCodeAt(0);
      const baseFrequency = 440; // A4 note
      return baseFrequency + ((charCode - 97) * 25); // 25 Hz apart
    } 
    else if (input.includes('/number/')) {
      // For numbers, create a scale based on the number
      const number = parseInt(identifier, 10) || 1;
      return 300 + (number * 20); // Start at 300Hz, increase by 20Hz per number
    } 
    else if (input.includes('/sentence/')) {
      // For sentences, create a more complex chord-like tone
      
      // Create a multi-tone composition representing a sentence
      // We'll use a hash of the identifier to seed the frequency calculation
      let hash = 0;
      for (let i = 0; i < identifier.length; i++) {
        hash = ((hash << 5) - hash) + identifier.charCodeAt(i);
      }
      hash = Math.abs(hash);
      
      // Base tone in a musical scale (C major)
      const baseFreq = 262; // C4
      
      // Use the hash to determine which chord pattern to use
      // This creates more melodious tones for sentences
      const chordPatterns = [
        [1, 1.25, 1.5],    // Major chord (do-mi-sol)
        [1, 1.2, 1.5],     // Minor chord
        [1, 1.25, 1.6],    // Augmented chord
        [1, 1.2, 1.4]      // Diminished chord
      ];
      
      // Pick a chord pattern based on the hash
      const patternIndex = hash % chordPatterns.length;
      const pattern = chordPatterns[patternIndex];
      
      // Return the base frequency (other tones will be generated in the Web Audio part)
      return baseFreq * pattern[0];
    }
    else if (input.includes('/word/')) {
      // For specific words like objects and food, create more distinct tones
      // Create different tone signatures based on word categories
      if (identifier === 'rice' || identifier === 'bread' || identifier === 'egg' || 
          identifier === 'milk' || identifier === 'water' || identifier === 'fish' ||
          identifier === 'apple' || identifier === 'orange') {
        // Food items get a bright, clear tone (C major scale)
        const foodBaseFreq = 440; // A4 note
        let number = 0;
        for (let i = 0; i < identifier.length; i++) {
          number += identifier.charCodeAt(i);
        }
        // Create a pleasing musical tone based on common scale frequencies
        const tones = [440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880];
        return tones[number % tones.length];
      } else {
        // Other objects get a slightly different tone
        let hash = 0;
        for (let i = 0; i < identifier.length; i++) {
          hash = ((hash << 5) - hash) + identifier.charCodeAt(i);
        }
        // Create a more musical tone for words
        const baseFreq = 330; // E4 note - pleasant sound
        return baseFreq + (Math.abs(hash) % 300); // Range: 330-630Hz
      }
    }
    else {
      // For any other identifiers, create a hash-based frequency
      let hash = 0;
      for (let i = 0; i < identifier.length; i++) {
        hash = ((hash << 5) - hash) + identifier.charCodeAt(i);
      }
      return 350 + (Math.abs(hash) % 350); // Range: 350-700Hz
    }
  }, []);
  
  // Ensure we clean up any audio context or elements on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = '';
      }
    };
  }, []);
  
  // Try to initialize an audio element for fallback if needed
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioElementRef.current) {
      audioElementRef.current = new Audio();
    }
  }, []);
  
  // Play using Web Audio API with fallback to HTML Audio element
  const play = useCallback((onEnd?: OnEndCallback) => {
    // First try using Web Audio API
    const tryWebAudioAPI = () => {
      try {
        // Stop any currently playing audio
        if (isPlaying && oscillatorRef.current) {
          oscillatorRef.current.stop();
        }
        
        // Create audio context if it doesn't exist
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const context = audioContextRef.current;
        
        // Create oscillator (tone generator)
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        // Connect the oscillator to the gain node and then to the output
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        // Configure the oscillator
        // Different wave types for different sounds
        if (src.includes('/word/')) {
          // Words sound better with sine waves (smooth)
          oscillator.type = 'sine';
        } else if (src.includes('/letter/')) {
          // Letters sound better with triangle waves (bright but not harsh)
          oscillator.type = 'triangle';
        } else if (src.includes('/sentence/')) {
          // Sentences get a more complex waveform
          oscillator.type = 'sine';
          
          // For sentences, we'll add a second oscillator for a richer sound
          // The identifier is in the URL
          const parts = src.split('/');
          const identifier = parts[parts.length - 1];
          
          let hash = 0;
          for (let i = 0; i < identifier.length; i++) {
            hash = ((hash << 5) - hash) + identifier.charCodeAt(i);
          }
          hash = Math.abs(hash);
          
          // Create a second oscillator for a chord effect with sentences
          const osc2 = context.createOscillator();
          osc2.connect(gainNode);
          osc2.type = 'triangle';
          
          // Derive a harmony note from the base frequency
          const baseFreq = getFrequency(src);
          const chordPatterns = [
            [1, 1.25, 1.5],    // Major chord (do-mi-sol)
            [1, 1.2, 1.5],     // Minor chord
            [1, 1.25, 1.6],    // Augmented chord
            [1, 1.2, 1.4]      // Diminished chord
          ];
          
          const patternIndex = hash % chordPatterns.length;
          const pattern = chordPatterns[patternIndex];
          
          // Set the frequency to a harmony note
          osc2.frequency.value = baseFreq * pattern[1];
          
          // Start and stop with the main oscillator
          const now = context.currentTime;
          osc2.start();
          osc2.stop(now + 1.2);
        } else if (src.includes('/number/')) {
          // Numbers sound better with sawtooth waves (distinctive)
          oscillator.type = 'sawtooth';
        } else {
          // Default to sine for anything else
          oscillator.type = 'sine';
        }
        
        oscillator.frequency.value = getFrequency(src);
        
        // Set volume
        gainNode.gain.value = 0.5;
        
        // Setup fade in and out for smoother sound
        const now = context.currentTime;
        const duration = 1.2; // Longer duration for better audibility
        
        // Fade in
        gainNode.gain.setValueAtTime(0.0, now);
        gainNode.gain.linearRampToValueAtTime(0.7, now + 0.1);
        
        // Hold
        gainNode.gain.setValueAtTime(0.7, now + 0.1);
        
        // Fade out
        gainNode.gain.linearRampToValueAtTime(0.0, now + duration);
        
        // Start the oscillator
        oscillator.start();
        oscillator.stop(now + duration); // Play for longer duration
        
        oscillatorRef.current = oscillator;
        setIsPlaying(true);
        
        // Handle the end of the tone
        oscillator.onended = () => {
          setIsPlaying(false);
          if (onEnd) onEnd();
        };
        
        return true; // Success
      } catch (err) {
        console.warn("Web Audio API failed, trying fallback:", err);
        return false; // Web Audio API failed
      }
    };
    
    // Fallback to HTML Audio element
    const tryHtmlAudio = () => {
      try {
        // Create an audio element if it doesn't exist
        if (!audioElementRef.current) {
          audioElementRef.current = new Audio();
        }
        
        const audio = audioElementRef.current;
        audio.src = src;
        
        // Set up event handlers
        audio.onended = () => {
          setIsPlaying(false);
          if (onEnd) onEnd();
        };
        
        audio.onerror = () => {
          console.error("HTML Audio element failed to load");
          setError("Failed to play audio");
          setIsPlaying(false);
          if (onEnd) onEnd();
        };
        
        // Try to play the audio
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("HTML Audio play failed:", error);
              
              // If both methods fail, use timeout to simulate audio completion
              setTimeout(() => {
                setIsPlaying(false);
                if (onEnd) onEnd();
              }, 1000);
            });
        }
        
        return true; // Attempted
      } catch (err) {
        console.error("Both audio methods failed:", err);
        
        // If both methods fail, use timeout to simulate audio completion
        setTimeout(() => {
          setIsPlaying(false);
          if (onEnd) onEnd();
        }, 1000);
        
        return false;
      }
    };
    
    // Try Web Audio API first, then fallback methods
    if (!tryWebAudioAPI()) {
      tryHtmlAudio();
    }
  }, [isPlaying, src, getFrequency]);
  
  const stop = useCallback(() => {
    if (oscillatorRef.current && isPlaying) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {
        // Ignore errors during stop - oscillator might have already stopped
      }
      oscillatorRef.current = null;
      setIsPlaying(false);
    }
  }, [isPlaying]);
  
  return {
    play,
    stop,
    isLoaded,
    isPlaying,
    error
  };
};

export default useAudio;
