import React, { useEffect, useState } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAppContext } from '../context/AppContext';
import RoutineCard from '../components/RoutineCard';
import WorkoutCard from '../components/WorkoutCard';
import MealPlanSummary from '../components/MealPlanSummary';
import GoalsList from '../components/GoalsList';
import WeekSelector from '../components/WeekSelector';
import { fetchFromAPI } from '../utils/apiUtil';
import { Task, Routine } from '../types'; // Importation de l'interface Task et Routine depuis types.ts

const HomePage: React.FC = () => {
  const {
    workouts,
    mealPlan,
    weeklyGoals
  } = useAppContext();

  const [morningRoutine, setMorningRoutine] = useState<Routine | null>(null);
  const [nightRoutine, setNightRoutine] = useState<Routine | null>(null);
  const [selectedWeekStart, setSelectedWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 6 }));

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        // Utilisation de la date de début de semaine sélectionnée pour l'appel API
        const data = await fetchFromAPI(`task-list/routines/by-week-start-date?weekStartDate=${new Date(selectedWeekStart.getTime() + 1 * 60 * 60 * 1000).toISOString().split('T')[0]}`);

        // Si pas de données ou tableau vide, vider les routines précédemment chargées
        if (!data || data.length === 0) {
          setMorningRoutine(null);
          setNightRoutine(null);
          return;
        }

        // Parcourir les routines retournées par l'API
        data.forEach((routineData: any) => {
          // Utilisation uniquement des tâches du premier jour dans le tableau weekDays
          const firstDayTasks = routineData.weekDays[0]?.tasks || [];

          // Transformation des données de l'API en format Routine
          const transformedRoutine: Routine = {
            id: routineData._id,
            title: routineData.type === 'morning' ? 'Routine Matinale' : 'Routine Nocturne',
            type: routineData.type,
            tasks: firstDayTasks.map((task: any) => ({
              _id: task._id,
              title: task.title,
              description: task.description,
              startTime: task.startTime,
              endTime: task.endTime,
              isCompleted: task.isCompleted,
              type: 'routine',
              day: task.dateAssigned.split('T')[0]
            })),
            weekStart: routineData.weekStartDate,
            weekEnd: new Date(new Date(routineData.weekStartDate).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          };

          // Affecter la routine transformée à la routine correspondante
          if (routineData.type === 'morning') {
            setMorningRoutine(transformedRoutine);
          } else if (routineData.type === 'night') {
            setNightRoutine(transformedRoutine);
          }
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des routines :', error);
      }
    };

    fetchRoutines();
  }, [selectedWeekStart]);

  const weekEnd = endOfWeek(selectedWeekStart, { weekStartsOn: 6 });

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Semaine du {format(selectedWeekStart, 'd MMMM yyyy', { locale: fr })} au {format(weekEnd, 'd MMMM yyyy', { locale: fr })}
      </h2>

      <WeekSelector setSelectedWeekStart={setSelectedWeekStart} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">Routines</h3>
          {morningRoutine && <RoutineCard routine={morningRoutine} />}
          {nightRoutine && <RoutineCard routine={nightRoutine} />}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Objectifs & Nutrition</h3>
          <GoalsList goals={weeklyGoals} />
          <MealPlanSummary mealPlan={mealPlan} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Entraînements de la semaine</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} showDate={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;