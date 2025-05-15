import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const LightSwitch: React.FC = () => {
  const { isDayMode, toggleTheme, themeValue } = useTheme();

  // Función que manda el estado del LED al backend
  const sendLedState = async (state: string) => {
    try {
      await axios.post('http://localhost:3001/api/led', { state });
      console.log(`Estado enviado: ${state}`);
    } catch (error) {
      console.error("Error al enviar el estado:", error);
    }
  };

  const handleClick = () => {
    // Alternar tema local como antes
    toggleTheme();
    
    // Enviar nuevo estado al backend
    const newState = themeValue === 1 ? "0" : "1";
    sendLedState(newState);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className={`text-2xl font-bold mb-1 transition-colors duration-700 ${isDayMode ? 'text-sky-900' : 'text-white'}`}>
          {isDayMode ? 'Encendido' : 'Apagado'}
        </h2>
        <p className={`transition-colors duration-700 ${isDayMode ? 'text-sky-700' : 'text-slate-300'}`}>
          valor: {themeValue}
        </p>
      </div>
      
      <div 
        onClick={handleClick}
        className={`group relative w-48 h-48 rounded-full cursor-pointer transition-all duration-500 transform hover:scale-105 ${
          isDayMode ? 'bg-gradient-to-b from-yellow-100 to-yellow-200' : 'bg-gradient-to-b from-slate-800 to-slate-900'
        }`}
      >
        {/* Luz opacidad efecto */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isDayMode ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
          } bg-yellow-300/50 animate-pulse-subtle blur-xl`}
        />
        
        {/* luz borroso efecto */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
            isDayMode 
              ? 'text-yellow-500 scale-110 rotate-0' 
              : 'text-gray-600 scale-100 -rotate-12'
          } group-hover:rotate-0`}
        >
          <Lightbulb className="w-24 h-24" strokeWidth={1.5} />
        </div>
        
        {/* Rayos de luz */}
        <div className={`absolute inset-0 transition-all duration-500 ${isDayMode ? 'opacity-100' : 'opacity-0'}`}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-0.5 bg-yellow-300/50"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 30}deg) translateX(5rem)`,
                transformOrigin: '0 50%',
                animation: `pulse-subtle ${2 + (i % 3)}s infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      <button 
        onClick={handleClick}
        className={`mt-8 px-6 py-2 rounded-full font-medium transition-all duration-500 transform hover:scale-105 ${
          isDayMode 
            ? 'bg-sky-600 text-white hover:bg-sky-700' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        Presionar
      </button>
    </div>
  );
};

export default LightSwitch;