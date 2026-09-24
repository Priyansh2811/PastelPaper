import React, { useState } from 'react'

function Bgcolor({onChange, value}) {

    const [color, setColor] = useState("");

    const changeColor = (newColor) => {
        document.documentElement.classList.remove(
        "yellow",
        "sky",
        "pink",
        "green",
        "red",
        "indigo",
        "neutral",
        "purple",
        "orange",
        "custom",
        );
        document.documentElement.classList.add(newColor);
        setColor(newColor);
    };




    
  return (
    <div className='flex flex-col gap-2 w-70'>
        <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-widest'>Preset Colors</span>

        <div className='flex justify-start items-center gap-2 flex-wrap'>

            <div className='relative group'>
                <button onClick={()=> changeColor("yellow")} className={`size-8 rounded-full bg-yellow-300 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200 ${color === "yellow" ? "ring-2 ring-black ring-offset-1" : ""}`}>
                </button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Yellow
                </span>
            </div>
            

            <div className='relative group'>
                <button onClick={()=> changeColor("sky")} className={`size-8 rounded-full bg-sky-300 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                     ${color === "sky" ? "ring-2 ring-black ring-offset-1" : ""}`}></button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Sky
                </span>
            </div>
                



            <div className='relative group'>
                <button onClick={()=> changeColor("pink")} className={`size-8 rounded-full bg-pink-400 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                     ${color === "pink" ? "ring-2 ring-black ring-offset-1" : ""}`}></button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Pink
                </span>
            </div>
                

            <div className='relative group'>
                <button onClick={()=> changeColor("green")} className={`size-8 rounded-full bg-green-400 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                     ${color === "green" ? "ring-2 ring-black ring-offset-1" : ""}`}></button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Green
                </span>
            </div>
                

                

            <div className='relative group'>
                <button onClick={()=> changeColor("red")} className={`size-8 rounded-full bg-red-400 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                     ${color === "red" ? "ring-2 ring-black ring-offset-1" : ""}`}></button>


                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Red
                </span>
            </div>
            

            <div className='relative group'>
                <button onClick={()=> changeColor("indigo")} className={`size-8 rounded-full bg-indigo-400 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                     ${color === "indigo" ? "ring-2 ring-black ring-offset-1" : ""}`}></button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Indigo
                </span>
            </div>
            

            

            <div className='relative group'>
                <button onClick={()=> changeColor("neutral")} className={`size-8 rounded-full bg-neutral-400 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                     ${color === "neutral" ? "ring-2 ring-black ring-offset-1" : ""}`}></button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Gray
                </span>
            </div>
            

            <div className='relative group'>
                <button onClick={()=> changeColor("purple")} className={`size-8 rounded-full bg-purple-400 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                     ${color === "purple" ? "ring-2 ring-black ring-offset-1" : ""}`}></button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Purple
                </span>
            </div>
            


            <div className='relative group'>
                <button onClick={()=> changeColor("orange")} className={`size-8 rounded-full bg-orange-400 active:scale-95 cursor-pointer transition-all hover:scale-105 border border-zinc-200
                 ${color === "orange" ? "ring-2 ring-black ring-offset-1" : ""}
                 `}></button>

                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Orange
                </span>
            </div>
            

            <div className='relative group '>
                <button onClick={()=> changeColor("custom")} className={`relative z-10 overflow-hidden rounded-full size-8 flex justify-center items-center active:scale-95 transition-all border border-zinc-200
                ${color === "custom" ? "ring-2 ring-black ring-offset-1" : ""}`}>

                    <input 
                    type="color" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={` absolute z-5 opacity-0 cursor-pointer rounded-full size-24 border-none outline-none 
                    `} />

                    <img src="./color-wheel.png" alt="" className='absolute inset-0 z-0 size-full scale-125 rounded-full' />
                </button>


                <span className='absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-50'>Custom
                </span>
                
            </div>
            
        </div>
    </div>
  )
}

export default Bgcolor