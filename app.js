// Dark Mode Toggle

function toggleDarkMode(event) {
    if (event) {
        event.stopPropagation(); // Prevent header click
    }
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    // Update theme color for mobile browsers
    updateThemeColor(isDarkMode);
    
    console.log('Dark mode toggled:', isDarkMode ? 'enabled' : 'disabled');
}

function updateThemeColor(isDarkMode) {
    const themeColorMeta = document.getElementById('theme-color-meta');
    if (themeColorMeta) {
        // Light mode: #667eea (purple-blue), Dark mode: #1a1a2e (dark blue-black)
        themeColorMeta.setAttribute('content', isDarkMode ? '#1a1a2e' : '#667eea');
    }
}

function initializeDarkMode() {
    // Check saved preference
    const darkMode = localStorage.getItem('darkMode');
    const isDarkMode = darkMode === 'enabled';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Update theme color on initial load
    updateThemeColor(isDarkMode);
    
    // Attach event listener to toggle button
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
        console.log('Dark mode toggle button initialized');
    } else {
        console.error('Dark mode toggle button not found');
    }
}

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
    const activities = ['examen', 'lectio', 'adoration', 'apostolic', 'prayerset', 'persecuted', 'listening', 'gentle-humble', 'affirmation'];
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
    // Redirect to home page
    showMainMenu();
}

// Individual completion functions for backwards compatibility
function completeExamen() { completeActivity('examen'); }
function completeLectio() { completeActivity('lectio'); }
function completeAdoration() { completeActivity('adoration'); }
function completeApostolic() { completeActivity('apostolic'); }
function completePrayerSet() { completeActivity('prayerset'); }
function completePersecuted() { completeActivity('persecuted'); }
function completeListening() { completeActivity('listening'); }
function completeGentleHumble() { completeActivity('gentle-humble'); }
function completeAffirmation() { completeActivity('affirmation'); }

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
    const listeningIndex = getDailyIndex(jamieWinshipQuotes.length, 600); // Listening offset
    const gentleHumbleIndex = getDailyIndex(gentleHumbleContent.length, 700); // Gentle humble offset
    const affirmationPromiseIndex = getDailyIndex(biblePromises.length, 800); // Affirmation promise offset
    
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
        // apostolic prayers now display all prayers statically - no dynamic content needed
        listening: jamieWinshipQuotes[listeningIndex],
        gentleHumble: gentleHumbleContent[gentleHumbleIndex],
        affirmation: {
            adorationVerse: adorationScriptures[adorationIndex],
            promise: biblePromises[affirmationPromiseIndex]
        },
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
    const lectioElement = document.getElementById('lectio-scripture');
    const lectioButton = lectioElement.querySelector('.new-content-button');
    lectioElement.innerHTML = `"${daily.lectio.text}" - ${daily.lectio.reference}`;
    if (lectioButton) {
        lectioElement.appendChild(lectioButton);
    }
    document.getElementById('lectio-focus').innerHTML = `Focus Word: "${daily.lectio.focus}"<br><small>Carry this word with you today as a reminder of God's invitation.</small>`;
    
    // Load daily Adoration content
    const adorationElement = document.getElementById('adoration-scripture');
    const adorationButton = adorationElement.querySelector('.new-content-button');
    adorationElement.innerHTML = `"${daily.adoration.text}" - ${daily.adoration.reference}`;
    if (adorationButton) {
        adorationElement.appendChild(adorationButton);
    }
    document.getElementById('acknowledge-prompt').textContent = daily.adoration.acknowledge;
    document.getElementById('adore-prompt').textContent = daily.adoration.adore;
    document.getElementById('surrender-prompt').textContent = daily.adoration.surrender;
    document.getElementById('transformation-prompt').textContent = daily.adoration.transformation;
    document.getElementById('adoration-focus').innerHTML = `Today's Focus: ${daily.adoration.focus}<br><small>Meditate on this aspect of God's character throughout your day.</small>`;
    document.getElementById('adoration-closing').textContent = daily.adoration.closing;
    
    // Apostolic Prayers now display all prayers statically - no dynamic content loading needed
    
    // Load daily Prayer Set content
    for (let i = 1; i <= 7; i++) {
        const movement = daily.prayerset[`movement${i}`];
        document.getElementById(`prayerset-movement${i}-scripture`).innerHTML = `"${movement.scripture}" - ${movement.reference}`;
        document.getElementById(`prayerset-movement${i}-prompt`).textContent = movement.prompt;
    }
    
    // Load Open Doors calendar entry for today
    loadPersecutedContent();
    
    // Load daily Listening content
    document.getElementById('listening-quote').innerHTML = `"${daily.listening}" - Jamie Winship`;
    
    // Load daily Gentle and Humble in Heart content
    document.getElementById('gentle-humble-scripture').innerHTML = `${daily.gentleHumble.scripture} - ${daily.gentleHumble.reference}`;
    document.getElementById('gentle-humble-quote').textContent = daily.gentleHumble.quote;
    document.getElementById('gentle-humble-author').textContent = `– ${daily.gentleHumble.author}`;
    
    // Load daily Affirmation content
    document.getElementById('affirmation-adoration-verse').innerHTML = `"${daily.affirmation.adorationVerse.text}" - ${daily.affirmation.adorationVerse.reference}`;
    document.getElementById('affirmation-promise').innerHTML = `"${daily.affirmation.promise.text}" - ${daily.affirmation.promise.reference}`;
}

function showTool(tool) {
    document.getElementById('main-menu').style.display = 'none';
    document.querySelectorAll('.prayer-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tool + '-content').classList.add('active');
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tool === 'memory-verses') {
        initMemoryVerses();
    }
    if (tool === 'apostolic' && typeof initApostolicPrayers === 'function') {
        initApostolicPrayers();
    }
    if (tool === 'declarations') {
        initDeclarations('in-christ');
    }
    if (tool === 'persecuted') {
        loadPersecutedContent();
    }
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

// ── Prayers of the Apostles Flashcard ───────────────────────────────────────

var apostolicPrayers = [
    {
        title: 'Boldness in Speaking God\'s Word',
        text: '"Now, Lord, consider their threats and enable your servants to speak your word with great boldness. Stretch out your hand to heal and perform signs and wonders through the name of your holy servant Jesus."',
        reference: 'Acts 4:29-30 (NIV), The Early Church'
    },
    {
        title: 'Spiritual Wisdom and Revelation',
        text: '"I keep asking that the God of our Lord Jesus Christ, the glorious Father, may give you the Spirit of wisdom and revelation, so that you may know him better. I pray that the eyes of your heart may be enlightened in order that you may know the hope to which he has called you, the riches of his glorious inheritance in his holy people, and his incomparably great power for us who believe."',
        reference: 'Ephesians 1:17-19 (NIV), Paul'
    },
    {
        title: 'Rooted in God\'s Love',
        text: '"I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being, so that Christ may dwell in your hearts through faith. And I pray that you, being rooted and established in love, may have power, together with all the Lord\'s holy people, to grasp how wide and long and high and deep is the love of Christ, and to know this love that surpasses knowledge—that you may be filled to the measure of all the fullness of God."',
        reference: 'Ephesians 3:14-21 (NIV), Paul'
    },
    {
        title: 'Prayer for All Occasions',
        text: '"And pray in the Spirit on all occasions with all kinds of prayers and requests. With this in mind, be alert and always keep on praying for all the Lord\'s people. Pray also for me, that whenever I speak, words may be given me so that I will fearlessly make known the mystery of the gospel, for which I am an ambassador in chains. Pray that I may declare it fearlessly, as I should."',
        reference: 'Ephesians 6:18-20 (NIV), Paul'
    },
    {
        title: 'Abounding Love and Discernment',
        text: '"And this is my prayer: that your love may abound more and more in knowledge and depth of insight, so that you may be able to discern what is best and may be pure and blameless for the day of Christ, filled with the fruit of righteousness that comes through Jesus Christ—to the glory and praise of God."',
        reference: 'Philippians 1:9-11 (NIV), Paul'
    },
    {
        title: 'Filled with the Knowledge of God\'s Will',
        text: '"We continually ask God to fill you with the knowledge of his will through all the wisdom and understanding that the Spirit gives, so that you may live a life worthy of the Lord and please him in every way: bearing fruit in every good work, growing in the knowledge of God, being strengthened with all power according to his glorious might so that you may have great endurance and patience, and giving joyful thanks to the Father, who has qualified you to share in the inheritance of his holy people in the kingdom of light."',
        reference: 'Colossians 1:9-12 (NIV), Paul'
    },
    {
        title: 'Open Doors for the Gospel',
        text: '"And pray for us, too, that God may open a door for our message, so that we may proclaim the mystery of Christ, for which I am in chains."',
        reference: 'Colossians 4:3 (NIV), Paul'
    },
    {
        title: 'Stand Firm in God\'s Will',
        text: '"He is always wrestling in prayer for you, that you may stand firm in all the will of God, mature and fully assured."',
        reference: 'Colossians 4:12 (NIV), Paul'
    },
    {
        title: 'Overflowing Love and Blameless Hearts',
        text: '"May the Lord make your love increase and overflow for each other and for everyone else, just as ours does for you. May he strengthen your hearts so that you will be blameless and holy in the presence of our God and Father when our Lord Jesus comes with all his holy ones."',
        reference: '1 Thessalonians 3:12-13 (NIV), Paul'
    },
    {
        title: 'Complete Sanctification',
        text: '"May God himself, the God of peace, sanctify you through and through. May your whole spirit, soul and body be kept blameless at the coming of our Lord Jesus Christ. The one who calls you is faithful, and he will do it."',
        reference: '1 Thessalonians 5:23-24 (NIV), Paul'
    },
    {
        title: 'Worthy of His Calling',
        text: '"With this in mind, we constantly pray for you, that our God may make you worthy of his calling, and that by his power he may bring to fruition your every desire for goodness and your every deed prompted by faith. We pray this so that the name of our Lord Jesus may be glorified in you, and you in him, according to the grace of our God and the Lord Jesus Christ."',
        reference: '2 Thessalonians 1:11-12 (NIV), Paul'
    },
    {
        title: 'The Message Spreads and Deliverance',
        text: '"As for other matters, brothers and sisters, pray for us that the message of the Lord may spread rapidly and be honoured, just as it was with you. And pray that we may be delivered from wicked and evil people, for not everyone has faith. But the Lord is faithful, and he will strengthen you and protect you from the evil one."',
        reference: '2 Thessalonians 3:1-3 (NIV), Paul'
    },
    {
        title: 'God\'s Love and Christ\'s Perseverance',
        text: '"May the Lord direct your hearts into God\'s love and Christ\'s perseverance."',
        reference: '2 Thessalonians 3:5 (NIV), Paul'
    },
    {
        title: 'The Lord of Peace',
        text: '"Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you."',
        reference: '2 Thessalonians 3:16 (NIV), Paul'
    },
    {
        title: 'Holistic Blessing',
        text: '"Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well."',
        reference: '3 John 1:2 (NIV), John'
    },
    {
        title: 'Kept from Stumbling',
        text: '"To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy—to the only God our Saviour be glory, majesty, power and authority, through Jesus Christ our Lord, before all ages, now and forevermore! Amen."',
        reference: 'Jude 1:24-25 (NIV), Jude'
    },
    {
        title: 'Unity of Mind and Voice',
        text: '"May the God who gives endurance and encouragement give you the same attitude of mind toward each other that Christ Jesus had, so that with one mind and one voice you may glorify the God and Father of our Lord Jesus Christ."',
        reference: 'Romans 15:5-6 (NIV), Paul'
    },
    {
        title: 'Overflowing Hope',
        text: '"May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."',
        reference: 'Romans 15:13 (NIV), Paul'
    }
];

var currentPrayerIndex = 0;
var apostolicTouchStartX = 0;
var apostolicTouchStartY = 0;
var apostolicListenersAdded = false;

function initApostolicPrayers() {
    buildApostolicIndex();
    showApostolicIndex();

    if (apostolicListenersAdded) return;
    const card = document.getElementById('apostolicFlashcard');
    if (!card) return;

    card.addEventListener('touchstart', function(e) {
        apostolicTouchStartX = e.touches[0].clientX;
        apostolicTouchStartY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', function(e) {
        const dx = e.changedTouches[0].clientX - apostolicTouchStartX;
        const dy = e.changedTouches[0].clientY - apostolicTouchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
            if (dx < 0) {
                animateApostolicCard('next');
            } else {
                animateApostolicCard('prev');
            }
        }
    }, { passive: true });

    apostolicListenersAdded = true;
}

function buildApostolicIndex() {
    const list = document.getElementById('apostolic-prayers-list');
    if (!list) return;
    list.innerHTML = '';
    apostolicPrayers.forEach(function(prayer, i) {
        const item = document.createElement('button');
        item.className = 'memory-verse-index-item';
        item.setAttribute('aria-label', 'Open ' + prayer.title);
        item.innerHTML = '<span class="memory-verse-index-ref">' + prayer.reference + '</span>' +
            '<span class="memory-verse-index-preview">' + prayer.title + '</span>';
        item.addEventListener('click', function() {
            openApostolicCard(i);
        });
        list.appendChild(item);
    });
}

function showApostolicIndex() {
    document.getElementById('apostolic-index').style.display = '';
    document.getElementById('apostolic-flashcard-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openApostolicCard(index) {
    currentPrayerIndex = index;
    renderApostolicCard();
    buildApostolicDots();
    document.getElementById('apostolic-index').style.display = 'none';
    document.getElementById('apostolic-flashcard-view').style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderApostolicCard() {
    const prayer = apostolicPrayers[currentPrayerIndex];
    document.getElementById('apostolicCardTitle').textContent = prayer.title;
    document.getElementById('apostolicCardText').innerHTML = prayer.text;
    document.getElementById('apostolicCardReference').textContent = '— ' + prayer.reference;
    document.getElementById('apostolicCardCounter').textContent =
        (currentPrayerIndex + 1) + ' of ' + apostolicPrayers.length;
    updateApostolicDots();
}

function buildApostolicDots() {
    const dotsEl = document.getElementById('apostolicDots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    apostolicPrayers.forEach(function(_, i) {
        const dot = document.createElement('span');
        dot.className = 'flashcard-dot' + (i === currentPrayerIndex ? ' active' : '');
        dotsEl.appendChild(dot);
    });
}

function updateApostolicDots() {
    const dotsEl = document.getElementById('apostolicDots');
    if (!dotsEl) return;
    const dots = dotsEl.querySelectorAll('.flashcard-dot');
    dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentPrayerIndex);
    });
}

function animateApostolicCard(direction) {
    const card = document.getElementById('apostolicFlashcard');
    const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    const inClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    card.classList.add(outClass);
    setTimeout(function() {
        card.classList.remove(outClass);
        if (direction === 'next') {
            currentPrayerIndex = (currentPrayerIndex + 1) % apostolicPrayers.length;
        } else {
            currentPrayerIndex = (currentPrayerIndex - 1 + apostolicPrayers.length) % apostolicPrayers.length;
        }
        renderApostolicCard();
        card.classList.add(inClass);
        setTimeout(function() { card.classList.remove(inClass); }, 320);
    }, 280);
}

function nextApostolicPrayer(e) {
    if (e) e.stopPropagation();
    animateApostolicCard('next');
}

function prevApostolicPrayer(e) {
    if (e) e.stopPropagation();
    animateApostolicCard('prev');
}

// ─────────────────────────────────────────────────────────────────────────────

// ── Memory Verses Flashcard ──────────────────────────────────────────────────

var memoryVerses = [
    {
        reference: 'Psalm 37:3-4 (NIV)',
        text: 'Trust in the Lord and do good; dwell in the land and enjoy safe pasture. Take delight in the Lord, and he will give you the desires of your heart.'
    },
    {
        reference: 'Philippians 4:6-7 (NIV)',
        text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
    },
    {
        reference: 'Psalm 57:1 (NIV)',
        text: 'Have mercy on me, my God, have mercy on me, for in you I take refuge. I will take refuge in the shadow of your wings until the disaster has passed.'
    },
    {
        reference: 'Romans 8:31-39 (NIV)',
        text: 'What, then, shall we say in response to these things? If God is for us, who can be against us? He who did not spare his own Son, but gave him up for us all—how will he not also, along with him, graciously give us all things? Who will bring any charge against those whom God has chosen? It is God who justifies. Who then is the one who condemns? No one. Christ Jesus who died—more than that, who was raised to life—is at the right hand of God and is also interceding for us. Who shall separate us from the love of Christ? Shall trouble or hardship or persecution or famine or nakedness or danger or sword?\n\nNo, in all these things we are more than conquerors through him who loved us. For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.'
    },
    {
        reference: 'Hebrews 12:1–3 (NIV)',
        text: 'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith. For the joy set before him he endured the cross, scorning its shame, and sat down at the right hand of the throne of God. Consider him who endured such opposition from sinners, so that you will not grow weary and lose heart.'
    },
    {
        reference: 'Colossians 1:13–20 (NIV)',
        text: 'For he has rescued us from the dominion of darkness and brought us into the kingdom of the Son he loves, in whom we have redemption, the forgiveness of sins.\n\nThe Son is the image of the invisible God, the firstborn over all creation. For in him all things were created: things in heaven and on earth, visible and invisible, whether thrones or powers or rulers or authorities; all things have been created through him and for him. He is before all things, and in him all things hold together. And he is the head of the body, the church; he is the beginning and the firstborn from among the dead, so that in everything he might have the supremacy. For God was pleased to have all his fullness dwell in him, and through him to reconcile to himself all things, whether things on earth or things in heaven, by making peace through his blood, shed on the cross.'
    },
    {
        reference: '1 Kings 17:14 (NIV)',
        text: 'For the jar of flour will not be used up and the jug of oil will not run dry until the day the Lord sends rain on the land.'
    }
];

var currentVerseIndex = 0;
var touchStartX = 0;
var touchStartY = 0;
var memoryVerseListenersAdded = false;

function initMemoryVerses() {
    buildMemoryVerseIndex();
    showMemoryVerseIndex();

    if (memoryVerseListenersAdded) return;
    const card = document.getElementById('memoryVerseFlashcard');
    if (!card) return;

    card.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', function(e) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
            if (dx < 0) {
                animateCard('next');
            } else {
                animateCard('prev');
            }
        }
    }, { passive: true });

    memoryVerseListenersAdded = true;
}

function buildMemoryVerseIndex() {
    const list = document.getElementById('memory-verses-list');
    if (!list) return;
    list.innerHTML = '';
    memoryVerses.forEach(function(verse, i) {
        const item = document.createElement('button');
        item.className = 'memory-verse-index-item';
        item.setAttribute('aria-label', 'Open ' + verse.reference);
        item.innerHTML = '<span class="memory-verse-index-ref">' + verse.reference + '</span>' +
            '<span class="memory-verse-index-preview">' + verse.text.replace(/\n\n/g, ' ').substring(0, 80) + '…</span>';
        item.addEventListener('click', function() {
            openMemoryVerseCard(i);
        });
        list.appendChild(item);
    });
}

function showMemoryVerseIndex() {
    document.getElementById('memory-verses-index').style.display = '';
    document.getElementById('memory-verses-flashcard-view').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openMemoryVerseCard(index) {
    currentVerseIndex = index;
    renderMemoryVerse();
    buildDots();
    document.getElementById('memory-verses-index').style.display = 'none';
    document.getElementById('memory-verses-flashcard-view').style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderMemoryVerse() {
    const verse = memoryVerses[currentVerseIndex];
    document.getElementById('flashcardReference').textContent = verse.reference;
    const textEl = document.getElementById('flashcardText');
    textEl.innerHTML = verse.text.replace(/\n\n/g, '<br><br>');
    document.getElementById('flashcardCounter').textContent =
        (currentVerseIndex + 1) + ' of ' + memoryVerses.length;
    updateDots();
}

function buildDots() {
    const dotsEl = document.getElementById('flashcardDots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    memoryVerses.forEach(function(_, i) {
        const dot = document.createElement('span');
        dot.className = 'flashcard-dot' + (i === currentVerseIndex ? ' active' : '');
        dotsEl.appendChild(dot);
    });
}

function updateDots() {
    const dotsEl = document.getElementById('flashcardDots');
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.flashcard-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentVerseIndex);
    });
}

function animateCard(direction) {
    const card = document.getElementById('memoryVerseFlashcard');
    const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    const inClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    card.classList.add(outClass);
    setTimeout(function() {
        card.classList.remove(outClass);
        if (direction === 'next') {
            currentVerseIndex = (currentVerseIndex + 1) % memoryVerses.length;
        } else {
            currentVerseIndex = (currentVerseIndex - 1 + memoryVerses.length) % memoryVerses.length;
        }
        renderMemoryVerse();
        card.classList.add(inClass);
        setTimeout(function() { card.classList.remove(inClass); }, 320);
    }, 280);
}

function nextMemoryVerse(e) {
    if (e) e.stopPropagation();
    animateCard('next');
}

function prevMemoryVerse(e) {
    if (e) e.stopPropagation();
    animateCard('prev');
}

// ─────────────────────────────────────────────────────────────────────────────

var inChristDeclarations = [
    { category: 'I Am Accepted', text: 'I am God\'s child.', reference: 'John 1:12' },
    { category: 'I Am Accepted', text: 'As a disciple, I am a friend of Jesus Christ.', reference: 'John 15:15' },
    { category: 'I Am Accepted', text: 'I have been justified.', reference: 'Romans 5:1' },
    { category: 'I Am Accepted', text: 'I am united with the Lord, and I am one with him in spirit.', reference: '1 Corinthians 6:17' },
    { category: 'I Am Accepted', text: 'I have been bought with a price, and I belong to God.', reference: '1 Corinthians 6:19–20' },
    { category: 'I Am Accepted', text: 'I am a member of Christ\'s body.', reference: '1 Corinthians 12:27' },
    { category: 'I Am Accepted', text: 'I have been chosen by God and adopted as his child.', reference: 'Ephesians 1:5' },
    { category: 'I Am Accepted', text: 'I have been redeemed and forgiven of all my sins.', reference: 'Colossians 1:14' },
    { category: 'I Am Accepted', text: 'I am complete in Christ.', reference: 'Colossians 2:9–10' },
    { category: 'I Am Accepted', text: 'I have direct access to the throne of grace through Jesus Christ.', reference: 'Hebrews 4:14–16' },
    { category: 'I Am Secure', text: 'I am free from condemnation.', reference: 'Romans 8:1–2' },
    { category: 'I Am Secure', text: 'I am assured that God works for my good in all circumstances.', reference: 'Romans 8:28' },
    { category: 'I Am Secure', text: 'I am free from any condemnation brought against me, and I cannot be separated from the love of God.', reference: 'Romans 8:31–39' },
    { category: 'I Am Secure', text: 'I have been established, anointed, and sealed by God.', reference: '2 Corinthians 1:21–22' },
    { category: 'I Am Secure', text: 'I am hidden with Christ in God.', reference: 'Colossians 3:1–4' },
    { category: 'I Am Secure', text: 'I am confident that God will complete the good work he started in me.', reference: 'Philippians 1:6' },
    { category: 'I Am Secure', text: 'I am a citizen of heaven.', reference: 'Philippians 3:20' },
    { category: 'I Am Secure', text: 'I have not been given the spirit of fear but of power, love, and a sound mind.', reference: '2 Timothy 1:7' },
    { category: 'I Am Secure', text: 'I am born of God, and the Evil One cannot touch me.', reference: '1 John 5:18' },
    { category: 'I Am Significant', text: 'I am a branch of Jesus Christ, the true vine, and a channel of his life.', reference: 'John 15:5' },
    { category: 'I Am Significant', text: 'I have been chosen and appointed to bear fruit.', reference: 'John 15:16' },
    { category: 'I Am Significant', text: 'I am God\'s temple.', reference: '1 Corinthians 3:16' },
    { category: 'I Am Significant', text: 'I am a minister of reconciliation for God.', reference: '2 Corinthians 5:17–21' },
    { category: 'I Am Significant', text: 'I am seated with Jesus Christ in the heavenly realm.', reference: 'Ephesians 2:6' },
    { category: 'I Am Significant', text: 'I am God\'s workmanship.', reference: 'Ephesians 2:10' },
    { category: 'I Am Significant', text: 'I may approach God with freedom and confidence.', reference: 'Ephesians 3:12' }
];

var dailyDeclarations = [
    {
        category: 'My prayers are powerful and effective',
        text: 'For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God.\n\nThe prayer of a righteous person has great power as it is working.',
        reference: '2 Corinthians 5:21; James 5:16b'
    },
    {
        category: 'God richly supplies all my financial needs',
        text: 'And my God will supply every need of yours according to his riches in glory in Christ Jesus.',
        reference: 'Philippians 4:19'
    },
    {
        category: 'I am dead to sin and alive to obeying God',
        text: 'So you also must consider yourselves dead to sin and alive to God in Christ Jesus.',
        reference: 'Romans 6:11'
    },
    {
        category: 'I walk in ever-increasing health',
        text: 'Surely he has borne our griefs and carried our sorrows... he was wounded for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his stripes we are healed.',
        reference: 'Isaiah 53:4–5'
    },
    {
        category: 'I live under a supernatural protection',
        text: 'He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.',
        reference: 'Psalm 91:1'
    },
    {
        category: 'I prosper in all my relationships',
        text: 'And Jesus increased in wisdom and in stature and in favor with God and man.',
        reference: 'Luke 2:52'
    },
    {
        category: 'I consistently bring God encounters to other people',
        text: 'And these signs will accompany those who believe: in my name they will cast out demons; they will speak in new tongues... they will lay their hands on the sick, and they will recover.',
        reference: 'Mark 16:17–18'
    },
    {
        category: 'Through Jesus I am 100% loved and worthy to receive all of God\'s blessings',
        text: 'Did you receive the Spirit by works of the law or by hearing with faith?... Does he who supplies the Spirit to you and works miracles among you do so by works of the law, or by hearing with faith?',
        reference: 'Galatians 3:2, 5'
    },
    {
        category: 'Each of my family members is wonderfully blessed and radically loves Jesus',
        text: 'Believe in the Lord Jesus, and you will be saved, you and your household.',
        reference: 'Acts 16:31'
    }
];

var currentInChristIndex = 0;
var currentDailyIndex = 0;
var inChristTouchStartX = 0;
var inChristTouchStartY = 0;
var dailyTouchStartX = 0;
var dailyTouchStartY = 0;
var inChristListenersAdded = false;
var dailyListenersAdded = false;

function initDeclarations(type) {
    if (type === 'in-christ') {
        currentInChristIndex = 0;
        renderDeclarationCard('in-christ');
        buildDeclarationDots('in-christ');
        if (!inChristListenersAdded) {
            var card = document.getElementById('inChristFlashcard');
            if (card) {
                card.addEventListener('touchstart', function(e) {
                    inChristTouchStartX = e.touches[0].clientX;
                    inChristTouchStartY = e.touches[0].clientY;
                }, { passive: true });
                card.addEventListener('touchend', function(e) {
                    var dx = e.changedTouches[0].clientX - inChristTouchStartX;
                    var dy = e.changedTouches[0].clientY - inChristTouchStartY;
                    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                        animateDeclarationCard('in-christ', dx < 0 ? 'next' : 'prev');
                    }
                }, { passive: true });
                inChristListenersAdded = true;
            }
        }
    } else {
        currentDailyIndex = 0;
        renderDeclarationCard('daily');
        buildDeclarationDots('daily');
        if (!dailyListenersAdded) {
            var card = document.getElementById('dailyFlashcard');
            if (card) {
                card.addEventListener('touchstart', function(e) {
                    dailyTouchStartX = e.touches[0].clientX;
                    dailyTouchStartY = e.touches[0].clientY;
                }, { passive: true });
                card.addEventListener('touchend', function(e) {
                    var dx = e.changedTouches[0].clientX - dailyTouchStartX;
                    var dy = e.changedTouches[0].clientY - dailyTouchStartY;
                    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                        animateDeclarationCard('daily', dx < 0 ? 'next' : 'prev');
                    }
                }, { passive: true });
                dailyListenersAdded = true;
            }
        }
    }
}

function renderDeclarationCard(type) {
    var data = type === 'in-christ' ? inChristDeclarations : dailyDeclarations;
    var index = type === 'in-christ' ? currentInChristIndex : currentDailyIndex;
    var item = data[index];
    var categoryEl = document.getElementById(type + 'CardCategory');
    if (categoryEl) categoryEl.textContent = type === 'in-christ' ? '' : item.category;
    document.getElementById(type + 'CardText').innerHTML = item.text.replace(/\n\n/g, '<br><br>');
    document.getElementById(type + 'CardReference').textContent = item.reference;
    document.getElementById(type + 'Counter').textContent = (index + 1) + ' of ' + data.length;
    updateDeclarationDots(type);
}

function buildDeclarationDots(type) {
    var data = type === 'in-christ' ? inChristDeclarations : dailyDeclarations;
    var dotsEl = document.getElementById(type + 'Dots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    var index = type === 'in-christ' ? currentInChristIndex : currentDailyIndex;
    data.forEach(function(_, i) {
        var dot = document.createElement('span');
        dot.className = 'flashcard-dot' + (i === index ? ' active' : '');
        dotsEl.appendChild(dot);
    });
}

function updateDeclarationDots(type) {
    var index = type === 'in-christ' ? currentInChristIndex : currentDailyIndex;
    var dotsEl = document.getElementById(type + 'Dots');
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.flashcard-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
    });
}

function animateDeclarationCard(type, direction) {
    var cardId = type === 'in-christ' ? 'inChristFlashcard' : 'dailyFlashcard';
    var data = type === 'in-christ' ? inChristDeclarations : dailyDeclarations;
    var card = document.getElementById(cardId);
    var outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    var inClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    card.classList.add(outClass);
    setTimeout(function() {
        card.classList.remove(outClass);
        if (type === 'in-christ') {
            currentInChristIndex = direction === 'next'
                ? (currentInChristIndex + 1) % data.length
                : (currentInChristIndex - 1 + data.length) % data.length;
        } else {
            currentDailyIndex = direction === 'next'
                ? (currentDailyIndex + 1) % data.length
                : (currentDailyIndex - 1 + data.length) % data.length;
        }
        renderDeclarationCard(type);
        card.classList.add(inClass);
        setTimeout(function() { card.classList.remove(inClass); }, 320);
    }, 280);
}

function nextDeclaration(type, e) {
    if (e) e.stopPropagation();
    animateDeclarationCard(type, 'next');
}

function prevDeclaration(type, e) {
    if (e) e.stopPropagation();
    animateDeclarationCard(type, 'prev');
}

// ─────────────────────────────────────────────────────────────────────────────


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

function showDeclaration(declaration) {
    // Hide all declaration sections
    document.querySelectorAll('.prayer-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs in the declarations area
    const declarationsContent = document.getElementById('declarations-content');
    if (declarationsContent) {
        declarationsContent.querySelectorAll('.prayer-tab').forEach(tab => {
            tab.classList.remove('active');
        });
    }
    
    // Show selected declaration
    document.getElementById(declaration + '-declaration').classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');

    // Initialise flashcard for the shown declaration
    initDeclarations(declaration);
}

function showMainMenu() {
    document.getElementById('main-menu').style.display = 'block';
    document.querySelectorAll('.prayer-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Load daily content (same content all day, changes each new day)
    loadDailyContent();
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const lectioElement = document.getElementById('lectio-scripture');
    const lectioButton = lectioElement.querySelector('.new-content-button');
    lectioElement.innerHTML = `"${scripture.text}" - ${scripture.reference}`;
    if (lectioButton) {
        lectioElement.appendChild(lectioButton);
    }
    document.getElementById('lectio-focus').innerHTML = `Focus Word: "${scripture.focus}"<br><small>Carry this word with you today as a reminder of God's invitation.</small>`;
}

function generateAdorationContent() {
    const scripture = getRandomItem(adorationScriptures);
    const adorationElement = document.getElementById('adoration-scripture');
    const adorationButton = adorationElement.querySelector('.new-content-button');
    adorationElement.innerHTML = `"${scripture.text}" - ${scripture.reference}`;
    if (adorationButton) {
        adorationElement.appendChild(adorationButton);
    }
    document.getElementById('acknowledge-prompt').textContent = scripture.acknowledge;
    document.getElementById('adore-prompt').textContent = scripture.adore;
    document.getElementById('surrender-prompt').textContent = scripture.surrender;
    document.getElementById('transformation-prompt').textContent = scripture.transformation;
    document.getElementById('adoration-focus').innerHTML = `Today's Focus: ${scripture.focus}<br><small>Meditate on this aspect of God's character throughout your day.</small>`;
    document.getElementById('adoration-closing').textContent = scripture.closing;
}

// generateApostolicContent() removed - apostolic prayers now display all prayers statically

function generatePrayerSetContent() {
    for (let i = 1; i <= 7; i++) {
        const movement = getRandomItem(prayerSetContent[`movement${i}`]);
        document.getElementById(`prayerset-movement${i}-scripture`).innerHTML = `"${movement.scripture}" - ${movement.reference}`;
        document.getElementById(`prayerset-movement${i}-prompt`).textContent = movement.prompt;
    }
}

// ── Persecuted Church day navigation ─────────────────────────────────────────

let persecutedDayOffset = 0; // 0 = today, -1 = yesterday, +1 = tomorrow

function renderPersecutedContent() {
    const entry = getOpenDoorsByOffset(persecutedDayOffset);

    const countryEl  = document.getElementById('persecuted-country');
    const prayerEl   = document.getElementById('persecuted-prayer');
    const noEntryEl  = document.getElementById('persecuted-no-entry');
    const dateEl     = document.getElementById('persecuted-date');
    const prevBtn    = document.getElementById('persecuted-prev');
    const nextBtn    = document.getElementById('persecuted-next');

    if (entry) {
        const d = new Date(entry.dateKey + 'T00:00:00');
        const label = d.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long' });
        if (dateEl) dateEl.textContent = label;
        if (countryEl) countryEl.textContent = entry.country;
        if (prayerEl) prayerEl.textContent = entry.prayer;
        if (noEntryEl) noEntryEl.style.display = 'none';
        if (countryEl) countryEl.closest('.country-spotlight').style.display = '';
        if (prayerEl) prayerEl.closest('.prayer-focus-section').style.display = '';
    } else {
        if (dateEl) dateEl.textContent = '';
        if (countryEl) countryEl.textContent = '';
        if (prayerEl) prayerEl.textContent = '';
        if (noEntryEl) noEntryEl.style.display = 'block';
        if (countryEl) countryEl.closest('.country-spotlight').style.display = 'none';
        if (prayerEl) prayerEl.closest('.prayer-focus-section').style.display = 'none';
    }

    // Disable prev/next when there's no adjacent entry
    if (prevBtn) prevBtn.disabled = !getOpenDoorsByOffset(persecutedDayOffset - 1);
    if (nextBtn) nextBtn.disabled = !getOpenDoorsByOffset(persecutedDayOffset + 1);
}

function persecutedPrevDay() {
    persecutedDayOffset--;
    renderPersecutedContent();
}

function persecutedNextDay() {
    persecutedDayOffset++;
    renderPersecutedContent();
}

function loadPersecutedContent() {
    persecutedDayOffset = 0;
    renderPersecutedContent();
}

// ─────────────────────────────────────────────────────────────────────────────

function generateListeningContent() {
    const quote = getRandomItem(jamieWinshipQuotes);
    document.getElementById('listening-quote').innerHTML = `"${quote}" - Jamie Winship`;
}

function generateGentleHumbleContent() {
    const content = getRandomItem(gentleHumbleContent);
    document.getElementById('gentle-humble-scripture').innerHTML = `${content.scripture} - ${content.reference}`;
    document.getElementById('gentle-humble-quote').textContent = content.quote;
    document.getElementById('gentle-humble-author').textContent = `– ${content.author}`;
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

// Category toggle functionality
function toggleCategory(categoryId) {
    const categorySection = document.querySelector(`#${categoryId}-category`).parentElement;
    const isCollapsed = categorySection.classList.contains('collapsed');
    
    if (isCollapsed) {
        categorySection.classList.remove('collapsed');
        localStorage.setItem(`category_${categoryId}`, 'expanded');
    } else {
        categorySection.classList.add('collapsed');
        localStorage.setItem(`category_${categoryId}`, 'collapsed');
    }
}

function initializeCategories() {
    // Load saved category states from localStorage
    const categories = ['daily', 'scripture', 'historic', 'intercession'];
    
    categories.forEach(categoryId => {
        const state = localStorage.getItem(`category_${categoryId}`);
        const categorySection = document.querySelector(`#${categoryId}-category`).parentElement;
        
        if (categorySection) {
            // Default: all expanded on first visit, then remember user preference
            if (state === 'collapsed') {
                categorySection.classList.add('collapsed');
            } else {
                categorySection.classList.remove('collapsed');
            }
        }
    });
}

// Initialize with fresh content on every page load
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize dark mode
        initializeDarkMode();
        
        // Initialize category states
        initializeCategories();
        
        // Initialize DOM element cache for better performance
        initializeActivityElements();
        
        // Load daily content based on day of year (guarantees cycling through all content)
        loadDailyContent();
        
        updateCompletionStates(); // Check what's been completed today
        
    } catch (error) {
        console.error('App initialization failed:', error);
        // Fallback: try to at least show the main menu
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) mainMenu.style.display = 'block';
    }
    
    // Beatitudes completion function
    window.completeBeatitudes = function() {
        showMainMenu();
    };

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