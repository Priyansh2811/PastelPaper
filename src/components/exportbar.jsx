import React, { useState, useEffect } from 'react'
import { MdOutlineFileDownload, MdCheck } from 'react-icons/md'
import { FiCopy, FiShare2 } from 'react-icons/fi'
import { useStore } from '../store/useStore'

export default function ExportBar(props) {
    const store = useStore()
    const format = props.format ?? store.exportFormat ?? 'png'
    const setFormat = props.setFormat ?? store.setExportFormat
    const busy = props.busy ?? store.isExporting ?? false

    const [scale, setScale] = useState(2) // 1x, 2x (Standard HD), 3x (Print Ultra)
    const [copied, setCopied] = useState(false)
    const [canShare, setCanShare] = useState(false)

    useEffect(() => {
        if (typeof navigator !== 'undefined' && !!navigator.share) {
            setCanShare(true)
        }
    }, [])

    const handleCopy = async () => {
        if (props.onCopy) {
            await props.onCopy(scale)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleDownload = () => {
        if (props.onDownload) {
            props.onDownload({ format, scale })
        }
    }

    const handleShare = () => {
        if (props.onShare) {
            props.onShare({ format, scale })
        }
    }

    return (
        <div className="flex flex-col gap-2.5 w-full select-none">
            {/* Format & Scale Row */}
            <div className="flex items-center gap-1.5">
                {/* Format Toggle */}
                <div className="flex-1 flex items-center justify-center p-0.5 bg-zinc-100 border border-zinc-200/80 rounded-xl">
                    {['png', 'jpg'].map((f) => (
                        <button
                            key={f}
                            type="button"
                            onClick={() => setFormat(f)}
                            className={`flex-1 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                                format === f
                                    ? 'bg-white text-black shadow-xs font-semibold'
                                    : 'text-zinc-400 hover:text-zinc-700'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Resolution / DPI Multiplier */}
                <div className="flex items-center p-0.5 bg-zinc-100 border border-zinc-200/80 rounded-xl">
                    {[
                        { label: '1x', val: 1 },
                        { label: '2x HD', val: 2 },
                        { label: '3x Print', val: 3 },
                    ].map((s) => (
                        <button
                            key={s.val}
                            type="button"
                            onClick={() => setScale(s.val)}
                            className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                                scale === s.val
                                    ? 'bg-white text-black shadow-xs font-semibold'
                                    : 'text-zinc-400 hover:text-zinc-700'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Primary Download Button */}
            <button
                type="button"
                onClick={handleDownload}
                disabled={busy}
                className="w-full bg-zinc-900 text-white hover:bg-black active:scale-[0.98] transition-all py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest cursor-pointer hover:shadow-md flex justify-center items-center gap-1.5 shadow-xs disabled:opacity-60 disabled:cursor-wait"
            >
                <MdOutlineFileDownload className="text-base" />
                {busy ? 'Rendering Card…' : `Download (${format.toUpperCase()} ${scale}x)`}
            </button>

            {/* Secondary Actions (Copy & Web Share) */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleCopy}
                    disabled={busy}
                    className="flex-1 border border-zinc-200/80 hover:bg-zinc-50 active:scale-95 transition-all py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider cursor-pointer text-zinc-700 bg-white flex justify-center items-center gap-1.5 shadow-xs disabled:opacity-60"
                >
                    {copied ? (
                        <>
                            <MdCheck className="text-sm text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                        </>
                    ) : (
                        <>
                            <FiCopy className="text-sm" /> Copy
                        </>
                    )}
                </button>

                {(canShare || props.canShare) && (
                    <button
                        type="button"
                        onClick={handleShare}
                        disabled={busy}
                        className="flex-1 border border-zinc-200/80 hover:bg-zinc-50 active:scale-95 transition-all py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider cursor-pointer text-zinc-700 bg-white flex justify-center items-center gap-1.5 shadow-xs disabled:opacity-60"
                    >
                        <FiShare2 className="text-sm" /> Share
                    </button>
                )}
            </div>
        </div>
    )
}