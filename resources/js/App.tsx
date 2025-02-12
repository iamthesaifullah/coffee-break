import React, { useState, useEffect } from 'react';
import { Code2, Coffee, Moon, Sun, Keyboard } from 'lucide-react';

const quotes = [
  "Code, Coffee, Repeat - The Developer's Mantra",
  "Take breaks, make fewer mistakes",
  "Fresh code comes from a fresh mind"
];

function App() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [cyclePhase, setCyclePhase] = useState<'tired' | 'break' | 'energized'>('tired');

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    const cycleInterval = setInterval(() => {
      setCyclePhase((prev) => {
        if (prev === 'tired') return 'break';
        if (prev === 'break') return 'energized';
        return 'tired';
      });
    }, 8000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(cycleInterval);
    };
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping((prev) => !prev);
    }, 500);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="relative">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#0099ff] rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10">
            {/* Scene container */}
            <div className="grid gap-8 md:grid-cols-3 items-center bg-[#111111] rounded-xl p-8 shadow-2xl border border-[#0099ff]/20">
              {/* Tired Developer Scene */}
              <div className={`transition-opacity duration-1000 ${cyclePhase === 'tired' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center space-y-4">
                  <Moon className="w-16 h-16 text-[#00ffff] animate-pulse" />
                  <div className="relative w-32 h-32 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                    <div className="animate-slouch">
                      <Code2 className="w-20 h-20 text-[#0099ff]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-[#00ffff]">Tired Coding</p>
                    <p className="text-sm text-gray-400">Low Energy Phase</p>
                  </div>
                </div>
              </div>

              {/* Coffee Break Scene */}
              <div className={`transition-opacity duration-1000 ${cyclePhase === 'break' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center space-y-4">
                  <Coffee className="w-16 h-16 text-[#00ffff] animate-bounce" />
                  <div className="relative">
                    <div className="w-32 h-32 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                      <div className="animate-steam">
                        <div className="w-1 h-8 bg-gradient-to-t from-[#0099ff] to-transparent rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-[#00ffff]">Coffee Break</p>
                    <p className="text-sm text-gray-400">Recharging...</p>
                  </div>
                </div>
              </div>

              {/* Energized Developer Scene */}
              <div className={`transition-opacity duration-1000 ${cyclePhase === 'energized' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center space-y-4">
                  <Sun className="w-16 h-16 text-[#00ffff] animate-spin-slow" />
                  <div className="relative w-32 h-32 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                    <div className="animate-type">
                      <Keyboard className="w-20 h-20 text-[#0099ff]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-[#00ffff]">Peak Performance</p>
                    <p className="text-sm text-gray-400">Maximum Productivity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotes Section */}
            <div className="mt-8 text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00ffff] to-[#0099ff] text-transparent bg-clip-text animate-glow">
                {quotes[currentQuote]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
