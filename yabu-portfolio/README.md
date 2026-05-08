# Yabu Genemo — Portfolio Website

A fully animated, production-grade portfolio landing page inspired by the Yabu Genemo design on Dribbble.

## Features

- **Enter animation** — branded logo intro overlay on first load
- **Parallax scrolling** — hero elements move at different depths on scroll
- **Bento grid** — responsive asymmetric card layout for the work section
- **Scroll reveal** — staggered fade-up animations as sections enter view
- **3D card tilt** — mouse-tracking perspective tilt on work cards
- **Custom cursor** — ✦ star cursor follows mouse
- **Animated stat counters** — numbers count up when scrolled into view
- **Marquee ticker** — scrolling skills bar, pauses on hover
- **Morphing blob** — organic shape animation on hero photo
- **Progress bar** — red scroll progress indicator at top of page
- **Nav scroll effect** — frosted glass nav on scroll

## Project Structure

```
yabu-portfolio/
├── index.html          — Main HTML
├── css/
│   ├── reset.css       — CSS reset
│   └── style.css       — All styles & animations
├── js/
│   └── main.js         — All interactions & scroll effects
├── assets/
│   └── images/         — Add your photos here
├── .vscode/
│   ├── settings.json
│   └── extensions.json
└── README.md
```

## How to Open

1. Open the `yabu-portfolio/` folder in VSCode
2. Install the **Live Server** extension (prompted automatically)
3. Right-click `index.html` → **Open with Live Server**

## How to Customize

### Colors
Edit the `:root` variables at the top of `css/style.css`:
```css
:root {
  --cream: #f5ede0;
  --red:   #c0392b;
  --blue:  #4a8fae;
  /* ... */
}
```

### Your Photo
Replace the SVG silhouette in `.hero-photo-frame` with an `<img>` tag pointing to your photo in `assets/images/`.

### Work Cards
Edit the `.bento-card` sections in `index.html`. Each card has:
- A color class (`bento-red`, `bento-blue`, etc.)
- A title, category, and link

### Fonts
Loaded from Google Fonts in `<head>`. Change the `@import` URL to swap fonts.

## Dependencies

- Google Fonts: Bebas Neue, Playfair Display, DM Sans, Syne
- No JS frameworks — vanilla HTML/CSS/JS only
- No build step required
