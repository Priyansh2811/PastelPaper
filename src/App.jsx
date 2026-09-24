import React, { useRef } from 'react';
import { useStore } from './store/useStore';
import './App.css';
import { Analytics } from "@vercel/analytics/react";
import { PanelLeftOpen } from 'lucide-react';
import Link from './components/link';
import CropModal from './components/cropModal';

import Sidebar from './components/Sidebar';
import PreviewCard from './components/PreviewCard';
import ActionBar from './components/ActionBar';
import { TEMPLATES } from './components/presets';

function App() {
  const imgBoxRef = useRef();
  const stickerSeq = useRef(0);

  const {
    isSidebarOpen, setIsSidebarOpen,
    cropOpen, setCropOpen,
    rawImage, setImage, setImageAspect,
    setStickers, setSelectedSticker,
    toast, setToast
  } = useStore();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1800);
  };

  // ---- Sticker helpers (passed down as actions) ----
  const addSticker = (data) => {
    const { template } = useStore.getState();
    const tpl = TEMPLATES[template];
    const id = ++stickerSeq.current;
    setStickers((prev) => [
      ...prev,
      { id, x: tpl.w / 2, y: tpl.h * 0.4, scale: 1, rotation: 0, ...data },
    ]);
    setSelectedSticker(id);
    useStore.getState().setActiveTab('stickers');
  };

  const updateSticker = (id, patch) =>
    setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const deleteSticker = (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    setSelectedSticker(null);
  };

  const bringFront = (id) =>
    setStickers((prev) => {
      const s = prev.find((x) => x.id === id);
      if (!s) return prev;
      return [...prev.filter((x) => x.id !== id), s];
    });

  const stickerActions = {
    addSticker,
    updateSticker,
    deleteSticker,
    bringFront
  };

  return (
    <>
      <Analytics />
      <div className='flex selection:text-white selection:bg-black flex-col md:flex-row min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300'>
        
        {/* Sidebar */}
        <Sidebar stickerActions={stickerActions} />

        {/* Card Preview and Download Actions */}
        <div
          className='sticky h-screen w-auto flex-1 flex flex-col justify-center items-center md:-mt-7 selection:text-white selection:bg-black pt-10 pb-10 md:pb-0 order-1 md:order-2 bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#3f3f46_1px,_transparent_1px)] bg-[size:10px_10px] transition-colors duration-300'
          onPointerDown={() => setSelectedSticker(null)}
        >
          <Link />

          {/* Sidebar Toggle Button (Only visible when sidebar is hidden) */}
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="absolute z-10 top-4 md:top-13 left-4 md:left-8 flex rounded-lg justify-center items-center gap-3 p-1.5 md:p-2 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:bg-neutral-200/80 dark:hover:bg-zinc-700 transition-all duration-100 active:scale-97 cursor-pointer text-zinc-700 dark:text-white shadow-sm"
              title="Show Sidebar"
            >
              <PanelLeftOpen className="size-5 md:size-6" />
            </button>
          )}

          {/* Extracted Preview Card */}
          <PreviewCard imgBoxRef={imgBoxRef} stickerActions={stickerActions} />

          {/* Extracted Action Bar */}
          <ActionBar imgBoxRef={imgBoxRef} showToast={showToast} />

          {/* Crop / adjust modal */}
          {cropOpen && rawImage && (
            <CropModal
              image={rawImage}
              onCancel={() => setCropOpen(false)}
              onApply={(url, aspect) => {
                setImage(url)
                setImageAspect(aspect || 1)
                setCropOpen(false)
              }}
            />
          )}

          {/* transient toast */}
          {toast && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
              {toast}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
