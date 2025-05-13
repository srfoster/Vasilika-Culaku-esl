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
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="%23f7f7f7"/><rect x="150" y="50" width="300" height="200" rx="10" ry="10" fill="%23e0e0e0" stroke="%23999" stroke-width="4"/><rect x="170" y="70" width="260" height="120" rx="5" ry="5" fill="%23f9c74f" stroke="%23666" stroke-width="2"/><rect x="200" y="210" width="80" height="20" rx="5" ry="5" fill="%23555"/><rect x="320" y="210" width="80" height="20" rx="5" ry="5" fill="%23555"/><circle cx="240" cy="130" r="50" fill="%23fff" stroke="%23666" stroke-width="3"/><circle cx="360" cy="130" r="50" fill="%23fff" stroke="%23666" stroke-width="3"/><text x="300" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Kitchen</text></svg>'
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
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="%23e6f2ff"/><rect x="50" y="150" width="500" height="100" fill="%23333" rx="5" ry="5"/><rect x="100" y="120" width="400" height="70" fill="%234d79ff" rx="10" ry="10"/><rect x="120" y="150" width="60" height="40" fill="%23fff" rx="5" ry="5"/><rect x="220" y="150" width="60" height="40" fill="%23fff" rx="5" ry="5"/><rect x="320" y="150" width="60" height="40" fill="%23fff" rx="5" ry="5"/><rect x="420" y="150" width="60" height="40" fill="%23fff" rx="5" ry="5"/><circle cx="100" cy="250" r="30" fill="%23666" stroke="%23000" stroke-width="3"/><circle cx="100" cy="250" r="15" fill="%23fff"/><circle cx="500" cy="250" r="30" fill="%23666" stroke="%23000" stroke-width="3"/><circle cx="500" cy="250" r="15" fill="%23fff"/><circle cx="200" cy="250" r="30" fill="%23666" stroke="%23000" stroke-width="3"/><circle cx="200" cy="250" r="15" fill="%23fff"/><circle cx="400" cy="250" r="30" fill="%23666" stroke="%23000" stroke-width="3"/><circle cx="400" cy="250" r="15" fill="%23fff"/><text x="300" y="280" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Transportation</text></svg>'
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
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><circle cx="150" cy="150" r="100" fill="%23999" stroke="%23333" stroke-width="6"/><circle cx="150" cy="150" r="85" fill="%23777"/><rect x="230" y="140" width="80" height="20" rx="5" fill="%23333"/><text x="150" y="160" font-family="Arial" font-size="30" text-anchor="middle" fill="%23fff">Pan</text></svg>',
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
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><circle cx="150" cy="150" r="120" fill="%23fff" stroke="%23333" stroke-width="3"/><circle cx="150" cy="150" r="110" fill="%23f0f0f0" stroke="%23aaa" stroke-width="2"/><circle cx="150" cy="150" r="80" fill="%23f7f7f7" stroke="%23ddd" stroke-width="1"/><text x="150" y="160" font-family="Arial" font-size="30" text-anchor="middle" fill="%23444">Plate</text></svg>',
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
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="60" y="70" width="180" height="180" fill="%23a87328" stroke="%23333" stroke-width="3"/><line x1="60" y1="130" x2="240" y2="130" stroke="%23333" stroke-width="3"/><line x1="60" y1="190" x2="240" y2="190" stroke="%23333" stroke-width="3"/><circle cx="120" cy="100" r="10" fill="%23333"/><circle cx="180" cy="100" r="10" fill="%23333"/><circle cx="120" cy="160" r="10" fill="%23333"/><circle cx="180" cy="160" r="10" fill="%23333"/><circle cx="120" cy="220" r="10" fill="%23333"/><circle cx="180" cy="220" r="10" fill="%23333"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Dresser</text></svg>',
    audioUrl: '/api/audio/word/dresser',
    category: 'bedroom'
  },
  {
    id: 'lamp',
    word: 'Lamp',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><path d="M120,200 L180,200 L170,100 L130,100 Z" fill="%23f59e0b" stroke="%23333" stroke-width="2"/><rect x="140" y="200" width="20" height="50" fill="%23333" stroke="%23000" stroke-width="2"/><rect x="130" y="250" width="40" height="10" rx="3" ry="3" fill="%23333" stroke="%23000" stroke-width="1"/><ellipse cx="150" cy="100" rx="40" ry="20" fill="%23f59e0b" stroke="%23333" stroke-width="2"/><path d="M150,80 L150,50" stroke="%23333" stroke-width="2" stroke-linecap="round"/><ellipse cx="150" cy="85" rx="30" ry="10" fill="%23fff6e6" stroke="%23333" stroke-width="1" opacity="0.6"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Lamp</text></svg>',
    audioUrl: '/api/audio/word/lamp',
    category: 'bedroom'
  },
  
  // Living room items
  {
    id: 'sofa',
    word: 'Sofa',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="25" y="150" width="250" height="80" rx="10" ry="10" fill="%234b6cb7" stroke="%23333" stroke-width="3"/><rect x="25" y="120" width="40" height="80" rx="5" ry="5" fill="%234b6cb7" stroke="%23333" stroke-width="3"/><rect x="235" y="120" width="40" height="80" rx="5" ry="5" fill="%234b6cb7" stroke="%23333" stroke-width="3"/><rect x="25" y="230" width="250" height="20" fill="%23555" stroke="%23333" stroke-width="1"/><rect x="65" y="150" width="170" height="30" rx="8" ry="8" fill="%23667eea" stroke="%23333" stroke-width="2"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Sofa</text></svg>',
    audioUrl: '/api/audio/word/sofa',
    category: 'living'
  },
  {
    id: 'chair',
    word: 'Chair',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="75" y="150" width="150" height="40" rx="8" ry="8" fill="%23f59e0b" stroke="%23333" stroke-width="3"/><rect x="75" y="190" width="20" height="60" fill="%23333" stroke="%23000" stroke-width="2"/><rect x="205" y="190" width="20" height="60" fill="%23333" stroke="%23000" stroke-width="2"/><rect x="85" y="80" width="130" height="70" rx="5" ry="5" fill="%23f59e0b" stroke="%23333" stroke-width="3"/><line x1="85" y1="80" x2="75" y2="150" stroke="%23333" stroke-width="3"/><line x1="215" y1="80" x2="225" y2="150" stroke="%23333" stroke-width="3"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Chair</text></svg>',
    audioUrl: '/api/audio/word/chair',
    category: 'living'
  },
  {
    id: 'table',
    word: 'Table',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="60" y="130" width="180" height="20" rx="3" ry="3" fill="%23a87328" stroke="%23333" stroke-width="3"/><rect x="70" y="150" width="20" height="100" fill="%23a87328" stroke="%23333" stroke-width="2"/><rect x="210" y="150" width="20" height="100" fill="%23a87328" stroke="%23333" stroke-width="2"/><rect x="90" y="150" width="20" height="100" fill="%23a87328" stroke="%23333" stroke-width="2"/><rect x="190" y="150" width="20" height="100" fill="%23a87328" stroke="%23333" stroke-width="2"/><ellipse cx="150" cy="130" rx="100" ry="30" fill="%23d4a76a" stroke="%23333" stroke-width="3"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Table</text></svg>',
    audioUrl: '/api/audio/word/table',
    category: 'living'
  },
  {
    id: 'television',
    word: 'Television',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="50" y="80" width="200" height="140" rx="5" ry="5" fill="%23333" stroke="%23000" stroke-width="4"/><rect x="60" y="90" width="180" height="120" fill="%23aaa" stroke="%23000" stroke-width="2"/><rect x="70" y="100" width="160" height="100" fill="%230f172a"/><circle cx="150" cy="150" r="20" fill="%23ffa500"/><rect x="120" y="220" width="60" height="30" rx="3" ry="3" fill="%23444"/><rect x="90" y="250" width="120" height="10" rx="3" ry="3" fill="%23444"/><text x="150" y="270" font-family="Arial" font-size="20" text-anchor="middle" fill="%23333">Television</text></svg>',
    audioUrl: '/api/audio/word/television',
    category: 'living'
  },
  {
    id: 'window',
    word: 'Window',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="70" y="80" width="160" height="150" fill="%23fff" stroke="%23333" stroke-width="8"/><line x1="150" y1="80" x2="150" y2="230" stroke="%23333" stroke-width="8"/><line x1="70" y1="155" x2="230" y2="155" stroke="%23333" stroke-width="8"/><rect x="75" y="85" width="70" height="65" fill="%2387ceeb"/><rect x="155" y="85" width="70" height="65" fill="%2387ceeb"/><rect x="75" y="160" width="70" height="65" fill="%2387ceeb"/><rect x="155" y="160" width="70" height="65" fill="%2387ceeb"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Window</text></svg>',
    audioUrl: '/api/audio/word/window',
    category: 'living'
  },
  
  // Technology items
  {
    id: 'phone',
    word: 'Phone',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="100" y="50" width="100" height="200" rx="10" ry="10" fill="%23333" stroke="%23000" stroke-width="3"/><rect x="110" y="70" width="80" height="140" fill="%2300aaff" stroke="%23000" stroke-width="1"/><circle cx="150" cy="230" r="15" fill="%23555" stroke="%23000" stroke-width="1"/><rect x="135" y="60" width="30" height="5" rx="2" ry="2" fill="%23555"/><text x="150" y="145" font-family="Arial" font-size="10" text-anchor="middle" fill="%23fff">12:45 PM</text><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Phone</text></svg>',
    audioUrl: '/api/audio/word/phone',
    category: 'technology'
  },
  {
    id: 'computer',
    word: 'Computer',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="50" y="80" width="200" height="120" rx="5" ry="5" fill="%23333" stroke="%23000" stroke-width="3"/><rect x="60" y="90" width="180" height="100" fill="%230284c7" stroke="%23000" stroke-width="1"/><rect x="100" y="200" width="100" height="10" fill="%23555"/><rect x="80" y="210" width="140" height="30" rx="5" ry="5" fill="%23888" stroke="%23000" stroke-width="2"/><circle cx="150" cy="140" r="5" fill="%23fff"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Computer</text></svg>',
    audioUrl: '/api/audio/word/computer',
    category: 'technology'
  },
  {
    id: 'atm',
    word: 'ATM',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="70" y="50" width="160" height="200" rx="5" ry="5" fill="%23464646" stroke="%23000" stroke-width="3"/><rect x="90" y="80" width="120" height="80" fill="%23111" stroke="%23000" stroke-width="2"/><rect x="100" y="90" width="100" height="60" fill="%230369a1" stroke="%23000" stroke-width="1"/><text x="150" y="125" font-family="Arial" font-size="14" text-anchor="middle" fill="%23fff">Welcome</text><rect x="100" y="170" width="100" height="10" fill="%23222" stroke="%23000" stroke-width="1"/><rect x="90" y="190" width="30" height="30" fill="%23222" stroke="%23000" stroke-width="1"/><rect x="135" y="190" width="30" height="30" fill="%23222" stroke="%23000" stroke-width="1"/><rect x="180" y="190" width="30" height="30" fill="%23222" stroke="%23000" stroke-width="1"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">ATM</text></svg>',
    audioUrl: '/api/audio/word/atm',
    category: 'technology'
  },
  {
    id: 'charger',
    word: 'Charger',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="120" y="100" width="60" height="60" rx="5" ry="5" fill="%23fff" stroke="%23000" stroke-width="2"/><circle cx="150" cy="130" r="10" fill="%23333"/><path d="M150,130 L150,40" stroke="%23000" stroke-width="4"/><rect x="140" y="40" width="20" height="20" fill="%23555" stroke="%23000" stroke-width="2"/><path d="M150,160 C100,160 100,200 100,230" stroke="%23000" stroke-width="3" fill="none"/><circle cx="100" cy="230" r="15" fill="%23ccc" stroke="%23000" stroke-width="2"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Charger</text></svg>',
    audioUrl: '/api/audio/word/charger',
    category: 'technology'
  },
  {
    id: 'camera',
    word: 'Camera',
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8f9fa"/><rect x="60" y="100" width="180" height="100" rx="10" ry="10" fill="%23333" stroke="%23000" stroke-width="3"/><rect x="130" y="80" width="40" height="20" fill="%23333" stroke="%23000" stroke-width="2"/><circle cx="150" cy="150" r="40" fill="%23222" stroke="%23000" stroke-width="2"/><circle cx="150" cy="150" r="30" fill="%23444" stroke="%23000" stroke-width="2"/><circle cx="150" cy="150" r="20" fill="%23666" stroke="%23000" stroke-width="1"/><circle cx="150" cy="150" r="10" fill="%23888" stroke="%23000" stroke-width="1"/><circle cx="180" cy="120" r="5" fill="%23ff0000"/><text x="150" y="270" font-family="Arial" font-size="24" text-anchor="middle" fill="%23333">Camera</text></svg>',
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