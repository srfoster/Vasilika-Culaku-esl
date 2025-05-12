import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  points: integer("points").default(0),
  progress: integer("progress").default(0),
  lastModule: text("last_module").default('/alphabet'),
  createdAt: date("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  displayName: true,
});

// Progress tables for different modules
export const alphabetProgress = pgTable("alphabet_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  letter: text("letter").notNull(),
  completed: boolean("completed").default(false),
  updatedAt: date("updated_at").defaultNow(),
});

export const insertAlphabetProgressSchema = createInsertSchema(alphabetProgress).pick({
  userId: true,
  letter: true,
  completed: true,
});

export const numbersProgress = pgTable("numbers_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  number: integer("number").notNull(),
  completed: boolean("completed").default(false),
  updatedAt: date("updated_at").defaultNow(),
});

export const insertNumbersProgressSchema = createInsertSchema(numbersProgress).pick({
  userId: true,
  number: true,
  completed: true,
});

export const foodProgress = pgTable("food_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  exercise: text("exercise").notNull(),
  completed: boolean("completed").default(false),
  updatedAt: date("updated_at").defaultNow(),
});

export const insertFoodProgressSchema = createInsertSchema(foodProgress).pick({
  userId: true,
  exercise: true,
  completed: true,
});

export const dailyPractice = pgTable("daily_practice", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: date("date").defaultNow(),
  completed: boolean("completed").default(false),
});

export const insertDailyPracticeSchema = createInsertSchema(dailyPractice).pick({
  userId: true,
  completed: true,
});

// Define types for the schemas
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type AlphabetProgress = typeof alphabetProgress.$inferSelect;
export type InsertAlphabetProgress = z.infer<typeof insertAlphabetProgressSchema>;

export type NumbersProgress = typeof numbersProgress.$inferSelect;
export type InsertNumbersProgress = z.infer<typeof insertNumbersProgressSchema>;

export type FoodProgress = typeof foodProgress.$inferSelect;
export type InsertFoodProgress = z.infer<typeof insertFoodProgressSchema>;

export type DailyPractice = typeof dailyPractice.$inferSelect;
export type InsertDailyPractice = z.infer<typeof insertDailyPracticeSchema>;
