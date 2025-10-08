# Pray - Daily Prayer Tools PWA

A comprehensive Progressive Web App for Christian prayer and spiritual formation, featuring 10 distinct prayer tools with extensive content libraries and daily rotating content.

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
- **App Icon** on home screen 🙏
- **Full Screen** experience (no browser bars)
- **Works Offline** after first load
- **Daily Fresh Content** automatically rotates
- **Dark Mode** toggle for comfortable reading
- **Professional Look** like a native app

### 10 Prayer Tools:

1. **Adoration** - Worshipful meditation on God's character with 30+ daily rotating passages
2. **The Lord's Prayer** - A liturgical journey through the Lord's Prayer with 7 movements
3. **The Beatitudes** - Meditate on Jesus' teachings from the Sermon on the Mount
4. **Daily Listening** - Listen for God's voice through reflective questions
5. **Lectio Divina** - Sacred reading and meditation on Scripture (50+ passages)
6. **The Examen** - Ignatian practice to discern consolation and desolation in your day
7. **Prayers of the Apostles** - Pray through prayers written by the apostles in Scripture
8. **Pray for the Persecuted** - Intercede for believers facing persecution worldwide
9. **Written Prayers** - 14 beloved Christian prayers through the ages
10. **Creeds** - Profess your faith with the ancient creeds of the church

### Content Libraries:

#### Written Prayers (14 Total):
- Prayer of St. Francis (1912)
- The Serenity Prayer (Reinhold Niebuhr, 1932)
- Prayer of St. Ignatius (16th Century)
- Suscipe (St. Ignatius, 16th Century)
- Prayer of St. Richard of Chichester (13th Century)
- Anima Christi - Soul of Christ (14th Century)
- Prayer of St. Patrick - Breastplate (5th Century)
- St. Augustine's Evening Prayer (4th-5th Century)
- Te Deum Laudamus (4th-5th Century)
- Nada Te Turbe - St. Teresa of Ávila (1582)
- Lead, Kindly Light (John Henry Newman, 1833)
- The Doxology (Thomas Ken, c. 1674)
- Radiating Christ (Mother Teresa, adapted from Newman)
- Morning Prayer (Jamie Winship)

#### Historic Creeds:
- The Apostles' Creed (2nd century)
- The Nicene Creed (325/381 AD)

#### Daily Rotating Content:
- **50+ Lectio Divina Scriptures** with focus words
- **30+ Adoration passages** exploring God's attributes
- **Multiple Examen prompts** for varied daily reflection
- **365+ day cycle** before content repeats

## 🎯 How to Use Daily

1. **Open app** from home screen
2. **Choose a prayer tool** 
3. **Work through the steps** thoughtfully
4. **Click "Finish"** when complete
5. **See completion confirmation** ✓
6. **Return anytime** for additional sessions

## 📂 Project Structure

```
prayer-app/
├── index.html                    # Main app HTML with all prayer tools
├── styles.css                    # Styling with dark mode support
├── app.js                        # Core functionality and daily content rotation
├── content.js                    # Prayer content library (Examen, Lectio, Adoration, Apostolic)
├── persecuted-church-data.js     # Data for persecuted church prayers
├── manifest.json                 # PWA configuration
├── sw.js                         # Service worker for offline functionality
├── favicon.ico                   # Browser favicon
├── apple-touch-icon-new.png      # iOS home screen icon
├── favicon-16x16.png            # 16x16 favicon
├── favicon-32x32.png            # 32x32 favicon
└── Icons/
    └── web/
        ├── icon-192.png          # 192x192 web icon
        ├── icon-192-maskable.png # 192x192 maskable icon
        ├── icon-512.png          # 512x512 web icon
        └── icon-512-maskable.png # 512x512 maskable icon
```

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

### Modifying Prayer Content

**Dynamic Content (Rotates Daily):**
- Edit `content.js` to add/change:
  - Examen prompts and reflections
  - Lectio Divina Scripture passages
  - Adoration passages and focus areas
  - Apostolic prayers

**Static Content:**
- Edit `persecuted-church-data.js` to update:
  - Persecuted church countries and prayer focuses
  
- Edit `index.html` to modify:
  - Written Prayers and their historical context
  - Creeds text
  - Lord's Prayer movements
  - Beatitudes reflections
  - Daily Listening questions

### Deploying Updates

1. **Upload new version** to your hosting
2. **Hard refresh** the app to clear cache:
   - iOS: Pull down to refresh or clear Safari cache
   - Desktop: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. **Service Worker** will automatically cache the new version

## ❓ Troubleshooting

**"Add to Home Screen" not appearing?**
- Must use Safari browser (not Chrome)
- Make sure page is fully loaded
- Try refreshing the page

**App not working offline?**
- Visit the app online first to cache files
- Check that service worker registered successfully

**Icons not showing?**
- Check that icon files are in the correct directory
- Verify manifest.json paths are correct
- Clear cache and reload

**Dark mode not working?**
- Mode preference is saved in localStorage
- Try clicking the sun/moon toggle in the top-right
- Clear browser cache if issues persist

---

## 🙏 Features Overview

### Adoration
Daily rotating passages exploring God's character attributes with Scripture meditation and personal reflection prompts.

### The Lord's Prayer
Seven-movement liturgical journey through the Lord's Prayer:
1. Our Father Who Is In Heaven (Approach, Worship, Adoration & Surrender)
2. Hallowed Be Your Name (Worship, Gratitude & Prayer for the World)
3. Your Kingdom Come, Your Will Be Done (Submission & Intercession)
4. Give Us This Day Our Daily Bread (Provision - His Presence, Mercy & Help)
5. Forgive Us As We Forgive Others (Reflection & Release)
6. Lead Us Not Into Trial, Deliver Us From Evil (Gethsemane Prayer & Spiritual Warfare)
7. Listening Prayer (Hearing God's Voice)

### Lectio Divina
Four-step sacred reading practice with 50+ Scripture passages:
- **Lectio** (Read) - Scripture passage
- **Meditatio** (Meditate) - Reflection with focus word
- **Oratio** (Pray) - Personal prayer response
- **Contemplatio** (Contemplate) - Rest in God's presence

### The Examen
Five-step Ignatian practice for daily review:
1. Give Thanks - Gratitude is the Foundation
2. Ask for Light - Invite the Holy Spirit
3. Review the Day - Notice Consolation and Desolation
4. Face Your Shortcomings - Ask Forgiveness
5. Look Ahead - Prepare for Tomorrow

### The Beatitudes
Nine beatitudes from the Sermon on the Mount (Matthew 5:1-12), with guided reflection questions for each blessing to help you meditate on Jesus' radical kingdom values and listen for how God wants to transform your heart.

### Daily Listening
A simple, profound practice of listening prayer with three reflective questions:
- "What is the most important thing you want to tell me right now/today?"
- "What do you want me to know?"
- "What do you want me to do?"

### Prayers of the Apostles
Pray through biblical prayers written by apostles like Paul, with four-step structured reflection:
1. Read - Understand the Prayer
2. Receive - Make It Personal
3. Respond - Pray It Back to God
4. Reach Out - Pray for Others

### Pray for the Persecuted
Daily rotating countries with specific persecution details, Scripture encouragement, and focused prayer prompts for believers facing persecution worldwide. Remember those in prison as if you were together with them.

### Written Prayers
14 historic Christian prayers spanning nearly 2,000 years, from 4th-century prayers to contemporary classics, with historical context and complete texts. Each prayer includes its author and date.

### Creeds
Historic statements of Christian faith used across denominations:
- The Apostles' Creed (2nd century)
- The Nicene Creed (325/381 AD)

Each includes explanatory context about origin and significance, with three-step guided reflection.

---

## 🛠️ Technical Details

### Technologies Used
- **Pure HTML/CSS/JavaScript** - No frameworks or build tools required
- **Progressive Web App (PWA)** - Installable with offline support
- **Service Worker** - Caches content for offline access
- **LocalStorage** - Saves dark mode preference and completion tracking
- **Responsive Design** - Works on all screen sizes

### Browser Compatibility
- **iOS Safari** ✅ (Recommended for installation)
- **Chrome/Edge** ✅ (Desktop and mobile)
- **Firefox** ✅ (Desktop and mobile)
- **Samsung Internet** ✅

### Key Features
- **Daily Rotating Content** - Uses date-based rotation to provide fresh content each day
- **Completion Tracking** - Tracks when you finish each prayer session
- **Dark Mode** - System-aware with manual toggle
- **Offline-First** - Works without internet after first visit
- **No Login Required** - All data stored locally on your device
- **Privacy-Focused** - No analytics, tracking, or data collection

### Performance
- **Instant Load** - Cached by service worker after first visit
- **Small Footprint** - ~500KB total app size
- **Battery Efficient** - Minimal JavaScript processing
- **Works Offline** - Full functionality without internet

---

## 📄 License

This project is provided as-is for personal and ministry use. Feel free to adapt and share.

---

*This PWA provides a complete daily prayer experience with rich content, beautiful design, and app-like functionality that works offline. Built with simplicity, focused on spirituality.*