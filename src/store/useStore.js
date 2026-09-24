import { create } from 'zustand';

export const useStore = create((set) => {
  const makeSetter = (key) => (val) => set((state) => ({ [key]: typeof val === 'function' ? val(state[key]) : val }));

  return {
    isSidebarOpen: true, setIsSidebarOpen: makeSetter('isSidebarOpen'),
    image: null, setImage: makeSetter('image'),
    imageAspect: 1, setImageAspect: makeSetter('imageAspect'),
    rawImage: null, setRawImage: makeSetter('rawImage'),
    cropOpen: false, setCropOpen: makeSetter('cropOpen'),
    imageFit: 'cover', setImageFit: makeSetter('imageFit'),
    blurBg: false, setBlurBg: makeSetter('blurBg'),
    title: '', setTitle: makeSetter('title'),
    date: undefined, setdate: makeSetter('date'),
    filter: "", setFilter: makeSetter('filter'),
    color: "#e0f2fe", setColor: makeSetter('color'),
    textColor: "", setTextColor: makeSetter('textColor'),
    font: "sans-serif", setFont: makeSetter('font'),
    

    frameType: 'default', setFrameType: makeSetter('frameType'),
    customFrame: null, setCustomFrame: makeSetter('customFrame'),
    patternIndex: 0, setPatternIndex: makeSetter('patternIndex'),
    frameMode: 'background', setFrameMode: makeSetter('frameMode'),
    photoLayout: 'standard', setPhotoLayout: makeSetter('photoLayout'),
    hideBorders: false, setHideBorders: makeSetter('hideBorders'),
    hideText: false, setHideText: makeSetter('hideText'),
    photoScale: 1.0, setPhotoScale: makeSetter('photoScale'),
    photoX: 0, setPhotoX: makeSetter('photoX'),
    photoY: 0, setPhotoY: makeSetter('photoY'),

    template: 'classic', setTemplate: makeSetter('template'),

    grain: 0, setGrain: makeSetter('grain'),
    vignette: 0, setVignette: makeSetter('vignette'),
    lightLeak: 'none', setLightLeak: makeSetter('lightLeak'),
    dateStamp: false, setDateStamp: makeSetter('dateStamp'),

    stickers: [], setStickers: makeSetter('stickers'),
    selectedSticker: null, setSelectedSticker: makeSetter('selectedSticker'),

    exportFormat: 'png', setExportFormat: makeSetter('exportFormat'),
    isExporting: false, setIsExporting: makeSetter('isExporting'),
    toast: '', setToast: makeSetter('toast'),

    activeTab: 'design', setActiveTab: makeSetter('activeTab')
  };
});

