# Kallax Landing Page

Single-page static website for Kallax, a vinyl DJ companion app. Neo-brutalist dark aesthetic, mobile-first design.

## 🚀 Quick Start

1. **Add your video**: Download a video from Pexels and add it to the `hero-video` source in `index.html`
2. **Setup Formspree**: 
   - Go to [formspree.io](https://formspree.io)
   - Create a new form
   - Copy your form endpoint
   - Replace `YOUR_FORM_ID` in `index.html` (line 99)
3. **Deploy**: Choose one of the deployment options below

## 📁 File Structure

```
kallax_web/
├── index.html              # Main landing page
├── styles.css              # Landing page styles (extends design system)
├── script.js               # Form handling & interactions
├── styleguide/             # Design system reference
│   ├── kallax-styles.css   # Base design system
│   └── theme.js            # React Native theme
└── README.md               # This file
```

## 🎨 Design System

This landing page uses the Kallax design system from the `styleguide/` folder:

- **Colors**: Dark backgrounds (#0f0f0f, #1a1a1a), Yellow accent (#FFD53D)
- **Typography**: Archivo font (Google Fonts), weights 400-900
- **Borders**: Hard black borders (2-4px)
- **Shadows**: Hard offset shadows (no blur)
- **Spacing**: 4px base unit system

## 📝 Content Sections

1. **Hero**: Video background with headline and CTA
2. **Features**: Three workflow cards (Studio, Bag, Booth)
3. **Features List**: Bullet points of key features
4. **Availability**: Coming soon message
5. **Waitlist**: Email signup form
6. **Footer**: Contact and privacy links

## 🚢 Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project folder
cd /Users/exotica/code/kallax_web

# Deploy
vercel

# Follow prompts, it will give you a URL
# Connect custom domain in Vercel dashboard
```

**Pros**: Fast, free, automatic HTTPS, custom domains

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to project folder
cd /Users/exotica/code/kallax_web

# Deploy
netlify deploy --prod

# Or drag-and-drop folder in Netlify dashboard
```

**Pros**: Free tier, easy drag-and-drop, built-in form handling (can use Netlify Forms instead of Formspree)

### Option 3: GitHub Pages

1. Create repo `kallax-landing` (or use existing)
2. Push files to `main` branch
3. Settings → Pages → Deploy from main branch
4. Custom domain: add `CNAME` file with `www.kallax.app`

**Pros**: Free, integrated with GitHub

## 📧 Form Setup

### Using Formspree (Current Setup)

1. Go to [formspree.io](https://formspree.io)
2. Sign up with your email
3. Create new form
4. Copy form endpoint (looks like `https://formspree.io/f/xyzabc123`)
5. Replace `YOUR_FORM_ID` in `index.html` (line 99)
6. Test submission
7. Submissions appear in Formspree dashboard
8. Email notifications automatic

**Free tier**: 50 submissions/month

### Alternative: Netlify Forms

If deploying on Netlify, you can use built-in form handling:

1. Add `netlify` attribute to form tag:
   ```html
   <form netlify name="waitlist" method="POST">
   ```
2. Remove Formspree action
3. Submissions appear in Netlify dashboard

## 🎬 Adding Video

1. Download video from [Pexels](https://www.pexels.com)
2. Recommended: MP4 format, 1920x1080 or higher
3. Add to project (create `videos/` folder or use CDN)
4. Update `index.html` line 30:
   ```html
   <source src="videos/hero-video.mp4" type="video/mp4">
   ```

**Video Tips**:
- Keep file size under 5MB for fast loading
- Use compression tool like [HandBrake](https://handbrake.fr/)
- Consider using a CDN for larger files
- Add fallback image if video fails to load

## ✅ Pre-Deployment Checklist

- [ ] Replace `YOUR_FORM_ID` with actual Formspree endpoint
- [ ] Add hero video or remove video wrapper
- [ ] Test form submission (check Formspree inbox)
- [ ] Test on mobile (Chrome DevTools + real device)
- [ ] Check all links work
- [ ] Verify scroll-to-anchor for #waitlist link
- [ ] Test button hover/active states
- [ ] Check contrast ratios (should be AAA compliant)
- [ ] Validate HTML ([validator.w3.org](https://validator.w3.org))
- [ ] Test in Safari, Chrome, Firefox
- [ ] Check loading speed (should be <2s)
- [ ] Verify meta tags ([metatags.io](https://metatags.io))
- [ ] Add favicon (create `images/favicon.ico`)

## 🔧 Customization

### Colors
Edit CSS variables in `styleguide/kallax-styles.css`:
```css
--color-bg-primary: #0f0f0f;
--color-brand-yellow: #FFD53D;
```

### Typography
Font weights and sizes are defined in the design system. Override in `styles.css` if needed.

### Spacing
Uses 4px base unit system. Adjust in design system variables.

## 📱 Mobile Testing

Test on actual devices, not just DevTools:
- iPhone (Safari)
- Android (Chrome)
- iPad (if targeting tablets)

## 🐛 Troubleshooting

**Form not submitting?**
- Check Formspree endpoint is correct
- Check browser console for errors
- Verify form action URL is accessible

**Video not playing?**
- Check file path is correct
- Verify video format (MP4 recommended)
- Check browser console for errors
- Video fallback will hide video wrapper on error

**Styles not loading?**
- Check `styleguide/kallax-styles.css` path is correct
- Verify CSS import in `styles.css` line 10
- Check browser console for 404 errors

## 📈 Post-Launch

**Week 1:**
- Share URL with 5 DJ friends
- Post in r/DJs, Discogs forums (one post each)
- Monitor form submissions

**Week 2:**
- Add 60-second demo video if you have app footage
- Respond to any signup questions

**Week 3:**
- If 20+ signups: add "Current Beta Testers: X" counter
- If <10 signups: focus on app dev, not marketing

## 📄 License

Proprietary - All rights reserved

## 📧 Contact

For questions about this landing page, contact: contact@kallax.app

---

**Built with**: Pure HTML/CSS/JS (no framework)  
**Design System**: Kallax Neo-Brutalist Dark Theme  
**Deployment**: Static hosting ready

