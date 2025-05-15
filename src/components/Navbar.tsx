import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isDayMode } = useTheme();
  
  return (
    <nav className={`fixed w-full z-10 transition-colors duration-1000 ${isDayMode ? 'bg-sky-500/80 text-white' : 'bg-indigo-950/80 text-slate-200'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Lightbulb className={`h-6 w-6 ${isDayMode ? 'text-yellow-300' : 'text-slate-400'}`} />
          <span className="font-bold text-xl">Controlador de Luz</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
        
        </div>
        
        <div className="md:hidden">
          <button className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;