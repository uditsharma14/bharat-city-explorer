import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Users, Info, Sparkles, X, ChevronRight, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { INDIAN_CITIES, type City } from './cities';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const filteredCities = useMemo(() => {
    return INDIAN_CITIES.filter(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const fetchInsights = async (city: City) => {
    setIsLoadingInsights(true);
    setAiInsights(null);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Provide 3 unique fun facts and 2 travel tips for the city of ${city.name}, ${city.state}, India. Format the response in clean Markdown with headers.`,
      });
      setAiInsights(response.text || "No insights found.");
    } catch (error) {
      console.error("Error fetching insights:", error);
      setAiInsights("Failed to load AI insights. Please try again.");
    } finally {
      setIsLoadingInsights(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchInsights(selectedCity);
    }
  }, [selectedCity]);

  return (
    <div className="min-h-screen relative text-[#1A1A1A] font-sans selection:bg-[#FF6321] selection:text-white">
      {/* Catchy Travel Background */}
      <div className="fixed inset-0 z-0 bg-[#FF6321]">
        <img 
          src="https://picsum.photos/seed/india-heritage/1920/1080" 
          alt="Travel Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6321]/60 to-[#FF9D2E]/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif italic font-medium tracking-tight text-[#1A1A1A]">India City Explorer</h1>
              <p className="text-sm text-[#1A1A1A]/70 font-medium uppercase tracking-widest mt-1">Discover the heartbeat of the subcontinent</p>
            </div>
            
            <div className="relative group max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40 group-focus-within:text-[#FF6321] transition-colors" />
              <input
                type="text"
                placeholder="Search cities or states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-white/40 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF6321]/30 focus:border-[#FF6321] transition-all placeholder:text-[#1A1A1A]/40 shadow-inner"
              />
            </div>
          </div>
        </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* City List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">
                {filteredCities.length} Cities Found
              </span>
            </div>
            
            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCities.map((city) => (
                <motion.button
                  key={city.name}
                  layoutId={`city-${city.name}`}
                  onClick={() => setSelectedCity(city)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all duration-300 group backdrop-blur-md",
                    selectedCity?.name === city.name
                      ? "bg-white border-white text-[#1A1A1A] shadow-xl shadow-black/10 scale-[1.02]"
                      : "bg-white/40 border-white/20 hover:bg-white/60 hover:border-white/40 hover:shadow-md text-white"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-serif italic font-semibold">{city.name}</h3>
                      <p className={cn(
                        "text-xs font-medium uppercase tracking-wider mt-0.5",
                        selectedCity?.name === city.name ? "text-[#1A1A1A]/60" : "text-white/80"
                      )}>
                        {city.state}
                      </p>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform group-hover:translate-x-1",
                      selectedCity?.name === city.name ? "text-[#FF6321]" : "text-white/60"
                    )} />
                  </div>
                </motion.button>
              ))}
              {filteredCities.length === 0 && (
                <div className="text-center py-12 bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-white/40">
                  <p className="text-white/80 italic">No cities match your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedCity ? (
                <motion.div
                  key={selectedCity.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-white/50 shadow-2xl shadow-black/20 overflow-hidden sticky top-32"
                >
                  {/* Hero Section */}
                  <div className="relative h-64 bg-[#1A1A1A] overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${selectedCity.name}/1200/600`}
                      alt={selectedCity.name}
                      className="w-full h-full object-cover opacity-70 scale-105 hover:scale-100 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#FF6321]" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{selectedCity.state}</span>
                      </div>
                      <h2 className="text-5xl md:text-6xl font-serif italic font-medium text-white drop-shadow-lg">{selectedCity.name}</h2>
                    </div>
                    <button 
                      onClick={() => setSelectedCity(null)}
                      className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div className="space-y-6">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#FF6321] block mb-2">About</label>
                          <p className="text-lg leading-relaxed text-[#1A1A1A]/80 font-serif">
                            {selectedCity.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FF6321]/10 flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#FF6321]" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40">Population</p>
                              <p className="font-mono text-sm font-semibold">{selectedCity.population}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-[#FF6321]/5 to-[#FF9D2E]/10 rounded-3xl p-6 relative overflow-hidden border border-[#FF6321]/10 group">
                        <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-[#FF6321]/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-[#FF6321]" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF6321]">AI Insights</h4>
                          </div>
                          
                          {isLoadingInsights ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                              <Loader2 className="w-8 h-8 text-[#FF6321] animate-spin" />
                              <p className="text-xs font-medium text-[#1A1A1A]/40 animate-pulse">Consulting the archives...</p>
                            </div>
                          ) : (
                            <div className="prose prose-sm prose-stone max-w-none prose-headings:font-serif prose-headings:italic prose-headings:text-[#FF6321] prose-p:text-[#1A1A1A]/70">
                              <ReactMarkdown>{aiInsights || ''}</ReactMarkdown>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#1A1A1A]/10 pt-8 flex flex-wrap gap-4">
                      <div className="px-4 py-2 bg-white border border-[#1A1A1A]/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 shadow-sm">
                        # {selectedCity.name.toLowerCase()}
                      </div>
                      <div className="px-4 py-2 bg-white border border-[#1A1A1A]/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 shadow-sm">
                        # {selectedCity.state.toLowerCase()}
                      </div>
                      <div className="px-4 py-2 bg-white border border-[#1A1A1A]/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 shadow-sm">
                        # travelindia
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/40 shadow-xl"
                >
                  <div className="w-20 h-20 bg-[#FF6321]/10 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10 text-[#FF6321]" />
                  </div>
                  <h2 className="text-3xl font-serif italic font-medium mb-4 text-[#1A1A1A]">Select a city to explore</h2>
                  <p className="text-[#1A1A1A]/60 max-w-md mx-auto leading-relaxed">
                    Choose a city from the list to discover its unique character, population details, and AI-generated travel insights.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/20 mt-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#FF6321] font-serif italic font-bold shadow-sm">I</div>
            <span className="text-sm font-serif italic font-medium text-white drop-shadow-sm">India City Explorer</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 drop-shadow-sm">
            Powered by Gemini AI & React & Udit Sharma
          </p>
        </div>
      </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}} />
    </div>
  );
}
