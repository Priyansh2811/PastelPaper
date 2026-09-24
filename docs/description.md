# PastelPaper

PastelPaper is a powerful, elegant, and fully responsive web application that lets users create beautifully stylized, vintage-inspired photo cards. Built with modern web technologies, it offers a rich suite of photo editing and layout tools wrapped in an intuitive, dynamic interface.

## Core Features

### 1. Templates & Formats
Users can choose from a variety of aspect ratios and card styles to perfectly frame their memories:
- **Classic**: A standard portrait layout.
- **Square**: Perfect for social media feeds.
- **Story**: A tall 9:16 aspect ratio ideal for Instagram or TikTok stories.
- **Polaroid**: A nostalgic vintage instant-camera layout featuring a thicker bottom margin for captions.

### 2. Comprehensive Editing Tools
Organized cleanly into a minimalist tabbed sidebar, users have access to detailed customization:
- **Design**: Control the frame type (Default, Custom, or Pattern), layout, choose from a curated palette of preset background colors (or a custom color picker), and apply beautiful generated SVG patterns from ShapeSoup.
- **Text**: Add custom titles and date stamps. Control typography styles, alignments, and font weights to match the mood of the photo.
- **Filters**: Apply beautiful color grading and visual filters directly to the uploaded image.
- **Effects**: Add highly realistic analog aesthetics such as:
  - **Film Grain**: A tileable SVG fractal noise overlay for organic texture.
  - **Vignette**: Darkened edges to draw focus to the center.
  - **Light Leaks**: Gorgeous gradient overlays that simulate exposed vintage film.
- **Stickers**: A fully interactive sticker layer allowing users to place, drag, resize, and arrange decorative elements directly onto the photo canvas.

### 3. Image Handling & Cropping
- Users can upload their own photos, which are processed instantly on the client side.
- A built-in cropping modal ensures images fit perfectly into the selected aspect ratio before being placed on the canvas.
- Dynamic "Fill" and "Contain" controls dictate how the photo scales within its frame.

### 4. Premium User Interface
- **Dark & Light Mode**: A seamless theme toggle lets users switch between a clean, bright interface and a sleek, immersive dark mode. All elements, including the custom logo, adapt automatically.
- **Fluid Layout**: The main workspace is highly responsive. A built-in sidebar toggle allows users to hide the control panel, maximizing the canvas area to focus purely on the artwork.
- **Modern Aesthetics**: The application heavily utilizes glassmorphism, micro-animations, drop shadows, and modern typography to deliver a state-of-the-art SaaS experience.

### 5. Export and Share
- Utilizing precise DOM-to-image capture techniques (`html-to-image`), the final composition (including the photo, frame, text, filters, and stickers) is captured exactly as rendered on screen.
- Users can instantly export and download their creations in high-quality PNG or JPEG formats directly to their devices.

## Technical Stack
- **Framework**: React via Vite for lightning-fast development and optimized production builds.
- **Styling**: Tailwind CSS for rapid, utility-first styling, ensuring consistent spacing, colors, and responsive behavior across all devices.
- **Icons**: `lucide-react` and `react-icons` for clean, scalable vector iconography.
- **State Management**: **Zustand** is utilized to manage complex application global state like active tabs, selected stickers, applied filters, and canvas dimensions efficiently, replacing previous local hook-based state.
