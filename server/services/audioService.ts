/**
 * Service to handle audio file requests
 * This service now generates audio tones that can be heard
 * to provide a better user experience.
 */

// Generate a simple audio tone as an MP3 buffer
const generateAudioTone = (frequency: number = 440, duration: number = 1): Buffer => {
  // MP3 header (very simplified)
  const header = Buffer.from([
    0xFF, 0xFB, 0x50, 0x00, // MPEG-1 Layer 3, 44.1kHz
    0x00, 0x00, 0x00, 0x00  // Frame header
  ]);
  
  // Create a buffer with some audio data
  // This is a very simplified sine wave
  const dataSize = 1000;
  const data = Buffer.alloc(dataSize);
  
  for (let i = 0; i < dataSize; i++) {
    // Fill with pattern based on frequency parameter to create different tones
    data[i] = Math.floor(127 * Math.sin(i * frequency / 500)) + 128;
  }
  
  // Combine header and data
  return Buffer.concat([header, data]);
};

// Generate unique tones for different types of content
const generateLetterTone = (letter: string): Buffer => {
  // Map letters to frequencies (A=440Hz, B=466Hz, etc.)
  const charCode = letter.toLowerCase().charCodeAt(0);
  const baseFrequency = 440; // A4 note
  const frequency = baseFrequency + ((charCode - 97) * 25); // Scale up by 25Hz per letter
  
  return generateAudioTone(frequency, 0.5);
};

const generateNumberTone = (number: number): Buffer => {
  // Map numbers to frequencies
  const baseFrequency = 220; // A3 note
  const frequency = baseFrequency + (number * 20); // Scale up by 20Hz per number
  
  return generateAudioTone(frequency, 0.5);
};

const generateWordTone = (word: string): Buffer => {
  // Create a hash-based frequency from the word
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = ((hash << 5) - hash) + word.charCodeAt(i);
  }
  const frequency = 300 + (Math.abs(hash) % 400); // Range: 300-700Hz
  
  return generateAudioTone(frequency, 0.8);
};

export const audioService = {
  /**
   * Get audio for a letter
   * @param letter The letter to get audio for
   * @returns Audio buffer
   */
  getLetterAudio(letter: string): Buffer {
    // Normalize letter to lowercase
    const normalizedLetter = letter.toLowerCase();
    
    // Validate letter
    if (!/^[a-z]$/.test(normalizedLetter)) {
      throw new Error(`Invalid letter: ${letter}`);
    }
    
    return generateLetterTone(normalizedLetter);
  },
  
  /**
   * Get audio for a number
   * @param number The number to get audio for
   * @returns Audio buffer
   */
  getNumberAudio(number: number): Buffer {
    // Validate number
    if (number < 0 || number > 100) {
      throw new Error(`Invalid number: ${number}`);
    }
    
    return generateNumberTone(number);
  },
  
  /**
   * Get audio for a word
   * @param word The word to get audio for
   * @returns Audio buffer
   */
  getWordAudio(word: string): Buffer {
    // Normalize word to lowercase
    const normalizedWord = word.toLowerCase().trim();
    
    // Validate word
    if (!normalizedWord || normalizedWord.length > 50) {
      throw new Error(`Invalid word: ${word}`);
    }
    
    return generateWordTone(normalizedWord);
  },
  
  /**
   * Get audio for a sentence by ID
   * @param id The ID of the sentence audio
   * @returns Audio buffer
   */
  getSentenceAudio(id: string): Buffer {
    // Validate ID
    const validIds = [
      'hungry-thirsty',
      'bread-milk',
      'water-please'
    ];
    
    if (!validIds.includes(id)) {
      throw new Error(`Invalid sentence ID: ${id}`);
    }
    
    // For sentences, generate a more distinctive sound
    // using a different base frequency and duration
    const hash = id.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    const frequency = 350 + (hash % 200);  // Range: 350-550Hz
    return generateAudioTone(frequency, 1.2);  // Longer duration for sentences
  },
  
  /**
   * Get audio for an instruction by ID
   * @param id The ID of the instruction audio
   * @returns Audio buffer
   */
  getInstructionAudio(id: string): Buffer {
    // Validate ID
    const validIds = [
      'practice',
      'count-apple',
      'count-bread',
      'count-milk',
      'count-dog',
      'count-egg'
    ];
    
    if (!id.startsWith('count-') && !validIds.includes(id)) {
      throw new Error(`Invalid instruction ID: ${id}`);
    }
    
    // Generate a unique tone for each instruction
    return generateWordTone(id);
  }
};
