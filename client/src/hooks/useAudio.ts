import { useState, useCallback, useEffect, useRef } from 'react';

type OnEndCallback = () => void;

// This hook now generates audio directly in the browser using Web Audio API
// instead of relying on external audio files
const useAudio = (src: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true); // Always loaded since we generate audio
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  
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
    else {
      // For words and other identifiers, create a hash-based frequency
      let hash = 0;
      for (let i = 0; i < identifier.length; i++) {
        hash = ((hash << 5) - hash) + identifier.charCodeAt(i);
      }
      return 350 + (Math.abs(hash) % 350); // Range: 350-700Hz
    }
  }, []);
  
  // Ensure we clean up any audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  const play = useCallback((onEnd?: OnEndCallback) => {
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
      oscillator.type = 'sine';
      oscillator.frequency.value = getFrequency(src);
      
      // Set volume
      gainNode.gain.value = 0.5;
      
      // Setup fade out for smoother sound
      const now = context.currentTime;
      gainNode.gain.setValueAtTime(0.5, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      // Start the oscillator
      oscillator.start();
      oscillator.stop(now + 0.5); // Play for 0.5 seconds
      
      oscillatorRef.current = oscillator;
      setIsPlaying(true);
      
      // Handle the end of the tone
      oscillator.onended = () => {
        setIsPlaying(false);
        if (onEnd) onEnd();
      };
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("Failed to play audio");
      setIsPlaying(false);
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
