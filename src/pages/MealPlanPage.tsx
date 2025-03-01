import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const MealPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const { mealPlan } = useAppContext();
  
  // Group meals by day
  const mealsByDay = mealPlan.meals.reduce((acc, meal) => {
    if (!acc[meal.day]) {
      acc[meal.day] = [];
    }
    acc[meal.day].push(meal);
    return acc;
  }, {} as Record<string, typeof mealPlan.meals>);
  
  // Sort days
  const sortedDays = Object.keys(mealsByDay).sort();
  
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
        <h2 className="text-2xl font-bold mb-2">{mealPlan.title}</h2>
        <p className="text-gray-700 mb-6">{mealPlan.description}</p>
        
        {sortedDays.map((day) => {
          const date = parse(day, 'yyyy-MM-dd', new Date());
          
          return (
            <div key={day} className="mb-8">
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                {format(date, 'EEEE d MMMM', { locale: fr })}
              </h3>
              
              <div className="space-y-6">
                {mealsByDay[day].map((meal) => (
                  <div key={meal.id} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-medium">{meal.name}</span>
                      <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {meal.mealType === 'breakfast' ? 'Petit-déjeuner' : 
                         meal.mealType === 'lunch' ? 'Déjeuner' : 
                         meal.mealType === 'dinner' ? 'Dîner' : 'Collation'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Ingrédients</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          {meal.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Instructions</h4>
                        <p className="text-sm text-gray-700">{meal.instructions}</p>
                        
                        <div className="flex items-center mt-3 text-sm text-gray-600">
                          <Clock size={14} className="mr-1" />
                          <span>Préparation: {meal.prepTime} • Cuisson: {meal.cookTime}</span>
                        </div>
                        
                        <div className="mt-1 text-sm text-gray-600">
                          Pour {meal.servings} personne{meal.servings > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanPage;