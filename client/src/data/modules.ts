export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  imageUrl: string;
  status: 'completed' | 'in-progress' | 'locked';
  path: string;
}

export const modules: Module[] = [
  {
    id: "alphabet",
    title: "Alphabet",
    description: "Learn the English alphabet with pictures and pronunciation",
    progress: 65,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23e6f3ff'/%3E%3Ctext x='100' y='80' font-family='Arial' font-size='48' font-weight='bold' text-anchor='middle' fill='%234a90e2'%3EAaZ%3C/text%3E%3C/svg%3E",
    status: 'in-progress',
    path: '/alphabet'
  },
  {
    id: "numbers",
    title: "Numbers",
    description: "Practice counting and number recognition from 1 to 100",
    progress: 45,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23fff2e6'/%3E%3Ctext x='100' y='80' font-family='Arial' font-size='48' font-weight='bold' text-anchor='middle' fill='%23ff9500'%3E123%3C/text%3E%3C/svg%3E",
    status: 'in-progress',
    path: '/numbers'
  },
  {
    id: "food",
    title: "Food Vocabulary",
    description: "Essential food words and grocery shopping terms",
    progress: 0,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f0fff0'/%3E%3Ccircle cx='100' cy='75' r='30' fill='%23ff6b6b'/%3E%3Cpath d='M85 60 Q100 45 115 60' fill='%2350c878'/%3E%3C/svg%3E",
    status: 'locked',
    path: '/food'
  },
  {
    id: "health",
    title: "Health & Body",
    description: "Medical vocabulary and body parts for healthcare visits",
    progress: 0,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23ffe6e6'/%3E%3Cpath d='M100 30 L110 50 L130 50 L116 65 L124 85 L100 75 L76 85 L84 65 L70 50 L90 50 Z' fill='%23ff6b6b'/%3E%3C/svg%3E",
    status: 'locked',
    path: '/health'
  },
  {
    id: "directions",
    title: "Directions",
    description: "Navigate and ask for directions in your community",
    progress: 0,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f0f8ff'/%3E%3Cpath d='M100 30 L120 70 L100 60 L80 70 Z' fill='%234a90e2'/%3E%3Cpath d='M60 120 L140 120 M100 120 L100 80' stroke='%234a90e2' stroke-width='4' fill='none'/%3E%3C/svg%3E",
    status: 'locked',
    path: '/directions'
  },
  {
    id: "objects",
    title: "Everyday Objects",
    description: "Common household and daily items vocabulary",
    progress: 0,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23fff5ee'/%3E%3Crect x='60' y='50' width='80' height='60' fill='%23ffd700' rx='10'/%3E%3Ccircle cx='80' cy='70' r='8' fill='%23ff9500'/%3E%3Ccircle cx='120' cy='90' r='8' fill='%23ff9500'/%3E%3C/svg%3E",
    status: 'locked',
    path: '/objects'
  },
  {
    id: "resources",
    title: "Community Resources",
    description: "Important community services and contact information",
    progress: 0,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f5f0ff'/%3E%3Crect x='70' y='40' width='60' height='70' fill='%236b46c1' rx='5'/%3E%3Crect x='75' y='50' width='15' height='15' fill='%23ffffff'/%3E%3Crect x='95' y='50' width='15' height='15' fill='%23ffffff'/%3E%3Crect x='115' y='50' width='15' height='15' fill='%23ffffff'/%3E%3C/svg%3E",
    status: 'locked',
    path: '/resources'
  },
  {
    id: "phrases",
    title: "Survival Phrases",
    description: "Essential phrases for daily communication",
    progress: 0,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23e8f5e8'/%3E%3Cellipse cx='100' cy='75' rx='60' ry='40' fill='%23ffffff' stroke='%2350c878' stroke-width='3'/%3E%3Ctext x='100' y='85' font-family='Arial' font-size='24' text-anchor='middle' fill='%2350c878'%3EHi!%3C/text%3E%3C/svg%3E",
    status: 'locked',
    path: '/phrases'
  },
  {
    id: "emotions",
    title: "Emotions",
    description: "Express feelings and emotions in English",
    progress: 0,
    imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23fff9e6'/%3E%3Ccircle cx='100' cy='75' r='40' fill='%23ffd700'/%3E%3Ccircle cx='85' cy='65' r='5' fill='%23333'/%3E%3Ccircle cx='115' cy='65' r='5' fill='%23333'/%3E%3Cpath d='M80 90 Q100 105 120 90' stroke='%23333' stroke-width='3' fill='none'/%3E%3C/svg%3E",
    status: 'locked',
    path: '/emotions'
  }
];