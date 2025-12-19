# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### 1. Add Hero Video (5 minutes)

1. Go to [Pexels.com](https://www.pexels.com)
2. Search for: "DJ mixing", "vinyl record", or "turntable"
3. Download a video (MP4 format)
4. Place it in the `images/` folder
5. Update `index.html` line 27:
   ```html
   <source src="images/your-video-name.mp4" type="video/mp4">
   ```

**Tip**: Keep video under 5MB. Use [HandBrake](https://handbrake.fr/) to compress if needed.

### 2. Setup Form (5 minutes)

1. Go to [formspree.io](https://formspree.io)
2. Sign up (free account)
3. Click "New Form"
4. Copy your form endpoint (looks like: `https://formspree.io/f/abc123xyz`)
5. Open `index.html`
6. Find line 99: `action="https://formspree.io/f/YOUR_FORM_ID"`
7. Replace `YOUR_FORM_ID` with your actual form ID

**Example:**
```html
<!-- Before -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- After -->
<form action="https://formspree.io/f/abc123xyz" method="POST">
```

### 3. Test Locally (2 minutes)

Open `index.html` in your browser:
- **Chrome**: Right-click → Open with → Chrome
- **Or**: Use a local server:
  ```bash
  # Python 3
  python3 -m http.server 8000
  
  # Then visit: http://localhost:8000
  ```

Test:
- [ ] Page loads correctly
- [ ] Video plays (if added)
- [ ] Form submits (check Formspree dashboard)
- [ ] All links work
- [ ] Mobile view looks good (resize browser)

## 🚢 Deploy (Choose One)

### Vercel (Easiest)
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

## ✅ Done!

Your landing page is live. Share the URL and start collecting signups!

## 🐛 Troubleshooting

**Video not showing?**
- Check file path is correct
- Make sure video is MP4 format
- Check browser console for errors

**Form not working?**
- Verify Formspree endpoint is correct
- Check you're not on Formspree free tier limit (50/month)
- Test in incognito mode

**Styles look broken?**
- Make sure `styleguide/kallax-styles.css` exists
- Check browser console for 404 errors
- Verify CSS import path in `styles.css`

## 📞 Need Help?

Check the full `README.md` for detailed instructions.

