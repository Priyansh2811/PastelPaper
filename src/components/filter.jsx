import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const FILTER_PRESETS = [
  { id: '', name: 'Normal', css: 'none' },
  { id: 'warm-70s', name: 'Warm 70s', css: 'sepia(0.35) saturate(1.35) contrast(1.1) brightness(1.04)' },
  { id: 'kodak-portra', name: 'Portra 400', css: 'contrast(1.08) brightness(1.05) saturate(1.2) sepia(0.12)' },
  { id: 'film-noir', name: 'B&W Noir', css: 'grayscale(1) contrast(1.3) brightness(0.92)' },
  { id: 'fuji-velvia', name: 'Velvia', css: 'saturate(1.5) contrast(1.15) brightness(0.98)' },
  { id: 'polaroid-fade', name: 'Faded Film', css: 'contrast(0.85) brightness(1.12) saturate(0.75) sepia(0.18)' },
  { id: 'cool-slate', name: 'Cool Mist', css: 'hue-rotate(190deg) saturate(0.75) contrast(1.05)' },
  { id: 'golden-hour', name: 'Golden Hour', css: 'sepia(0.45) saturate(1.55) brightness(1.08) contrast(1.05)' },
  { id: 'cyber-neon', name: 'Moody Teal', css: 'contrast(1.2) hue-rotate(150deg) saturate(1.3)' },
];

export default function Filter() {
  const { filter, setFilter, image } = useStore();
  const [filterIntensity, setFilterIntensity] = useState(1);

  const activePreset = FILTER_PRESETS.find((p) => p.id === filter) || FILTER_PRESETS[0];

  const handleSelectFilter = (presetId) => {
    setFilter(presetId);
  };

  return (
    <div className="flex flex-col gap-4 w-70 animate-fade-in select-none">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Color Presets
        </span>
        {filter && (
          <button
            type="button"
            onClick={() => setFilter('')}
            className="text-[9px] text-zinc-400 hover:text-zinc-800 underline cursor-pointer"
          >
            Reset to Normal
          </button>
        )}
      </div>

      {/* Filter Presets Grid */}
      <div className="grid grid-cols-3 gap-2">
        {FILTER_PRESETS.map((preset) => {
          const isSelected = filter === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectFilter(preset.id)}
              className={`group flex flex-col items-center gap-1.5 p-1.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-black bg-zinc-100 shadow-xs ring-1 ring-black/10'
                  : 'border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'
              }`}
            >
              {/* Mini Preview Box */}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-zinc-200 relative">
                {image ? (
                  <img
                    src={image}
                    alt={preset.name}
                    style={{ filter: preset.css }}
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <div
                    style={{
                      filter: preset.css,
                      background: 'linear-gradient(135deg, #fbcfe8, #fed7aa, #bae6fd)',
                    }}
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] truncate max-w-full font-medium ${
                  isSelected ? 'text-black font-bold' : 'text-zinc-500'
                }`}
              >
                {preset.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Intensity Slider (Visible when any non-default filter is picked) */}
      {filter && activePreset.css !== 'none' && (
        <div className="flex flex-col gap-1 p-3 bg-white border border-zinc-200/80 rounded-2xl shadow-xs">
          <div className="flex justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            <span>Filter Opacity</span>
            <span className="font-mono text-zinc-700">{Math.round(filterIntensity * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={filterIntensity}
            onChange={(e) => setFilterIntensity(parseFloat(e.target.value))}
            className="w-full accent-black h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}