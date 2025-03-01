import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const WorkoutDetailPage: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const { getWorkoutById } = useAppContext();
  
  const workout = getWorkoutById(workoutId || '');
  
  if (!workout) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>Entraînement non trouvé</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Retour
        </button>
      </div>
    );
  }
  
  const workoutDate = parse(workout.day, 'yyyy-MM-dd', new Date());
  
  return (
    <div className="container mx-auto px-4 py-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        Retour
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <h2 className="text-2xl font-bold mb-2">{workout.title}</h2>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">
            {format(workoutDate, 'EEEE d MMMM', { locale: fr })} • {workout.startTime} - {workout.endTime}
          </span>
        </div>
        
        <p className="text-gray-700 mb-6">{workout.description}</p>
        
        <h3 className="text-lg font-semibold mb-3">Exercices</h3>
        
        <div className="space-y-4">
          {workout.exercises.map((exercise) => (
            <div key={exercise.id} className="border-l-4 border-indigo-500 pl-4 py-2">
              <h4 className="font-medium">{exercise.name}</h4>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                {exercise.sets && exercise.reps && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Séries/Répétitions:</span> {exercise.sets} x {exercise.reps}
                  </div>
                )}
                
                {exercise.duration && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Durée:</span> {exercise.duration}
                  </div>
                )}
                
                {exercise.distance && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Distance:</span> {exercise.distance}
                  </div>
                )}
              </div>
              
              {exercise.notes && (
                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Notes:</span> {exercise.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <CheckCircle size={18} className="mr-2" />
          Marquer comme terminé
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetailPage;