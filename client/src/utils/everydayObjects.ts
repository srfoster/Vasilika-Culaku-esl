export interface ObjectItem {
  id: string;
  word: string;
  imageUrl: string;
  audioUrl: string;
  category: 'bathroom' | 'kitchen' | 'bedroom' | 'living' | 'technology' | 'transportation';
}

export interface ObjectCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Categories of everyday objects
export const objectCategories: ObjectCategory[] = [
  {
    id: 'bathroom',
    name: 'Bathroom',
    description: 'Items you find in a bathroom',
    imageUrl: 'https://via.placeholder.com/200?text=Bathroom'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Items you find in a kitchen',
    imageUrl: 'https://via.placeholder.com/200?text=Kitchen'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Items you find in a bedroom',
    imageUrl: 'https://via.placeholder.com/200?text=Bedroom'
  },
  {
    id: 'living',
    name: 'Living Room',
    description: 'Items you find in a living room',
    imageUrl: 'https://via.placeholder.com/200?text=Living+Room'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Common technology items',
    imageUrl: 'https://via.placeholder.com/200?text=Technology'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Common transportation items',
    imageUrl: 'https://via.placeholder.com/200?text=Transportation'
  }
];

// Collection of everyday objects
export const everydayObjects: ObjectItem[] = [
  // Bathroom items
  {
    id: 'toilet',
    word: 'Toilet',
    imageUrl: 'https://via.placeholder.com/200?text=Toilet',
    audioUrl: '/api/audio/word/toilet',
    category: 'bathroom'
  },
  {
    id: 'sink',
    word: 'Sink',
    imageUrl: 'https://via.placeholder.com/200?text=Sink',
    audioUrl: '/api/audio/word/sink',
    category: 'bathroom'
  },
  {
    id: 'shower',
    word: 'Shower',
    imageUrl: 'https://via.placeholder.com/200?text=Shower',
    audioUrl: '/api/audio/word/shower',
    category: 'bathroom'
  },
  {
    id: 'toothbrush',
    word: 'Toothbrush',
    imageUrl: 'https://via.placeholder.com/200?text=Toothbrush',
    audioUrl: '/api/audio/word/toothbrush',
    category: 'bathroom'
  },
  {
    id: 'toothpaste',
    word: 'Toothpaste',
    imageUrl: 'https://via.placeholder.com/200?text=Toothpaste',
    audioUrl: '/api/audio/word/toothpaste',
    category: 'bathroom'
  },
  
  // Kitchen items
  {
    id: 'refrigerator',
    word: 'Refrigerator',
    imageUrl: 'https://via.placeholder.com/200?text=Refrigerator',
    audioUrl: '/api/audio/word/refrigerator',
    category: 'kitchen'
  },
  {
    id: 'stove',
    word: 'Stove',
    imageUrl: 'https://via.placeholder.com/200?text=Stove',
    audioUrl: '/api/audio/word/stove',
    category: 'kitchen'
  },
  {
    id: 'pan',
    word: 'Pan',
    imageUrl: 'https://via.placeholder.com/200?text=Pan',
    audioUrl: '/api/audio/word/pan',
    category: 'kitchen'
  },
  {
    id: 'pot',
    word: 'Pot',
    imageUrl: 'https://via.placeholder.com/200?text=Pot',
    audioUrl: '/api/audio/word/pot',
    category: 'kitchen'
  },
  {
    id: 'plate',
    word: 'Plate',
    imageUrl: 'https://via.placeholder.com/200?text=Plate',
    audioUrl: '/api/audio/word/plate',
    category: 'kitchen'
  },
  
  // Bedroom items
  {
    id: 'bed',
    word: 'Bed',
    imageUrl: 'https://via.placeholder.com/200?text=Bed',
    audioUrl: '/api/audio/word/bed',
    category: 'bedroom'
  },
  {
    id: 'pillow',
    word: 'Pillow',
    imageUrl: 'https://via.placeholder.com/200?text=Pillow',
    audioUrl: '/api/audio/word/pillow',
    category: 'bedroom'
  },
  {
    id: 'blanket',
    word: 'Blanket',
    imageUrl: 'https://via.placeholder.com/200?text=Blanket',
    audioUrl: '/api/audio/word/blanket',
    category: 'bedroom'
  },
  {
    id: 'dresser',
    word: 'Dresser',
    imageUrl: 'https://via.placeholder.com/200?text=Dresser',
    audioUrl: '/api/audio/word/dresser',
    category: 'bedroom'
  },
  {
    id: 'lamp',
    word: 'Lamp',
    imageUrl: 'https://via.placeholder.com/200?text=Lamp',
    audioUrl: '/api/audio/word/lamp',
    category: 'bedroom'
  },
  
  // Living room items
  {
    id: 'sofa',
    word: 'Sofa',
    imageUrl: 'https://via.placeholder.com/200?text=Sofa',
    audioUrl: '/api/audio/word/sofa',
    category: 'living'
  },
  {
    id: 'chair',
    word: 'Chair',
    imageUrl: 'https://via.placeholder.com/200?text=Chair',
    audioUrl: '/api/audio/word/chair',
    category: 'living'
  },
  {
    id: 'table',
    word: 'Table',
    imageUrl: 'https://via.placeholder.com/200?text=Table',
    audioUrl: '/api/audio/word/table',
    category: 'living'
  },
  {
    id: 'television',
    word: 'Television',
    imageUrl: 'https://via.placeholder.com/200?text=Television',
    audioUrl: '/api/audio/word/television',
    category: 'living'
  },
  {
    id: 'window',
    word: 'Window',
    imageUrl: 'https://via.placeholder.com/200?text=Window',
    audioUrl: '/api/audio/word/window',
    category: 'living'
  },
  
  // Technology items
  {
    id: 'phone',
    word: 'Phone',
    imageUrl: 'https://via.placeholder.com/200?text=Phone',
    audioUrl: '/api/audio/word/phone',
    category: 'technology'
  },
  {
    id: 'computer',
    word: 'Computer',
    imageUrl: 'https://via.placeholder.com/200?text=Computer',
    audioUrl: '/api/audio/word/computer',
    category: 'technology'
  },
  {
    id: 'atm',
    word: 'ATM',
    imageUrl: 'https://via.placeholder.com/200?text=ATM',
    audioUrl: '/api/audio/word/atm',
    category: 'technology'
  },
  {
    id: 'charger',
    word: 'Charger',
    imageUrl: 'https://via.placeholder.com/200?text=Charger',
    audioUrl: '/api/audio/word/charger',
    category: 'technology'
  },
  {
    id: 'camera',
    word: 'Camera',
    imageUrl: 'https://via.placeholder.com/200?text=Camera',
    audioUrl: '/api/audio/word/camera',
    category: 'technology'
  },
  
  // Transportation items
  {
    id: 'car',
    word: 'Car',
    imageUrl: 'https://via.placeholder.com/200?text=Car',
    audioUrl: '/api/audio/word/car',
    category: 'transportation'
  },
  {
    id: 'bus',
    word: 'Bus',
    imageUrl: 'https://via.placeholder.com/200?text=Bus',
    audioUrl: '/api/audio/word/bus',
    category: 'transportation'
  },
  {
    id: 'train',
    word: 'Train',
    imageUrl: 'https://via.placeholder.com/200?text=Train',
    audioUrl: '/api/audio/word/train',
    category: 'transportation'
  },
  {
    id: 'bicycle',
    word: 'Bicycle',
    imageUrl: 'https://via.placeholder.com/200?text=Bicycle',
    audioUrl: '/api/audio/word/bicycle',
    category: 'transportation'
  },
  {
    id: 'taxi',
    word: 'Taxi',
    imageUrl: 'https://via.placeholder.com/200?text=Taxi',
    audioUrl: '/api/audio/word/taxi',
    category: 'transportation'
  }
];

// Filter objects by category
export function getObjectsByCategory(categoryId: string): ObjectItem[] {
  return everydayObjects.filter(item => item.category === categoryId);
}

// Get a specific object by ID
export function getObjectById(id: string): ObjectItem | undefined {
  return everydayObjects.find(item => item.id === id);
}