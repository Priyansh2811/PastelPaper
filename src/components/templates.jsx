import React from 'react'
import { TEMPLATES } from './presets'

function Templates({ template, onChange }) {
    return (
        <div className="flex flex-col gap-1.5 w-70">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Template & Format</span>
            <div className="grid grid-cols-4 gap-1.5">
                {Object.entries(TEMPLATES).map(([key, t]) => {
                    const isActive = template === key
                    // little preview rectangle scaled to a 26px box, preserving ratio
                    const longest = Math.max(t.w, t.h)
                    const pw = Math.round((t.w / longest) * 26)
                    const ph = Math.round((t.h / longest) * 26)
                    return (
                        <button
                            key={key}
                            onClick={() => onChange(key)}
                            className={`flex flex-col items-center justify-end gap-1.5 py-2.5 rounded-xl border transition-all cursor-pointer h-[64px] ${
                                isActive
                                    ? 'border-black bg-white shadow-sm'
                                    : 'border-zinc-200 bg-zinc-50 hover:border-zinc-400'
                            }`}
                        >
                            <div className="flex-1 flex items-center justify-center">
                                <div
                                    className={`rounded-[2px] ${isActive ? 'bg-black' : 'bg-zinc-300'}`}
                                    style={{ width: pw, height: ph }}
                                />
                            </div>
                            <span className={`text-[8px] font-bold uppercase tracking-wider leading-none ${isActive ? 'text-black' : 'text-zinc-500'}`}>
                                {t.label}
                            </span>
                        </button>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default Templates
