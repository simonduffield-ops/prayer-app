// ── Bible Translation System ─────────────────────────────────────────────────

const VALID_TRANSLATIONS = ['NIV', 'AMP', 'NLT'];

function getCurrentTranslation() {
    const saved = localStorage.getItem('bibleTranslation');
    return (saved && VALID_TRANSLATIONS.indexOf(saved) !== -1) ? saved : 'NIV';
}

var translationsLoaded = typeof VERSE_TRANSLATIONS !== 'undefined';

function loadTranslationsScript() {
    return new Promise(function(resolve) {
        if (translationsLoaded) return resolve();
        var script = document.createElement('script');
        script.src = 'translations.js';
        script.onload = function() {
            translationsLoaded = true;
            resolve();
        };
        script.onerror = function() { resolve(); };
        document.head.appendChild(script);
    });
}

function setTranslation(translation) {
    if (VALID_TRANSLATIONS.indexOf(translation) === -1) return;
    localStorage.setItem('bibleTranslation', translation);
    const select = document.getElementById('translation-select');
    if (select) select.value = translation;
    // Sync all translation pickers (header + prayer banners)
    document.querySelectorAll('select[aria-label="Bible translation"]').forEach(function(sel) {
        sel.value = translation;
    });

    if (translation === 'NIV') {
        refreshTranslations();
    } else {
        loadTranslationsScript().then(refreshTranslations);
    }
}

function normalizeRef(reference) {
    return reference
        .replace(/\s*\((?:NIV|AMP|NLT|ESV)\)/i, '')
        .replace(/,\s*(Paul|The Early Church|John|Jude|Peter)$/i, '')
        .replace(/\u2013/g, '-')
        .trim();
}

function getVerseText(reference, nivText) {
    const translation = getCurrentTranslation();
    if (translation === 'NIV') return nivText;

    if (typeof VERSE_TRANSLATIONS === 'undefined') return nivText;
    const normRef = normalizeRef(reference);
    const entry = VERSE_TRANSLATIONS[normRef];
    if (entry && entry[translation]) {
        return entry[translation].replace(/^[\u201C\u201D"]+|[\u201C\u201D"]+$/g, '').trim();
    }

    return nivText;
}

function formatRef(reference) {
    const translation = getCurrentTranslation();
    const base = normalizeRef(reference);
    const authorMatch = reference.match(/,\s*(Paul|The Early Church|John|Jude|Peter)$/i);
    const suffix = authorMatch ? ', ' + authorMatch[1] : '';
    return base + suffix;
}

function renderExamenVerse(rawVerse, elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const match = rawVerse.match(/^"(.+)"\s*-\s*(.+)$/);
    if (match) {
        const text = getVerseText(match[2], match[1]);
        el.textContent = '\u201C' + text + '\u201D - ' + formatRef(match[2]);
    } else {
        el.textContent = rawVerse;
    }
}

function initTranslationPicker() {
    const select = document.getElementById('translation-select');
    var current = getCurrentTranslation();
    if (select) {
        select.value = current;
    }
    // Sync all translation pickers (header + prayer banners)
    document.querySelectorAll('select[aria-label="Bible translation"]').forEach(function(sel) {
        sel.value = current;
    });
    if (current !== 'NIV') {
        loadTranslationsScript();
    }
}

function refreshTranslations() {
    loadDailyContent();
    updateHeaderSubtitle();
    updateHtmlVerses();

    var activeContent = document.querySelector('.prayer-content.active');
    if (!activeContent) return;

    var id = activeContent.id.replace('-content', '');
    renderToolContent(id);

    if (id === 'lectio') initLectioFlashcard();
    else if (id === 'beatitudes') initBeatitudesFlashcard();
    else if (id === 'prayerset') initLordsPrayerFlashcard();
    else if (id === 'examen') initExamenFlashcard();
    else if (id === 'memory-verses') {
        buildMemoryVerseIndex();
        var mvFlashcard = document.getElementById('memory-verses-flashcard-view');
        if (mvFlashcard && mvFlashcard.style.display !== 'none') renderMemoryVerse();
    }
    else if (id === 'apostolic') {
        buildApostolicIndex();
        var apFlashcard = document.getElementById('apostolic-flashcard-view');
        if (apFlashcard && apFlashcard.style.display !== 'none') renderApostolicCard();
    }
    else if (id === 'declarations') {
        renderDeclarationCard('in-christ');
        renderDeclarationCard('daily');
    }
}

function updateHeaderSubtitle() {
    const el = document.getElementById('header-subtitle');
    if (!el) return;
    const nivText = 'Be still, and know that I am God';
    const ref = 'Psalm 46:10';
    const translated = getVerseText(ref, nivText);
    el.textContent = '\u201C' + translated + '\u201D - ' + formatRef(ref);
}

const htmlVerses = [
    { id: 'beatitudes-header-verse', ref: 'Matthew 5:1-2', niv: 'Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him, and he began to teach them.' },
    { id: 'creeds-header-verse', ref: 'Hebrews 12:1', niv: 'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us' },
    { id: 'written-prayers-header-verse', ref: 'James 5:16', niv: 'The prayer of a righteous person is powerful and effective.' },
    { id: 'declarations-header-verse', ref: 'Proverbs 18:21', niv: 'Death and life are in the power of the tongue.' },
    { id: 'prayerset-header-verse', ref: 'Matthew 6:9', niv: "This, then, is how you should pray: 'Our Father in heaven...'" },
    { id: 'gentle-humble-header-verse', ref: 'Matthew 11:28-30', niv: 'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.' }
];

function updateHtmlVerses() {
    htmlVerses.forEach(function(v) {
        const el = document.getElementById(v.id);
        if (!el) return;
        const translated = getVerseText(v.ref, v.niv);
        el.textContent = '\u201C' + translated + '\u201D - ' + formatRef(v.ref);
    });
}

// ─────────────────────────────────────────────────────────────────────────────

// Dark Mode Toggle

function toggleDarkMode(event) {
    if (event) {
        event.stopPropagation();
    }
    document.body.classList.toggle('dark-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    updateThemeColor(isDarkMode);

    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.setAttribute('aria-checked', isDarkMode ? 'true' : 'false');
    }
}

function updateThemeColor(isDarkMode) {
    const themeColorMeta = document.getElementById('theme-color-meta');
    if (themeColorMeta) {
        themeColorMeta.setAttribute('content', isDarkMode ? '#1a1a2e' : '#534AB7');
    }
}

function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    const isDarkMode = darkMode === 'enabled';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    updateThemeColor(isDarkMode);

    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
        toggleButton.setAttribute('aria-checked', isDarkMode ? 'true' : 'false');
    }
}

// Get daily content based on date
function getDailyIndex(arrayLength, offset = 0) {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return (dayOfYear + offset) % arrayLength;
}


function getDailyContent() {
    // Each tool gets different content each day
    const examenIndex = getDailyIndex(examenPrompts.verses.length, 0);
    const lectioIndex = getDailyIndex(lectioScriptures.length, 100); // Offset so they don't sync
    const adorationIndex = getDailyIndex(adorationScriptures.length, 200); // Different offset
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

var _dailyCache = null;

function loadDailyContent() {
    _dailyCache = getDailyContent();
    var daily = _dailyCache;

    window._dailyExamen = {
        verse: daily.examen.verse,
        gratitude: daily.examen.gratitude,
        consolation: daily.examen.consolation,
        desolation: daily.examen.desolation,
        forgiveness: daily.examen.forgiveness,
        tomorrow: daily.examen.tomorrow,
        closing: daily.examen.closing
    };
    window._dailyLectio = { scripture: daily.lectio, focus: 'Focus Word: "' + daily.lectio.focus + '"<br><small>Carry this word with you today as a reminder of God\'s invitation.</small>' };
    window._dailyPrayersetContent = {};
    for (var i = 1; i <= 7; i++) {
        window._dailyPrayersetContent[i] = daily.prayerset['movement' + i];
    }
}

function renderToolContent(tool) {
    var daily = _dailyCache;
    if (!daily) return;

    if (tool === 'examen') {
        renderExamenVerse(daily.examen.verse, 'examen-verse');
        var closingEl = document.getElementById('examen-closing');
        if (closingEl) closingEl.textContent = daily.examen.closing;
    } else if (tool === 'lectio') {
        var lectioText = getVerseText(daily.lectio.reference, daily.lectio.text);
        var lectioRef = formatRef(daily.lectio.reference);
        var lectioElement = document.getElementById('lectio-scripture');
        if (lectioElement) {
            var lectioButton = lectioElement.querySelector('.new-content-button');
            lectioElement.textContent = '\u201C' + lectioText + '\u201D - ' + lectioRef;
            if (lectioButton) lectioElement.appendChild(lectioButton);
        }
        var lectioFocusEl = document.getElementById('lectio-focus');
        if (lectioFocusEl) lectioFocusEl.innerHTML = window._dailyLectio.focus;
    } else if (tool === 'adoration') {
        var adorText = getVerseText(daily.adoration.reference, daily.adoration.text);
        var adorRef = formatRef(daily.adoration.reference);
        var adorationElement = document.getElementById('adoration-scripture');
        if (adorationElement) {
            var adorationButton = adorationElement.querySelector('.new-content-button');
            adorationElement.textContent = '\u201C' + adorText + '\u201D - ' + adorRef;
            if (adorationButton) adorationElement.appendChild(adorationButton);
        }
        var ackEl = document.getElementById('acknowledge-prompt');
        if (ackEl) ackEl.textContent = daily.adoration.acknowledge;
        var adoreEl = document.getElementById('adore-prompt');
        if (adoreEl) adoreEl.textContent = daily.adoration.adore;
        var surrEl = document.getElementById('surrender-prompt');
        if (surrEl) surrEl.textContent = daily.adoration.surrender;
        var transEl = document.getElementById('transformation-prompt');
        if (transEl) transEl.textContent = daily.adoration.transformation;
        var focusEl = document.getElementById('adoration-focus');
        if (focusEl) focusEl.innerHTML = 'Today\'s Focus: ' + daily.adoration.focus + '<br><small>Meditate on this aspect of God\'s character throughout your day.</small>';
        var adorCloseEl = document.getElementById('adoration-closing');
        if (adorCloseEl) adorCloseEl.textContent = daily.adoration.closing;
    } else if (tool === 'prayerset') {
        for (var j = 1; j <= 7; j++) {
            var movement = daily.prayerset['movement' + j];
            var mvText = getVerseText(movement.reference, movement.scripture);
            var mvRef = formatRef(movement.reference);
            var scriptureEl = document.getElementById('prayerset-movement' + j + '-scripture');
            var promptEl = document.getElementById('prayerset-movement' + j + '-prompt');
            if (scriptureEl) scriptureEl.textContent = '\u201C' + mvText + '\u201D - ' + mvRef;
            if (promptEl) promptEl.textContent = movement.prompt;
        }
    } else if (tool === 'persecuted') {
        loadPersecutedContent();
    } else if (tool === 'gentle-humble') {
        var ghText = getVerseText(daily.gentleHumble.reference, daily.gentleHumble.scripture);
        var ghRef = formatRef(daily.gentleHumble.reference);
        var ghScriptEl = document.getElementById('gentle-humble-scripture');
        if (ghScriptEl) ghScriptEl.textContent = ghText + ' - ' + ghRef;
        var ghQuoteEl = document.getElementById('gentle-humble-quote');
        if (ghQuoteEl) ghQuoteEl.textContent = daily.gentleHumble.quote;
        var ghAuthorEl = document.getElementById('gentle-humble-author');
        if (ghAuthorEl) ghAuthorEl.textContent = '\u2013 ' + daily.gentleHumble.author;
    } else if (tool === 'affirmation') {
        var affText = getVerseText(daily.affirmation.promise.reference, daily.affirmation.promise.text);
        var affRef = formatRef(daily.affirmation.promise.reference);
        var affEl = document.getElementById('affirmation-promise');
        if (affEl) affEl.textContent = '\u201C' + affText + '\u201D - ' + affRef;
    }
}

function showTool(tool) {
    document.getElementById('main-menu').style.display = 'none';
    document.querySelectorAll('.prayer-content').forEach(content => {
        content.classList.remove('active');
    });

    renderToolContent(tool);

    document.getElementById(tool + '-content').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tool === 'memory-verses') {
        initMemoryVerses();
    } else if (tool === 'apostolic' && typeof initApostolicPrayers === 'function') {
        initApostolicPrayers();
    } else if (tool === 'declarations') {
        initDeclarations('in-christ');
    } else if (tool === 'lectio') {
        initLectioFlashcard();
    } else if (tool === 'beatitudes') {
        initBeatitudesFlashcard();
    } else if (tool === 'prayerset') {
        initLordsPrayerFlashcard();
    } else if (tool === 'examen') {
        initExamenFlashcard();
    }
}

function showCreed(creed, e) {
    document.querySelectorAll('.creed-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.creed-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(creed + '-creed').classList.add('active');
    
    if (e && e.target) e.target.classList.add('active');
}

// ── Prayers of the Apostles Flashcard ───────────────────────────────────────

var apostolicPrayers = [
    {
        title: 'Boldness in Speaking God\'s Word',
        text: '"Now, Lord, consider their threats and enable your servants to speak your word with great boldness. Stretch out your hand to heal and perform signs and wonders through the name of your holy servant Jesus."',
        reference: 'Acts 4:29-30, The Early Church'
    },
    {
        title: 'Spiritual Wisdom and Revelation',
        text: '"I keep asking that the God of our Lord Jesus Christ, the glorious Father, may give you the Spirit of wisdom and revelation, so that you may know him better. I pray that the eyes of your heart may be enlightened in order that you may know the hope to which he has called you, the riches of his glorious inheritance in his holy people, and his incomparably great power for us who believe."',
        reference: 'Ephesians 1:17-19, Paul'
    },
    {
        title: 'Rooted in God\'s Love',
        text: '"I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being, so that Christ may dwell in your hearts through faith. And I pray that you, being rooted and established in love, may have power, together with all the Lord\'s holy people, to grasp how wide and long and high and deep is the love of Christ, and to know this love that surpasses knowledge—that you may be filled to the measure of all the fullness of God."',
        reference: 'Ephesians 3:14-21, Paul'
    },
    {
        title: 'Prayer for All Occasions',
        text: '"And pray in the Spirit on all occasions with all kinds of prayers and requests. With this in mind, be alert and always keep on praying for all the Lord\'s people. Pray also for me, that whenever I speak, words may be given me so that I will fearlessly make known the mystery of the gospel, for which I am an ambassador in chains. Pray that I may declare it fearlessly, as I should."',
        reference: 'Ephesians 6:18-20, Paul'
    },
    {
        title: 'Abounding Love and Discernment',
        text: '"And this is my prayer: that your love may abound more and more in knowledge and depth of insight, so that you may be able to discern what is best and may be pure and blameless for the day of Christ, filled with the fruit of righteousness that comes through Jesus Christ—to the glory and praise of God."',
        reference: 'Philippians 1:9-11, Paul'
    },
    {
        title: 'Filled with the Knowledge of God\'s Will',
        text: '"We continually ask God to fill you with the knowledge of his will through all the wisdom and understanding that the Spirit gives, so that you may live a life worthy of the Lord and please him in every way: bearing fruit in every good work, growing in the knowledge of God, being strengthened with all power according to his glorious might so that you may have great endurance and patience, and giving joyful thanks to the Father, who has qualified you to share in the inheritance of his holy people in the kingdom of light."',
        reference: 'Colossians 1:9-12, Paul'
    },
    {
        title: 'Open Doors for the Gospel',
        text: '"And pray for us, too, that God may open a door for our message, so that we may proclaim the mystery of Christ, for which I am in chains."',
        reference: 'Colossians 4:3, Paul'
    },
    {
        title: 'Stand Firm in God\'s Will',
        text: '"He is always wrestling in prayer for you, that you may stand firm in all the will of God, mature and fully assured."',
        reference: 'Colossians 4:12, Paul'
    },
    {
        title: 'Overflowing Love and Blameless Hearts',
        text: '"May the Lord make your love increase and overflow for each other and for everyone else, just as ours does for you. May he strengthen your hearts so that you will be blameless and holy in the presence of our God and Father when our Lord Jesus comes with all his holy ones."',
        reference: '1 Thessalonians 3:12-13, Paul'
    },
    {
        title: 'Complete Sanctification',
        text: '"May God himself, the God of peace, sanctify you through and through. May your whole spirit, soul and body be kept blameless at the coming of our Lord Jesus Christ. The one who calls you is faithful, and he will do it."',
        reference: '1 Thessalonians 5:23-24, Paul'
    },
    {
        title: 'Worthy of His Calling',
        text: '"With this in mind, we constantly pray for you, that our God may make you worthy of his calling, and that by his power he may bring to fruition your every desire for goodness and your every deed prompted by faith. We pray this so that the name of our Lord Jesus may be glorified in you, and you in him, according to the grace of our God and the Lord Jesus Christ."',
        reference: '2 Thessalonians 1:11-12, Paul'
    },
    {
        title: 'The Message Spreads and Deliverance',
        text: '"As for other matters, brothers and sisters, pray for us that the message of the Lord may spread rapidly and be honoured, just as it was with you. And pray that we may be delivered from wicked and evil people, for not everyone has faith. But the Lord is faithful, and he will strengthen you and protect you from the evil one."',
        reference: '2 Thessalonians 3:1-3, Paul'
    },
    {
        title: 'God\'s Love and Christ\'s Perseverance',
        text: '"May the Lord direct your hearts into God\'s love and Christ\'s perseverance."',
        reference: '2 Thessalonians 3:5, Paul'
    },
    {
        title: 'The Lord of Peace',
        text: '"Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you."',
        reference: '2 Thessalonians 3:16, Paul'
    },
    {
        title: 'Holistic Blessing',
        text: '"Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well."',
        reference: '3 John 1:2, John'
    },
    {
        title: 'Kept from Stumbling',
        text: '"To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy—to the only God our Saviour be glory, majesty, power and authority, through Jesus Christ our Lord, before all ages, now and forevermore! Amen."',
        reference: 'Jude 1:24-25, Jude'
    },
    {
        title: 'Unity of Mind and Voice',
        text: '"May the God who gives endurance and encouragement give you the same attitude of mind toward each other that Christ Jesus had, so that with one mind and one voice you may glorify the God and Father of our Lord Jesus Christ."',
        reference: 'Romans 15:5-6, Paul'
    },
    {
        title: 'Overflowing Hope',
        text: '"May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."',
        reference: 'Romans 15:13, Paul'
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
    var fragment = document.createDocumentFragment();
    apostolicPrayers.forEach(function(prayer, i) {
        var item = document.createElement('button');
        item.className = 'memory-verse-index-item';
        item.setAttribute('aria-label', 'Open ' + prayer.title);
        var refSpan = document.createElement('span');
        refSpan.className = 'memory-verse-index-ref';
        refSpan.textContent = formatRef(prayer.reference);
        var previewSpan = document.createElement('span');
        previewSpan.className = 'memory-verse-index-preview';
        previewSpan.textContent = prayer.title;
        item.appendChild(refSpan);
        item.appendChild(previewSpan);
        item.addEventListener('click', function() {
            openApostolicCard(i);
        });
        fragment.appendChild(item);
    });
    list.innerHTML = '';
    list.appendChild(fragment);
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
    var nivText = prayer.text.replace(/^[\u201C"\u201D]+|[\u201C"\u201D]+$/g, '');
    var translatedText = getVerseText(prayer.reference, nivText);
    document.getElementById('apostolicCardText').textContent = '\u201C' + translatedText + '\u201D';
    document.getElementById('apostolicCardReference').textContent = '\u2014 ' + formatRef(prayer.reference);
    document.getElementById('apostolicCardCounter').textContent =
        (currentPrayerIndex + 1) + ' of ' + apostolicPrayers.length;
    updateApostolicDots();
}

function buildApostolicDots() {
    var dotsEl = document.getElementById('apostolicDots');
    if (!dotsEl) return;
    var fragment = document.createDocumentFragment();
    apostolicPrayers.forEach(function(_, i) {
        var dot = document.createElement('span');
        dot.className = 'flashcard-dot' + (i === currentPrayerIndex ? ' active' : '');
        fragment.appendChild(dot);
    });
    dotsEl.innerHTML = '';
    dotsEl.appendChild(fragment);
}

function updateApostolicDots() {
    const dotsEl = document.getElementById('apostolicDots');
    if (!dotsEl) return;
    const dots = dotsEl.querySelectorAll('.flashcard-dot');
    dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentPrayerIndex);
    });
}

var apostolicAnimating = false;

function animateApostolicCard(direction) {
    if (apostolicAnimating) return;
    apostolicAnimating = true;
    var card = document.getElementById('apostolicFlashcard');
    var outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    var inClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    card.classList.add(outClass);
    card.addEventListener('animationend', function onOut() {
        card.removeEventListener('animationend', onOut);
        card.classList.remove(outClass);
        if (direction === 'next') {
            currentPrayerIndex = (currentPrayerIndex + 1) % apostolicPrayers.length;
        } else {
            currentPrayerIndex = (currentPrayerIndex - 1 + apostolicPrayers.length) % apostolicPrayers.length;
        }
        renderApostolicCard();
        card.classList.add(inClass);
        card.addEventListener('animationend', function onIn() {
            card.removeEventListener('animationend', onIn);
            card.classList.remove(inClass);
            apostolicAnimating = false;
        });
    });
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
        reference: 'Psalm 37:3-4',
        text: 'Trust in the Lord and do good; dwell in the land and enjoy safe pasture. Take delight in the Lord, and he will give you the desires of your heart.'
    },
    {
        reference: 'Philippians 4:6-7',
        text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
    },
    {
        reference: 'Psalm 57:1',
        text: 'Have mercy on me, my God, have mercy on me, for in you I take refuge. I will take refuge in the shadow of your wings until the disaster has passed.'
    },
    {
        reference: 'Romans 8:31-39',
        text: 'What, then, shall we say in response to these things? If God is for us, who can be against us? He who did not spare his own Son, but gave him up for us all—how will he not also, along with him, graciously give us all things? Who will bring any charge against those whom God has chosen? It is God who justifies. Who then is the one who condemns? No one. Christ Jesus who died—more than that, who was raised to life—is at the right hand of God and is also interceding for us. Who shall separate us from the love of Christ? Shall trouble or hardship or persecution or famine or nakedness or danger or sword?\n\nNo, in all these things we are more than conquerors through him who loved us. For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.'
    },
    {
        reference: 'Hebrews 12:1–3',
        text: 'Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith. For the joy set before him he endured the cross, scorning its shame, and sat down at the right hand of the throne of God. Consider him who endured such opposition from sinners, so that you will not grow weary and lose heart.'
    },
    {
        reference: 'Colossians 1:28–29',
        text: 'He is the one we proclaim, admonishing and teaching everyone with all wisdom, so that we may present everyone fully mature in Christ. To this end I strenuously contend with all the energy Christ so powerfully works in me.'
    },
    {
        reference: '1 Kings 17:14',
        text: 'For the jar of flour will not be used up and the jug of oil will not run dry until the day the Lord sends rain on the land.'
    },
    {
        reference: '2 Corinthians 9:8',
        text: 'And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.'
    },
    {
        reference: 'Philippians 4:19',
        text: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.'
    },
    {
        reference: 'Ephesians 2:10',
        text: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.'
    },
    {
        reference: 'John 15:16',
        text: 'You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last—and so that whatever you ask in my name the Father will give you.'
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
    var fragment = document.createDocumentFragment();
    memoryVerses.forEach(function(verse, i) {
        var item = document.createElement('button');
        item.className = 'memory-verse-index-item';
        item.setAttribute('aria-label', 'Open ' + verse.reference);
        var versePreview = getVerseText(verse.reference, verse.text).replace(/\n\n/g, ' ').substring(0, 80);
        var refSpan = document.createElement('span');
        refSpan.className = 'memory-verse-index-ref';
        refSpan.textContent = formatRef(verse.reference);
        var previewSpan = document.createElement('span');
        previewSpan.className = 'memory-verse-index-preview';
        previewSpan.textContent = versePreview + '\u2026';
        item.appendChild(refSpan);
        item.appendChild(previewSpan);
        item.addEventListener('click', function() {
            openMemoryVerseCard(i);
        });
        fragment.appendChild(item);
    });
    list.innerHTML = '';
    list.appendChild(fragment);
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
    var verse = memoryVerses[currentVerseIndex];
    document.getElementById('flashcardReference').textContent = formatRef(verse.reference);
    var textEl = document.getElementById('flashcardText');
    var translatedText = getVerseText(verse.reference, verse.text);
    if (translatedText.indexOf('\n\n') !== -1) {
        textEl.innerHTML = translatedText.replace(/\n\n/g, '<br><br>');
    } else {
        textEl.textContent = translatedText;
    }
    document.getElementById('flashcardCounter').textContent =
        (currentVerseIndex + 1) + ' of ' + memoryVerses.length;
    updateDots();
}

function buildDots() {
    var dotsEl = document.getElementById('flashcardDots');
    if (!dotsEl) return;
    var fragment = document.createDocumentFragment();
    memoryVerses.forEach(function(_, i) {
        var dot = document.createElement('span');
        dot.className = 'flashcard-dot' + (i === currentVerseIndex ? ' active' : '');
        fragment.appendChild(dot);
    });
    dotsEl.innerHTML = '';
    dotsEl.appendChild(fragment);
}

function updateDots() {
    const dotsEl = document.getElementById('flashcardDots');
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.flashcard-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentVerseIndex);
    });
}

var memoryVerseAnimating = false;

function animateCard(direction) {
    if (memoryVerseAnimating) return;
    memoryVerseAnimating = true;
    var card = document.getElementById('memoryVerseFlashcard');
    var outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    var inClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    card.classList.add(outClass);
    card.addEventListener('animationend', function onOut() {
        card.removeEventListener('animationend', onOut);
        card.classList.remove(outClass);
        if (direction === 'next') {
            currentVerseIndex = (currentVerseIndex + 1) % memoryVerses.length;
        } else {
            currentVerseIndex = (currentVerseIndex - 1 + memoryVerses.length) % memoryVerses.length;
        }
        renderMemoryVerse();
        card.classList.add(inClass);
        card.addEventListener('animationend', function onIn() {
            card.removeEventListener('animationend', onIn);
            card.classList.remove(inClass);
            memoryVerseAnimating = false;
        });
    });
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
    var displayText = item.text;
    if (type === 'daily') {
        displayText = getVerseText(item.reference, item.text);
    }
    var textEl = document.getElementById(type + 'CardText');
    if (displayText.indexOf('\n\n') !== -1) {
        textEl.innerHTML = displayText.replace(/\n\n/g, '<br><br>');
    } else {
        textEl.textContent = displayText;
    }
    document.getElementById(type + 'CardReference').textContent = type === 'daily' ? formatRef(item.reference) : item.reference;
    document.getElementById(type + 'Counter').textContent = (index + 1) + ' of ' + data.length;
    updateDeclarationDots(type);
}

function buildDeclarationDots(type) {
    var data = type === 'in-christ' ? inChristDeclarations : dailyDeclarations;
    var dotsEl = document.getElementById(type + 'Dots');
    if (!dotsEl) return;
    var index = type === 'in-christ' ? currentInChristIndex : currentDailyIndex;
    var fragment = document.createDocumentFragment();
    data.forEach(function(_, i) {
        var dot = document.createElement('span');
        dot.className = 'flashcard-dot' + (i === index ? ' active' : '');
        fragment.appendChild(dot);
    });
    dotsEl.innerHTML = '';
    dotsEl.appendChild(fragment);
}

function updateDeclarationDots(type) {
    var index = type === 'in-christ' ? currentInChristIndex : currentDailyIndex;
    var dotsEl = document.getElementById(type + 'Dots');
    if (!dotsEl) return;
    dotsEl.querySelectorAll('.flashcard-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
    });
}

var declarationAnimating = {};

function animateDeclarationCard(type, direction) {
    if (declarationAnimating[type]) return;
    declarationAnimating[type] = true;
    var cardId = type === 'in-christ' ? 'inChristFlashcard' : 'dailyFlashcard';
    var data = type === 'in-christ' ? inChristDeclarations : dailyDeclarations;
    var card = document.getElementById(cardId);
    var outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    var inClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

    card.classList.add(outClass);
    card.addEventListener('animationend', function onOut() {
        card.removeEventListener('animationend', onOut);
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
        card.addEventListener('animationend', function onIn() {
            card.removeEventListener('animationend', onIn);
            card.classList.remove(inClass);
            declarationAnimating[type] = false;
        });
    });
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


function showPrayer(prayer, e) {
    document.querySelectorAll('.prayer-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.prayer-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(prayer + '-prayer').classList.add('active');
    
    if (e && e.target) e.target.classList.add('active');
}

function showDeclaration(declaration, e) {
    document.querySelectorAll('.prayer-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const declarationsContent = document.getElementById('declarations-content');
    if (declarationsContent) {
        declarationsContent.querySelectorAll('.prayer-tab').forEach(tab => {
            tab.classList.remove('active');
        });
    }
    
    document.getElementById(declaration + '-declaration').classList.add('active');
    
    if (e && e.target) e.target.classList.add('active');

    initDeclarations(declaration);
}

// ── Generic step-through flashcard engine ─────────────────────────────────────

var stepFlashcards = {};

var stepFlashcardListenersAdded = {};

function initStepFlashcard(id, cards) {
    var hadListeners = stepFlashcardListenersAdded[id];
    stepFlashcards[id] = { cards: cards, index: 0 };
    renderStepCard(id);
    buildStepDots(id);
    if (!hadListeners) {
        var card = document.getElementById(id + 'Flashcard');
        if (card) {
            var touchStartX, touchStartY;
            card.addEventListener('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });
            card.addEventListener('touchend', function(e) {
                var dx = e.changedTouches[0].clientX - touchStartX;
                var dy = e.changedTouches[0].clientY - touchStartY;
                if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    animateStepCard(id, dx < 0 ? 'next' : 'prev');
                }
            }, { passive: true });
            stepFlashcardListenersAdded[id] = true;
        }
    }
}

function renderStepCard(id) {
    var state = stepFlashcards[id];
    if (!state) return;
    var card = state.cards[state.index];
    var titleEl = document.getElementById(id + 'CardTitle');
    var bodyEl  = document.getElementById(id + 'CardBody');
    if (titleEl) titleEl.innerHTML = card.title || '';
    if (bodyEl)  bodyEl.innerHTML  = card.body  || '';
    var counterEl = document.getElementById(id + 'Counter');
    if (counterEl) counterEl.textContent = (state.index + 1) + ' of ' + state.cards.length;
    updateStepDots(id);
}

function buildStepDots(id) {
    var state = stepFlashcards[id];
    var dotsEl = document.getElementById(id + 'Dots');
    if (!dotsEl || !state) return;
    var fragment = document.createDocumentFragment();
    state.cards.forEach(function(_, i) {
        var dot = document.createElement('span');
        dot.className = 'flashcard-dot' + (i === state.index ? ' active' : '');
        fragment.appendChild(dot);
    });
    dotsEl.innerHTML = '';
    dotsEl.appendChild(fragment);
}

function updateStepDots(id) {
    var state = stepFlashcards[id];
    var dotsEl = document.getElementById(id + 'Dots');
    if (!dotsEl || !state) return;
    dotsEl.querySelectorAll('.flashcard-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === state.index);
    });
}

var stepCardAnimating = {};

function animateStepCard(id, direction) {
    var state = stepFlashcards[id];
    if (!state || stepCardAnimating[id]) return;
    stepCardAnimating[id] = true;
    var card = document.getElementById(id + 'Flashcard');
    var outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    var inClass  = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
    card.classList.add(outClass);
    card.addEventListener('animationend', function onOut() {
        card.removeEventListener('animationend', onOut);
        card.classList.remove(outClass);
        var len = state.cards.length;
        state.index = direction === 'next'
            ? (state.index + 1) % len
            : (state.index - 1 + len) % len;
        renderStepCard(id);
        card.classList.add(inClass);
        card.addEventListener('animationend', function onIn() {
            card.removeEventListener('animationend', onIn);
            card.classList.remove(inClass);
            stepCardAnimating[id] = false;
        });
    });
}

function nextStepCard(id, e) {
    if (e) e.stopPropagation();
    animateStepCard(id, 'next');
}

function prevStepCard(id, e) {
    if (e) e.stopPropagation();
    animateStepCard(id, 'prev');
}

// ── Examen flashcard ───────────────────────────────────────────────────────────

function buildExamenCards() {
    var e = window._dailyExamen || {};
    return [
        {
            title: 'Give Thanks — Gratitude is the Foundation',
            body: '<p id="gratitude-prompt">' + (e.gratitude || 'Recall and thank God for the blessings of the day. Think through your day like watching a movie. What moments brought you joy? What gifts did God provide? Thank Him for both the obvious blessings and the small graces you might have missed.') + '</p>' +
                  '<div class="reflection-box"><p><em>Write or reflect on 3–5 things you\'re grateful for from today...</em></p></div>'
        },
        {
            title: 'Ask for Light — Invite the Holy Spirit',
            body: '<p>Pray for the Holy Spirit to help you see your day clearly, with honesty and openness. Ask God to illuminate the movements of consolation and desolation in your heart today.</p>' +
                  '<div class="reflection-box"><p><em>"Holy Spirit, give me light to see this day through Your eyes and discern Your movements in my soul..."</em></p></div>'
        },
        {
            title: 'Review the Day — Consolation &amp; Desolation',
            body: '<div class="reflection-box"><p><strong>Consolation:</strong> <span id="consolation-prompt">' + (e.consolation || 'When did you feel close to God? Notice moments of peace, joy, hope, faith, and charity. What experiences drew you toward love of God and neighbor?') + '</span></p><p style="margin-top:15px;"><em>Ask: "What brought me closer to God today?"</em></p></div>' +
                  '<div class="reflection-box" style="margin-top:15px;"><p><strong>Desolation:</strong> <span id="desolation-prompt">' + (e.desolation || 'When did you feel distant from God or resistant to His presence? Notice spiritual dryness, darkness, agitation, or movement toward earthly things.') + '</span></p><p style="margin-top:15px;"><em>Ask: "What distracted me or pulled me away from God today?"</em></p></div>'
        },
        {
            title: 'Face Your Shortcomings — Ask Forgiveness',
            body: '<p id="forgiveness-prompt">' + (e.forgiveness || 'Recognize times you failed to love, made poor choices, or missed God\'s presence. Where did you fall short? Bring these honestly to Jesus with humility and receive His grace and forgiveness.') + '</p>' +
                  '<div class="reflection-box"><p><em>Confess your shortcomings and receive God\'s mercy...</em></p></div>'
        },
        {
            title: 'Look Ahead — Prepare for Tomorrow',
            body: '<p id="tomorrow-prompt">' + (e.tomorrow || 'Turn your thoughts toward tomorrow: what challenges or opportunities await? Based on your recognition of consolation and desolation today, ask for God\'s grace. What did you learn about what draws you closer to God?') + '</p>' +
                  '<div class="reflection-box"><p><em>Ask God for grace to pursue what brings life and wisdom to navigate what challenges you...</em></p></div>'
        }
    ];
}

function initExamenFlashcard() {
    initStepFlashcard('examen', buildExamenCards());
}

// ── Lectio Divina flashcard ────────────────────────────────────────────────────

function initLectioFlashcard() {
    var cards = [
        {
            title: 'Lectio — Read',
            body: '<p>Read the passage slowly and attentively. What word or phrase stands out to you? Read it again, even more slowly.</p>' +
                  '<div class="reflection-box"><p><em>Sit with the word or phrase that catches your attention...</em></p></div>'
        },
        {
            title: 'Meditatio — Meditate',
            body: '<p>Repeat your word or phrase quietly. What is God saying to you through these words? How do they connect to your life right now?</p>' +
                  '<div class="reflection-box"><p><em>Reflect on what God might be speaking to you...</em></p></div>'
        },
        {
            title: 'Oratio — Pray',
            body: '<p>Respond to God in prayer. Share your heart — your joys, concerns, needs, and gratitude. Let this passage shape your prayer.</p>' +
                  '<div class="reflection-box"><p><em>Pray in response to God\'s word...</em></p></div>'
        },
        {
            title: 'Contemplatio — Rest',
            body: '<p>Simply rest in God\'s presence. Let go of words and thoughts. Allow His love to surround you in silence.</p>' +
                  '<div class="reflection-box"><p><em>Rest silently in God\'s presence for 2–3 minutes...</em></p></div>'
        }
    ];
    initStepFlashcard('lectio', cards);

    if (window._dailyLectio) {
        var scriptureEl = document.getElementById('lectio-scripture');
        var focusEl = document.getElementById('lectio-focus');
        if (scriptureEl) {
            var lText = getVerseText(window._dailyLectio.scripture.reference, window._dailyLectio.scripture.text);
            var lRef = formatRef(window._dailyLectio.scripture.reference);
            var btn = scriptureEl.querySelector('.new-content-button');
            scriptureEl.textContent = '\u201C' + lText + '\u201D - ' + lRef;
            if (btn) scriptureEl.appendChild(btn);
            else {
                btn = document.createElement('button');
                btn.className = 'new-content-button';
                btn.setAttribute('onclick', 'generateLectioContent()');
                btn.setAttribute('aria-label', 'New Scripture');
                scriptureEl.appendChild(btn);
            }
        }
        if (focusEl) focusEl.innerHTML = window._dailyLectio.focus;
    }
}

// ── Beatitudes flashcard ───────────────────────────────────────────────────────

var beatitudesCardsNIV = [
    'Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
    'Blessed are those who mourn, for they will be comforted.',
    'Blessed are the meek, for they will inherit the earth.',
    'Blessed are those who hunger and thirst for righteousness, for they will be filled.',
    'Blessed are the merciful, for they will receive mercy.',
    'Blessed are the pure in heart, for they will see God.',
    'Blessed are the peacemakers, for they will be called children of God.',
    'Blessed are those who are persecuted because of righteousness, for theirs is the kingdom of heaven.',
    'Blessed are you when people insult you, persecute you and falsely say all kinds of evil against you because of me.'
];
var beatitudesRefs = [
    'Matthew 5:3', 'Matthew 5:4', 'Matthew 5:5', 'Matthew 5:6',
    'Matthew 5:7', 'Matthew 5:8', 'Matthew 5:9', 'Matthew 5:10', 'Matthew 5:11'
];
var beatitudesCardBodies = [
    '<div class="reflection-box"><p>Lord Jesus, please show me the distractions, worries, and anxiety in my spirit. Empty me of anything that is preventing me from hearing or receiving from you.</p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p>Lord, is there anything/anyone that I am not filled with your compassion toward? Teach me to feel the wound of love.</p><p>What do you want me to be sad about? What do you want me to be moved with compassion by?</p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p>Lord show me my worldly passions that are not surrendered to you. What is it you want to replace my worldly passions with?</p><p>Are there any passions that are out of control in my life, that are uncorralled? Aim them, align them in the right direction.</p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p>Lord is there any part of me that is not longing to be satisfied by you? Transform me. Fill me with the resurrection life of Jesus.</p><p>What do you want me to be hungry and thirsty for?</p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p>Lord is there any part of my life where I am not living in your mercy? Lord is there anyone in my life to whom I am not extending mercy? Please help me to move in the constant flow of your mercy for the world.</p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p><em>Lord, are there any places where my heart is distracted or conflicted? Purify my heart and mind, so that I can see the world as you see it. Where am I not single-minded? Is there anyplace where I am outside my identity?</em></p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p><em>Lord, show me any place in my life where I am not at perfect peace. How can I be an agent of peace and reconciliation in the world?</em></p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>',
    '<div class="reflection-box"><p>{{matthew512}}</p><p style="margin-top:15px;"><em>Take time to listen and reflect on what God reveals...</em></p></div>'
];

function buildBeatitudesCards() {
    return beatitudesCardsNIV.map(function(nivTitle, i) {
        var body = beatitudesCardBodies[i];
        if (i === 8) {
            var matt512Niv = 'Rejoice and be glad, because great is your reward in heaven, for in the same way they persecuted the prophets who were before you.';
            body = body.replace('{{matthew512}}', getVerseText('Matthew 5:12', matt512Niv));
        }
        return {
            title: getVerseText(beatitudesRefs[i], nivTitle),
            body: body
        };
    });
}

var beatitudesCards = buildBeatitudesCards();

function initBeatitudesFlashcard() {
    beatitudesCards = buildBeatitudesCards();
    initStepFlashcard('beatitudes', beatitudesCards);
}

// ── Lord's Prayer flashcard ────────────────────────────────────────────────────

var prayerSetFallbacks = [
    { ref: 'Hebrews 10:19,22', niv: 'Therefore, brothers and sisters, since we have confidence to enter the Most Holy Place by the blood of Jesus... let us draw near to God with a sincere heart and with the full assurance that faith brings.' },
    { ref: 'Psalm 29:2', niv: 'Ascribe to the Lord the glory due his name; worship the Lord in the splendor of his holiness.' },
    { ref: 'Matthew 6:33', niv: 'Seek first his kingdom and his righteousness, and all these things will be given to you as well.' },
    { ref: 'Philippians 4:19', niv: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.' },
    { ref: 'Colossians 3:13', niv: 'Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.' },
    { ref: 'James 4:7', niv: 'Submit yourselves, then, to God. Resist the devil, and he will flee from you.' },
    { ref: 'Isaiah 30:21', niv: 'Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, \'This is the way; walk in it.\'' }
];

function buildLordsPrayerCards() {
    var titles = [
        'Our Father Who Is In Heaven',
        'Hallowed Be Your Name',
        'Your Kingdom Come, Your Will Be Done',
        'Give Us This Day Our Daily Bread',
        'Forgive Us As We Forgive Others',
        'Lead Us Not Into Trial, Deliver Us From Evil',
        'Listening Prayer'
    ];
    var subtitles = [
        'Approach, Worship, Adoration &amp; Surrender',
        'Worship, Gratitude &amp; Prayer for the World',
        'Submission &amp; Intercession',
        'Provision — His Presence, Mercy &amp; Help',
        'Reflection &amp; Release',
        'Gethsemane Prayer &amp; Spiritual Warfare',
        'Hearing God\'s Voice'
    ];
    var defaultPrompts = [
        'Come into God\'s presence as a beloved child. He is your Father — both intimately close and infinitely glorious. Worship Him for who He is. Surrender your heart, your day, and your will to Him.',
        'Honor God\'s holy name. Thank Him for who He has revealed Himself to be. Pray that the world would know Him as He truly is — in all His beauty, holiness, and love.',
        'Submit to God\'s reign in your life. Pray for His kingdom to come in your family, your church, the persecuted church worldwide, and for revival and renewal in the nations.',
        'Ask for God\'s provision — His presence above all, His mercy for today, physical provision, and help in every area of need. Acknowledge your complete dependence on Him.',
        'Receive God\'s forgiveness for your sins. Then release everyone and everything to Him — forgiving those who have hurt you, letting go of offenses, surrendering control.',
        'Like Jesus in Gethsemane, submit to God\'s will even in difficulty. Stand against spiritual forces of evil. Ask for protection from temptation and deliverance from the evil one.',
        'Be still and listen for God\'s gentle voice...'
    ];
    var defaultReflections = [
        '<em>Take time to worship and adore your Heavenly Father...</em>',
        '<em>Worship God\'s character and pray for His name to be honored throughout the earth...</em>',
        '<em>Intercede for God\'s will to be done on earth as it is in heaven...</em>',
        '<em>Bring your needs to God, trusting in His faithful provision...</em>',
        '<em>Confess your sins, receive forgiveness, and extend forgiveness to others...</em>',
        '<em>Pray for strength in trials and victory over spiritual opposition...</em>',
        ''
    ];

    return titles.map(function(title, i) {
        var daily = window._dailyPrayersetContent && window._dailyPrayersetContent[i + 1];
        var fb = prayerSetFallbacks[i];
        var ref = daily ? daily.reference : fb.ref;
        var nivText = daily ? daily.scripture : fb.niv;
        var text = getVerseText(ref, nivText);
        var fRef = formatRef(ref);
        var prompt = daily ? daily.prompt : defaultPrompts[i];

        var reflectionPart = i === 6
            ? '<p style="font-style:italic;margin:15px 0;">"What is important for me to know about today?"</p><p style="font-style:italic;margin:15px 0;">"What do You want me to do about it?"</p>'
            : '';
        var reflectLabel = i === 6 ? '<strong>Ask God:</strong>' : '<strong>Reflect:</strong>';
        var reflectionClose = defaultReflections[i] ? '<p>' + defaultReflections[i] + '</p>' : '';

        return {
            title: title,
            body: '<div style="font-size:0.85em;color:#667eea;margin-bottom:12px;">' + subtitles[i] + '</div>' +
                  '<div class="scripture-text">\u201C' + text + '\u201D - ' + fRef + '</div>' +
                  '<div class="reflection-box">' + reflectionPart + '<p>' + reflectLabel + ' <span>' + prompt + '</span></p>' + reflectionClose + '</div>'
        };
    });
}

function initLordsPrayerFlashcard() {
    initStepFlashcard('prayerset', buildLordsPrayerCards());
}

// ─────────────────────────────────────────────────────────────────────────────

function showMainMenu() {
    document.getElementById('main-menu').style.display = '';
    document.querySelectorAll('.prayer-content').forEach(function(content) {
        content.classList.remove('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Manual content generation (still available via buttons)
function generateExamenContent() {
    window._dailyExamen = {
        verse: getRandomItem(examenPrompts.verses),
        gratitude: getRandomItem(examenPrompts.gratitude),
        consolation: getRandomItem(examenPrompts.consolation),
        desolation: getRandomItem(examenPrompts.desolation),
        forgiveness: getRandomItem(examenPrompts.forgiveness),
        tomorrow: getRandomItem(examenPrompts.tomorrow),
        closing: getRandomItem(examenPrompts.closings)
    };
    renderExamenVerse(window._dailyExamen.verse, 'examen-verse');
    document.getElementById('examen-closing').textContent = window._dailyExamen.closing;
    initExamenFlashcard();
}

function generateLectioContent() {
    var scripture = getRandomItem(lectioScriptures);
    var focusHtml = 'Focus Word: "' + scripture.focus + '"<br><small>Carry this word with you today as a reminder of God\'s invitation.</small>';

    window._dailyLectio = { scripture: scripture, focus: focusHtml };

    var translatedText = getVerseText(scripture.reference, scripture.text);
    var translatedRef = formatRef(scripture.reference);
    var scriptureEl = document.getElementById('lectio-scripture');
    if (scriptureEl) {
        var btn = scriptureEl.querySelector('.new-content-button');
        scriptureEl.textContent = '\u201C' + translatedText + '\u201D - ' + translatedRef;
        if (btn) scriptureEl.appendChild(btn);
        else {
            btn = document.createElement('button');
            btn.className = 'new-content-button';
            btn.setAttribute('onclick', 'generateLectioContent()');
            btn.setAttribute('aria-label', 'New Scripture');
            scriptureEl.appendChild(btn);
        }
    }
    var focusEl = document.getElementById('lectio-focus');
    if (focusEl) focusEl.innerHTML = focusHtml;
}

function generateAdorationContent() {
    var scripture = getRandomItem(adorationScriptures);
    var translatedText = getVerseText(scripture.reference, scripture.text);
    var translatedRef = formatRef(scripture.reference);
    var adorationElement = document.getElementById('adoration-scripture');
    if (adorationElement) {
        var adorationButton = adorationElement.querySelector('.new-content-button');
        adorationElement.textContent = '\u201C' + translatedText + '\u201D - ' + translatedRef;
        if (adorationButton) adorationElement.appendChild(adorationButton);
    }
    document.getElementById('acknowledge-prompt').textContent = scripture.acknowledge;
    document.getElementById('adore-prompt').textContent = scripture.adore;
    document.getElementById('surrender-prompt').textContent = scripture.surrender;
    document.getElementById('transformation-prompt').textContent = scripture.transformation;
    document.getElementById('adoration-focus').innerHTML = 'Today\'s Focus: ' + scripture.focus + '<br><small>Meditate on this aspect of God\'s character throughout your day.</small>';
    document.getElementById('adoration-closing').textContent = scripture.closing;
}

// generateApostolicContent() removed - apostolic prayers now display all prayers statically

function generatePrayerSetContent() {
    window._dailyPrayersetContent = window._dailyPrayersetContent || {};
    for (var i = 1; i <= 7; i++) {
        var movement = getRandomItem(prayerSetContent['movement' + i]);
        window._dailyPrayersetContent[i] = movement;
        var mvText = getVerseText(movement.reference, movement.scripture);
        var mvRef = formatRef(movement.reference);
        var el = document.getElementById('prayerset-movement' + i + '-scripture');
        if (el) el.textContent = '\u201C' + mvText + '\u201D - ' + mvRef;
        var promptEl = document.getElementById('prayerset-movement' + i + '-prompt');
        if (promptEl) promptEl.textContent = movement.prompt;
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

function generateGentleHumbleContent() {
    var content = getRandomItem(gentleHumbleContent);
    var translatedText = getVerseText(content.reference, content.scripture);
    var translatedRef = formatRef(content.reference);
    document.getElementById('gentle-humble-scripture').textContent = translatedText + ' - ' + translatedRef;
    document.getElementById('gentle-humble-quote').textContent = content.quote;
    document.getElementById('gentle-humble-author').textContent = '\u2013 ' + content.author;
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
    
    window._updateNotificationTimer = setTimeout(function() {
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
    if (window._updateNotificationTimer) {
        clearTimeout(window._updateNotificationTimer);
        window._updateNotificationTimer = null;
    }
    var notification = document.getElementById('update-notification');
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
    const categories = ['daily', 'scripture', 'historic'];
    
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
        // Initialize translation picker
        initTranslationPicker();

        // Initialize dark mode
        initializeDarkMode();

        // Initialize category states
        initializeCategories();

        // Load daily content based on day of year (guarantees cycling through all content)
        loadDailyContent();

        // Update header subtitle with current translation
        updateHeaderSubtitle();
        updateHtmlVerses();

        
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
                registration.update();

                registration.addEventListener('updatefound', () => {
                    var newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(function() {});
        
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