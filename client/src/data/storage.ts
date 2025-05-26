// Client-side storage using localStorage

export interface User {
  id: string;
  username: string;
  displayName: string;
  progress: number;
  lastModule?: string;
  points: number;
}

export interface ProgressData {
  alphabet: Record<string, boolean>;
  numbers: Record<number, boolean>;
  food: Record<string, boolean>;
  objects: Record<string, boolean>;
  health: Record<string, boolean>;
  directions: Record<string, boolean>;
  resources: Record<string, boolean>;
  phrases: Record<string, boolean>;
  emotions: Record<string, boolean>;
}

export interface DailyPractice {
  date: string;
  completed: boolean;
  score?: number;
}

class ClientStorage {
  private userKey = 'learnow_user';
  private progressKey = 'learnow_progress';
  private practiceKey = 'learnow_practice';

  // User methods
  getUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  createUser(username: string, displayName: string): User {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      displayName,
      progress: 0,
      points: 0
    };
    
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.initializeProgress();
    return user;
  }

  updateUser(updates: Partial<User>): User {
    const user = this.getUser();
    if (!user) throw new Error('No user found');
    
    const updatedUser = { ...user, ...updates };
    localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    return updatedUser;
  }

  // Progress methods
  initializeProgress(): void {
    const initialProgress: ProgressData = {
      alphabet: {},
      numbers: {},
      food: {},
      objects: {},
      health: {},
      directions: {},
      resources: {},
      phrases: {},
      emotions: {}
    };
    
    localStorage.setItem(this.progressKey, JSON.stringify(initialProgress));
  }

  getProgress(): ProgressData {
    const progressData = localStorage.getItem(this.progressKey);
    if (!progressData) {
      this.initializeProgress();
      return this.getProgress();
    }
    return JSON.parse(progressData);
  }

  updateProgress(module: keyof ProgressData, item: string | number, completed: boolean): void {
    const progress = this.getProgress();
    (progress[module] as any)[item] = completed;
    localStorage.setItem(this.progressKey, JSON.stringify(progress));
    
    // Update overall user progress
    this.calculateOverallProgress();
  }

  private calculateOverallProgress(): void {
    const progress = this.getProgress();
    let totalItems = 0;
    let completedItems = 0;

    Object.values(progress).forEach(moduleProgress => {
      Object.values(moduleProgress).forEach(completed => {
        totalItems++;
        if (completed) completedItems++;
      });
    });

    const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    this.updateUser({ progress: overallProgress });
  }

  // Daily practice methods
  getDailyPractice(): DailyPractice[] {
    const practiceData = localStorage.getItem(this.practiceKey);
    return practiceData ? JSON.parse(practiceData) : [];
  }

  updateDailyPractice(completed: boolean, score?: number): void {
    const today = new Date().toISOString().split('T')[0];
    const practices = this.getDailyPractice();
    
    const existingIndex = practices.findIndex(p => p.date === today);
    const newPractice: DailyPractice = { date: today, completed, score };
    
    if (existingIndex >= 0) {
      practices[existingIndex] = newPractice;
    } else {
      practices.push(newPractice);
    }
    
    localStorage.setItem(this.practiceKey, JSON.stringify(practices));
  }

  // Clear all data (for testing/reset)
  clearAll(): void {
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.progressKey);
    localStorage.removeItem(this.practiceKey);
  }
}

export const storage = new ClientStorage();

// Initialize default user if none exists
export function initializeApp(): User {
  let user = storage.getUser();
  
  if (!user) {
    user = storage.createUser('student', 'Student');
  }
  
  return user;
}