import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomePage } from './pages/HomePage';
import { TutorialPage } from './pages/TutorialPage';


function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
       
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="mr-2" size={24} />
              <span className="text-xl font-bold">Grade Calculator</span>
            </div>
            <p className="text-gray-400">
              Empowering students with accurate grade calculations
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © 2025 GradeCalculator. Built with precision and care.
            </p>
            <br />
            <p className="text-gray-400">
              By Team MSV —{' '}
              <a
                href="mailto:Msv.innovation@gmail.com"
                className="underline hover:text-gray-300"
              >
                Msv.innovation@gmail.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
