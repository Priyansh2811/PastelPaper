import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { TbUpload } from 'react-icons/tb';
import { PanelLeftClose, Sparkles, X } from 'lucide-react';

import Bgcolor from './bgcolor';
import Filter from './filter';
import Bold from './bold';
import FontStyle from './fontstyle';
import Templates from './templates';
import Effects from './effects';
import Stickers from './stickers';
import ExportBar from './exportbar';
import { PATTERNS } from './patterns';

const PASTEL_PALETTES = [
  '#fbcfe8',
  '#fed7aa',
  '#fef08a',
  '#bbf7d0',
  '#bae6fd',
  '#e9d5ff',
  '#f3f4f6',
];

export default function Sidebar({ stickerActions, onDownload, onCopy, onShare }) {
  const dateRef = useRef();
  const titleRef = useRef();

  const {
    isSidebarOpen,
    setIsSidebarOpen,
    image,
    imageFit,
    setImageFit,
    blurBg,
    setBlurBg,
    title,
    setTitle,
    date,
    setdate,
    color,
    setColor,
    textColor,
    setTextColor,
    font,
    setFont,
    frameType,
    setFrameType,
    customFrame,
    setCustomFrame,
    patternIndex,
    setPatternIndex,
    frameMode,
    setFrameMode,
    photoLayout,
    setPhotoLayout,
    hideBorders,
    setHideBorders,
    hideText,
    setHideText,
    photoScale,
    setPhotoScale,
    photoX,
    setPhotoX,
    photoY,
    setPhotoY,
    template,
    setTemplate,
    grain,
    setGrain,
    vignette,
    setVignette,
    lightLeak,
    setLightLeak,
    dateStamp,
    setDateStamp,
    stickers,
    selectedSticker,
    activeTab,
    setActiveTab,
  } = useStore();

  const { addSticker, updateSticker, deleteSticker, bringFront } = stickerActions || {};

  useEffect(() => {
    if (title === '' && titleRef.current) titleRef.current.value = '';
  }, [title]);

  useEffect(() => {
    if (date === undefined && dateRef.current) dateRef.current.value = '';
  }, [date]);

  function handleFrameUpload(e) {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      setCustomFrame(reader.result);
      setFrameType('custom');
    };
    reader.readAsDataURL(file);
  }

  function handleFrameReset() {
    setCustomFrame(null);
    setFrameType('default');
    setPhotoScale(1.0);
    setPhotoX(0);
    setPhotoY(0);
    setPhotoLayout('standard');
    setHideBorders(false);
    setHideText(false);
    setFrameMode('background');
  }

  if (!isSidebarOpen) return null;

  const hasActiveEffects = grain > 0 || vignette > 0 || lightLeak !== 'none' || dateStamp;

  return (
    <div className="relative h-auto md:h-screen w-full md:w-96 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center pt-6 pb-6 px-4 gap-4 order-2 md:order-1 md:overflow-y-auto no-scrollbar transition-colors duration-300">
      <div className="flex w-full px-2 items-center justify-between mb-2">
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-sm group-hover:scale-105 transition-all duration-300">
            <span className="font-black text-sm tracking-tighter">PP</span>
          </div>
          <span className="font-black text-xl tracking-tight text-zinc-900 dark:text-white">
            Pastel<span className="text-zinc-400 dark:text-zinc-500 font-medium"> Paper</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="p-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all cursor-pointer text-zinc-700 dark:text-white shadow-xs"
          title="Hide Sidebar"
        >
          <PanelLeftClose className="size-4" />
        </button>
      </div>

      <div className="flex border-b border-zinc-200/80 dark:border-zinc-800/80 w-70 justify-between">
        {[
          { id: 'design', label: 'Design' },
          { id: 'text', label: 'Text' },
          { id: 'filters', label: 'Filters' },
          { id: 'effects', label: 'Effects', badge: hasActiveEffects },
          { id: 'stickers', label: 'Stickers', count: stickers?.length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 text-[10px] font-bold tracking-wide uppercase transition-all relative cursor-pointer ${
              activeTab === tab.id
                ? 'text-black dark:text-white font-extrabold'
                : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
            }`}
          >
            {tab.label}
            {tab.badge && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 ml-1 mb-1" />
            )}
            {Boolean(tab.count) && (
              <span className="ml-1 text-[8px] px-1 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center w-full min-h-[340px] flex-shrink-0">
        {activeTab === 'design' && (
          <div className="flex flex-col gap-4 items-center w-full animate-fade-in">
            <Templates template={template} onChange={setTemplate} />

            {image && (
              <div className="flex flex-col gap-1.5 w-70">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Photo Fit</span>
                <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-100/80 border border-zinc-200/60 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setImageFit('cover')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      imageFit === 'cover'
                        ? 'bg-white text-black shadow-xs font-bold'
                        : 'text-zinc-400 hover:text-zinc-800'
                    }`}
                  >
                    Fill
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageFit('contain')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      imageFit === 'contain'
                        ? 'bg-white text-black shadow-xs font-bold'
                        : 'text-zinc-400 hover:text-zinc-800'
                    }`}
                  >
                    Fit
                  </button>
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none mt-1">
                  <input
                    type="checkbox"
                    checked={blurBg}
                    onChange={(e) => setBlurBg(e.target.checked)}
                    className="rounded border-zinc-300 text-black size-3.5 cursor-pointer accent-black"
                  />
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Blur Background</span>
                </label>
              </div>
            )}

            <div className="flex flex-col gap-1.5 w-70">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Frame Type</span>
              <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-100/80 border border-zinc-200/60 rounded-xl">
                {['default', 'custom', 'pattern'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFrameType(t)}
                    className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                      frameType === t
                        ? 'bg-white text-black shadow-xs font-bold'
                        : 'text-zinc-400 hover:text-zinc-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {frameType === 'default' && (
              <div className="flex flex-col gap-2 w-70 animate-fade-in">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Pastel Tone</span>
                  <button
                    type="button"
                    onClick={() => setColor(PASTEL_PALETTES[Math.floor(Math.random() * PASTEL_PALETTES.length)])}
                    className="flex items-center gap-1 text-[9px] font-bold text-zinc-500 hover:text-black cursor-pointer"
                  >
                    <Sparkles className="size-2.5 text-amber-500" /> Randomize
                  </button>
                </div>
                <div className="flex justify-between items-center gap-1.5 p-2 bg-white border border-zinc-200/80 rounded-2xl shadow-xs">
                  {PASTEL_PALETTES.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setColor(hex)}
                      style={{ backgroundColor: hex }}
                      className={`size-6 rounded-full border transition-transform cursor-pointer ${
                        color === hex ? 'scale-110 border-black shadow-xs' : 'border-black/10 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
                <Bgcolor value={color} onChange={setColor} />
              </div>
            )}

            {frameType === 'custom' && (
              <div className="flex flex-col gap-4 w-70 animate-fade-in">
                {customFrame === false ? (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 hover:border-zinc-800 rounded-2xl p-6 cursor-pointer bg-white transition-all shadow-xs">
                    <TbUpload className="size-6 text-zinc-400 mb-1.5" />
                    <span className="text-xs font-bold text-zinc-600">Upload Frame Image</span>
                    <span className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold">PNG / JPEG</span>
                    <input type="file" accept="image/*" onChange={handleFrameUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="flex flex-col gap-3.5 p-3.5 bg-white border border-zinc-200/80 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Custom Frame</span>
                      <button
                        type="button"
                        onClick={handleFrameReset}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Display Mode</label>
                      <div className="grid grid-cols-2 gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/50">
                        {['background', 'overlay'].map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setFrameMode(mode)}
                            className={`py-1 text-[10px] font-bold rounded-md capitalize transition-all cursor-pointer ${
                              frameMode === mode ? 'bg-white text-black shadow-xs' : 'text-zinc-400 hover:text-zinc-700'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Photo Container</label>
                      <div className="grid grid-cols-2 gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/50">
                        {['standard', 'full'].map((layout) => (
                          <button
                            key={layout}
                            type="button"
                            onClick={() => setPhotoLayout(layout)}
                            className={`py-1 text-[10px] font-bold rounded-md capitalize transition-all cursor-pointer ${
                              photoLayout === layout ? 'bg-white text-black shadow-xs' : 'text-zinc-400 hover:text-zinc-700'
                            }`}
                          >
                            {layout === 'standard' ? 'Standard Box' : 'Full Card'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-1 border-t border-zinc-100">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hideBorders}
                          onChange={(e) => setHideBorders(e.target.checked)}
                          className="rounded border-zinc-300 text-black size-3.5 cursor-pointer accent-black"
                        />
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Hide Default Borders</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hideText}
                          onChange={(e) => setHideText(e.target.checked)}
                          className="rounded border-zinc-300 text-black size-3.5 cursor-pointer accent-black"
                        />
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Hide Text & Date</span>
                      </label>
                    </div>

                    <div className="border-t border-zinc-100 pt-2.5 flex flex-col gap-2.5">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Photo Transform</span>

                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                          <span>Zoom</span>
                          <span>{photoScale.toFixed(2)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.05"
                          value={photoScale}
                          onChange={(e) => setPhotoScale(parseFloat(e.target.value))}
                          className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                          <span>Horizontal Shift</span>
                          <span>{photoX}px</span>
                        </div>
                        <input
                          type="range"
                          min="-150"
                          max="150"
                          step="1"
                          value={photoX}
                          onChange={(e) => setPhotoX(parseInt(e.target.value))}
                          className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                          <span>Vertical Shift</span>
                          <span>{photoY}px</span>
                        </div>
                        <input
                          type="range"
                          min="-150"
                          max="150"
                          step="1"
                          value={photoY}
                          onChange={(e) => setPhotoY(parseInt(e.target.value))}
                          className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPhotoScale(1.0);
                          setPhotoX(0);
                          setPhotoY(0);
                        }}
                        className="text-center w-full py-1.5 border border-zinc-200 hover:bg-zinc-50 rounded-xl text-[9px] font-bold uppercase tracking-wider text-zinc-600 transition-colors cursor-pointer bg-white"
                      >
                        Reset Transform
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {frameType === 'pattern' && (
              <div className="flex flex-col gap-2 w-70 animate-fade-in">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Patterns</span>
                <div className="grid grid-cols-4 gap-2 h-64 overflow-y-auto pr-1 no-scrollbar">
                  {PATTERNS?.map((pattern, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPatternIndex(idx)}
                      className={`w-full aspect-square rounded-xl bg-cover bg-center border-2 transition-all cursor-pointer ${
                        patternIndex === idx ? 'border-black shadow-sm scale-105' : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                      style={{ backgroundImage: `url("${pattern}")` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'text' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex flex-col gap-1.5 w-70">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Card Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="border border-zinc-200 focus:border-black outline-none rounded-xl p-2.5 w-full text-xs font-semibold bg-white shadow-xs"
                placeholder="Write your memories..."
                maxLength={50}
                ref={titleRef}
              />
            </div>

            <Bold value={textColor} onChange={setTextColor} />

            <div className="flex flex-col gap-1.5 w-70">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Font Family</span>
              <FontStyle selectedFont={font} onFontChange={setFont} />
            </div>

            <div className="flex flex-col gap-1.5 w-70">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Date</span>
                {date && (
                  <button
                    type="button"
                    onClick={() => {
                      setdate(undefined);
                      if (dateRef.current) dateRef.current.value = '';
                    }}
                    className="flex items-center gap-0.5 text-[9px] text-zinc-400 hover:text-black cursor-pointer"
                  >
                    <X className="size-2.5" /> Clear Date
                  </button>
                )}
              </div>
              <div onClick={() => dateRef.current?.showPicker()} className="w-full cursor-pointer">
                <input
                  type="date"
                  ref={dateRef}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (!value) {
                      setdate(undefined);
                      return;
                    }
                    const [y, m, d] = value.split('-');
                    setdate(`${d}.${m}.${y}`);
                  }}
                  onFocus={(e) => e.target.blur()}
                  className="border border-zinc-200 focus:border-black outline-none rounded-xl p-2.5 w-full text-xs font-semibold cursor-pointer bg-white shadow-xs"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filters' && (
          <div className="animate-fade-in">
            <Filter />
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="animate-fade-in">
            <Effects
              grain={grain}
              setGrain={setGrain}
              vignette={vignette}
              setVignette={setVignette}
              lightLeak={lightLeak}
              setLightLeak={setLightLeak}
              dateStamp={dateStamp}
              setDateStamp={setDateStamp}
            />
          </div>
        )}

        {activeTab === 'stickers' && (
          <div className="animate-fade-in">
            <Stickers
              onAdd={addSticker}
              stickers={stickers}
              selectedId={selectedSticker}
              onUpdate={updateSticker}
              onDelete={deleteSticker}
              onBringFront={bringFront}
            />
          </div>
        )}
      </div>

      <div className="w-70 mt-auto pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <ExportBar onDownload={onDownload} onCopy={onCopy} onShare={onShare} />
      </div>
    </div>
  );
}