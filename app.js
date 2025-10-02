// Get daily content based on date
function getDailyIndex(arrayLength, offset = 0) {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return (dayOfYear + offset) % arrayLength;
}

// Completion tracking
function getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function isCompletedToday(activity) {
    const todayKey = getTodayKey();
    const completedKey = `${activity}_completed_${todayKey}`;
    return localStorage.getItem(completedKey) === 'true';
}

function markCompleted(activity) {
    const todayKey = getTodayKey();
    const completedKey = `${activity}_completed_${todayKey}`;
    localStorage.setItem(completedKey, 'true');
}

// Cache DOM elements for better performance
const activityElements = {};

function initializeActivityElements() {
    const activities = ['examen', 'lectio', 'adoration', 'apostolic', 'prayerset', 'persecuted'];
    activities.forEach(activity => {
        const content = document.getElementById(`${activity}-content`);
        if (content) {
            activityElements[activity] = {
                content,
                finishButton: content.querySelector('.finish-button'),
                completed: document.getElementById(`${activity}-completed`)
            };
        }
    });
}

// Single reusable completion function
function completeActivity(activityName) {
    markCompleted(activityName);
    const elements = activityElements[activityName];
    if (elements) {
        elements.finishButton.style.display = 'none';
        elements.completed.style.display = 'block';
    }
}

// Individual completion functions for backwards compatibility
function completeExamen() { completeActivity('examen'); }
function completeLectio() { completeActivity('lectio'); }
function completeAdoration() { completeActivity('adoration'); }
function completeApostolic() { completeActivity('apostolic'); }
function completePrayerSet() { completeActivity('prayerset'); }
function completePersecuted() { completeActivity('persecuted'); }

function updateCompletionStates() {
    Object.keys(activityElements).forEach(activity => {
        const elements = activityElements[activity];
        if (elements) {
            const isCompleted = isCompletedToday(activity);
            elements.finishButton.style.display = isCompleted ? 'none' : 'inline-block';
            elements.completed.style.display = isCompleted ? 'block' : 'none';
        }
    });
}

function getDailyContent() {
    // Each tool gets different content each day
    const examenIndex = getDailyIndex(examenPrompts.verses.length, 0);
    const lectioIndex = getDailyIndex(lectioScriptures.length, 100); // Offset so they don't sync
    const adorationIndex = getDailyIndex(adorationScriptures.length, 200); // Different offset
    const apostolicIndex = getDailyIndex(apostolicPrayers.length, 300); // Another different offset
    const persecutedIndex = getDailyIndex(persecutedChurchPrayers.length, 500); // Persecuted church offset
    
    return {
        examen: {
            verse: examenPrompts.verses[examenIndex],
            gratitude: examenPrompts.gratitude[getDailyIndex(examenPrompts.gratitude.length, 1)],
            consolation: examenPrompts.consolation[getDailyIndex(examenPrompts.consolation.length, 2)],
            desolation: examenPrompts.desolation[getDailyIndex(examenPrompts.desolation.length, 3)],
            forgiveness: examenPrompts.forgiveness[getDailyIndex(examenPrompts.forgiveness.length, 4)],
            tomorrow: examenPrompts.tomorrow[getDailyIndex(examenPrompts.tomorrow.length, 5)],
            closing: examenPrompts.closings[getDailyIndex(examenPrompts.closings.length, 6)]
        },
        lectio: lectioScriptures[lectioIndex],
        adoration: adorationScriptures[adorationIndex],
        apostolic: apostolicPrayers[apostolicIndex],
        persecuted: persecutedChurchPrayers[persecutedIndex],
        prayerset: {
            movement1: prayerSetContent.movement1[getDailyIndex(prayerSetContent.movement1.length, 400)],
            movement2: prayerSetContent.movement2[getDailyIndex(prayerSetContent.movement2.length, 401)],
            movement3: prayerSetContent.movement3[getDailyIndex(prayerSetContent.movement3.length, 402)],
            movement4: prayerSetContent.movement4[getDailyIndex(prayerSetContent.movement4.length, 403)],
            movement5: prayerSetContent.movement5[getDailyIndex(prayerSetContent.movement5.length, 404)],
            movement6: prayerSetContent.movement6[getDailyIndex(prayerSetContent.movement6.length, 405)],
            movement7: prayerSetContent.movement7[getDailyIndex(prayerSetContent.movement7.length, 406)]
        }
    };
}

function loadDailyContent() {
    const daily = getDailyContent();
    
    // Load daily Examen content
    document.getElementById('examen-verse').textContent = daily.examen.verse;
    document.getElementById('gratitude-prompt').textContent = daily.examen.gratitude;
    document.getElementById('consolation-prompt').textContent = daily.examen.consolation;
    document.getElementById('desolation-prompt').textContent = daily.examen.desolation;
    document.getElementById('forgiveness-prompt').textContent = daily.examen.forgiveness;
    document.getElementById('tomorrow-prompt').textContent = daily.examen.tomorrow;
    document.getElementById('examen-closing').textContent = daily.examen.closing;
    
    // Load daily Lectio content
    document.getElementById('lectio-scripture').innerHTML = `"${daily.lectio.text}" - ${daily.lectio.reference}`;
    document.getElementById('lectio-focus').innerHTML = `Focus Word: "${daily.lectio.focus}"<br><small>Carry this word with you today as a reminder of God's invitation.</small>`;
    
    // Load daily Adoration content
    document.getElementById('adoration-scripture').innerHTML = `"${daily.adoration.text}" - ${daily.adoration.reference}`;
    document.getElementById('acknowledge-prompt').textContent = daily.adoration.acknowledge;
    document.getElementById('adore-prompt').textContent = daily.adoration.adore;
    document.getElementById('surrender-prompt').textContent = daily.adoration.surrender;
    document.getElementById('transformation-prompt').textContent = daily.adoration.transformation;
    document.getElementById('adoration-focus').innerHTML = `Today's Focus: ${daily.adoration.focus}<br><small>Meditate on this aspect of God's character throughout your day.</small>`;
    document.getElementById('adoration-closing').textContent = daily.adoration.closing;
    
    // Load daily Apostolic Prayers content
    document.getElementById('apostolic-prayer').innerHTML = `"${daily.apostolic.prayer}" - ${daily.apostolic.reference}`;
    document.getElementById('apostolic-respond-prompt').textContent = daily.apostolic.respond;
    document.getElementById('apostolic-reach-prompt').textContent = daily.apostolic.reach;
    document.getElementById('apostolic-focus').innerHTML = `Today's Blessing: "${daily.apostolic.focus}"<br><small>Carry this apostolic blessing with you as you pray for God's wisdom today.</small>`;
    document.getElementById('apostolic-closing').textContent = daily.apostolic.closing;
    
    // Load daily Prayer Set content
    for (let i = 1; i <= 7; i++) {
        const movement = daily.prayerset[`movement${i}`];
        document.getElementById(`prayerset-movement${i}-scripture`).innerHTML = `"${movement.scripture}" - ${movement.reference}`;
        document.getElementById(`prayerset-movement${i}-prompt`).textContent = movement.prompt;
    }
    
    // Load daily Persecuted Church content
    const persecuted = daily.persecuted;
    document.getElementById('persecuted-country').textContent = persecuted.country;
    document.getElementById('persecuted-region').textContent = persecuted.region;
    if (persecuted.rank > 0) {
        document.getElementById('persecuted-rank').textContent = `#${persecuted.rank}`;
        document.getElementById('persecuted-rank').style.display = 'inline-block';
    } else {
        document.getElementById('persecuted-rank').style.display = 'none';
    }
    document.getElementById('persecuted-context').textContent = persecuted.context;
    document.getElementById('persecuted-prayer').textContent = persecuted.prayer;
    document.getElementById('persecuted-scripture').innerHTML = `"${persecuted.scripture}" - ${persecuted.reference}`;
}

function showTool(tool) {
    document.getElementById('main-menu').style.display = 'none';
    document.querySelectorAll('.prayer-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tool + '-content').classList.add('active');
}

function showCreed(creed) {
    // Hide all creed sections
    document.querySelectorAll('.creed-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.creed-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected creed
    document.getElementById(creed + '-creed').classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

function showPrayer(prayer) {
    // Hide all prayer sections
    document.querySelectorAll('.prayer-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.prayer-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected prayer
    document.getElementById(prayer + '-prayer').classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

function showMainMenu() {
    document.getElementById('main-menu').style.display = 'block';
    document.querySelectorAll('.prayer-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Generate fresh content when returning to main menu
    generateExamenContent();
    generateLectioContent();
    generateAdorationContent();
    generateApostolicContent();
    generatePrayerSetContent();
    generatePersecutedContent();
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Manual content generation (still available via buttons)
function generateExamenContent() {
    document.getElementById('examen-verse').textContent = getRandomItem(examenPrompts.verses);
    document.getElementById('gratitude-prompt').textContent = getRandomItem(examenPrompts.gratitude);
    document.getElementById('consolation-prompt').textContent = getRandomItem(examenPrompts.consolation);
    document.getElementById('desolation-prompt').textContent = getRandomItem(examenPrompts.desolation);
    document.getElementById('forgiveness-prompt').textContent = getRandomItem(examenPrompts.forgiveness);
    document.getElementById('tomorrow-prompt').textContent = getRandomItem(examenPrompts.tomorrow);
    document.getElementById('examen-closing').textContent = getRandomItem(examenPrompts.closings);
}

function generateLectioContent() {
    const scripture = getRandomItem(lectioScriptures);
    document.getElementById('lectio-scripture').innerHTML = `"${scripture.text}" - ${scripture.reference}`;
    document.getElementById('lectio-focus').innerHTML = `Focus Word: "${scripture.focus}"<br><small>Carry this word with you today as a reminder of God's invitation.</small>`;
}

function generateAdorationContent() {
    const scripture = getRandomItem(adorationScriptures);
    document.getElementById('adoration-scripture').innerHTML = `"${scripture.text}" - ${scripture.reference}`;
    document.getElementById('acknowledge-prompt').textContent = scripture.acknowledge;
    document.getElementById('adore-prompt').textContent = scripture.adore;
    document.getElementById('surrender-prompt').textContent = scripture.surrender;
    document.getElementById('transformation-prompt').textContent = scripture.transformation;
    document.getElementById('adoration-focus').innerHTML = `Today's Focus: ${scripture.focus}<br><small>Meditate on this aspect of God's character throughout your day.</small>`;
    document.getElementById('adoration-closing').textContent = scripture.closing;
}

function generateApostolicContent() {
    const prayer = getRandomItem(apostolicPrayers);
    document.getElementById('apostolic-prayer').innerHTML = `"${prayer.prayer}" - ${prayer.reference}`;
    document.getElementById('apostolic-respond-prompt').textContent = prayer.respond;
    document.getElementById('apostolic-reach-prompt').textContent = prayer.reach;
    document.getElementById('apostolic-focus').innerHTML = `Today's Blessing: "${prayer.focus}"<br><small>Carry this apostolic blessing with you as you pray for God's wisdom today.</small>`;
    document.getElementById('apostolic-closing').textContent = prayer.closing;
}

function generatePrayerSetContent() {
    for (let i = 1; i <= 7; i++) {
        const movement = getRandomItem(prayerSetContent[`movement${i}`]);
        document.getElementById(`prayerset-movement${i}-scripture`).innerHTML = `"${movement.scripture}" - ${movement.reference}`;
        document.getElementById(`prayerset-movement${i}-prompt`).textContent = movement.prompt;
    }
}

function generatePersecutedContent() {
    const prayer = getRandomItem(persecutedChurchPrayers);
    document.getElementById('persecuted-country').textContent = prayer.country;
    document.getElementById('persecuted-region').textContent = prayer.region;
    if (prayer.rank > 0) {
        document.getElementById('persecuted-rank').textContent = `#${prayer.rank}`;
        document.getElementById('persecuted-rank').style.display = 'inline-block';
    } else {
        document.getElementById('persecuted-rank').style.display = 'none';
    }
    document.getElementById('persecuted-context').textContent = prayer.context;
    document.getElementById('persecuted-prayer').textContent = prayer.prayer;
    document.getElementById('persecuted-scripture').innerHTML = `"${prayer.scripture}" - ${prayer.reference}`;
}

// Function to show update notification
function showUpdateNotification() {
    // Create update notification element
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
            font-family: inherit;
        ">
            <div style="font-weight: 600; margin-bottom: 8px;">
                📱 Update Available
            </div>
            <div style="font-size: 14px; margin-bottom: 12px;">
                A new version of the app is ready. Refresh to get the latest features.
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="refreshApp()" style="
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                ">
                    Refresh Now
                </button>
                <button onclick="dismissUpdateNotification()" style="
                    background: transparent;
                    color: white;
                    border: 1px solid white;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                ">
                    Later
                </button>
            </div>
        </div>
    `;
    
    // Remove existing notification if present
    const existing = document.getElementById('update-notification');
    if (existing) {
        existing.remove();
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-dismiss after 10 seconds if not interacted with
    setTimeout(() => {
        if (document.getElementById('update-notification')) {
            dismissUpdateNotification();
        }
    }, 10000);
}

// Function to refresh the app
function refreshApp() {
    // Tell the waiting service worker to skip waiting and take control
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
}

// Function to dismiss update notification
function dismissUpdateNotification() {
    const notification = document.getElementById('update-notification');
    if (notification) {
        notification.remove();
    }
}

// Initialize with fresh content on every page load
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize DOM element cache for better performance
        initializeActivityElements();
        
        // Generate fresh random content every time the page loads
        generateExamenContent();
        generateLectioContent();
        generateAdorationContent();
        generateApostolicContent();
        generatePrayerSetContent();
        generatePersecutedContent();
        
        updateCompletionStates(); // Check what's been completed today
        
    } catch (error) {
        console.error('App initialization failed:', error);
        // Fallback: try to at least show the main menu
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) mainMenu.style.display = 'block';
    }
    
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
                
                // Check for updates on page load
                registration.update();
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('New service worker found, installing...');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available
                            console.log('New content available, will update on next visit');
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        
        // Listen for messages from the service worker
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'SW_UPDATED') {
                showUpdateNotification();
            }
        });
        
        // Check for waiting service worker
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
});