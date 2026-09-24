import React, { useState } from 'react'
import { Type, Trash2, ArrowUpToLine, Copy, RotateCcw } from 'lucide-react'
import { useStore } from '../store/useStore'

const EMOJI_CATEGORIES = {
    Aesthetic: ['✨', '🌸', '💫', '🦋', '🧸', '🍓', '💌', '🎀', '🌙', '☁️', '🍒', '🕯️'],
    Retro: ['📸', '📼', '📻', '🎞️', '💿', '🕹️', '🕊️', '☕', '🍂', '🗝️', '🪴', '🗞️'],
    Vibes: ['❤️', '🔥', '🎉', '😎', '⚡', '🌊', '👽', '🧿', '👑', '🎈', '⭐', '🌻'],
}

const VINTAGE_BADGES = [
    { label: 'EXPIRED', style: 'border border-red-500 text-red-500 font-mono text-[9px] px-1.5 py-0.5 tracking-widest font-black uppercase' },
    { label: 'AIR MAIL', style: 'border-2 border-blue-600 text-blue-600 font-bold text-[9px] px-1.5 py-0.5 tracking-wider uppercase' },
    { label: 'ORIGINAL', style: 'bg-black text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest' },
    { label: 'PAID // 1998', style: 'border border-emerald-600 text-emerald-600 font-mono text-[9px] px-1.5 py-0.5 font-bold uppercase' },
]

export default function Stickers(props) {
    const store = useStore()
  const stickers = props.stickers ?? store.stickers ?? []
  const selectedId = props.selectedId !== undefined ? props.selectedId : store.selectedSticker
  const { setStickers, setSelectedSticker } = store
    const [activeTab, setActiveTab] = useState('Aesthetic')

    // Universal handlers supporting both passed props and store actions
    const handleAdd = (item) => {
        const newSticker = {
            id: 'sticker_' + Date.now(),
            x: 40,
            y: 50,
            scale: 1,
            rotation: 0,
            ...item,
        }
        if (props.onAdd) {
            props.onAdd(newSticker)
        } else {
            setStickers([...stickers, newSticker])
            setSelectedSticker(newSticker.id)
        }
    }

    const handleUpdate = (id, changes) => {
        if (props.onUpdate) {
            props.onUpdate(id, changes)
        } else {
            setStickers(stickers.map((s) => (s.id === id ? { ...s, ...changes } : s)))
        }
    }

    const handleDelete = (id) => {
        if (props.onDelete) {
            props.onDelete(id)
        } else {
            setStickers(stickers.filter((s) => s.id !== id))
            if (selectedId === id) setSelectedSticker(null)
        }
    }

    const handleBringFront = (id) => {
        if (props.onBringFront) {
            props.onBringFront(id)
        } else {
            const item = stickers.find((s) => s.id === id)
            if (!item) return
            setStickers([...stickers.filter((s) => s.id !== id), item])
        }
    }

    const handleDuplicate = (sticker) => {
        const copy = {
            ...sticker,
            id: 'sticker_' + Date.now(),
            x: (sticker.x || 0) + 15,
            y: (sticker.y || 0) + 15,
        }
        setStickers([...stickers, copy])
        setSelectedSticker(copy.id)
    }

    const selected = stickers.find((s) => s.id === selectedId)

    return (
        <div className="flex flex-col gap-4 w-70 animate-fade-in select-none">
            {/* Category Switcher */}
            <div className="flex bg-zinc-100 p-0.5 rounded-xl border border-zinc-200/80">
                {Object.keys(EMOJI_CATEGORIES).map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveTab(cat)}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                            activeTab === cat
                                ? 'bg-white text-black shadow-xs font-semibold'
                                : 'text-zinc-400 hover:text-zinc-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sticker Grid */}
            <div className="grid grid-cols-6 gap-1 p-2 bg-white border border-zinc-200/80 rounded-2xl shadow-xs">
                {EMOJI_CATEGORIES[activeTab].map((emoji) => (
                    <button
                        key={emoji}
                        type="button"
                        onClick={() => handleAdd({ type: 'emoji', content: emoji })}
                        className="text-xl rounded-lg hover:bg-zinc-100 active:scale-90 transition-all cursor-pointer aspect-square flex items-center justify-center"
                    >
                        {emoji}
                    </button>
                ))}
            </div>

            {/* Vintage Postal Badges */}
            <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Postal & Film Stamps</span>
                <div className="grid grid-cols-2 gap-1.5">
                    {VINTAGE_BADGES.map((badge) => (
                        <button
                            key={badge.label}
                            type="button"
                            onClick={() => handleAdd({ type: 'badge', content: badge.label, badgeStyle: badge.style })}
                            className="p-2 bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-xl shadow-xs flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                        >
                            <span className={badge.style}>{badge.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Add Custom Text Layer */}
            <button
                type="button"
                onClick={() =>
                    handleAdd({
                        type: 'text',
                        content: 'Cherish this',
                        color: '#000000',
                        font: "'Caveat', cursive",
                    })
                }
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-black text-white hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer text-xs font-bold uppercase tracking-wider shadow-xs"
            >
                <Type className="size-4" />
                Add Text Layer
            </button>

            {/* Layer Inspector / Editor */}
            {selected ? (
                <div className="flex flex-col gap-3 p-3.5 bg-white border border-zinc-200/80 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                            Edit {selected.type === 'text' ? 'Text' : selected.type === 'badge' ? 'Stamp' : 'Sticker'}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                title="Duplicate layer"
                                onClick={() => handleDuplicate(selected)}
                                className="text-zinc-400 hover:text-black cursor-pointer p-0.5"
                            >
                                <Copy className="size-3.5" />
                            </button>
                            <button
                                type="button"
                                title="Delete layer"
                                onClick={() => handleDelete(selected.id)}
                                className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-600 cursor-pointer"
                            >
                                <Trash2 className="size-3.5" />
                            </button>
                        </div>
                    </div>

                    {selected.type === 'text' && (
                        <>
                            <input
                                value={selected.content}
                                onChange={(e) => handleUpdate(selected.id, { content: e.target.value })}
                                className="border border-zinc-200 focus:border-black outline-none rounded-xl p-2 w-full text-xs font-semibold bg-white"
                                placeholder="Type here..."
                                maxLength={50}
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Color</span>
                                <input
                                    type="color"
                                    value={selected.color || '#000000'}
                                    onChange={(e) => handleUpdate(selected.id, { color: e.target.value })}
                                    className="size-6 rounded-md cursor-pointer border border-zinc-200 bg-white"
                                />
                            </div>
                        </>
                    )}

                    {/* Scale Slider */}
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                            <span>Size</span>
                            <span className="font-mono">{selected.scale?.toFixed(2) || '1.00'}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.3"
                            max="3"
                            step="0.05"
                            value={selected.scale || 1}
                            onChange={(e) => handleUpdate(selected.id, { scale: parseFloat(e.target.value) })}
                            className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Rotation Slider & Quick Snaps */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                            <span>Rotation</span>
                            <span className="font-mono">{selected.rotation || 0}°</span>
                        </div>
                        <input
                            type="range"
                            min="-180"
                            max="180"
                            step="1"
                            value={selected.rotation || 0}
                            onChange={(e) => handleUpdate(selected.id, { rotation: parseInt(e.target.value) })}
                            className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between gap-1 pt-1">
                            {[-15, 0, 15].map((deg) => (
                                <button
                                    key={deg}
                                    type="button"
                                    onClick={() => handleUpdate(selected.id, { rotation: deg })}
                                    className="flex-1 py-1 text-[9px] font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-md cursor-pointer"
                                >
                                    {deg === 0 ? <RotateCcw className="size-2.5 mx-auto" /> : `${deg}°`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bring to Front */}
                    <button
                        type="button"
                        onClick={() => handleBringFront(selected.id)}
                        className="flex items-center justify-center gap-1.5 py-1.5 border border-zinc-200 hover:bg-zinc-50 rounded-xl text-[9px] font-bold uppercase tracking-wider text-zinc-600 transition-colors cursor-pointer bg-white"
                    >
                        <ArrowUpToLine className="size-3" /> Bring to Front
                    </button>
                </div>
            ) : (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 text-center">
                    <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
                        Click any sticker to place it on the canvas, then drag to reposition.
                    </p>
                </div>
            )}
        </div>
    )
}