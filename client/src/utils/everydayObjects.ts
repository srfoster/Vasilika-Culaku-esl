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
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Items you find in a kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bda9f7f9e627?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Items you find in a bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
  },
  {
    id: 'living',
    name: 'Living Room',
    description: 'Items you find in a living room',
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Common technology items',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Common transportation items',
    imageUrl: 'https://images.unsplash.com/photo-1513618520198-1d3536ea2e56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300'
  }
];

// Collection of everyday objects
export const everydayObjects: ObjectItem[] = [
  // Bathroom items
  {
    id: 'toilet',
    word: 'Toilet',
    imageUrl: 'https://images.unsplash.com/photo-1566791504814-a46cf8432e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/toilet',
    category: 'bathroom'
  },
  {
    id: 'sink',
    word: 'Sink',
    imageUrl: 'https://images.unsplash.com/photo-1563620867-a1127e53171e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/sink',
    category: 'bathroom'
  },
  {
    id: 'shower',
    word: 'Shower',
    imageUrl: 'https://images.unsplash.com/photo-1586798754715-2026c4d0f6eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/shower',
    category: 'bathroom'
  },
  {
    id: 'toothbrush',
    word: 'Toothbrush',
    imageUrl: 'https://images.unsplash.com/photo-1559671216-bbc19e1fffd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/toothbrush',
    category: 'bathroom'
  },
  {
    id: 'toothpaste',
    word: 'Toothpaste',
    imageUrl: 'https://images.unsplash.com/photo-1571942676516-bcab84649e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/toothpaste',
    category: 'bathroom'
  },
  
  // Kitchen items
  {
    id: 'refrigerator',
    word: 'Refrigerator',
    imageUrl: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/refrigerator',
    category: 'kitchen'
  },
  {
    id: 'stove',
    word: 'Stove',
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/stove',
    category: 'kitchen'
  },
  {
    id: 'pan',
    word: 'Pan',
    imageUrl: 'https://images.unsplash.com/photo-1574181609941-50f3e3ff8c01?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/pan',
    category: 'kitchen'
  },
  {
    id: 'pot',
    word: 'Pot',
    imageUrl: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/pot',
    category: 'kitchen'
  },
  {
    id: 'plate',
    word: 'Plate',
    imageUrl: 'https://images.unsplash.com/photo-1603199863516-6139c211fee3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/plate',
    category: 'kitchen'
  },
  
  // Bedroom items
  {
    id: 'bed',
    word: 'Bed',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/bed',
    category: 'bedroom'
  },
  {
    id: 'pillow',
    word: 'Pillow',
    imageUrl: 'https://images.unsplash.com/photo-1592789705501-f9ae4433058b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/pillow',
    category: 'bedroom'
  },
  {
    id: 'blanket',
    word: 'Blanket',
    imageUrl: 'https://images.unsplash.com/photo-1580893218779-404124c3e821?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
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
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/car',
    category: 'transportation'
  },
  {
    id: 'bus',
    word: 'Bus',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/bus',
    category: 'transportation'
  },
  {
    id: 'train',
    word: 'Train',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/train',
    category: 'transportation'
  },
  {
    id: 'bicycle',
    word: 'Bicycle',
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
    audioUrl: '/api/audio/word/bicycle',
    category: 'transportation'
  },
  {
    id: 'taxi',
    word: 'Taxi',
    imageUrl: 'https://images.unsplash.com/photo-1597346908500-28cda8acfe4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
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