import React, { useRef } from 'react'
import { X, RotateCw, Move } from 'lucide-react'

/**
 * Renders sticker/text/badge layers inside the card and handles pointer-driven
 * move / resize / rotate. Coordinates (x, y) are the sticker CENTRE in px
 * relative to the card's top-left.
 * `interactive` is false during export so selection chrome is hidden.
 */
function StickerLayer({ stickers, selectedId, onSelect, onUpdate, onDelete, interactive }) {
    const elRefs = useRef({})
    const drag = useRef(null)

    const handleMove = (e) => {
        const d = drag.current
        if (!d) return

        if (d.mode === 'move') {
            onUpdate(d.id, {
                x: d.origX + (e.clientX - d.startX),
                y: d.origY + (e.clientY - d.startY),
            })
        } else if (d.mode === 'scale') {
            const delta = (e.clientX - d.startX + (e.clientY - d.startY)) / 2
            const next = Math.max(0.3, Math.min(4, d.origScale + delta / 80))
            onUpdate(d.id, { scale: parseFloat(next.toFixed(2)) })
        } else if (d.mode === 'rotate') {
            const rect = d.el.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            const angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90
            let deg = Math.round(angle)
            if (deg > 180) deg -= 360
            if (deg < -180) deg += 360
            onUpdate(d.id, { rotation: deg })
        }
    }

    const endDrag = () => {
        drag.current = null
        window.removeEventListener('pointermove', handleMove)
        window.removeEventListener('pointerup', endDrag)
    }

    const startDrag = (e, mode, s) => {
        e.stopPropagation()
        e.preventDefault()
        onSelect(s.id)
        drag.current = {
            mode,
            id: s.id,
            startX: e.clientX,
            startY: e.clientY,
            origX: s.x,
            origY: s.y,
            origScale: s.scale || 1,
            el: elRefs.current[s.id],
        }
        window.addEventListener('pointermove', handleMove)
        window.addEventListener('pointerup', endDrag)
    }

    return (
        <div className="absolute inset-0 z-40 overflow-hidden pointer-events-none select-none">
            {stickers.map((s) => {
                const selected = interactive && selectedId === s.id
                return (
                    <div
                        key={s.id}
                        ref={(el) => {
                            elRefs.current[s.id] = el
                        }}
                        onPointerDown={interactive ? (e) => startDrag(e, 'move', s) : undefined}
                        className={`absolute select-none transition-shadow ${
                            interactive ? 'pointer-events-auto cursor-move' : ''
                        } ${selected ? 'outline-2 outline-dashed outline-sky-500 ring-4 ring-sky-500/10' : ''}`}
                        style={{
                            left: s.x,
                            top: s.y,
                            transform: `translate(-50%, -50%) rotate(${s.rotation || 0}deg) scale(${s.scale || 1})`,
                            transformOrigin: 'center',
                            lineHeight: 1,
                            padding: 3,
                        }}
                    >
                        {/* 1. Emoji Type */}
                        {s.type === 'emoji' && (
                            <span style={{ fontSize: 38, display: 'inline-block' }}>
                                {s.content}
                            </span>
                        )}

                        {/* 2. Vintage Postal / Tape Stamp Type */}
                        {s.type === 'badge' && (
                            <div className="shadow-xs active:shadow-md transition-shadow">
                                <span className={s.badgeStyle || 'border border-black text-[9px] px-1 font-mono uppercase'}>
                                    {s.content}
                                </span>
                            </div>
                        )}

                        {/* 3. Text Layer Type */}
                        {s.type === 'text' && (
                            <span
                                style={{
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: s.color || '#000000',
                                    whiteSpace: 'nowrap',
                                    fontFamily: s.font || 'inherit',
                                    textShadow: '0 1px 2px rgba(255,255,255,0.4)',
                                    display: 'inline-block',
                                }}
                            >
                                {s.content}
                            </span>
                        )}

                        {/* Interactive Selection Chrome (Hidden during export) */}
                        {selected && (
                            <>
                                {/* Delete button */}
                                <button
                                    type="button"
                                    onPointerDown={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(s.id)
                                    }}
                                    className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md cursor-pointer pointer-events-auto active:scale-90 transition-transform"
                                    style={{
                                        transform: `scale(${1 / (s.scale || 1)})`,
                                        transformOrigin: 'center',
                                    }}
                                    title="Delete Layer"
                                >
                                    <X className="size-3" strokeWidth={3} />
                                </button>

                                {/* Rotate Handle */}
                                <button
                                    type="button"
                                    onPointerDown={(e) => startDrag(e, 'rotate', s)}
                                    className="absolute -top-3 -left-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-1 shadow-md cursor-grab active:cursor-grabbing pointer-events-auto active:scale-90 transition-transform"
                                    style={{
                                        transform: `scale(${1 / (s.scale || 1)})`,
                                        transformOrigin: 'center',
                                    }}
                                    title="Rotate"
                                >
                                    <RotateCw className="size-3" strokeWidth={3} />
                                </button>

                                {/* Resize Handle */}
                                <button
                                    type="button"
                                    onPointerDown={(e) => startDrag(e, 'scale', s)}
                                    className="absolute -bottom-3 -right-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-1 shadow-md cursor-nwse-resize pointer-events-auto active:scale-90 transition-transform"
                                    style={{
                                        transform: `scale(${1 / (s.scale || 1)})`,
                                        transformOrigin: 'center',
                                    }}
                                    title="Resize"
                                >
                                    <Move className="size-3" strokeWidth={3} />
                                </button>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default StickerLayer