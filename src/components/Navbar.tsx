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
            
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
