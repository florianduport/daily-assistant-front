import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Task, 
  Workout, 
  MealPlan, 
  Routine, 
  WeeklyGoal, 
  JournalEntry,
  WeeklySummary
} from '../types';

// Helper function to format dates
const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

// Current week dates
const today = new Date();
const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

// Previous week dates
const prevWeekStart = startOfWeek(addDays(currentWeekStart, -7), { weekStartsOn: 1 });
const prevWeekEnd = endOfWeek(addDays(currentWeekStart, -7), { weekStartsOn: 1 });

// Mock Tasks
export const tasks: Task[] = [
];

// Mock Workouts
export const workouts: Workout[] = [
  {
    id: '1',
    title: 'Course à pied',
    description: '5km à allure modérée',
    day: formatDate(today),
    startTime: '07:00',
    endTime: '07:45',
    completed: false,
    exercises: [
      {
        id: '1-1',
        name: 'Échauffement',
        duration: '5 minutes',
        notes: 'Marche rapide et étirements dynamiques',
      },
      {
        id: '1-2',
        name: 'Course principale',
        distance: '5km',
        duration: '30 minutes',
        notes: 'Maintenir un rythme régulier, respiration contrôlée',
      },
      {
        id: '1-3',
        name: 'Récupération',
        duration: '10 minutes',
        notes: 'Marche lente et étirements statiques',
      },
    ],
  },
  {
    id: '2',
    title: 'Séance de musculation',
    description: 'Focus sur le haut du corps',
    day: formatDate(addDays(today, 1)),
    startTime: '18:00',
    endTime: '19:00',
    completed: false,
    exercises: [
      {
        id: '2-1',
        name: 'Pompes',
        sets: 3,
        reps: 12,
        notes: 'Pause de 60 secondes entre les séries',
      },
      {
        id: '2-2',
        name: 'Tractions',
        sets: 3,
        reps: 8,
        notes: "Utiliser l'élastique si nécessaire",
      },
      {
        id: '2-3',
        name: 'Développé épaules',
        sets: 3,
        reps: 10,
        notes: 'Haltères de 8kg',
      },
      {
        id: '2-4',
        name: 'Curl biceps',
        sets: 3,
        reps: 12,
        notes: 'Haltères de 10kg',
      },
    ],
  },
  {
    id: '3',
    title: 'Yoga',
    description: 'Séance de récupération et flexibilité',
    day: formatDate(addDays(today, 2)),
    startTime: '07:30',
    endTime: '08:15',
    completed: false,
    exercises: [
      {
        id: '3-1',
        name: 'Salutation au soleil',
        sets: 5,
        duration: '10 minutes',
        notes: 'Respiration profonde et mouvement fluide',
      },
      {
        id: '3-2',
        name: 'Postures debout',
        duration: '15 minutes',
        notes: 'Guerrier I, II, III et triangle',
      },
      {
        id: '3-3',
        name: 'Postures au sol',
        duration: '15 minutes',
        notes: 'Pigeon, cobra, sauterelle',
      },
      {
        id: '3-4',
        name: 'Méditation finale',
        duration: '5 minutes',
        notes: 'Savasana',
      },
    ],
  },
];

// Mock Meal Plan
export const mealPlan: MealPlan = {
  id: '1',
  title: 'Plan de batch cooking - Semaine du ' + format(currentWeekStart, 'd MMMM', { locale: fr }),
  description: 'Repas équilibrés riches en protéines et légumes de saison',
  weekStart: formatDate(currentWeekStart),
  weekEnd: formatDate(currentWeekEnd),
  meals: [
    {
      id: '1',
      name: 'Bowl de quinoa aux légumes rôtis',
      ingredients: [
        '100g de quinoa',
        '1 courgette',
        '1 poivron rouge',
        '1 oignon rouge',
        '100g de pois chiches',
        '1 cuillère à soupe d\'huile d\'olive',
        'Épices (cumin, paprika)',
        'Jus de citron',
      ],
      instructions: 'Cuire le quinoa selon les instructions. Couper les légumes en dés, les mélanger avec l\'huile et les épices, puis les rôtir au four à 200°C pendant 25 minutes. Mélanger le quinoa, les légumes rôtis et les pois chiches. Assaisonner avec du jus de citron.',
      prepTime: '15 minutes',
      cookTime: '30 minutes',
      servings: 2,
      day: formatDate(currentWeekStart),
      mealType: 'lunch',
    },
    {
      id: '2',
      name: 'Poulet mariné au citron et thym',
      ingredients: [
        '2 filets de poulet',
        'Jus d\'un citron',
        '2 gousses d\'ail',
        '1 cuillère à soupe de thym frais',
        '1 cuillère à soupe d\'huile d\'olive',
        'Sel et poivre',
      ],
      instructions: 'Mélanger tous les ingrédients de la marinade. Ajouter les filets de poulet et laisser mariner au moins 2 heures. Cuire à la poêle ou au four à 180°C pendant 20-25 minutes.',
      prepTime: '10 minutes (+ 2h de marinade)',
      cookTime: '25 minutes',
      servings: 2,
      day: formatDate(addDays(currentWeekStart, 1)),
      mealType: 'dinner',
    },
    {
      id: '3',
      name: 'Salade de lentilles et feta',
      ingredients: [
        '150g de lentilles vertes',
        '100g de feta',
        '1 concombre',
        '1 poignée de tomates cerises',
        '1 oignon rouge',
        'Persil frais',
        '2 cuillères à soupe d\'huile d\'olive',
        '1 cuillère à soupe de vinaigre balsamique',
      ],
      instructions: 'Cuire les lentilles selon les instructions. Couper le concombre, les tomates et l\'oignon en petits morceaux. Émietter la feta. Mélanger tous les ingrédients avec l\'huile et le vinaigre. Parsemer de persil frais.',
      prepTime: '15 minutes',
      cookTime: '25 minutes',
      servings: 2,
      day: formatDate(addDays(currentWeekStart, 2)),
      mealType: 'lunch',
    },
  ],
};

// Mock Routines
export const morningRoutine: Routine = {
  id: '1',
  title: 'Morning Routine',
  type: 'morning',
  weekStart: formatDate(currentWeekStart),
  weekEnd: formatDate(currentWeekEnd),
  activities: [
    {
      id: '1',
      title: 'Hydratation',
      startTime: '06:00',
      endTime: '06:05',
      description: 'Boire un grand verre d\'eau avec du jus de citron',
    },
    {
      id: '2',
      title: 'Méditation',
      startTime: '06:05',
      endTime: '06:15',
      description: '10 minutes de méditation guidée',
    },
    {
      id: '3',
      title: 'Étirements',
      startTime: '06:15',
      endTime: '06:25',
      description: 'Étirements doux pour réveiller le corps',
    },
    {
      id: '4',
      title: 'Journaling',
      startTime: '06:25',
      endTime: '06:35',
      description: 'Noter 3 choses pour lesquelles je suis reconnaissant et mes intentions pour la journée',
    },
  ],
};

export const nightRoutine: Routine = {
  id: '2',
  title: 'Night Routine',
  type: 'night',
  weekStart: formatDate(currentWeekStart),
  weekEnd: formatDate(currentWeekEnd),
  activities: [
    {
      id: '1',
      title: 'Déconnexion numérique',
      startTime: '21:00',
      endTime: '21:05',
      description: 'Éteindre tous les écrans',
    },
    {
      id: '2',
      title: 'Tisane relaxante',
      startTime: '21:05',
      endTime: '21:15',
      description: 'Préparer et savourer une tisane (camomille, valériane ou lavande)',
    },
    {
      id: '3',
      title: 'Lecture',
      startTime: '21:15',
      endTime: '21:45',
      description: '30 minutes de lecture (livre papier, non fiction)',
    },
    {
      id: '4',
      title: 'Méditation du soir',
      startTime: '21:45',
      endTime: '21:55',
      description: '10 minutes de méditation pour favoriser le sommeil',
    },
  ],
};

// Mock Weekly Goals
export const weeklyGoals: WeeklyGoal[] = [
  {
    id: '1',
    title: 'Courir 20km au total',
    description: 'Répartir les séances sur 3-4 jours',
    weekStart: formatDate(currentWeekStart),
    weekEnd: formatDate(currentWeekEnd),
  },
  {
    id: '2',
    title: 'Méditer tous les jours',
    description: 'Au moins 10 minutes chaque jour',
    weekStart: formatDate(currentWeekStart),
    weekEnd: formatDate(currentWeekEnd),
  },
  {
    id: '3',
    title: 'Limiter les sucres raffinés',
    description: 'Maximum 2 exceptions dans la semaine',
    weekStart: formatDate(currentWeekStart),
    weekEnd: formatDate(currentWeekEnd),
  },
  {
    id: '4',
    title: 'Boire 2.5L d\'eau par jour',
    description: 'Utiliser la bouteille graduée pour suivre la consommation',
    weekStart: formatDate(currentWeekStart),
    weekEnd: formatDate(currentWeekEnd),
  },
];

// Mock Journal Entries
export const journalEntries: JournalEntry[] = [

];

// Mock Weekly Summary
export const currentWeeklySummary: WeeklySummary = {
  id: '1',
  weekStart: formatDate(currentWeekStart),
  weekEnd: formatDate(currentWeekEnd),
  morningRoutine,
  nightRoutine,
  mealPlan,
  workouts,
  goals: weeklyGoals,
};

// Previous week summary
export const previousWeeklySummary: WeeklySummary = {
  id: '2',
  weekStart: formatDate(prevWeekStart),
  weekEnd: formatDate(prevWeekEnd),
  morningRoutine: {
    ...morningRoutine,
    id: '3',
    weekStart: formatDate(prevWeekStart),
    weekEnd: formatDate(prevWeekEnd),
  },
  nightRoutine: {
    ...nightRoutine,
    id: '4',
    weekStart: formatDate(prevWeekStart),
    weekEnd: formatDate(prevWeekEnd),
  },
  mealPlan: {
    ...mealPlan,
    id: '2',
    title: 'Plan de batch cooking - Semaine du ' + format(prevWeekStart, 'd MMMM', { locale: fr }),
    weekStart: formatDate(prevWeekStart),
    weekEnd: formatDate(prevWeekEnd),
  },
  workouts: workouts.map(workout => ({
    ...workout,
    id: `prev-${workout.id}`,
    day: formatDate(addDays(new Date(workout.day), -7)),
  })),
  goals: weeklyGoals.map(goal => ({
    ...goal,
    id: `prev-${goal.id}`,
    weekStart: formatDate(prevWeekStart),
    weekEnd: formatDate(prevWeekEnd),
  })),
};

export const weeklySummaries = [currentWeeklySummary, previousWeeklySummary];