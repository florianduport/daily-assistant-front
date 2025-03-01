import React from 'react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const WeekSelector: React.FC = () => {
  const { selectedWeekStart, setSelectedWeekStart, setSelectedWeekEnd } = useAppContext();
  
  const goToPreviousWeek = () => {
    const newWeekStart = subWeeks(selectedWeekStart, 1);
    const newWeekEnd = endOfWeek(newWeekStart, { weekStartsOn: 1 });
    setSelectedWeekStart(newWeekStart);
    setSelectedWeekEnd(newWeekEnd);
  };
  
  const goToNextWeek = () => {
    const newWeekStart = addWeeks(selectedWeekStart, 1);
    const newWeekEnd = endOfWeek(newWeekStart, { weekStartsOn: 1 });
    setSelectedWeekStart(newWeekStart);
    setSelectedWeekEnd(newWeekEnd);
  };
  
  const goToCurrentWeek = () => {
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
    setSelectedWeekStart(currentWeekStart);
    setSelectedWeekEnd(currentWeekEnd);
  };
  
  const weekStartFormatted = format(selectedWeekStart, 'd MMMM', { locale: fr });
  const weekEndFormatted = format(endOfWeek(selectedWeekStart, { weekStartsOn: 1 }), 'd MMMM yyyy', { locale: fr });
  
  const isCurrentWeek = () => {
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    return format(selectedWeekStart, 'yyyy-MM-dd') === format(currentWeekStart, 'yyyy-MM-dd');
  };
  
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3 mb-4">
      <button
        onClick={goToPreviousWeek}
        className="p-1 rounded-full hover:bg-gray-100"
        aria-label="Semaine précédente"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="text-center">
        <div className="text-sm font-medium">
          {weekStartFormatted} - {weekEndFormatted}
        </div>
        
        {!isCurrentWeek() && (
          <button
            onClick={goToCurrentWeek}
            className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
          >
            Revenir à cette semaine
          </button>
        )}
      </div>
      
      <button
        onClick={goToNextWeek}
        className="p-1 rounded-full hover:bg-gray-100"
        aria-label="Semaine suivante"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default WeekSelector;