export interface BodyPartItem {
  id: string;
  name: string;
  imageUrl: string;
  audioUrl: string;
  description: string;
}

export interface SymptomItem {
  id: string;
  name: string;
  imageUrl: string;
  audioUrl: string;
  description: string;
}

export interface MedicalPhraseItem {
  id: string;
  phrase: string;
  translation?: string;
  imageUrl: string;
  audioUrl: string;
  category: 'emergency' | 'doctor' | 'pharmacy' | 'insurance';
}

// Body parts vocabulary
export const bodyParts: BodyPartItem[] = [
  {
    id: 'head',
    name: 'Head',
    imageUrl: 'https://images.unsplash.com/photo-1541710430735-5fca14c95b00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/head',
    description: 'The top part of the human body containing the brain, eyes, ears, nose, and mouth.'
  },
  {
    id: 'eye',
    name: 'Eye',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/eye',
    description: 'The organ of sight that allows you to see.'
  },
  {
    id: 'ear',
    name: 'Ear',
    imageUrl: 'https://images.unsplash.com/photo-1589137867726-caa2df3a35a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/ear',
    description: 'The organ of hearing that allows you to hear sounds.'
  },
  {
    id: 'nose',
    name: 'Nose',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/nose',
    description: 'The part of the face used for smelling and breathing.'
  },
  {
    id: 'mouth',
    name: 'Mouth',
    imageUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/mouth',
    description: 'The opening in the face used for eating, speaking, and breathing.'
  },
  {
    id: 'tooth',
    name: 'Tooth / Teeth',
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/tooth',
    description: 'Hard white structures in the mouth used for biting and chewing food.'
  },
  {
    id: 'throat',
    name: 'Throat',
    imageUrl: 'https://images.unsplash.com/photo-1626202373152-8913878973e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/throat',
    description: 'The passage at the back of the mouth that leads to the stomach and lungs.'
  },
  {
    id: 'neck',
    name: 'Neck',
    imageUrl: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/neck',
    description: 'The part of the body connecting the head to the shoulders.'
  },
  {
    id: 'shoulder',
    name: 'Shoulder',
    imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/shoulder',
    description: 'The joint connecting the arm to the body.'
  },
  {
    id: 'arm',
    name: 'Arm',
    imageUrl: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/arm',
    description: 'The upper limb extending from the shoulder to the hand.'
  },
  {
    id: 'elbow',
    name: 'Elbow',
    imageUrl: 'https://images.unsplash.com/photo-1590330297db-effec0d9fc54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/elbow',
    description: 'The joint in the middle of the arm where it bends.'
  },
  {
    id: 'hand',
    name: 'Hand',
    imageUrl: 'https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/hand',
    description: 'The part at the end of the arm with fingers used for grasping and holding.'
  },
  {
    id: 'finger',
    name: 'Finger',
    imageUrl: 'https://images.unsplash.com/photo-1592845833178-888cde648dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/finger',
    description: 'One of the five digits on each hand.'
  },
  {
    id: 'chest',
    name: 'Chest',
    imageUrl: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/chest',
    description: 'The front part of the torso between the neck and the abdomen.'
  },
  {
    id: 'stomach',
    name: 'Stomach',
    imageUrl: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/stomach',
    description: 'The front part of the body below the chest and above the waist.'
  },
  {
    id: 'back',
    name: 'Back',
    imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/back',
    description: 'The rear part of the human body from the shoulders to the hips.'
  },
  {
    id: 'leg',
    name: 'Leg',
    imageUrl: 'https://images.unsplash.com/photo-1562740041-eb41c325ed83?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/leg',
    description: 'One of the limbs used for walking and standing.'
  },
  {
    id: 'knee',
    name: 'Knee',
    imageUrl: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/knee',
    description: 'The joint in the middle of the leg where it bends.'
  },
  {
    id: 'foot',
    name: 'Foot / Feet',
    imageUrl: 'https://images.unsplash.com/photo-1508387027939-27cbbe9a33da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/foot',
    description: 'The part at the end of the leg used for standing and walking.'
  }
];

// Common symptoms vocabulary
export const symptoms: SymptomItem[] = [
  {
    id: 'fever',
    name: 'Fever',
    imageUrl: 'https://images.unsplash.com/photo-1584555613483-5a9556eacf65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/fever',
    description: 'High body temperature, feeling hot.'
  },
  {
    id: 'cough',
    name: 'Cough',
    imageUrl: 'https://images.unsplash.com/photo-1584555685355-b1eed6f22391?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/cough',
    description: 'Sudden, noisy expulsion of air from the lungs.'
  },
  {
    id: 'sore-throat',
    name: 'Sore Throat',
    imageUrl: 'https://images.unsplash.com/photo-1626202374433-2c186091a2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/sore-throat',
    description: 'Pain, scratchiness or irritation of the throat that worsens when swallowing.'
  },
  {
    id: 'headache',
    name: 'Headache',
    imageUrl: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/headache',
    description: 'Pain in the head or upper neck.'
  },
  {
    id: 'stomachache',
    name: 'Stomachache',
    imageUrl: 'https://images.unsplash.com/photo-1616091238212-aca6808e3cf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/stomachache',
    description: 'Pain in the abdomen or stomach area.'
  },
  {
    id: 'dizziness',
    name: 'Dizziness',
    imageUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/dizziness',
    description: 'Feeling lightheaded, unsteady, or like the room is spinning.'
  },
  {
    id: 'nausea',
    name: 'Nausea',
    imageUrl: 'https://images.unsplash.com/photo-1548113408-603eedae6d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/nausea',
    description: 'Feeling the urge to vomit or feeling sick to your stomach.'
  },
  {
    id: 'rash',
    name: 'Rash',
    imageUrl: 'https://images.unsplash.com/photo-1603574335737-5fff435467ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/rash',
    description: 'Temporary eruption or discoloration of the skin.'
  },
  {
    id: 'pain',
    name: 'Pain',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/pain',
    description: 'Physical suffering or discomfort caused by illness or injury.'
  },
  {
    id: 'tired',
    name: 'Tired / Fatigue',
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/tired',
    description: 'Feeling a lack of energy, exhausted, or weary.'
  }
];

// Medical and emergency phrases
export const medicalPhrases: MedicalPhraseItem[] = [
  // Emergency phrases
  {
    id: 'need-doctor',
    phrase: 'I need a doctor.',
    imageUrl: 'https://images.unsplash.com/photo-1612531385446-f7e6d131e1d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/need-doctor',
    category: 'emergency'
  },
  {
    id: 'emergency',
    phrase: 'This is an emergency!',
    imageUrl: 'https://images.unsplash.com/photo-1590615368647-ce699c0cb182?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/emergency',
    category: 'emergency'
  },
  {
    id: 'call-ambulance',
    phrase: 'Please call an ambulance.',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/call-ambulance',
    category: 'emergency'
  },
  {
    id: 'allergic',
    phrase: 'I am allergic to...',
    imageUrl: 'https://images.unsplash.com/photo-1625670624153-ad5e95b3d921?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/allergic',
    category: 'emergency'
  },
  
  // Doctor's office phrases
  {
    id: 'appointment',
    phrase: 'I have an appointment.',
    imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/appointment',
    category: 'doctor'
  },
  {
    id: 'feel-sick',
    phrase: 'I feel sick.',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/feel-sick',
    category: 'doctor'
  },
  {
    id: 'symptoms',
    phrase: 'My symptoms are...',
    imageUrl: 'https://images.unsplash.com/photo-1584553347754-60f7c2c7983f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/symptoms',
    category: 'doctor'
  },
  {
    id: 'how-long',
    phrase: 'How long will the treatment take?',
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/how-long',
    category: 'doctor'
  },
  
  // Pharmacy phrases
  {
    id: 'prescription',
    phrase: 'I need to fill a prescription.',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b92fbbc8421?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/prescription',
    category: 'pharmacy'
  },
  {
    id: 'how-take',
    phrase: 'How should I take this medicine?',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/how-take',
    category: 'pharmacy'
  },
  {
    id: 'side-effects',
    phrase: 'What are the side effects?',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-1e332b55e84f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/side-effects',
    category: 'pharmacy'
  },
  {
    id: 'over-counter',
    phrase: 'I need something for...',
    imageUrl: 'https://images.unsplash.com/photo-1562243061-204550d8a2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/over-counter',
    category: 'pharmacy'
  },
  
  // Insurance phrases
  {
    id: 'insurance-card',
    phrase: 'Here is my insurance card.',
    imageUrl: 'https://images.unsplash.com/photo-1598816983144-d0d0dc9deab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/insurance-card',
    category: 'insurance'
  },
  {
    id: 'covered',
    phrase: 'Is this covered by insurance?',
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/covered',
    category: 'insurance'
  },
  {
    id: 'cost',
    phrase: 'How much will this cost?',
    imageUrl: 'https://images.unsplash.com/photo-1580769446392-63c9cb1b31c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/cost',
    category: 'insurance'
  },
  {
    id: 'no-insurance',
    phrase: 'I don\'t have insurance.',
    imageUrl: 'https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/no-insurance',
    category: 'insurance'
  }
];

// Helper functions
export const getBodyPartById = (id: string): BodyPartItem | undefined => {
  return bodyParts.find(item => item.id === id);
};

export const getSymptomById = (id: string): SymptomItem | undefined => {
  return symptoms.find(item => item.id === id);
};

export const getPhrasesByCategory = (category: string): MedicalPhraseItem[] => {
  return medicalPhrases.filter(item => item.category === category);
};

export const getPhraseById = (id: string): MedicalPhraseItem | undefined => {
  return medicalPhrases.find(item => item.id === id);
};