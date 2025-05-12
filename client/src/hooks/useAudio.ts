import { useEffect, useState, useRef, useCallback } from 'react';
import { Howl } from 'howler';

type OnEndCallback = () => void;

const useAudio = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use a ref to keep track of the Howl instance
  const soundRef = useRef<Howl | null>(null);
  
  // Create or update the Howl instance when src changes
  useEffect(() => {
    if (!src) return;
    
    // Clean up any existing sound
    if (soundRef.current) {
      soundRef.current.unload();
    }
    
    // Create a new Howl instance
    soundRef.current = new Howl({
      src: [src],
      html5: true,
      preload: true,
      onload: () => setIsLoaded(true),
      onend: () => setIsPlaying(false),
      onloaderror: (id, error) => setError(`Failed to load audio: ${error}`),
      onplayerror: (id, error) => setError(`Failed to play audio: ${error}`)
    });
    
    // Cleanup function
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [src]);
  
  const play = useCallback((onEnd?: OnEndCallback) => {
    if (!soundRef.current) return;
    
    // Stop any currently playing sound
    if (isPlaying) {
      soundRef.current.stop();
    }
    
    // Set up onend callback if provided
    if (onEnd) {
      soundRef.current.once('end', onEnd);
    }
    
    // Play the sound
    setIsPlaying(true);
    soundRef.current.play();
  }, [isPlaying]);
  
  const stop = useCallback(() => {
    if (!soundRef.current || !isPlaying) return;
    soundRef.current.stop();
    setIsPlaying(false);
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
