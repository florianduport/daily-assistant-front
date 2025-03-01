import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Calendar, Clock, Home } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { selectedDate } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getTitle = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return 'Mon Programme Hebdomadaire';
    } else if (path === '/weekly-schedule') {
      return 'Planning de la Semaine';
    } else if (path.startsWith('/day/')) {
      return `Journée du ${format(selectedDate, 'd MMMM yyyy', { locale: fr })}`;
    } else if (path.startsWith('/workout/')) {
      return 'Détail de l\'Entraînement';
    } else if (path === '/meal-plan') {
      return 'Plan de Batch Cooking';
    }
    
    return 'Mon Programme';
  };

  return (
    <header className="bg-indigo-600 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">{getTitle()}</h1>
        
        <button 
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-indigo-700 transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white text-gray-800 shadow-lg rounded-lg w-64 z-20">
            <nav className="py-2">
              <ul>
                <li>
                  <Link 
                    to="/" 
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home size={18} className="mr-2" />
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/weekly-schedule" 
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar size={18} className="mr-2" />
                    Planning Hebdomadaire
                  </Link>
                </li>
                <li>
                  <Link 
                    to={`/day/${format(new Date(), 'yyyy-MM-dd')}`}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Clock size={18} className="mr-2" />
                    Journée d'Aujourd'hui
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/meal-plan" 
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                      <path d="M7 2v20"></path>
                      <path d="M21 15V2"></path>
                      <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                    </svg>
                    Batch Cooking
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;