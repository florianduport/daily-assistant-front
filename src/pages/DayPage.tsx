import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, parse } from 'date-fns';
import DaySchedule from '../components/DaySchedule';
import JournalEditor from '../components/JournalEditor';
import { fetchFromAPI } from '../utils/apiUtil';

const DayPage: React.FC = () => {
  const { dateString } = useParams<{ dateString: string }>();
  const [date, setDate] = useState(() => 
    dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : new Date()
  );
  const [tasksForDay, setTasksForDay] = useState<any[]>([]);
  const [journalNotes, setJournalNotes] = useState<string | null>(null);
  const [journalId, setJournalId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const tasks = await fetchFromAPI(`tasks/today?date=${formattedDate}`);
        setTasksForDay(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [date]);

  const fetchJournalNotes = async () => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await fetchFromAPI(`journals/today?date=${formattedDate}`);
      if (response) {
        setJournalNotes(response.notes);
        setJournalId(response._id);
      } else {
        setJournalNotes(''); // Clear notes if no journal is returned
      }
    } catch (error) {
      console.error('Error fetching journal notes:', error);
    }
  };

  useEffect(() => {
    fetchJournalNotes();
  }, [date]);

  const handleTaskCompletion = async (taskId: string, isChecked: boolean) => {
    try {
      const taskToUpdate = tasksForDay.find(task => task._id === taskId);
      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, isCompleted: isChecked };
        const formattedDate = format(date, 'yyyy-MM-dd');
        await fetchFromAPI(`tasks/${taskId}/today?date=${formattedDate}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });
        setTasksForDay(prevTasks =>
          prevTasks.map(task =>
            task._id === taskId ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDeletion = async (taskId: string) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      await fetchFromAPI(`tasks/${taskId}/today?date=${formattedDate}`, {
        method: 'DELETE',
      });
      setTasksForDay(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSaveJournal = async (content: string) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      if (journalId) {
        // Update existing journal entry
        await fetchFromAPI(`journals/${journalId}/today?date=${formattedDate}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes: content }),
        });
        setJournalNotes(content);
      } else {
        // Create new journal entry
        const response = await fetchFromAPI('journals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: formattedDate,
            notes: content,
            completedTasks: [],
          }),
        });
        if (response && response._id) {
          setJournalId(response._id);
          setJournalNotes(content);
        }
      }
    } catch (error) {
      console.error('Error saving journal notes:', error);
    }
  };

  const handleDeleteJournal = async () => {
    if (!journalId) return;
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      await fetchFromAPI(`journals/${journalId}/today?date=${formattedDate}`, {
        method: 'DELETE',
      });
      setJournalNotes(null);
      setJournalId(null);
    } catch (error) {
      console.error('Error deleting journal notes:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <DaySchedule 
        date={date} 
        tasks={tasksForDay} 
        onTaskComplete={handleTaskCompletion} 
        onTaskDelete={handleTaskDeletion} 
      />
      <JournalEditor 
        date={date} 
        initialContent={journalNotes || ''} 
        onSave={handleSaveJournal} 
        onDelete={handleDeleteJournal} 
      />
    </div>
  );
};

export default DayPage;