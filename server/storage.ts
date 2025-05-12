import { 
  users, type User, type InsertUser,
  alphabetProgress, type AlphabetProgress, type InsertAlphabetProgress,
  numbersProgress, type NumbersProgress, type InsertNumbersProgress,
  foodProgress, type FoodProgress, type InsertFoodProgress,
  objectsProgress, type ObjectsProgress, type InsertObjectsProgress,
  dailyPractice, type DailyPractice, type InsertDailyPractice
} from "@shared/schema";
import { alphabet } from "../client/src/utils/alphabet";
import { numbers } from "../client/src/utils/numbers";
import { foodVocabulary } from "../client/src/utils/foodVocabulary";
import { everydayObjects } from "../client/src/utils/everydayObjects";

// Define the full storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getCurrentUser(): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addUserPoints(userId: number, points: number): Promise<User>;
  updateUserProgress(userId: number): Promise<User>;
  
  // Progress initialization
  initializeUserProgress(userId: number): Promise<void>;
  
  // Modules
  getModules(userId: number): Promise<any[]>;
  
  // Progress methods
  getUserProgress(userId: number): Promise<any>;
  
  // Alphabet progress
  getAlphabetProgress(userId: number): Promise<any>;
  updateAlphabetProgress(userId: number, letter: string, completed: boolean): Promise<any>;
  
  // Numbers progress
  getNumbersProgress(userId: number): Promise<any>;
  updateNumbersProgress(userId: number, number: number, completed: boolean): Promise<any>;
  
  // Food vocabulary progress
  getFoodProgress(userId: number): Promise<any>;
  updateFoodProgress(userId: number, exercise: string, completed: boolean): Promise<any>;
  
  // Objects progress
  getObjectsProgress(userId: number): Promise<any>;
  updateObjectsProgress(userId: number, objectId: string, completed: boolean): Promise<any>;
  
  // Daily practice
  getDailyPractice(userId: number): Promise<any>;
  completeDailyPractice(userId: number, completed: boolean): Promise<any>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private alphabetProgress: Map<number, AlphabetProgress[]>;
  private numbersProgress: Map<number, NumbersProgress[]>;
  private foodProgress: Map<number, FoodProgress[]>;
  private objectsProgress: Map<number, ObjectsProgress[]>;
  private dailyPractice: Map<number, DailyPractice[]>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.alphabetProgress = new Map();
    this.numbersProgress = new Map();
    this.foodProgress = new Map();
    this.objectsProgress = new Map();
    this.dailyPractice = new Map();
    this.currentId = 1;
    
    // Create default user for development
    this.createUser({
      username: 'student',
      displayName: 'Maria'
    }).then(user => {
      this.initializeUserProgress(user.id);
      this.addUserPoints(user.id, 120);
      
      // Set some progress for development
      this.updateAlphabetProgress(user.id, 'A', true);
      this.updateAlphabetProgress(user.id, 'B', true);
      this.updateAlphabetProgress(user.id, 'C', true);
      this.updateNumbersProgress(user.id, 1, true);
      this.updateNumbersProgress(user.id, 2, true);
      this.updateFoodProgress(user.id, 'matching', true);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getCurrentUser(): Promise<User | undefined> {
    // In a real app, this would get the current user from session
    // For demo purposes, we'll return the first user
    if (this.users.size === 0) {
      return undefined;
    }
    return this.users.get(1);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      points: 0, 
      progress: 0, 
      lastModule: '/alphabet',
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  async addUserPoints(userId: number, points: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    user.points += points;
    this.users.set(userId, user);
    
    // Update overall progress
    await this.updateUserProgress(userId);
    
    return user;
  }
  
  async updateUserProgress(userId: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    // Calculate progress based on completed items
    const alphabetItems = this.alphabetProgress.get(userId) || [];
    const numbersItems = this.numbersProgress.get(userId) || [];
    const foodItems = this.foodProgress.get(userId) || [];
    const objectItems = this.objectsProgress.get(userId) || [];
    const practiceItems = this.dailyPractice.get(userId) || [];
    
    const completedAlphabet = alphabetItems.filter(item => item.completed).length;
    const completedNumbers = numbersItems.filter(item => item.completed).length;
    const completedFood = foodItems.filter(item => item.completed).length;
    const completedObjects = objectItems.filter(item => item.completed).length;
    const completedPractice = practiceItems.filter(item => item.completed).length;
    
    const totalAlphabet = alphabet.length;
    const totalNumbers = numbers.length;
    const totalFood = foodVocabulary.length + 3; // Food items + 3 listening exercises
    const totalObjects = everydayObjects.length;
    
    const totalProgress = totalAlphabet + totalNumbers + totalFood + totalObjects;
    const completedProgress = completedAlphabet + completedNumbers + completedFood + completedObjects + completedPractice;
    
    // Calculate percentage (0-100)
    const progressPercentage = Math.floor((completedProgress / totalProgress) * 100);
    
    user.progress = progressPercentage;
    this.users.set(userId, user);
    
    return user;
  }
  
  async initializeUserProgress(userId: number): Promise<void> {
    // Initialize alphabet progress
    const alphabetItems: AlphabetProgress[] = alphabet.map((item, index) => ({
      id: index + 1,
      userId,
      letter: item.letter,
      completed: false,
      updatedAt: new Date()
    }));
    this.alphabetProgress.set(userId, alphabetItems);
    
    // Initialize numbers progress
    const numbersItems: NumbersProgress[] = numbers.map((item, index) => ({
      id: index + 1,
      userId,
      number: item.number,
      completed: false,
      updatedAt: new Date()
    }));
    this.numbersProgress.set(userId, numbersItems);
    
    // Initialize food progress
    const foodItems: FoodProgress[] = [
      {
        id: 1,
        userId,
        exercise: 'matching',
        completed: false,
        updatedAt: new Date()
      },
      {
        id: 2,
        userId,
        exercise: 'listening_0',
        completed: false,
        updatedAt: new Date()
      },
      {
        id: 3,
        userId,
        exercise: 'listening_1',
        completed: false,
        updatedAt: new Date()
      },
      {
        id: 4,
        userId,
        exercise: 'listening_2',
        completed: false,
        updatedAt: new Date()
      }
    ];
    this.foodProgress.set(userId, foodItems);
    
    // Initialize objects progress
    const objectItems: ObjectsProgress[] = everydayObjects.map((item, index) => ({
      id: index + 1,
      userId,
      objectId: item.id,
      category: item.category,
      completed: false,
      updatedAt: new Date()
    }));
    this.objectsProgress.set(userId, objectItems);
    
    // Initialize daily practice
    const practiceItem: DailyPractice = {
      id: 1,
      userId,
      date: new Date(),
      completed: false
    };
    this.dailyPractice.set(userId, [practiceItem]);
  }
  
  async getModules(userId: number): Promise<any[]> {
    // Get user's progress for each module
    const alphabetItems = this.alphabetProgress.get(userId) || [];
    const completedAlphabet = alphabetItems.filter(item => item.completed).length;
    const alphabetProgress = Math.floor((completedAlphabet / alphabet.length) * 100);
    
    const numbersItems = this.numbersProgress.get(userId) || [];
    const completedNumbers = numbersItems.filter(item => item.completed).length;
    const numbersProgress = Math.floor((completedNumbers / numbers.length) * 100);
    
    const foodItems = this.foodProgress.get(userId) || [];
    const completedFood = foodItems.filter(item => item.completed).length;
    const foodProgress = Math.floor((completedFood / 4) * 100); // 4 food exercises
    
    const objectItems = this.objectsProgress.get(userId) || [];
    const completedObjects = objectItems.filter(item => item.completed).length;
    const objectsProgress = Math.floor((completedObjects / everydayObjects.length) * 100);
    
    // Return module data
    return [
      {
        id: 'alphabet',
        title: 'Alphabet',
        description: 'Learn to recognize and pronounce letters',
        progress: alphabetProgress,
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        status: alphabetProgress === 100 ? 'completed' : alphabetProgress > 0 ? 'in-progress' : 'in-progress',
        path: '/alphabet'
      },
      {
        id: 'numbers',
        title: 'Numbers',
        description: 'Count and recognize numbers',
        progress: numbersProgress,
        imageUrl: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        status: numbersProgress === 100 ? 'completed' : numbersProgress > 0 ? 'in-progress' : 'in-progress',
        path: '/numbers'
      },
      {
        id: 'food',
        title: 'Food',
        description: 'Learn essential food vocabulary',
        progress: foodProgress,
        imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        status: foodProgress === 100 ? 'completed' : foodProgress > 0 ? 'in-progress' : 'in-progress',
        path: '/food'
      },
      {
        id: 'objects',
        title: 'Everyday Objects',
        description: 'Learn names of common objects around you',
        progress: objectsProgress,
        imageUrl: 'https://images.unsplash.com/photo-1593085260707-5377ba37f868?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        status: objectsProgress === 100 ? 'completed' : objectsProgress > 0 ? 'in-progress' : 'in-progress',
        path: '/objects'
      },
      {
        id: 'resources',
        title: 'Community Resources',
        description: 'Essential services in Bremerton and Kitsap County',
        progress: 0,
        imageUrl: 'https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        status: 'in-progress',
        path: '/resources'
      },
      {
        id: 'health',
        title: 'Health',
        description: 'Learn health and medical terms',
        progress: 0,
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        status: (alphabetProgress > 50 && numbersProgress > 50 && foodProgress > 50) ? 'in-progress' : 'locked',
        path: '/health'
      },
      {
        id: 'directions',
        title: 'Directions',
        description: 'Learn how to navigate and ask for directions',
        progress: 0,
        imageUrl: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
        status: (alphabetProgress > 50 && numbersProgress > 50 && foodProgress > 50) ? 'in-progress' : 'locked',
        path: '/directions'
      }
    ];
  }
  
  async getUserProgress(userId: number): Promise<any> {
    // Get all module progress
    const modules = await this.getModules(userId);
    
    // Calculate completed modules/exercises
    const completedModules = modules.filter(m => m.progress === 100).length;
    
    // Count all completed exercises
    const alphabetItems = this.alphabetProgress.get(userId) || [];
    const numbersItems = this.numbersProgress.get(userId) || [];
    const foodItems = this.foodProgress.get(userId) || [];
    const practiceItems = this.dailyPractice.get(userId) || [];
    
    const objectItems = this.objectsProgress.get(userId) || [];
    
    const completedExercises = 
      alphabetItems.filter(i => i.completed).length +
      numbersItems.filter(i => i.completed).length +
      foodItems.filter(i => i.completed).length +
      objectItems.filter(i => i.completed).length +
      practiceItems.filter(i => i.completed).length;
    
    // Calculate user's streak (simplified for demo)
    const streak = practiceItems.filter(i => i.completed).length;
    
    // Return progress summary
    return {
      completedModules,
      completedExercises,
      streak,
      modules: modules.map(m => ({
        id: m.id,
        title: m.title,
        progress: m.progress,
        completedItems: Math.floor((m.progress / 100) * (
          m.id === 'alphabet' ? alphabet.length : 
          m.id === 'numbers' ? numbers.length : 
          m.id === 'objects' ? everydayObjects.length : 4
        )),
        totalItems: 
          m.id === 'alphabet' ? alphabet.length : 
          m.id === 'numbers' ? numbers.length : 
          m.id === 'objects' ? everydayObjects.length : 4
      }))
    };
  }
  
  async getAlphabetProgress(userId: number): Promise<any> {
    const items = this.alphabetProgress.get(userId) || [];
    return items.reduce((acc, item) => {
      acc[item.letter] = item.completed;
      return acc;
    }, {} as Record<string, boolean>);
  }
  
  async updateAlphabetProgress(userId: number, letter: string, completed: boolean): Promise<any> {
    let items = this.alphabetProgress.get(userId) || [];
    const itemIndex = items.findIndex(item => item.letter === letter);
    
    if (itemIndex === -1) {
      throw new Error("Letter progress not found");
    }
    
    items[itemIndex].completed = completed;
    items[itemIndex].updatedAt = new Date();
    
    this.alphabetProgress.set(userId, items);
    
    // Update user's last module
    const user = await this.getUser(userId);
    if (user) {
      user.lastModule = '/alphabet';
      this.users.set(userId, user);
    }
    
    return this.getAlphabetProgress(userId);
  }
  
  async getNumbersProgress(userId: number): Promise<any> {
    const items = this.numbersProgress.get(userId) || [];
    return items.reduce((acc, item) => {
      acc[item.number] = item.completed;
      return acc;
    }, {} as Record<number, boolean>);
  }
  
  async updateNumbersProgress(userId: number, number: number, completed: boolean): Promise<any> {
    let items = this.numbersProgress.get(userId) || [];
    const itemIndex = items.findIndex(item => item.number === number);
    
    if (itemIndex === -1) {
      throw new Error("Number progress not found");
    }
    
    items[itemIndex].completed = completed;
    items[itemIndex].updatedAt = new Date();
    
    this.numbersProgress.set(userId, items);
    
    // Update user's last module
    const user = await this.getUser(userId);
    if (user) {
      user.lastModule = '/numbers';
      this.users.set(userId, user);
    }
    
    return this.getNumbersProgress(userId);
  }
  
  async getFoodProgress(userId: number): Promise<any> {
    const items = this.foodProgress.get(userId) || [];
    return items.reduce((acc, item) => {
      acc[item.exercise] = item.completed;
      return acc;
    }, {} as Record<string, boolean>);
  }
  
  async updateFoodProgress(userId: number, exercise: string, completed: boolean): Promise<any> {
    let items = this.foodProgress.get(userId) || [];
    const itemIndex = items.findIndex(item => item.exercise === exercise);
    
    if (itemIndex === -1) {
      throw new Error("Food exercise progress not found");
    }
    
    items[itemIndex].completed = completed;
    items[itemIndex].updatedAt = new Date();
    
    this.foodProgress.set(userId, items);
    
    // Update user's last module
    const user = await this.getUser(userId);
    if (user) {
      user.lastModule = '/food';
      this.users.set(userId, user);
    }
    
    return this.getFoodProgress(userId);
  }
  
  async getObjectsProgress(userId: number): Promise<any> {
    const items = this.objectsProgress.get(userId) || [];
    
    // Group by category
    const byCategory = everydayObjects.reduce((acc, obj) => {
      const category = obj.category;
      
      if (!acc[category]) {
        acc[category] = {
          name: category,
          items: []
        };
      }
      
      const progressItem = items.find(item => item.objectId === obj.id);
      acc[category].items.push({
        id: obj.id,
        word: obj.word,
        imageUrl: obj.imageUrl,
        completed: progressItem ? progressItem.completed : false
      });
      
      return acc;
    }, {} as Record<string, any>);
    
    // Calculate progress
    const totalObjects = everydayObjects.length;
    const completedObjects = items.filter(item => item.completed).length;
    const progressPercentage = Math.floor((completedObjects / totalObjects) * 100);
    
    return {
      progress: progressPercentage,
      completedItems: completedObjects,
      totalItems: totalObjects,
      categories: byCategory
    };
  }
  
  async updateObjectsProgress(userId: number, objectId: string, completed: boolean): Promise<any> {
    let items = this.objectsProgress.get(userId) || [];
    const itemIndex = items.findIndex(item => item.objectId === objectId);
    
    if (itemIndex === -1) {
      throw new Error("Object progress not found");
    }
    
    items[itemIndex].completed = completed;
    items[itemIndex].updatedAt = new Date();
    
    this.objectsProgress.set(userId, items);
    
    // Update user's last module
    const user = await this.getUser(userId);
    if (user) {
      user.lastModule = '/objects';
      this.users.set(userId, user);
    }
    
    return this.getObjectsProgress(userId);
  }
  
  async getDailyPractice(userId: number): Promise<any> {
    const items = this.dailyPractice.get(userId) || [];
    const today = new Date().toISOString().split('T')[0];
    
    // Find today's practice or create a new one
    let todaysPractice = items.find(item => 
      item.date.toISOString().split('T')[0] === today
    );
    
    if (!todaysPractice) {
      todaysPractice = {
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
        userId,
        date: new Date(),
        completed: false
      };
      items.push(todaysPractice);
      this.dailyPractice.set(userId, items);
    }
    
    return {
      date: todaysPractice.date,
      completed: todaysPractice.completed,
      // Return practice data for the day - for demo we'll just return some letter practice
      letters: ['A', 'B', 'C', 'D']
    };
  }
  
  async completeDailyPractice(userId: number, completed: boolean): Promise<any> {
    const items = this.dailyPractice.get(userId) || [];
    const today = new Date().toISOString().split('T')[0];
    
    // Find today's practice or create a new one
    const practiceIndex = items.findIndex(item => 
      item.date.toISOString().split('T')[0] === today
    );
    
    if (practiceIndex === -1) {
      // Create a new practice item
      const newPractice: DailyPractice = {
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
        userId,
        date: new Date(),
        completed
      };
      items.push(newPractice);
    } else {
      // Update existing practice
      items[practiceIndex].completed = completed;
    }
    
    this.dailyPractice.set(userId, items);
    
    // Update user's last module
    const user = await this.getUser(userId);
    if (user) {
      user.lastModule = '/practice';
      this.users.set(userId, user);
    }
    
    return this.getDailyPractice(userId);
  }
}

export const storage = new MemStorage();
