import React from 'react';
import { Link } from 'react-router-dom';
import { Workout } from '../types';
import { Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface WorkoutCardProps {
  workout: Workout;
  showDate?: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, showDate = false }) => {
  return (
    <Link 
      to={`/workout/${workout.id}`}
      className="block bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{workout.title}</h3>
          
          <div className="flex items-center text-gray-500 mt-1">
            <Clock size={14} className="mr-1" />
            <span className="text-xs">
              {workout.startTime} - {workout.endTime}
            </span>
            
            {showDate && (
              <span className="text-xs ml-2">
                • {format(new Date(workout.day), 'EEEE d MMMM', { locale: fr })}
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-2">{workout.description}</p>
          
          <div className="mt-3 text-xs text-gray-500">
            {workout.exercises.length} exercices
          </div>
        </div>
        
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </Link>
  );
};

export default WorkoutCard;