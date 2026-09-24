import React from 'react'
import { SiGithub } from "react-icons/si";
import ThemeToggle from './themeToggle';

function Link() {
    return (
        <div className='absolute z-10 top-4 md:top-13 right-4 md:right-8 flex rounded-lg justify-center items-center gap-3'>

            <ThemeToggle />

            <button>
                <a href="https://github.com/Priyansh2811">
                    <div className='border-2 rounded-lg p-1 bg-white dark:bg-zinc-800 dark:border-zinc-700 hover:bg-neutral-200/80 dark:hover:bg-zinc-700 transition-all duration-100 active:scale-97'>
                        <SiGithub className='size-5 md:size-7 dark:text-white' />
                    </div>
                </a>
            </button>

            
            <button>
                <a href="https://x.com/PriyanshuNauti">
                    <div className='border-2 rounded-lg px-2 py-1 bg-white dark:bg-zinc-800 dark:border-zinc-700 hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-all duration-100 active:scale-97'>
                        <img src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="" className='h-5 md:h-7 dark:invert' />
                    </div>
                </a>
            </button>


        </div>
    )
}

export default Link