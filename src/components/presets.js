// Shared, non-component presets used across the editor.

// Template presets: each defines the capture-box dimensions (in px) and an
// optional `polaroid` styling variant. These dims are the source of truth for
// both the live preview and the exported image.
export const TEMPLATES = {
    classic:  { label: 'Classic',  w: 320, h: 400 },
    square:   { label: 'Square',   w: 336, h: 336 },
    story:    { label: 'Story',    w: 300, h: 520 },
    polaroid: { label: 'Polaroid', w: 300, h: 374, polaroid: true },
}


export const LIGHT_LEAKS = {
    none:    { label: 'None',    css: null },
    gold:    { label: 'Gold',    css: 'linear-gradient(115deg, rgba(255,196,77,0.55) 0%, rgba(255,196,77,0) 45%)' },
    magenta: { label: 'Magenta', css: 'linear-gradient(200deg, rgba(255,77,148,0.5) 0%, rgba(255,77,148,0) 50%)' },
    sunset:  { label: 'Sunset',  css: 'radial-gradient(circle at 82% 12%, rgba(255,120,80,0.6) 0%, rgba(255,120,80,0) 55%)' },
}

