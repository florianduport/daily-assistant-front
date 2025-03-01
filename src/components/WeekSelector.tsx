import React, { useState } from 'react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekSelectorProps {
  setSelectedWeekStart: React.Dispatch<React.SetStateAction<Date>>;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ setSelectedWeekStart }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 6 }));

  const updateWeek = (newWeekStart: Date) => {
    setCurrentWeekStart(newWeekStart);
    setSelectedWeekStart(newWeekStart);
  };

  const goToPreviousWeek = () => {
    const newWeekStart = subWeeks(currentWeekStart, 1);
    updateWeek(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = addWeeks(currentWeekStart, 1);
    updateWeek(newWeekStart);
  };

  const goToCurrentWeek = () => {
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 6 });
    updateWeek(currentWeekStart);
  };

  const weekStartFormatted = format(currentWeekStart, 'd MMMM', { locale: fr });
  const weekEndFormatted = format(endOfWeek(currentWeekStart, { weekStartsOn: 6 }), 'd MMMM yyyy', { locale: fr });

  const isCurrentWeek = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 6 });
    return currentWeekStart.getTime() === startOfCurrentWeek.getTime();
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