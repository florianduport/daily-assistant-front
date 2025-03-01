import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAppContext } from '../context/AppContext';
import RoutineCard from '../components/RoutineCard';
import WorkoutCard from '../components/WorkoutCard';
import MealPlanSummary from '../components/MealPlanSummary';
import GoalsList from '../components/GoalsList';
import WeekSelector from '../components/WeekSelector';

interface Task {
  _id: string;
  title: string;
  // Ajoutez d'autres propriétés nécessaires ici
}

const HomePage: React.FC = () => {
  const { 
    morningRoutine, 
    nightRoutine, 
    workouts, 
    mealPlan, 
    weeklyGoals,
    selectedWeekStart,
    selectedWeekEnd
  } = useAppContext();

  const [morningRoutineTasks, setMorningRoutineTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchMorningRoutineTasks = async () => {
      try {
        const response = await fetch(`/api/morning-routine-tasks?start=${selectedWeekStart.toISOString()}&end=${selectedWeekEnd.toISOString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setMorningRoutineTasks(data);
      } catch (error) {
        console.error('Error fetching morning routine tasks:', error);
      }
    };

    fetchMorningRoutineTasks();
  }, [selectedWeekStart, selectedWeekEnd]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Semaine du {format(selectedWeekStart, 'd MMMM yyyy', { locale: fr })}
      </h2>
      
      <WeekSelector />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">Routines</h3>
          <RoutineCard routine={morningRoutine} />
          <ul>
            {morningRoutineTasks.map(task => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
          <RoutineCard routine={nightRoutine} />
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