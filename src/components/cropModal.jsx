import { useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import { TbCrop, TbCheck, TbX } from 'react-icons/tb'

// Aspect ratio presets. `Original` is filled in once the image loads (its
// natural width/height), so picking it means "no aspect crop, just zoom/pan".
const RATIOS = [
  { key: 'square', label: '1:1', value: 1 },
  { key: 'portrait', label: '3:4', value: 3 / 4 },
  { key: 'landscape', label: '4:3', value: 4 / 3 },
  { key: 'original', label: 'Original', value: null },
]




// Draw the selected crop region onto a canvas at native resolution and return
// a PNG data URL. `pixelCrop` comes from react-easy-crop's onCropComplete.
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(pixelCrop.width)
  canvas.height = Math.round(pixelCrop.height)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return canvas.toDataURL('image/png')
}

function CropModal({ image, onCancel, onApply }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [ratioKey, setRatioKey] = useState('square')
  const [originalAspect, setOriginalAspect] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [busy, setBusy] = useState(false)


  
  // Discover the image's natural aspect ratio for the "Original" preset.
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setOriginalAspect(img.naturalWidth / img.naturalHeight)
      }
    }
    img.src = image
  }, [image])

  const onCropComplete = useCallback((_area, areaPixels) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  const selected = RATIOS.find((r) => r.key === ratioKey)
  const aspect = selected.value ?? originalAspect

  const handleApply = async () => {
    if (!croppedAreaPixels) return
    setBusy(true)
    try {
      const url = await getCroppedImg(image, croppedAreaPixels)
      // Report the crop's aspect ratio so the frame can size its photo box
      // to match, instead of forcing the cropped image into a square.
      onApply(url, croppedAreaPixels.width / croppedAreaPixels.height)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-zinc-700">
            <TbCrop className="size-4" /> Adjust Photo
          </span>
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-black transition-colors cursor-pointer"
            aria-label="Close"
          >
            <TbX className="size-5" />
          </button>
        </div>

        {/* Cropper stage */}
        <div className="relative h-72 bg-zinc-900">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition={false}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3.5 p-4">
          {/* Aspect ratio pills */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Crop Ratio</span>
            <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-100/80 border border-zinc-200/60 rounded-xl">
              {RATIOS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRatioKey(r.key)}
                  className={`py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    ratioKey === r.key
                      ? 'bg-white text-black shadow-sm border border-zinc-200/30'
                      : 'text-zinc-400 hover:text-zinc-800'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom slider */}
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
              <span>Zoom</span>
              <span>{zoom.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onCancel}
              className="flex-1 border border-zinc-200 hover:bg-zinc-50 active:scale-95 transition-all py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-zinc-700 bg-white"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={busy || !croppedAreaPixels}
              className="flex-1 bg-black text-white hover:bg-zinc-800 active:scale-95 transition-all py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex justify-center items-center gap-1 shadow-sm disabled:opacity-60 disabled:cursor-wait"
            >
              <TbCheck className="text-base" />
              {busy ? 'Applying…' : 'Apply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropModal
