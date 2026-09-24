# PastelPaper

A browser-based photo card editor. Upload a photo, crop it, apply retro film
filters and effects, add stickers and text, pick a frame/template, and export
the result as a PNG or JPG — all client-side, no backend required.

## Features

- **Upload & crop** — crop to 1:1, 3:4, 4:3, or the photo's original aspect ratio (`react-easy-crop`). The frame's photo box resizes to match the chosen crop.
- **Filters** — Retro, Sunny, B&W, Teal/Orange, Bright, Cinematic, and more, applied via CSS filter classes.
- **Film effects** — adjustable grain, vignette, light leaks, and an optional date stamp.
- **Templates** — Classic, Square, Story, and Polaroid layouts with defined export dimensions.
- **Frames** — a built-in default frame, a custom uploaded frame (used as a background or overlay), or beautiful built-in SVG patterns from ShapeSoup.
- **Stickers & text** — drag, scale, and rotate emoji stickers and text layers on the card.
- **Typography** — font family, bold/italic/underline/strikethrough, and text color controls.
- **Export** — download as PNG or JPG, copy to clipboard, or share (where supported) via `html-to-image`.

## Tech Stack

- **React 19** + **Vite 7** — UI and dev/build tooling
- **Tailwind CSS 4** (`@tailwindcss/vite`) — styling
- **react-easy-crop** — crop UI
- **html-to-image** — DOM-to-image export
- **Zustand** — global state management
- **react-icons** / **lucide-react** — icons
- **@vercel/analytics** — usage analytics

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Vite prints a local URL (default <http://localhost:5173>). Open it in your browser; the app hot-reloads as you edit.

### Build for production

```bash
npm run build
```

The optimized output is written to `dist/`.

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Usage

1. **Upload** a photo.
2. **Crop** it and choose an aspect ratio.
3. Pick a **template**, **filter**, and **frame**.
4. Tweak **effects** (grain, vignette, light leaks) and add **stickers / text**.
5. **Export** — download, copy, or share your card.

## Project Structure

See [WORKFLOW.md](./WORKFLOW.md) for a detailed breakdown of the folder structure and how data flows through the app.
