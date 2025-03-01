import React from 'react';
import { Routine } from '../types';
import { Clock } from 'lucide-react';

interface RoutineCardProps {
  routine: Routine;
}

const RoutineCard: React.FC<RoutineCardProps> = ({ routine }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {routine.type === 'morning' ? '☀️ Morning Routine' : '🌙 Night Routine'}
      </h3>
      
      <div className="space-y-3">
        {routine.activities.map((activity) => (
          <div key={activity.id} className="flex items-start border-l-2 border-indigo-500 pl-3 py-1">
            <div className="flex items-center text-gray-500 mr-3">
              <Clock size={14} className="mr-1" />
              <span className="text-xs">
                {activity.startTime} - {activity.endTime}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-sm">{activity.title}</h4>
              {activity.description && (
                <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineCard;