# DesignMind AI - Landing Page

A modern, animated landing page for DesignMind AI - an AI-powered design assistant.

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in your browser.

### Option 2: Use Local Server (Recommended)
```bash
# Python 3
python3 -m http.server 8000

# PHP
php -S localhost:8000

# Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

### Testing
Open `test.html` to run system checks and verify everything works correctly.

## 📁 Project Structure

```
landing1/
├── index.html          # Main landing page
├── test.html           # System test page
├── css/
│   └── main.css       # All styles (37KB)
├── js/
│   └── main.js        # All JavaScript (21KB)
├── lib/                # External libraries (not used - CDN instead)
└── assets/
    ├── images/        # Image assets
    └── svg/           # SVG illustrations
```

## 🎨 Features

### Sections
1. **Hero** - Animated gradient background, rotating text
2. **Problem** - Glass-morphism cards showing pain points
3. **Solution** - 4-step process with zigzag layout
4. **Features** - Tab navigation with 5 feature categories
5. **Interactive Demo** - Auto-playing step-by-step walkthrough
6. **Testimonials** - Bento grid layout
7. **Pricing** - Monthly/Annual toggle with 3 tiers
8. **Integrations** - Grid of 9+ integrations
9. **Final CTA** - Call-to-action with trust badges
10. **Footer** - Company info and links

### Animations
- GSAP scroll-triggered animations (with fallback)
- Rotating hero text (3s interval)
- Particle canvas background
- Floating geometric shapes
- Card hover effects
- Tab transitions
- FAQ accordion
- Smooth scroll navigation

### Design System
- **Colors:** Primary Purple (#6C5CE7), Electric Cyan (#00D4FF), Deep Indigo (#0C0E27)
- **Typography:** Inter font family
- **Spacing:** 8px grid system
- **Responsive:** Mobile (320px+), Tablet (768px+), Desktop (1024px+)

## 🔧 Technical Details

### Technologies
- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, custom properties)
- Vanilla JavaScript
- GSAP 3.12.5 (via CDN)
- Google Fonts (Inter)

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

### Performance
- Progressive enhancement (works without JavaScript)
- Fallback animations using Intersection Observer
- Optimized CSS with custom properties
- CDN-hosted libraries
- Debounced/throttled event handlers

## 🐛 Troubleshooting

### Sections appear empty
1. Open browser console (F12)
2. Look for error messages
3. Check if JavaScript loaded: "DesignMind AI - JavaScript loaded successfully"
4. Verify CSS loads: Check Network tab for `main.css`

### Animations don't work
- Check if GSAP loaded from CDN
- Verify internet connection
- Look for console errors
- Fallback animations should work even if GSAP fails

### CORS errors when opening locally
Use a local server instead of file:// protocol (see Quick Start above)

## 📝 Customization

### Update Content
Edit `index.html`:
- Change text in each section
- Update pricing tiers
- Modify testimonials
- Add/remove integration cards

### Modify Colors
Edit `css/main.css` at `:root`:
```css
--primary-purple: #6C5CE7;
--electric-cyan: #00D4FF;
--deep-indigo: #0C0E27;
```

### Adjust Animations
Edit `js/main.js`:
- Change rotation interval: Line ~170
- Modify scroll triggers: Lines ~40-120
- Adjust animation durations

## 🎯 Checklist

- ✅ Semantic HTML5 markup
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ GSAP scroll animations with fallback
- ✅ Progressive enhancement
- ✅ Keyboard navigation support
- ✅ Browser console logging for debugging
- ✅ Performance optimizations
- ✅ Cross-browser compatibility

## 📦 Deployment

### GitHub Pages
```bash
# Push to main branch
git push origin main

# Enable GitHub Pages in repository settings
# Set source to main branch / root
```

### Netlify
1. Drag and drop the `landing1` folder to Netlify
2. Or connect your GitHub repository
3. Build settings: None (static site)
4. Publish directory: `/`

### Vercel
```bash
vercel --prod
```

## 🔐 Security

- No external scripts except trusted CDNs (GSAP, Google Fonts)
- No forms submitting data (add backend as needed)
- No localStorage/cookies used
- Safe for static hosting

## 📄 License

All rights reserved - DesignMind AI © 2025

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Open `test.html` to run system checks
3. Check browser console for error messages
4. Verify all files are in correct directories

---

Built with ❤️ for DesignMind AI
