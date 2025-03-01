import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface DayScheduleProps {
  date: Date;
  tasks: Task[];
  onTaskComplete: (taskId: string, isCompleted: boolean) => void;
  onTaskDelete: (taskId: string) => void; // Add the delete handler prop
}

const DaySchedule: React.FC<DayScheduleProps> = ({ date, tasks, onTaskComplete, onTaskDelete }) => {
  // Sort tasks by start time
  const sortedTasks = [...tasks].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">
        {format(date, 'EEEE d MMMM', { locale: fr })}
      </h3>
      
      {sortedTasks.length > 0 ? (
        <div className="space-y-2">
          {sortedTasks.map((task) => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onComplete={(taskId, isCompleted) => onTaskComplete(taskId, !isCompleted)} 
              onDelete={() => onTaskDelete(task._id)} // Pass the delete handler
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          Aucune tâche prévue pour cette journée
        </p>
      )}
    </div>
  );
};

export default DaySchedule;