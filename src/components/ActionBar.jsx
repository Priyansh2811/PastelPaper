import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { toPng, toJpeg } from 'html-to-image';
import { TbUpload, TbCrop } from "react-icons/tb";
import { RiResetLeftLine } from "react-icons/ri";
import ExportBar from './exportbar';

export default function ActionBar({ imgBoxRef, showToast }) {
  const {
    image, setImage,
    rawImage, setRawImage,
    setCropOpen,
    setImageFit,
    setBlurBg,
    setTitle,
    setdate,
    setFrameType,
    setCustomFrame,
    setFrameMode,
    setPhotoLayout,
    setHideBorders,
    setHideText,
    setPhotoScale,
    setPhotoX,
    setPhotoY,
    setTemplate,
    setGrain,
    setVignette,
    setLightLeak,
    setDateStamp,
    stickers,
    setStickers,
    setSelectedSticker,
    exportFormat, setExportFormat,
    isExporting, setIsExporting
  } = useStore();

  const [canShare] = useState(
    () => typeof navigator !== 'undefined' && !!navigator.share && !!navigator.canShare
  );

  const hasContent = image || stickers.length > 0;

  // for photo image upload — open the crop modal on the raw image
  function handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      setRawImage(reader.result);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // allow re-selecting the same file
  }

  // for reset
  function handleReset(e) {
    e.preventDefault();
    setImage(null);
    setRawImage(null);
    setCropOpen(false);
    setImageFit('cover');
    setBlurBg(false);
    setTitle('');
    setdate(undefined);

    // Frame reset
    setCustomFrame(null);
    setFrameType('default');
    setPhotoScale(1.0);
    setPhotoX(0);
    setPhotoY(0);
    setPhotoLayout('standard');
    setHideBorders(false);
    setHideText(false);
    setFrameMode('background');

    // reset new feature state
    setGrain(0);
    setVignette(0);
    setLightLeak('none');
    setDateStamp(false);
    setStickers([]);
    setSelectedSticker(null);
    setTemplate('classic');
  }

  // ---- Export ----
  const renderCard = async (fmt) => {
    if (!imgBoxRef.current) return null;
    setSelectedSticker(null);
    setIsExporting(true);
    // let React drop the selection chrome before we snapshot the node
    await new Promise((r) => setTimeout(r, 60));
    try {
      const opts = { cacheBust: true, pixelRatio: 4 };
      return fmt === 'jpg'
        ? await toJpeg(imgBoxRef.current, { ...opts, quality: 0.95, backgroundColor: '#ffffff' })
        : await toPng(imgBoxRef.current, opts);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = async () => {
    const url = await renderCard(exportFormat);
    if (!url) return;
    const link = document.createElement('a');
    link.download = `card.${exportFormat}`;
    link.href = url;
    link.click();
  };

  const handleCopy = async () => {
    const url = await renderCard('png'); // PNG has the widest clipboard support
    if (!url) return;
    try {
      const blob = await (await fetch(url)).blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      showToast('Copied to clipboard ✓');
    } catch {
      showToast('Copy not supported here');
    }
  };

  const handleShare = async () => {
    const url = await renderCard(exportFormat);
    if (!url) return;
    try {
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], `card.${exportFormat}`, { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'My Memory Card' });
      } else {
        showToast('Sharing not supported here');
      }
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-[320px] px-6 mt-3">
      <div className="flex gap-3 w-full">
        <input id='file' onChange={handleUpload} accept="image/*" type="file" className='hidden' />

        <button
          onClick={handleReset}
          className='flex-1 border border-zinc-200 hover:bg-zinc-50 active:scale-95 transition-all py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-zinc-700 bg-white flex justify-center items-center gap-1 shadow-sm'
        >
          <RiResetLeftLine className='text-base' />
          Reset
        </button>

        {image && rawImage && (
          <button
            onClick={() => setCropOpen(true)}
            className='flex-1 border border-zinc-200 hover:bg-zinc-50 active:scale-95 transition-all py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-zinc-700 bg-white flex justify-center items-center gap-1 shadow-sm'
          >
            <TbCrop className='text-base' />
            Adjust
          </button>
        )}

        <label
          htmlFor='file'
          className='flex-1 bg-black text-white hover:bg-zinc-800 active:scale-95 transition-all py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex justify-center items-center gap-1 shadow-sm'
        >
          <TbUpload className='text-base' />
          Photo
        </label>
      </div>

      {hasContent && (
        <ExportBar
          format={exportFormat}
          setFormat={setExportFormat}
          onDownload={handleDownload}
          onCopy={handleCopy}
          onShare={handleShare}
          canShare={canShare}
          busy={isExporting}
        />
      )}
    </div>
  );
}
