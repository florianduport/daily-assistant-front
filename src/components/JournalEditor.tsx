import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { JournalEntry } from '../types';
import { useAppContext } from '../context/AppContext';

interface JournalEditorProps {
  date: Date;
  initialContent: string; // New prop for initial content
  onSave: (content: string) => void; // New prop for save handler
  onDelete: () => void; // New prop for delete handler
}

const JournalEditor: React.FC<JournalEditorProps> = ({ date, initialContent, onSave, onDelete }) => {
  const { journalEntries } = useAppContext();
  const [content, setContent] = useState(initialContent); // Initialize with initialContent
  
  const dateString = format(date, 'yyyy-MM-dd');
  
  // Find existing journal entry for this date
  useEffect(() => {
    const existingEntry = journalEntries.find(entry => entry.date === dateString);
    if (existingEntry) {
      setContent(existingEntry.content);
    } else {
      setContent(initialContent);
    }
  }, [dateString, journalEntries, initialContent]);
  
  const handleSave = () => {
    if (content.trim() === '') {
      onDelete(); // Call delete handler if content is empty
    } else {
      onSave(content); // Call save handler if content is not empty
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">
        Journal du {format(date, 'd MMMM yyyy', { locale: fr })}
      </h3>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        rows={6}
        placeholder="Comment s'est passée votre journée ? Notez vos réflexions, vos succès et vos défis..."
      />
      
      <div className="mt-3 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default JournalEditor;