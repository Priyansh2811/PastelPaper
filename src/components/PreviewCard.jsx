import React, { useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import StickerLayer from './stickerLayer';
import { TEMPLATES, LIGHT_LEAKS } from './presets';
import { PATTERNS } from './patterns';
import { FILTER_PRESETS } from './filter';

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function PreviewCard({ imgBoxRef, stickerActions }) {
  const {
    image,
    imageAspect,
    imageFit,
    blurBg,
    title,
    date,
    filter,
    color,
    textColor,
    font,
    frameType,
    customFrame,
    patternIndex,
    frameMode,
    photoLayout,
    hideBorders,
    hideText,
    photoScale,
    setPhotoScale,
    photoX,
    setPhotoX,
    photoY,
    setPhotoY,
    template,
    grain,
    vignette,
    lightLeak,
    dateStamp,
    stickers,
    selectedSticker,
    setSelectedSticker,
    isExporting
  } = useStore();

  const { updateSticker, deleteSticker } = stickerActions || {};

  // Image Drag / Pan State
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const dragOriginRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });

  const tpl = TEMPLATES?.[template] || { w: 340, h: 440, polaroid: false };
  const isPolaroid = Boolean(tpl.polaroid);

// sourcery skip: avoid-function-declarations-in-blocks
  function darkenColor(hex, percent) {
    if (!hex || hex.startsWith('rgb')) return 'rgba(0,0,0,0.2)';
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.floor(r * (1 - percent));
    g = Math.floor(g * (1 - percent));
    b = Math.floor(b * (1 - percent));

    return `rgb(${r}, ${g}, ${b})`;
  }

  // Mouse & Touch Pan Handlers
  const handlePhotoMouseDown = (e) => {
    if (!image || isExporting) return;
    setIsDraggingPhoto(true);
    dragOriginRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: photoX || 0,
      initY: photoY || 0,
    };
  };

  const handlePhotoMouseMove = (e) => {
    if (!isDraggingPhoto || !image || isExporting) return;
    const deltaX = e.clientX - dragOriginRef.current.startX;
    const deltaY = e.clientY - dragOriginRef.current.startY;
    setPhotoX(dragOriginRef.current.initX + deltaX);
    setPhotoY(dragOriginRef.current.initY + deltaY);
  };

  const handlePhotoMouseUp = () => setIsDraggingPhoto(false);

  // Wheel Zoom Handler
  const handleWheelZoom = (e) => {
    if (!image || isExporting) return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.05 : -0.05;
    const newScale = Math.min(Math.max((photoScale || 1) + zoomFactor, 0.5), 3);
    setPhotoScale(parseFloat(newScale.toFixed(2)));
  };

  const hasCustomFrame = frameType === 'custom' && customFrame;
  const isBgFrame = (hasCustomFrame && frameMode === 'background') || frameType === 'pattern';
  const isOverlayFrame = hasCustomFrame && frameMode === 'overlay';

  const activePreset = FILTER_PRESETS?.find((p) => p.id === filter);
  const activeFilterCss = activePreset ? activePreset.css : 'none';

  const leakCss = LIGHT_LEAKS?.[lightLeak]?.css;
  const showNormalDate = !hideText && !dateStamp && date;
  const showStamp = Boolean(dateStamp && date);

  return (
    <div ref={imgBoxRef} className="inline-block select-none">
      <div
        id="pastel-card-canvas"
        className={`rounded-2xl transition-all duration-300 overflow-hidden flex flex-col relative
          ${isBgFrame ? '' : isPolaroid ? 'bg-white' : 'bg-[#e0f2fe] border-[#7dd3fc]'}
          ${hideBorders ? '' : 'shadow-xl border-2'}
          ${isPolaroid ? 'px-4 pt-4 pb-12' : 'px-5 pt-5 pb-5'}
        `}
        style={{
          width: `${tpl.w}px`,
          height: `${tpl.h}px`,
          backgroundColor: isPolaroid ? '#ffffff' : color,
          borderColor: isPolaroid && !hideBorders ? '#ffffff' : hasCustomFrame ? 'transparent' : darkenColor(color, 0.25),
          backgroundImage: isBgFrame
            ? `url("${frameType === 'pattern' ? PATTERNS?.[patternIndex] : customFrame}")`
            : undefined,
          backgroundSize: isBgFrame ? 'cover' : undefined,
          backgroundPosition: isBgFrame ? 'center' : undefined,
          borderWidth: hideBorders ? '0px' : undefined,
          boxShadow: hideBorders ? 'none' : undefined,
        }}
      >
        {/* Photo Container */}
        <div
          onMouseDown={handlePhotoMouseDown}
          onMouseMove={handlePhotoMouseMove}
          onMouseUp={handlePhotoMouseUp}
          onMouseLeave={handlePhotoMouseUp}
          onWheel={handleWheelZoom}
          className={`overflow-hidden relative group
            ${photoLayout === 'full' ? 'absolute inset-0 w-full h-full rounded-2xl z-10' : 'w-full rounded-xl z-10'}
            ${hideBorders ? '' : 'border border-black/5 shadow-inner'}
            ${image ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
          `}
          style={photoLayout === 'full' ? undefined : { aspectRatio: imageAspect || 1 }}
        >
          {/* Blurred Background Fill */}
          {image && blurBg && (
            <img
              src={image}
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              style={{ filter: 'blur(16px) brightness(0.85)', transform: 'scale(1.15)' }}
              alt=""
            />
          )}

          {/* Main User Photo */}
          {image ? (
            <img
              src={image}
              draggable={false}
              className="relative z-[1] w-full h-full rounded-sm transition-transform duration-75 pointer-events-none select-none"
              style={{
                objectFit: imageFit || 'cover',
                filter: activeFilterCss,
                transform: `scale(${photoScale || 1}) translate(${photoX || 0}px, ${photoY || 0}px)`,
                transformOrigin: 'center center',
              }}
              alt="Photo"
            />
          ) : (
            <div className="w-full h-full min-h-[220px] bg-white/60 flex flex-col items-center justify-center border border-dashed border-zinc-300 text-zinc-400 gap-1.5 p-4 text-center">
              <span className="text-xs font-semibold tracking-wide uppercase">No Photo Uploaded</span>
              <span className="text-[10px] text-zinc-400">Upload an image to start crafting</span>
            </div>
          )}

          {/* Film Grain Overlay */}
          {grain > 0 && (
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                backgroundImage: GRAIN_URL,
                backgroundSize: '160px 160px',
                mixBlendMode: 'overlay',
                opacity: grain,
              }}
            />
          )}

          {/* Radial Vignette Overlay */}
          {vignette > 0 && (
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,${vignette}) 100%)`,
              }}
            />
          )}

          {/* Optical Light Leak Overlay */}
          {leakCss && (
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ backgroundImage: leakCss, mixBlendMode: 'screen' }}
            />
          )}

          {/* 90s LED Glow Date Stamp */}
          {showStamp && (
            <div className="absolute bottom-3 right-3 z-30 pointer-events-none select-none">
              <span
                style={{
                  color: '#ff9a3c',
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textShadow: '0 0 5px rgba(255,154,60,0.9), 0 0 12px rgba(255,100,20,0.6)',
                }}
              >
                {date}
              </span>
            </div>
          )}
        </div>

        {/* Overlay Frame Image */}
        {isOverlayFrame && (
          <img
            src={customFrame}
            className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
            alt="Custom Frame Overlay"
          />
        )}

        {/* Card Title Text */}
        {!hideText && (
          <div className={`z-30 relative ${isPolaroid ? 'flex justify-center mt-3 w-full' : 'flex flex-wrap mt-3'}`}>
            <h1
              className={`mt-1 text-zinc-800 break-words ${
                isPolaroid ? 'text-2xl text-center w-full' : 'text-lg font-medium'
              }`}
              style={{
                color: textColor || '#1e293b',
                fontFamily: isPolaroid && font === 'sans-serif' ? "'Caveat', cursive" : font,
              }}
            >
              {title || (isPolaroid ? 'Memories' : '')}
            </h1>
          </div>
        )}

        {/* Card Standard Date Text */}
        {showNormalDate && (
          isPolaroid ? (
            <div className="z-30 w-full text-center mt-0.5">
              <p className="text-xs text-zinc-400 font-mono tracking-wider">{date}</p>
            </div>
          ) : (
            <div className="absolute bottom-4 right-5 z-30 pointer-events-none">
              <p className="text-xs text-zinc-400 font-mono tracking-wider">{date}</p>
            </div>
          )
        )}

        {/* Interactive Sticker Layer */}
        {stickerActions && (
          <StickerLayer
            stickers={stickers}
            selectedId={selectedSticker}
            onSelect={setSelectedSticker}
            onUpdate={updateSticker}
            onDelete={deleteSticker}
            interactive={!isExporting}
          />
        )}
      </div>
    </div>
  );
}