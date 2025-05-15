import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Background: React.FC = () => {
  const { isDayMode } = useTheme();
  
  return (
    <div 
      className={`fixed inset-0 w-full h-full transition-all duration-1000 ${
        isDayMode 
          ? 'bg-gradient-to-b from-sky-400 to-blue-500' 
          : 'bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900'
      }`}
    >
      {/* Elementos animados del fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nubes */}
        <div 
          className={`transition-opacity duration-1000 ${
            isDayMode ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute top-20 left-[10%] w-32 h-16 bg-white rounded-full blur-md opacity-80 animate-float"></div>
          <div className="absolute top-40 left-[30%] w-48 h-20 bg-white rounded-full blur-md opacity-80 animate-float-slow"></div>
          <div className="absolute top-10 right-[15%] w-40 h-16 bg-white rounded-full blur-md opacity-80 animate-float-slower"></div>
        </div>
        
        {/* Elementos de la noche */}
        <div 
          className={`transition-opacity duration-1000 ${
            isDayMode ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Estrellas */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white rounded-full animate-twinkle-${i % 2 ? 'delayed' : ''}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Moon glow */}
          <div className="absolute top-[10%] right-[10%] w-20 h-20 bg-slate-200 rounded-full blur-xl opacity-40"></div>
          <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-slate-100 rounded-full"></div>
          
          {/* Northern lights effect */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-blue-500/10 to-transparent transform -translate-y-32"></div>
        </div>
      </div>
    </div>
  );
};

export default Background;