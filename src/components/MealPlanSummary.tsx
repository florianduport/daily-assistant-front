import React from 'react';
import { Link } from 'react-router-dom';
import { MealPlan } from '../types';
import { ChevronRight } from 'lucide-react';

interface MealPlanSummaryProps {
  mealPlan: MealPlan;
}

const MealPlanSummary: React.FC<MealPlanSummaryProps> = ({ mealPlan }) => {
  return (
    <Link 
      to="/meal-plan"
      className="block bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">🍲 {mealPlan.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{mealPlan.description}</p>
          
          <div className="mt-3">
            <span className="text-xs text-gray-500">
              {mealPlan.meals.length} repas préparés
            </span>
          </div>
        </div>
        
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </Link>
  );
};

export default MealPlanSummary;