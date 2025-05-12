export interface FoodItem {
  id: string;
  word: string;
  imageUrl: string;
  audioUrl: string;
}

export const foodVocabulary: FoodItem[] = [
  {
    id: 'food1',
    word: 'Bread',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/bread'
  },
  {
    id: 'food2',
    word: 'Milk',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/milk'
  },
  {
    id: 'food3',
    word: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/apple'
  },
  {
    id: 'food4',
    word: 'Water',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/water'
  },
  {
    id: 'food5',
    word: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/rice'
  },
  {
    id: 'food6',
    word: 'Egg',
    imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/egg'
  },
  {
    id: 'food7',
    word: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/fish'
  },
  {
    id: 'food8',
    word: 'Orange',
    imageUrl: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    audioUrl: '/api/audio/word/orange'
  }
];

export interface ListeningExercise {
  id: string;
  imageUrl: string;
  audioUrl: string;
  correctSentence: string;
  options: string[];
}

export const listeningExercises: ListeningExercise[] = [
  {
    id: 'listening1',
    imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    audioUrl: '/api/audio/sentence/hungry-thirsty',
    correctSentence: 'I am hungry and thirsty.',
    options: [
      'I would like some bread and milk.',
      'I would like some water, please.',
      'Can I have an apple?',
      'I am hungry and thirsty.'
    ]
  },
  {
    id: 'listening2',
    imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    audioUrl: '/api/audio/sentence/bread-milk',
    correctSentence: 'I would like some bread and milk.',
    options: [
      'I would like some bread and milk.',
      'I want to buy some fruit.',
      'Can I have some water?',
      'Where is the food store?'
    ]
  },
  {
    id: 'listening3',
    imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    audioUrl: '/api/audio/sentence/water-please',
    correctSentence: 'I would like some water, please.',
    options: [
      'I am feeling sick.',
      'I would like some water, please.',
      'How much does it cost?',
      'Where is the bathroom?'
    ]
  }
];
