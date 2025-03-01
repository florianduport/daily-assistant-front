import React from 'react';
import { WeeklyGoal } from '../types';

interface GoalsListProps {
  goals: WeeklyGoal[];
}

const GoalsList: React.FC<GoalsListProps> = ({ goals }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">🎯 Objectifs de la semaine</h3>
      
      <ul className="space-y-2">
        {goals.map((goal) => (
          <li key={goal.id} className="flex items-start">
            <div className="h-5 w-5 rounded-full border-2 border-indigo-500 flex-shrink-0 mt-0.5"></div>
            <div className="ml-3">
              <h4 className="font-medium text-sm">{goal.title}</h4>
              {goal.description && (
                <p className="text-xs text-gray-600 mt-1">{goal.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsList;