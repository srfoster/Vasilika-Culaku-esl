export interface DirectionTerm {
  id: string;
  term: string;
  translation?: string;
  imageUrl: string;
  example: string;
  category: 'basic' | 'location' | 'transportation' | 'question';
}

export interface LocationType {
  id: string;
  name: string;
  imageUrl: string;
  examples: string[];
}

export interface DirectionPhrase {
  id: string;
  phrase: string;
  translation?: string;
  imageUrl: string;
  category: 'asking' | 'giving' | 'public-transit';
}

// Direction terms vocabulary
export const directionTerms: DirectionTerm[] = [
  // Basic Direction Terms
  {
    id: 'left',
    term: 'Left',
    imageUrl: '/images/directions/left.svg',
    example: 'Turn left at the stop sign.',
    category: 'basic'
  },
  {
    id: 'right',
    term: 'Right',
    imageUrl: '/images/directions/right.svg',
    example: 'Turn right at the traffic light.',
    category: 'basic'
  },
  {
    id: 'straight',
    term: 'Straight',
    imageUrl: '/images/directions/straight.svg',
    example: 'Go straight for two blocks.',
    category: 'basic'
  },
  {
    id: 'back',
    term: 'Back',
    imageUrl: '/images/directions/back.svg',
    example: 'Go back the way you came.',
    category: 'basic'
  },
  {
    id: 'north',
    term: 'North',
    imageUrl: '/images/directions/north.svg',
    example: 'Drive north on Main Street.',
    category: 'basic'
  },
  {
    id: 'south',
    term: 'South',
    imageUrl: '/images/directions/south.svg',
    example: 'The park is south of the library.',
    category: 'basic'
  },
  {
    id: 'east',
    term: 'East',
    imageUrl: '/images/directions/east.svg',
    example: 'The hospital is east of downtown.',
    category: 'basic'
  },
  {
    id: 'west',
    term: 'West',
    imageUrl: '/images/directions/west.svg',
    example: 'The mall is west of the highway.',
    category: 'basic'
  },
  
  // Location Terms
  {
    id: 'near',
    term: 'Near',
    imageUrl: '/images/directions/near.svg',
    example: 'The pharmacy is near the grocery store.',
    category: 'location'
  },
  {
    id: 'far',
    term: 'Far',
    imageUrl: '/images/directions/far.svg',
    example: 'The airport is far from downtown.',
    category: 'location'
  },
  {
    id: 'next-to',
    term: 'Next to',
    imageUrl: '/images/directions/next-to.svg',
    example: 'The bank is next to the restaurant.',
    category: 'location'
  },
  {
    id: 'across-from',
    term: 'Across from',
    imageUrl: '/images/directions/across-from.svg',
    example: 'The school is across from the park.',
    category: 'location'
  },
  {
    id: 'between',
    term: 'Between',
    imageUrl: '/images/directions/between.svg',
    example: 'The post office is between the bank and the library.',
    category: 'location'
  },
  {
    id: 'corner',
    term: 'Corner',
    imageUrl: '/images/directions/corner.svg',
    example: 'Meet me at the corner of Main Street and First Avenue.',
    category: 'location'
  },
  
  // Transportation Terms
  {
    id: 'bus',
    term: 'Bus',
    imageUrl: '/images/directions/bus.svg',
    example: 'Take the bus number 7 to downtown.',
    category: 'transportation'
  },
  {
    id: 'train',
    term: 'Train',
    imageUrl: '/images/directions/train.svg',
    example: 'The train station is two blocks away.',
    category: 'transportation'
  },
  {
    id: 'subway',
    term: 'Subway',
    imageUrl: '/images/directions/subway.svg',
    example: 'Take the subway to Washington Station.',
    category: 'transportation'
  },
  {
    id: 'taxi',
    term: 'Taxi',
    imageUrl: '/images/directions/taxi.svg',
    example: 'You can get a taxi at the hotel entrance.',
    category: 'transportation'
  },
  {
    id: 'car',
    term: 'Car',
    imageUrl: '/images/directions/car.svg',
    example: 'Do you have a car or do you need a ride?',
    category: 'transportation'
  },
  {
    id: 'walk',
    term: 'Walk',
    imageUrl: '/images/directions/walk.svg',
    example: 'You can walk to the park from here.',
    category: 'transportation'
  },
  
  // Question Words
  {
    id: 'where',
    term: 'Where',
    imageUrl: '/images/directions/question.svg',
    example: 'Where is the nearest gas station?',
    category: 'question'
  },
  {
    id: 'how-far',
    term: 'How far',
    imageUrl: '/images/directions/distance.svg',
    example: 'How far is the hospital from here?',
    category: 'question'
  },
  {
    id: 'how-long',
    term: 'How long',
    imageUrl: '/images/directions/time.svg',
    example: 'How long does it take to walk to the library?',
    category: 'question'
  }
];

// Common location types
export const locationTypes: LocationType[] = [
  {
    id: 'grocery',
    name: 'Grocery Store',
    imageUrl: '/images/locations/grocery.svg',
    examples: ['Safeway', 'Kroger', 'Albertsons', 'Walmart']
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    imageUrl: '/images/locations/pharmacy.svg',
    examples: ['Walgreens', 'CVS', 'Rite Aid']
  },
  {
    id: 'hospital',
    name: 'Hospital',
    imageUrl: '/images/locations/hospital.svg',
    examples: ['St. Mary\'s Hospital', 'Memorial Hospital', 'Community Hospital']
  },
  {
    id: 'clinic',
    name: 'Medical Clinic',
    imageUrl: '/images/locations/clinic.svg',
    examples: ['Urgent Care', 'Family Clinic', 'Community Health Center']
  },
  {
    id: 'school',
    name: 'School',
    imageUrl: '/images/locations/school.svg',
    examples: ['Elementary School', 'Middle School', 'High School']
  },
  {
    id: 'library',
    name: 'Library',
    imageUrl: '/images/locations/library.svg',
    examples: ['Public Library', 'Community Library']
  },
  {
    id: 'post-office',
    name: 'Post Office',
    imageUrl: '/images/locations/post-office.svg',
    examples: ['USPS', 'Postal Service']
  },
  {
    id: 'bank',
    name: 'Bank',
    imageUrl: '/images/locations/bank.svg',
    examples: ['Chase', 'Bank of America', 'Wells Fargo']
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    imageUrl: '/images/locations/restaurant.svg',
    examples: ['Fast food', 'Diner', 'Café']
  },
  {
    id: 'park',
    name: 'Park',
    imageUrl: '/images/locations/park.svg',
    examples: ['City Park', 'Playground', 'State Park']
  },
  {
    id: 'government',
    name: 'Government Office',
    imageUrl: '/images/locations/government.svg',
    examples: ['City Hall', 'DMV', 'Social Security Office']
  },
  {
    id: 'transit',
    name: 'Transit Station',
    imageUrl: '/images/locations/transit.svg',
    examples: ['Bus Station', 'Train Station', 'Subway Station']
  }
];

// Common direction phrases
export const directionPhrases: DirectionPhrase[] = [
  // Asking for directions
  {
    id: 'where-is',
    phrase: 'Where is the nearest ___?',
    imageUrl: '/images/phrases/where-is.svg',
    category: 'asking'
  },
  {
    id: 'how-do-i',
    phrase: 'How do I get to ___?',
    imageUrl: '/images/phrases/how-get-to.svg',
    category: 'asking'
  },
  {
    id: 'is-it-far',
    phrase: 'Is it far from here?',
    imageUrl: '/images/phrases/is-far.svg',
    category: 'asking'
  },
  {
    id: 'show-map',
    phrase: 'Can you show me on the map?',
    imageUrl: '/images/phrases/show-map.svg',
    category: 'asking'
  },
  {
    id: 'which-way',
    phrase: 'Which way is ___?',
    imageUrl: '/images/phrases/which-way.svg',
    category: 'asking'
  },
  {
    id: 'excuse-me',
    phrase: 'Excuse me, I\'m lost.',
    imageUrl: '/images/phrases/lost.svg',
    category: 'asking'
  },
  
  // Giving directions
  {
    id: 'go-straight',
    phrase: 'Go straight for ___ blocks.',
    imageUrl: '/images/phrases/go-straight.svg',
    category: 'giving'
  },
  {
    id: 'turn-left',
    phrase: 'Turn left at the ___.',
    imageUrl: '/images/phrases/turn-left.svg',
    category: 'giving'
  },
  {
    id: 'turn-right',
    phrase: 'Turn right at the ___.',
    imageUrl: '/images/phrases/turn-right.svg',
    category: 'giving'
  },
  {
    id: 'its-on-the',
    phrase: 'It\'s on the left/right side.',
    imageUrl: '/images/phrases/on-side.svg',
    category: 'giving'
  },
  {
    id: 'its-next-to',
    phrase: 'It\'s next to the ___.',
    imageUrl: '/images/phrases/next-to.svg',
    category: 'giving'
  },
  {
    id: 'walk-about',
    phrase: 'Walk about ___ minutes.',
    imageUrl: '/images/phrases/walk-time.svg',
    category: 'giving'
  },
  
  // Public transit
  {
    id: 'which-bus',
    phrase: 'Which bus goes to ___?',
    imageUrl: '/images/phrases/which-bus.svg',
    category: 'public-transit'
  },
  {
    id: 'where-stop',
    phrase: 'Where is the bus stop?',
    imageUrl: '/images/phrases/bus-stop.svg',
    category: 'public-transit'
  },
  {
    id: 'how-much',
    phrase: 'How much is the fare?',
    imageUrl: '/images/phrases/fare.svg',
    category: 'public-transit'
  },
  {
    id: 'transfer',
    phrase: 'Do I need to transfer?',
    imageUrl: '/images/phrases/transfer.svg',
    category: 'public-transit'
  },
  {
    id: 'next-stop',
    phrase: 'Is this the stop for ___?',
    imageUrl: '/images/phrases/next-stop.svg',
    category: 'public-transit'
  },
  {
    id: 'schedule',
    phrase: 'What time is the next bus/train?',
    imageUrl: '/images/phrases/schedule.svg',
    category: 'public-transit'
  }
];

// Helper functions
export const getDirectionTermsByCategory = (category: string): DirectionTerm[] => {
  return directionTerms.filter(term => term.category === category);
};

export const getDirectionTerm = (id: string): DirectionTerm | undefined => {
  return directionTerms.find(term => term.id === id);
};

export const getLocation = (id: string): LocationType | undefined => {
  return locationTypes.find(location => location.id === id);
};

export const getPhrasesByCategory = (category: string): DirectionPhrase[] => {
  return directionPhrases.filter(phrase => phrase.category === category);
};

export const getPhrase = (id: string): DirectionPhrase | undefined => {
  return directionPhrases.find(phrase => phrase.id === id);
};