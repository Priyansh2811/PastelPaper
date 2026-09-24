

import React, { useState } from 'react'
import { HiBold } from "react-icons/hi2";

function Bold({onChange, value}) {

    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [strike, setStrike] = useState(false);

    const toggleBold = () => {
        document.documentElement.classList.toggle("boldtext");
        setBold(bold => !bold)
    }

    const toggleItalic = () => {
        document.documentElement.classList.toggle("italicText");
        setItalic(italic => !italic)
    }

    const toggleUnderline = () => {
        document.documentElement.classList.toggle("underlinetext");
        setUnderline(underline => !underline)
    }

    const toggleStrike = () => {
        document.documentElement.classList.toggle("strike");
        setStrike(strike => !strike)
    }

    const changeTextColor = () => {
        document.documentElement.classList.add("customText");
    };


    
  return (
    <div className='flex flex-col gap-2 w-70'>
        <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-widest'>Text Style</span>
        <div className='flex items-center gap-2'>
            
            <button 
                onClick={toggleBold} 
                className={`rounded-lg border border-zinc-200 size-9 text-base font-bold cursor-pointer active:scale-95 flex justify-center items-center transition-all duration-100
                    ${bold ? "bg-black text-white hover:bg-zinc-800" : "hover:bg-zinc-100 bg-white"}`}
            >
                <HiBold/>
            </button>

            <button 
                onClick={toggleItalic} 
                className={`rounded-lg border border-zinc-200 size-9 text-base font-mono cursor-pointer active:scale-95 flex justify-center items-center transition-all duration-100 italic
                    ${italic ? "bg-black text-white hover:bg-zinc-800" : "hover:bg-zinc-100 bg-white"}`}
            >
                I
            </button>



            <button 
                onClick={toggleUnderline} 
                className={`rounded-lg border border-zinc-200 size-9 text-sm font-semibold cursor-pointer active:scale-95 flex justify-center items-center transition-all duration-100 underline
                    ${underline ? "bg-black text-white hover:bg-zinc-800" : "hover:bg-zinc-100 bg-white"}`}
            >
                U
            </button>



            <button 
                onClick={toggleStrike} 
                className={`rounded-lg border border-zinc-200 size-9 text-base cursor-pointer active:scale-95 flex justify-center items-center transition-all duration-100 line-through
                    ${strike ? "bg-black text-white hover:bg-zinc-800" : "hover:bg-zinc-100 bg-white"}`}
            >
                S
            </button>



            <div className='relative group'>
                <button 
                    onClick={changeTextColor} 
                    className="relative z-10 border border-zinc-200 overflow-hidden rounded-lg size-9 flex justify-center items-center active:scale-95 bg-white transition-all"
                >
                    <input 
                        type="color" 
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            changeTextColor();
                        }}
                        className="absolute z-5 opacity-0 cursor-pointer size-24 border-none outline-none" 
                    />
                    <div 
                        className="size-5 rounded-md border border-zinc-300 shadow-sm"
                        style={{ backgroundColor: value || '#000000' }}
                    />
                </button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Color
                </span>
            </div>

        </div>
    </div>
  )
}

export default Bold