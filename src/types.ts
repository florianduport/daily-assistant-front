export interface Task {
  _id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  isCompleted: boolean;
  type: 'routine' | 'workout' | 'meal' | 'other';
  day: string; // ISO date string
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  day: string; // ISO date string
  startTime: string;
  endTime: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: string;
  distance?: string;
  notes?: string;
}

export interface MealPlan {
  id: string;
  title: string;
  description: string;
  meals: Meal[];
  weekStart: string; // ISO date string
  weekEnd: string; // ISO date string
}

export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  day: string; // ISO date string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface Routine {
  id: string;
  title: string;
  type: 'morning' | 'night';
  tasks: Task[];
  weekStart: string; // ISO date string
  weekEnd: string; // ISO date string
}

export interface WeeklyGoal {
  id: string;
  title: string;
  description?: string;
  weekStart: string; // ISO date string
  weekEnd: string; // ISO date string
}

export interface JournalEntry {
  id: string;
  content: string;
  date: string; // ISO date string
}

export interface WeeklySummary {
  id: string;
  weekStart: string; // ISO date string
  weekEnd: string; // ISO date string
  morningRoutine: Routine;
  nightRoutine: Routine;
  mealPlan: MealPlan;
  workouts: Workout[];
  goals: WeeklyGoal[];
}