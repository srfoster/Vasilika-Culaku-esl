export interface PhraseItem {
  id: string;
  phrase: string;
  translation?: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  category: 'greetings' | 'emergencies' | 'shopping' | 'healthcare' | 'transportation' | 'work';
}

export interface PhraseCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
}

// Categories of survival phrases
export const phraseCategories: PhraseCategory[] = [
  {
    id: 'greetings',
    name: 'Greetings & Introductions',
    description: 'Common phrases for meeting people and introducing yourself',
    imageUrl: 'https://images.unsplash.com/photo-1574684113136-55c8dd11853a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#3b82f6'
  },
  {
    id: 'emergencies',
    name: 'Emergency Phrases',
    description: 'Important phrases to use in emergency situations',
    imageUrl: 'https://images.unsplash.com/photo-1521776943084-9a3512bd6311?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#ef4444'
  },
  {
    id: 'shopping',
    name: 'Shopping & Money',
    description: 'Useful phrases for shopping and handling money',
    imageUrl: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#22c55e'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Phrases for doctor visits and health concerns',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#a855f7'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Phrases for using buses, asking for directions, and getting around',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#f59e0b'
  },
  {
    id: 'work',
    name: 'Work & Jobs',
    description: 'Essential phrases for the workplace and job searching',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    color: '#ec4899'
  }
];

// Collection of survival phrases organized by category
export const survivalPhrases: PhraseItem[] = [
  // Greetings & Introductions
  {
    id: 'hello',
    phrase: 'Hello, my name is...',
    description: 'Use this to introduce yourself to someone new.',
    imageUrl: 'https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/hello',
    category: 'greetings'
  },
  {
    id: 'how-are-you',
    phrase: 'How are you?',
    description: 'A common greeting to ask someone how they are feeling.',
    imageUrl: 'https://images.unsplash.com/photo-1539935416267-34df661c6f8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/how-are-you',
    category: 'greetings'
  },
  {
    id: 'nice-to-meet-you',
    phrase: 'Nice to meet you.',
    description: 'Say this when you meet someone for the first time.',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/nice-to-meet-you',
    category: 'greetings'
  },
  {
    id: 'where-from',
    phrase: 'Where are you from?',
    description: 'Ask this to learn what country or city someone is from.',
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/where-from',
    category: 'greetings'
  },
  {
    id: 'i-am-from',
    phrase: 'I am from...',
    description: 'Use this to tell someone what country or city you are from.',
    imageUrl: 'https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/i-am-from',
    category: 'greetings'
  },
  
  // Emergency Phrases
  {
    id: 'help',
    phrase: 'Help! Emergency!',
    description: 'Say this when you need immediate assistance in a dangerous situation.',
    imageUrl: 'https://images.unsplash.com/photo-1610490499459-3e40b3beb801?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/help',
    category: 'emergencies'
  },
  {
    id: 'call-911',
    phrase: 'Please call 911.',
    description: 'Ask someone to call emergency services.',
    imageUrl: 'https://images.unsplash.com/photo-1590156524193-b6e0f8189593?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/call-911',
    category: 'emergencies'
  },
  {
    id: 'police',
    phrase: 'I need the police.',
    description: 'Use this if you need police assistance.',
    imageUrl: 'https://images.unsplash.com/photo-1517759709347-ca8db069cea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/need-police',
    category: 'emergencies'
  },
  {
    id: 'fire',
    phrase: 'Fire! There is a fire!',
    description: 'Alert others if you see a fire.',
    imageUrl: 'https://images.unsplash.com/photo-1523665918603-86b3aaa060d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/fire',
    category: 'emergencies'
  },
  {
    id: 'ambulance',
    phrase: 'I need an ambulance.',
    description: 'Use this when someone needs medical emergency transportation.',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/ambulance',
    category: 'emergencies'
  },
  
  // Shopping & Money
  {
    id: 'how-much',
    phrase: 'How much does this cost?',
    description: 'Ask this to find out the price of something.',
    imageUrl: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/how-much',
    category: 'shopping'
  },
  {
    id: 'too-expensive',
    phrase: 'That is too expensive.',
    description: 'Use this if something costs more than you want to pay.',
    imageUrl: 'https://images.unsplash.com/photo-1593672715438-d88a70629abe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/too-expensive',
    category: 'shopping'
  },
  {
    id: 'looking-for',
    phrase: 'I am looking for...',
    description: 'Use this to ask for help finding something in a store.',
    imageUrl: 'https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/looking-for',
    category: 'shopping'
  },
  {
    id: 'receipt',
    phrase: 'Can I have a receipt, please?',
    description: 'Ask this after paying to get a record of your purchase.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/receipt',
    category: 'shopping'
  },
  {
    id: 'return',
    phrase: 'I would like to return this.',
    description: 'Use this if you need to take something back to the store.',
    imageUrl: 'https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/return',
    category: 'shopping'
  },
  
  // Healthcare
  {
    id: 'sick',
    phrase: 'I am sick.',
    description: 'Tell this to a doctor or nurse when you don\'t feel well.',
    imageUrl: 'https://images.unsplash.com/photo-1578496479769-38a4dd2de9ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/sick',
    category: 'healthcare'
  },
  {
    id: 'pain',
    phrase: 'I have pain here.',
    description: 'Use this while pointing to where you feel pain.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/pain',
    category: 'healthcare'
  },
  {
    id: 'medicine',
    phrase: 'I need medicine.',
    description: 'Use this at a pharmacy or doctor\'s office.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/medicine',
    category: 'healthcare'
  },
  {
    id: 'allergic',
    phrase: 'I am allergic to...',
    description: 'Important to tell medical staff about any allergies you have.',
    imageUrl: 'https://images.unsplash.com/photo-1625670624153-ad5e95b3d921?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/allergic',
    category: 'healthcare'
  },
  {
    id: 'insurance',
    phrase: 'Here is my insurance card.',
    description: 'Use this when checking in at a doctor\'s office or hospital.',
    imageUrl: 'https://images.unsplash.com/photo-1598816766824-12cf6a872834?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/insurance',
    category: 'healthcare'
  },
  
  // Transportation
  {
    id: 'bus',
    phrase: 'Which bus goes to...?',
    description: 'Ask this to find the right bus for your destination.',
    imageUrl: 'https://images.unsplash.com/photo-1556122071-e404cb8e22b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/which-bus',
    category: 'transportation'
  },
  {
    id: 'stop',
    phrase: 'Please tell me when to get off.',
    description: 'Ask the bus driver to alert you at your stop.',
    imageUrl: 'https://images.unsplash.com/photo-1551873853-2bf7c0f9f076?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/tell-when',
    category: 'transportation'
  },
  {
    id: 'directions',
    phrase: 'How do I get to...?',
    description: 'Ask this when you need directions to a place.',
    imageUrl: 'https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/directions',
    category: 'transportation'
  },
  {
    id: 'taxi',
    phrase: 'I need a taxi to this address.',
    description: 'Use this when you need a ride to a specific location.',
    imageUrl: 'https://images.unsplash.com/photo-1559829687-57f74cf37fd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/taxi',
    category: 'transportation'
  },
  {
    id: 'lost',
    phrase: 'I am lost. Can you help me?',
    description: 'Use this when you don\'t know where you are.',
    imageUrl: 'https://images.unsplash.com/photo-1575229274340-5e39b8d3cd8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/lost',
    category: 'transportation'
  },
  
  // Work & Jobs
  {
    id: 'job-application',
    phrase: 'I would like to apply for a job.',
    description: 'Use this when inquiring about employment at a business.',
    imageUrl: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/job-application',
    category: 'work'
  },
  {
    id: 'experience',
    phrase: 'I have experience in...',
    description: 'Use this to tell an employer about your work history.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/experience',
    category: 'work'
  },
  {
    id: 'resume',
    phrase: 'Here is my resume.',
    description: 'Use this when providing your job qualifications document.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/resume',
    category: 'work'
  },
  {
    id: 'schedule',
    phrase: 'What is my work schedule?',
    description: 'Ask this to learn what days and times you will work.',
    imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/schedule',
    category: 'work'
  },
  {
    id: 'paycheck',
    phrase: 'When do I get paid?',
    description: 'Ask this to learn when you will receive your salary.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/paycheck',
    category: 'work'
  }
];

// Filter phrases by category
export function getPhrasesByCategory(categoryId: string): PhraseItem[] {
  return survivalPhrases.filter(item => item.category === categoryId);
}

// Get a specific phrase by ID
export function getPhraseById(id: string): PhraseItem | undefined {
  return survivalPhrases.find(item => item.id === id);
}