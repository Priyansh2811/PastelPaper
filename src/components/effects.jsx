import React from 'react'
import { LIGHT_LEAKS } from './presets'
import { useStore } from '../store/useStore'

function Slider({ label, value, onChange, min = 0, max = 1, step = 0.01, display }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                <span>{label}</span>
                <span className="font-mono text-zinc-700">{display ?? `${Math.round(value * 100)}%`}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full accent-black h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer hover:bg-zinc-300 transition-colors"
            />
        </div>
    )
}

const RETRO_COMBOS = [
    { label: '90s Cam', grain: 0.35, vignette: 0.4, leak: 'leak1', stamp: true },
    { label: 'Warm Haze', grain: 0.2, vignette: 0.25, leak: 'leak2', stamp: false },
    { label: 'Super 8', grain: 0.65, vignette: 0.55, leak: 'leak3', stamp: false },
    { label: 'Clean', grain: 0, vignette: 0, leak: 'none', stamp: false },
]

export default function Effects(props) {
    // Read from useStore or fallback to props for backward compatibility
    const store = useStore()
    const grain = props.grain !== undefined ? props.grain : store.grain
    const setGrain = props.setGrain || store.setGrain
    const vignette = props.vignette !== undefined ? props.vignette : store.vignette
    const setVignette = props.setVignette || store.setVignette
    const lightLeak = props.lightLeak !== undefined ? props.lightLeak : store.lightLeak
    const setLightLeak = props.setLightLeak || store.setLightLeak
    const dateStamp = props.dateStamp !== undefined ? props.dateStamp : store.dateStamp
    const setDateStamp = props.setDateStamp || store.setDateStamp

    const applyCombo = (combo) => {
        setGrain(combo.grain)
        setVignette(combo.vignette)
        if (LIGHT_LEAKS && (combo.leak in LIGHT_LEAKS || combo.leak === 'none')) {
            setLightLeak(combo.leak)
        }
        setDateStamp(combo.stamp)
    }

    return (
        <div className="flex flex-col gap-4 w-70 animate-fade-in select-none">
            {/* Quick Mood Combos */}
            <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Aesthetic Presets</span>
                <div className="grid grid-cols-4 gap-1.5">
                    {RETRO_COMBOS.map((combo) => (
                        <button
                            key={combo.label}
                            type="button"
                            onClick={() => applyCombo(combo)}
                            className="py-1.5 px-1 text-[10px] font-semibold text-zinc-600 bg-white hover:bg-zinc-100 hover:text-black border border-zinc-200/80 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer text-center"
                        >
                            {combo.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Intensity sliders */}
            <div className="flex flex-col gap-3.5 p-3.5 bg-white border border-zinc-200/80 rounded-2xl shadow-xs">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Film Grain & Vignette</span>
                <Slider label="Film Grain" value={grain} onChange={setGrain} max={0.9} />
                <Slider label="Vignette" value={vignette} onChange={setVignette} max={0.85} />
            </div>

            {/* Light leak presets */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Light Leak</span>
                    {lightLeak !== 'none' && (
                        <button
                            type="button"
                            onClick={() => setLightLeak('none')}
                            className="text-[9px] text-zinc-400 hover:text-zinc-700 underline cursor-pointer"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-100/80 border border-zinc-200/60 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setLightLeak('none')}
                        className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                            lightLeak === 'none'
                                ? 'bg-white text-black shadow-xs border border-zinc-200/40'
                                : 'text-zinc-400 hover:text-zinc-800'
                        }`}
                    >
                        None
                    </button>
                    {LIGHT_LEAKS &&
                        Object.entries(LIGHT_LEAKS).map(([key, leak]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setLightLeak(key)}
                                className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                                    lightLeak === key
                                        ? 'bg-white text-black shadow-xs border border-zinc-200/40'
                                        : 'text-zinc-400 hover:text-zinc-800'
                                }`}
                            >
                                {leak.label}
                            </button>
                        ))}
                </div>
            </div>

            {/* Retro date stamp */}
            <label className="flex items-center justify-between gap-2 cursor-pointer p-3 bg-white border border-zinc-200/80 rounded-2xl shadow-xs hover:border-zinc-300 transition-colors">
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-zinc-700">Retro Date Stamp</span>
                    <span className="text-[9px] text-zinc-400 font-semibold">Glowing 90s camera timestamp</span>
                </div>
                <input
                    type="checkbox"
                    checked={Boolean(dateStamp)}
                    onChange={(e) => setDateStamp(e.target.checked)}
                    className="rounded border-zinc-300 text-black focus:ring-black size-4 cursor-pointer accent-black"
                />
            </label>
        </div>
    )
}