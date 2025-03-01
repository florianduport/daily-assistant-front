import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types';
import { Clock, Edit, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string, isCompleted: boolean) => void;
  onDelete: () => void; // Add the delete handler prop
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(task.isCompleted);

  const handleClick = () => {
    if (task.type === 'workout') {
      navigate(`/workout/${task._id}`);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newCheckedStatus = e.target.checked;
    setIsChecked(newCheckedStatus);
    onComplete(task._id, !newCheckedStatus); // Send the opposite of the new checked status
  };

  const getTaskTypeIcon = () => {
    switch (task.type) {
      case 'workout':
        return '💪';
      case 'meal':
        return '🍽️';
      case 'routine':
        return task.startTime < '12:00' ? '☀️' : '🌙';
      default:
        return '📝';
    }
  };

  return (
    <div 
      className={`flex items-start p-3 border-l-4 ${
        task.type === 'workout' ? 'border-red-500' : 
        task.type === 'meal' ? 'border-green-500' : 
        task.type === 'routine' ? 'border-indigo-500' : 
        'border-gray-500'
      } bg-white rounded-r-lg shadow-sm mb-2 ${
        isChecked ? 'opacity-60' : ''
      } ${task.type === 'workout' ? 'cursor-pointer' : ''}`}
      onClick={task.type === 'workout' ? handleClick : undefined}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-3 mt-0.5"
        onClick={(e) => e.stopPropagation()}
      />
      
      <div className="flex-1">
        <div className="flex items-center">
          <span className="mr-2">{getTaskTypeIcon()}</span>
          <h4 className={`font-medium ${isChecked ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h4>
        </div>
        
        <div className="flex items-center text-gray-500 mt-1">
          <Clock size={14} className="mr-1" />
          <span className="text-xs">
            {task.startTime} - {task.endTime}
          </span>
        </div>
        
        {task.description && (
          <p className={`text-sm mt-1 ${isChecked ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
        )}
      </div>
      
      <div className="flex space-x-1">
        <button 
          className="p-1 text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            // Edit functionality would go here
          }}
        >
          <Edit size={16} />
        </button>
        <button 
          className="p-1 text-gray-400 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(); // Call the delete handler
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;