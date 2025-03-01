import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Task, 
  Workout, 
  MealPlan, 
  Routine, 
  WeeklyGoal, 
  JournalEntry,
  WeeklySummary
} from '../types';
import { 
  tasks as initialTasks, 
  workouts as initialWorkouts,
  mealPlan as initialMealPlan,
  morningRoutine as initialMorningRoutine,
  nightRoutine as initialNightRoutine,
  weeklyGoals as initialWeeklyGoals,
  journalEntries as initialJournalEntries,
  weeklySummaries as initialWeeklySummaries
} from '../data/mockData';

interface AppContextType {
  tasks: Task[];
  workouts: Workout[];
  mealPlan: MealPlan;
  morningRoutine: Routine;
  nightRoutine: Routine;
  weeklyGoals: WeeklyGoal[];
  journalEntries: JournalEntry[];
  weeklySummaries: WeeklySummary[];
  selectedDate: Date;
  selectedWeekStart: Date;
  selectedWeekEnd: Date;
  setSelectedDate: (date: Date) => void;
  setSelectedWeekStart: (date: Date) => void;
  setSelectedWeekEnd: (date: Date) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (entry: JournalEntry) => void;
  getTasksForDay: (day: string) => Task[];
  getWorkoutById: (id: string) => Workout | undefined;
  getCurrentWeeklySummary: () => WeeklySummary | undefined;
  getWeeklySummaryByDates: (start: string, end: string) => WeeklySummary | undefined;
  getMorningRoutineTasksForWeek: () => Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [workouts] = useState<Workout[]>(initialWorkouts);
  const [mealPlan] = useState<MealPlan>(initialMealPlan);
  const [morningRoutine] = useState<Routine>(initialMorningRoutine);
  const [nightRoutine] = useState<Routine>(initialNightRoutine);
  const [weeklyGoals] = useState<WeeklyGoal[]>(initialWeeklyGoals);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournalEntries);
  const [weeklySummaries] = useState<WeeklySummary[]>(initialWeeklySummaries);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Initialiser le début de la semaine au 1er mars 2025 (samedi)
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(() => {
    return new Date(2025, 2, 1); // 1er mars 2025
  });

  // Calculer la fin de la semaine (vendredi suivant)
  const [selectedWeekEnd, setSelectedWeekEnd] = useState<Date>(() => {
    const start = new Date(selectedWeekStart);
    return new Date(start.setDate(start.getDate() + 6)); // Vendredi suivant
  });

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task._id === taskId ? { ...task, completed: !task.isCompleted } : task
    ));
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries([...journalEntries, entry]);
  };

  const updateJournalEntry = (updatedEntry: JournalEntry) => {
    setJournalEntries(journalEntries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ));
  }; 

  const getTasksForDay = (day: string) => {
    return tasks.filter(task => task.day === day);
  };

  const getWorkoutById = (id: string) => {
    return workouts.find(workout => workout.id === id);
  };

  const getCurrentWeeklySummary = () => {
    return weeklySummaries[0]; // Assuming the first one is the current week
  };

  const getWeeklySummaryByDates = (start: string, end: string) => {
    return weeklySummaries.find(
      summary => summary.weekStart === start && summary.weekEnd === end
    );
  };

  const getMorningRoutineTasksForWeek = () => {
    // Filtrer les tâches de la morning routine pour la semaine sélectionnée
    return tasks.filter(task => 
      task.type === 'routine' &&
      task.startTime < '12:00' &&
      task.day >= format(new Date(selectedWeekStart), 'yyyy-MM-dd') &&
      task.day <= format(new Date(selectedWeekEnd), 'yyyy-MM-dd')
    );
  };

  return (
    <AppContext.Provider value={{
      tasks,
      workouts,
      mealPlan,
      morningRoutine,
      nightRoutine,
      weeklyGoals,
      journalEntries,
      weeklySummaries,
      selectedDate,
      selectedWeekStart,
      selectedWeekEnd,
      setSelectedDate,
      setSelectedWeekStart,
      setSelectedWeekEnd,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion,
      addJournalEntry,
      updateJournalEntry,
      getTasksForDay,
      getWorkoutById,
      getCurrentWeeklySummary,
      getWeeklySummaryByDates,
      getMorningRoutineTasksForWeek
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};