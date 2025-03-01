import React from 'react';
import { Link } from 'react-router-dom';
import { format, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAppContext } from '../context/AppContext';
import WeekSelector from '../components/WeekSelector';

const WeeklySchedulePage: React.FC = () => {
  const { 
    selectedWeekStart, 
    selectedDate,
    setSelectedDate,
  } = useAppContext();
  const tasks: any[] = [];

  // Generate array of 7 days starting from selectedWeekStart
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    return addDays(selectedWeekStart, i);
  });
  
  const getTasksForDay = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return tasks.filter(task => task.day === dateString);
  };
  
  const getDayClasses = (date: Date) => {
    const isToday = isSameDay(date, new Date());
    const isSelected = isSameDay(date, selectedDate);
    
    let classes = "border rounded-lg p-4 h-full flex flex-col ";
    
    if (isToday) {
      classes += "border-indigo-500 bg-indigo-50 ";
    } else if (isSelected) {
      classes += "border-indigo-300 bg-indigo-50 ";
    } else {
      classes += "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 ";
    }
    
    return classes;
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <WeekSelector />
      
      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {weekDays.map((day, index) => (
          <div key={index} className="text-sm font-medium">
            {format(day, 'EEEE', { locale: fr })}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDay(day);
          const dateString = format(day, 'yyyy-MM-dd');
          
          return (
            <Link 
              key={index}
              to={`/day/${dateString}`}
              className={getDayClasses(day)}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-right mb-2">
                <span className={`inline-block rounded-full w-7 h-7 text-center leading-7 ${
                  isSameDay(day, new Date()) 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-700'
                }`}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {dayTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task._id}
                    className={`text-xs p-1 mb-1 rounded truncate ${
                      task.type === 'workout' ? 'bg-red-100 text-red-800' : 
                      task.type === 'meal' ? 'bg-green-100 text-green-800' : 
                      task.type === 'routine' ? 'bg-indigo-100 text-indigo-800' : 
                      'bg-gray-100 text-gray-800'
                    } ${task.isCompleted ? 'line-through opacity-50' : ''}`}
                  >
                    {task.startTime} {task.title}
                  </div>
                ))}
                
                {dayTasks.length > 3 && (
                  <div className="text-xs text-gray-500 mt-1">
                    +{dayTasks.length - 3} autres
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklySchedulePage;