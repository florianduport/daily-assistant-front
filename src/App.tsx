import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import WeeklySchedulePage from './pages/WeeklySchedulePage';
import DayPage from './pages/DayPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import MealPlanPage from './pages/MealPlanPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/weekly-schedule" element={<WeeklySchedulePage />} />
              <Route path="/day/:dateString" element={<DayPage />} />
              <Route path="/workout/:workoutId" element={<WorkoutDetailPage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;