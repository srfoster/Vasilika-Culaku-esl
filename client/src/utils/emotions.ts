export interface EmotionItem {
  id: string;
  name: string;
  phrase: string;
  imageUrl: string;
  audioUrl: string;
  emoji: string;
}

// Collection of common emotions with images, phrases and emoji
export const emotions: EmotionItem[] = [
  {
    id: 'happy',
    name: 'Happy',
    phrase: 'I am happy.',
    imageUrl: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/happy',
    emoji: '😀'
  },
  {
    id: 'sad',
    name: 'Sad',
    phrase: 'I am sad.',
    imageUrl: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/sad',
    emoji: '😢'
  },
  {
    id: 'angry',
    name: 'Angry',
    phrase: 'I am angry.',
    imageUrl: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/angry',
    emoji: '😠'
  },
  {
    id: 'tired',
    name: 'Tired',
    phrase: 'I am tired.',
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/tired',
    emoji: '😴'
  },
  {
    id: 'confused',
    name: 'Confused',
    phrase: 'I am confused.',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/confused',
    emoji: '😕'
  },
  {
    id: 'surprised',
    name: 'Surprised',
    phrase: 'I am surprised.',
    imageUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/surprised',
    emoji: '😲'
  },
  {
    id: 'scared',
    name: 'Scared',
    phrase: 'I am scared.',
    imageUrl: 'https://images.unsplash.com/photo-1590333755045-d35233357a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/scared',
    emoji: '😨'
  },
  {
    id: 'hungry',
    name: 'Hungry',
    phrase: 'I am hungry.',
    imageUrl: 'https://images.unsplash.com/photo-1580087128698-990a08028662?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/hungry',
    emoji: '🍽️'
  },
  {
    id: 'thirsty',
    name: 'Thirsty',
    phrase: 'I am thirsty.',
    imageUrl: 'https://images.unsplash.com/photo-1523362289600-a70b4a0e09aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/thirsty',
    emoji: '🥤'
  },
  {
    id: 'sick',
    name: 'Sick',
    phrase: 'I am sick.',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/sick',
    emoji: '🤒'
  },
  {
    id: 'hot',
    name: 'Hot',
    phrase: 'I am hot.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/hot',
    emoji: '🥵'
  },
  {
    id: 'cold',
    name: 'Cold',
    phrase: 'I am cold.',
    imageUrl: 'https://images.unsplash.com/photo-1635212738436-636be55a2aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/cold',
    emoji: '🥶'
  },
  {
    id: 'stressed',
    name: 'Stressed',
    phrase: 'I am stressed.',
    imageUrl: 'https://images.unsplash.com/photo-1627134345186-efef73836b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/stressed',
    emoji: '😰'
  },
  {
    id: 'bored',
    name: 'Bored',
    phrase: 'I am bored.',
    imageUrl: 'https://images.unsplash.com/photo-1555774805-1fa3437c0a3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/bored',
    emoji: '😒'
  },
  {
    id: 'excited',
    name: 'Excited',
    phrase: 'I am excited.',
    imageUrl: 'https://images.unsplash.com/photo-1604430456280-9d946990d1ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/excited',
    emoji: '🤩'
  }
];

// Helper functions
export const getEmotionById = (id: string): EmotionItem | undefined => {
  return emotions.find(item => item.id === id);
};