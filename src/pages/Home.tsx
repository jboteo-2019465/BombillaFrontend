import React from 'react';
import Navbar from '../components/Navbar';
import LightSwitch from '../components/LightSwitch';
import Background from '../components/Background';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { isDayMode } = useTheme();
  
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      
      <main className="relative pt-24 pb-16 min-h-screen flex flex-col items-center justify-center px-4">
        <div className={`max-w-md w-full rounded-2xl p-8 transition-all duration-700 ${
          isDayMode 
            ? 'bg-white/30 backdrop-blur-md shadow-lg' 
            : 'bg-indigo-950/30 backdrop-blur-md shadow-lg'
        }`}>
          <h1 className={`text-center text-4xl font-bold mb-8 transition-colors duration-700 ${
            isDayMode ? 'text-sky-900' : 'text-white'
          }`}>
            Control
          </h1>
          
          <LightSwitch />
          
          <p className={`mt-8 text-center transition-colors duration-700 ${
            isDayMode ? 'text-sky-900' : 'text-slate-300'
          }`}>
            Presiona la bombilla para encender o apagar el luz.
          </p>
        </div>
      </main>
      
      <footer className={`relative py-4 text-center transition-colors duration-700 ${
        isDayMode ? 'text-sky-900' : 'text-slate-400'
      }`}>
      </footer>
    </div>
  );
};

export default Home;