# Daily Prayer Tools - PWA Installation Guide

## 📱 Install on iPhone

### Option 1: Direct Installation (Easiest)
1. **Upload all files** to a web hosting service:
   - **GitHub Pages** (free): Create a repo, upload files, enable Pages
   - **Netlify** (free): Drag and drop all files
   - **Vercel** (free): Connect to GitHub or upload files
   
2. **Open the URL** in Safari on your iPhone
3. **Tap the Share button** (square with arrow up)
4. **Scroll down** and tap "Add to Home Screen"
5. **Tap "Add"** - the app will appear on your home screen!

### Option 2: Local Installation
1. **Email yourself** the entire folder as a zip file
2. **Extract on your computer** and upload to any web hosting
3. **Follow steps 2-5** from Option 1

## ✨ What You Get

### PWA Features:
- **App Icon** on home screen with prayer hands 🙏
- **Full Screen** experience (no browser bars)
- **Works Offline** after first load
- **Daily Fresh Content** automatically
- **Completion Tracking** for each day
- **Professional Look** like a real app store app

### Prayer Tools:
- **The Examen** - 5-step daily reflection
- **Lectio Divina** - Sacred Scripture meditation  
- **Adoration** - Worshipful focus on God's character

### Content Library:
- **50 Lectio Scriptures** with focus words
- **30 Adoration passages** exploring God's attributes
- **Multiple Examen prompts** for varied reflection
- **365+ day cycle** before content repeats

## 🎯 How to Use Daily

1. **Open app** from home screen
2. **Choose a prayer tool** 
3. **Work through the steps** thoughtfully
4. **Click "Finish"** when complete
5. **See completion confirmation** ✓
6. **Return anytime** for additional sessions

## 📂 Files Included

- `index.html` - Main app page
- `styles.css` - Beautiful styling
- `app.js` - Main functionality
- `content.js` - Prayer content library
- `manifest.json` - PWA configuration
- `sw.js` - Offline functionality
- `icons/` - App icons (all sizes)

## 🌐 Recommended Hosting

### Free Options:
- **GitHub Pages**: github.com → New Repository → Upload files → Settings → Pages
- **Netlify**: netlify.com → Drag & drop folder
- **Vercel**: vercel.com → Import project

### Benefits of Hosting Online:
- **Access anywhere** with internet
- **Share with family/friends** easily  
- **Automatic updates** when you modify files
- **Professional URL** instead of file paths

## 🔧 Customization

To modify content:
1. **Edit `content.js`** to add/change prayers
2. **Upload new version** to your hosting
3. **Hard refresh** the app to see changes

## ❓ Troubleshooting

**"Add to Home Screen" not appearing?**
- Must use Safari browser (not Chrome)
- Make sure page is fully loaded
- Try refreshing the page

**App not working offline?**
- Visit the app online first to cache files
- Check that service worker registered successfully

**Icons not showing?**
- Icons are embedded as data URLs and should work
- If needed, replace with proper PNG files

---

*This PWA provides a complete daily prayer experience in a beautiful, app-like interface that works offline and feels like a native iOS app.*