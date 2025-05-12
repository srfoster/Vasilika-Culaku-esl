import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertAlphabetProgressSchema,
  insertNumbersProgressSchema,
  insertFoodProgressSchema,
  insertDailyPracticeSchema
} from "@shared/schema";
import { audioService } from "./services/audioService";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/current", async (req, res) => {
    // For demo purposes, we're returning the first user
    // In a real app, this would use session/auth to get the current user
    const user = await storage.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  });
  
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      
      // Initialize progress for the new user
      await storage.initializeUserProgress(user.id);
      
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  // Modules routes
  app.get("/api/modules", async (req, res) => {
    const user = await storage.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const modules = await storage.getModules(user.id);
    res.json(modules);
  });
  
  // Progress routes
  app.get("/api/progress", async (req, res) => {
    const user = await storage.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const progress = await storage.getUserProgress(user.id);
    res.json(progress);
  });
  
  // Alphabet progress routes
  app.get("/api/progress/alphabet", async (req, res) => {
    const user = await storage.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const progress = await storage.getAlphabetProgress(user.id);
    res.json(progress);
  });
  
  app.post("/api/progress/alphabet", async (req, res) => {
    try {
      const user = await storage.getCurrentUser();
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const progressData = z.object({
        letter: z.string(),
        completed: z.boolean()
      }).parse(req.body);
      
      const progress = await storage.updateAlphabetProgress(user.id, progressData.letter, progressData.completed);
      
      // Award points to the user
      await storage.addUserPoints(user.id, 5);
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });
  
  // Numbers progress routes
  app.get("/api/progress/numbers", async (req, res) => {
    const user = await storage.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const progress = await storage.getNumbersProgress(user.id);
    res.json(progress);
  });
  
  app.post("/api/progress/numbers", async (req, res) => {
    try {
      const user = await storage.getCurrentUser();
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const progressData = z.object({
        number: z.number(),
        completed: z.boolean()
      }).parse(req.body);
      
      const progress = await storage.updateNumbersProgress(user.id, progressData.number, progressData.completed);
      
      // Award points to the user
      await storage.addUserPoints(user.id, 5);
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });
  
  // Food vocabulary progress routes
  app.get("/api/progress/food", async (req, res) => {
    const user = await storage.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const progress = await storage.getFoodProgress(user.id);
    res.json(progress);
  });
  
  app.post("/api/progress/food", async (req, res) => {
    try {
      const user = await storage.getCurrentUser();
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const progressData = z.object({
        exercise: z.string(),
        completed: z.boolean()
      }).parse(req.body);
      
      const progress = await storage.updateFoodProgress(user.id, progressData.exercise, progressData.completed);
      
      // Award points to the user
      await storage.addUserPoints(user.id, 5);
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });
  
  // Daily practice routes
  app.get("/api/practice/daily", async (req, res) => {
    const user = await storage.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const practice = await storage.getDailyPractice(user.id);
    res.json(practice);
  });
  
  app.post("/api/practice/complete", async (req, res) => {
    try {
      const user = await storage.getCurrentUser();
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const practiceData = z.object({
        completed: z.boolean()
      }).parse(req.body);
      
      const practice = await storage.completeDailyPractice(user.id, practiceData.completed);
      
      // Award points to the user
      await storage.addUserPoints(user.id, 10);
      
      res.json(practice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid practice data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to complete practice" });
    }
  });
  
  // Audio API endpoints
  app.get("/api/audio/letter/:letter", (req, res) => {
    const letter = req.params.letter;
    
    try {
      const audioBuffer = audioService.getLetterAudio(letter);
      res.set('Content-Type', 'audio/mp3');
      res.send(audioBuffer);
    } catch (error) {
      res.status(404).json({ message: "Audio not found" });
    }
  });
  
  app.get("/api/audio/number/:number", (req, res) => {
    const number = parseInt(req.params.number, 10);
    
    try {
      const audioBuffer = audioService.getNumberAudio(number);
      res.set('Content-Type', 'audio/mp3');
      res.send(audioBuffer);
    } catch (error) {
      res.status(404).json({ message: "Audio not found" });
    }
  });
  
  app.get("/api/audio/word/:word", (req, res) => {
    const word = req.params.word;
    
    try {
      const audioBuffer = audioService.getWordAudio(word);
      res.set('Content-Type', 'audio/mp3');
      res.send(audioBuffer);
    } catch (error) {
      res.status(404).json({ message: "Audio not found" });
    }
  });
  
  app.get("/api/audio/sentence/:id", (req, res) => {
    const id = req.params.id;
    
    try {
      const audioBuffer = audioService.getSentenceAudio(id);
      res.set('Content-Type', 'audio/mp3');
      res.send(audioBuffer);
    } catch (error) {
      res.status(404).json({ message: "Audio not found" });
    }
  });
  
  app.get("/api/audio/instruction/:id", (req, res) => {
    const id = req.params.id;
    
    try {
      const audioBuffer = audioService.getInstructionAudio(id);
      res.set('Content-Type', 'audio/mp3');
      res.send(audioBuffer);
    } catch (error) {
      res.status(404).json({ message: "Audio not found" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
