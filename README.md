# Kallax Landing Page

Single-page static website for Kallax, a vinyl DJ companion app. Neo-brutalist dark theme, mobile-first design.

## 🚀 Quick Start

1. Open `index.html` in a browser
2. Or use a local server: `python3 -m http.server 8000`

## 📁 Project Structure

```
kallax_web/
├── index.html              # Main landing page
├── styles.css              # Landing page styles (extends design system)
├── script.js               # Form handling, testimonials carousel, interactions
├── styleguide/             # Design system reference
│   ├── kallax-styles.css   # Base design system CSS variables
│   ├── kallax-design-system.md  # Complete design system documentation
│   └── theme.js            # React Native theme constants
├── images/                  # Assets
│   ├── hero/               # Hero section videos
│   ├── screenshots/        # Phone mockup videos
│   ├── testimonials/       # Testimonial logos/images
│   └── favicon.svg         # Site favicon
└── README.md               # This file
```

## 🎨 Design System

This landing page uses the Kallax design system from the `styleguide/` folder:

- **Colors**: Dark backgrounds (#0f0f0f, #1a1a1a), Yellow accent (#FFD53D)
- **Typography**: Archivo font (Google Fonts), weights 400-900
- **Borders**: Hard black borders (2-4px)
- **Shadows**: Hard offset shadows (no blur)
- **Spacing**: 4px base unit system

## 📝 Page Sections

1. **Header** - Fixed header with Kallax logo
2. **Hero** - Video background with headline and CTA
3. **Phone Mockups** - 3 workflow screenshots (collection, playlists, live mode)
4. **Icon Grid** - 5 feature icons (Offline-First, Discogs Sync, Playlists, Accurate BPM, Yours for Life)
5. **Testimonials** - Carousel with testimonials (including Exotica Radio)
6. **FAQ** - Collapsible FAQ section with yellow background
7. **Waitlist Form** - Email signup with Formspree integration
8. **Footer** - Copyright and links

## 🔧 Setup

### Form Configuration

The form is configured with Formspree endpoint: `https://formspree.io/f/xvzpgvoy`

To change the endpoint, update the form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Videos

- **Hero video**: `images/hero/record1.mp4`
- **Phone mockups**: Videos in `images/screenshots/` (collection-view.mp4, playlist-view.mp4, live-mode.mp4)
- All videos play at 50% speed (0.5x) except FAQ background video

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
cd /Users/exotica/code/kallax_web
vercel
```

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `kallax_web` folder
3. Done!

### GitHub Pages

1. Push to GitHub
2. Settings → Pages → Deploy from main branch
3. Custom domain: add `CNAME` file (already included)

## 📧 Form Handling

Form submissions are handled by Formspree. Submissions are sent to the email configured in your Formspree dashboard.

**Free tier**: 50 submissions/month

## 🎬 Video Assets

- Hero videos: `images/hero/`
- Phone mockup videos: `images/screenshots/` (MP4 format)
- Large videos stored in `images/_local/` (git-ignored)

## ✅ Features

- ✅ Responsive design (mobile-first)
- ✅ Video backgrounds with overlays
- ✅ Testimonials carousel
- ✅ Collapsible FAQ section
- ✅ Privacy policy modal
- ✅ Form validation and error handling
- ✅ Smooth scroll navigation
- ✅ Neo-brutalist design system

## 📄 License

Proprietary - All rights reserved

## 📧 Contact

For questions: contact@kallax.app

---

**Built with**: Pure HTML/CSS/JS (no framework)  
**Design System**: Kallax Neo-Brutalist Dark Theme  
**Deployment**: Static hosting ready
