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

function completeExamen() {
    markCompleted('examen');
    document.querySelector('#examen-content .finish-button').style.display = 'none';
    document.getElementById('examen-completed').style.display = 'block';
}

function completeLectio() {
    markCompleted('lectio');
    document.querySelector('#lectio-content .finish-button').style.display = 'none';
    document.getElementById('lectio-completed').style.display = 'block';
}

function completeAdoration() {
    markCompleted('adoration');
    document.querySelector('#adoration-content .finish-button').style.display = 'none';
    document.getElementById('adoration-completed').style.display = 'block';
}

function completeApostolic() {
    markCompleted('apostolic');
    document.querySelector('#apostolic-content .finish-button').style.display = 'none';
    document.getElementById('apostolic-completed').style.display = 'block';
}

function updateCompletionStates() {
    // Check and update Examen
    if (isCompletedToday('examen')) {
        document.querySelector('#examen-content .finish-button').style.display = 'none';
        document.getElementById('examen-completed').style.display = 'block';
    } else {
        document.querySelector('#examen-content .finish-button').style.display = 'inline-block';
        document.getElementById('examen-completed').style.display = 'none';
    }

    // Check and update Lectio
    if (isCompletedToday('lectio')) {
        document.querySelector('#lectio-content .finish-button').style.display = 'none';
        document.getElementById('lectio-completed').style.display = 'block';
    } else {
        document.querySelector('#lectio-content .finish-button').style.display = 'inline-block';
        document.getElementById('lectio-completed').style.display = 'none';
    }

    // Check and update Adoration
    if (isCompletedToday('adoration')) {
        document.querySelector('#adoration-content .finish-button').style.display = 'none';
        document.getElementById('adoration-completed').style.display = 'block';
    } else {
        document.querySelector('#adoration-content .finish-button').style.display = 'inline-block';
        document.getElementById('adoration-completed').style.display = 'none';
    }

    // Check and update Apostolic Prayers
    if (isCompletedToday('apostolic')) {
        document.querySelector('#apostolic-content .finish-button').style.display = 'none';
        document.getElementById('apostolic-completed').style.display = 'block';
    } else {
        document.querySelector('#apostolic-content .finish-button').style.display = 'inline-block';
        document.getElementById('apostolic-completed').style.display = 'none';
    }
}

function getDailyContent() {
    // Each tool gets different content each day
    const examenIndex = getDailyIndex(examenPrompts.verses.length, 0);
    const lectioIndex = getDailyIndex(lectioScriptures.length, 100); // Offset so they don't sync
    const adorationIndex = getDailyIndex(adorationScriptures.length, 200); // Different offset
    const apostolicIndex = getDailyIndex(apostolicPrayers.length, 300); // Another different offset
    
    return {
        examen: {
            verse: examenPrompts.verses[examenIndex],
            gratitude: examenPrompts.gratitude[getDailyIndex(examenPrompts.gratitude.length, 1)],
            grace: examenPrompts.grace[getDailyIndex(examenPrompts.grace.length, 2)],
            forgiveness: examenPrompts.forgiveness[getDailyIndex(examenPrompts.forgiveness.length, 3)],
            tomorrow: examenPrompts.tomorrow[getDailyIndex(examenPrompts.tomorrow.length, 4)],
            closing: examenPrompts.closings[getDailyIndex(examenPrompts.closings.length, 5)]
        },
        lectio: lectioScriptures[lectioIndex],
        adoration: adorationScriptures[adorationIndex],
        apostolic: apostolicPrayers[apostolicIndex]
    };
}

function loadDailyContent() {
    const daily = getDailyContent();
    
    // Load daily Examen content
    document.getElementById('examen-verse').textContent = daily.examen.verse;
    document.getElementById('gratitude-prompt').textContent = daily.examen.gratitude;
    document.getElementById('grace-prompt').textContent = daily.examen.grace;
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
}

function showTool(tool) {
    document.getElementById('main-menu').style.display = 'none';
    document.querySelectorAll('.prayer-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tool + '-content').classList.add('active');
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
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Manual content generation (still available via buttons)
function generateExamenContent() {
    document.getElementById('examen-verse').textContent = getRandomItem(examenPrompts.verses);
    document.getElementById('gratitude-prompt').textContent = getRandomItem(examenPrompts.gratitude);
    document.getElementById('grace-prompt').textContent = getRandomItem(examenPrompts.grace);
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
    // Generate fresh random content every time the page loads
    generateExamenContent();
    generateLectioContent();
    generateAdorationContent();
    generateApostolicContent();
    
    updateCompletionStates(); // Check what's been completed today
    
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