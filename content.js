// Prayer content for daily rotation
const examenPrompts = {
    verses: [
        '"And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him." - Colossians 3:17 (NIV)',
        '"Rejoice always, pray continually, give thanks in all circumstances; for this is God\'s will for you in Christ Jesus." - 1 Thessalonians 5:16-18 (NIV)',
        '"Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows." - James 1:17 (NIV)',
        '"The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing." - Zephaniah 3:17 (NIV)',
        '"Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful." - Colossians 3:15 (NIV)',
        '"In your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have." - 1 Peter 3:15 (NIV)',
        '"Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." - Psalm 46:10 (NIV)'
    ],
    gratitude: [
        'Think through your day like watching a movie. What moments brought you joy? What gifts did God provide? Thank Him for both the obvious blessings and the small graces you might have missed.',
        'Look for God\'s fingerprints on your day. What conversations encouraged you? What provisions appeared just when you needed them? Thank Him for His faithful care.',
        'Consider the gifts of this day: people who showed kindness, moments of beauty, provision for your needs. Thank God for His goodness in the details.',
        'Reflect on today\'s unexpected blessings. What surprised you with joy? What went better than expected? Thank God for His abundant grace.',
        'Notice the simple pleasures of today: a warm cup of coffee, a text from a friend, a moment of laughter. Thank God for filling your day with small joys.',
        'Think about the people who crossed your path today. How did God use them to bless you? Thank Him for working through others.',
        'Consider how God provided for your needs today - food, shelter, safety, health. Thank Him for His faithful provision.'
    ],
    consolation: [
        'Pay attention to moments of consolation today - times when you felt God\'s love, peace, joy, or were moved toward hope, faith, and charity. When did you feel truly alive in God\'s presence? What experiences inflamed your soul with love for God and others?',
        'When did you experience an increase in faith, hope, or love today? What moments brought you deep peace or spiritual joy? Notice these as movements of consolation drawing you closer to God.',
        'What conversations, prayers, or experiences today left you feeling more connected to God and neighbor? These life-giving moments are consolation - recognize them as God\'s invitation to deeper relationship.',
        'Where did you feel your heart warmed with love for God today? What stirred up gratitude, hope, or desire for holiness? Consolation reveals what truly moves you closer to your Creator.',
        'Notice moments when you felt naturally oriented toward God - in prayer, beauty, kindness, or service. When did earthly things point you heavenward? These are signs of spiritual consolation.',
        'What brought you genuine joy today, not just fleeting happiness? Consolation produces lasting peace and draws you toward love, while mere pleasure fades quickly.',
        'When did you feel most spiritually alive today? What activities, relationships, or moments of prayer inflamed your love for God and filled you with hope?'
    ],
    desolation: [
        'Recognize moments of desolation - times marked by darkness of soul, disturbance, lack of hope or love, or movement toward earthly things. When did you feel distracted from God, agitated, or pulled into self-absorption? These moments, while difficult, point toward where you need God\'s grace.',
        'When did you experience spiritual dryness, heaviness, or lack of faith today? What moments left you feeling distant from God or doubtful? Recognize these as desolation, not to condemn yourself, but to understand where you need grace.',
        'Where did you feel pulled toward low or earthly things today? What increased anxiety, self-doubt, or spiritual restlessness? Desolation reveals where the enemy seeks to distract you from God.',
        'Notice times when you felt agitated, discouraged, or spiritually cold. When did hope, love, or faith seem to diminish? Understanding these patterns of desolation helps you resist them with God\'s help.',
        'What drew you into self-absorption or away from love of God and neighbor today? When did you feel spiritually confused or disturbed? These are signs of desolation requiring God\'s grace.',
        'When did you feel most spiritually empty or disconnected today? What triggered feelings of darkness, despair, or distance from God? Desolation sometimes precedes growth - bring it honestly to God.',
        'Where did distractions or temptations pull your attention from God today? What left you feeling spiritually depleted rather than filled? Recognize these desolate moments as opportunities for God\'s grace to work.'
    ],
    forgiveness: [
        'What moments from today need God\'s forgiveness and healing? Where did you fall short of love? Bring these honestly to Jesus and receive His grace.',
        'Where did impatience, pride, or fear show up in your day? Confess these to God and receive His forgiveness and healing.',
        'What words or actions from today do you wish you could do differently? Bring these to Jesus and receive His mercy.',
        'How did you miss opportunities to love well today? Ask for God\'s forgiveness and strength to grow in love.',
        'What negative thoughts or attitudes clouded your day? Surrender these to God and ask for His renewal.',
        'Where did you choose self over service today? Confess this tendency and ask for a more generous heart.',
        'What relationships need healing because of your actions or words today? Ask God for wisdom in making amends.'
    ],
    tomorrow: [
        'Based on your recognition of consolation and desolation today, ask for God\'s grace for tomorrow. What did you learn about what draws you closer to God? What patterns of desolation do you need His help to resist? Ask for wisdom, presence, and strength to choose the life-giving path.',
        'What moments of consolation today can you carry into tomorrow? What desolations revealed struggles needing God\'s grace? Ask Him to help you pursue what brings life and resist what pulls you away.',
        'How can you cultivate more consolation tomorrow - through prayer, service, or awareness of God? What patterns of desolation should you avoid? Ask for grace to choose wisely.',
        'Knowing what brought you closer to God today and what pulled you away, ask for wisdom to navigate tomorrow. Pray for strength to embrace consolation and grace to transform desolation.',
        'What did today\'s consolations reveal about how God speaks to you? What did desolations teach you about your vulnerabilities? Ask for grace to follow God\'s leading tomorrow.',
        'Ask God to help you recognize consolation and desolation as they arise tomorrow. Pray for the grace to choose paths of life and resist movements away from Him.',
        'Based on today\'s spiritual movements, what does your soul need tomorrow? Ask God for grace to pursue activities, relationships, and practices that draw you closer to Him.'
    ],
    closings: [
        '"Father, thank You for walking with me today. Help me to rest in Your love tonight and to trust You with tomorrow. Amen."',
        '"Lord Jesus, I thank You for Your presence in every moment of this day. Grant me peaceful rest and renewed strength for tomorrow. Amen."',
        '"Gracious God, thank You for Your faithfulness today. Help me to sleep in Your peace and wake with joy in Your mercies. Amen."',
        '"Holy Spirit, thank You for guiding me through this day. I rest in God\'s love and trust Him with all my tomorrows. Amen."',
        '"Heavenly Father, I surrender this day to You with gratitude. Prepare my heart for tomorrow and fill me with Your peace tonight. Amen."',
        '"Lord, thank You for Your grace that sustained me today. Help me wake tomorrow eager to walk with You again. Amen."',
        '"God of all comfort, thank You for being my companion today. Grant me restful sleep and hope for tomorrow. Amen."'
    ]
};

const lectioScriptures = [
    {
        text: 'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.',
        reference: 'Matthew 11:28-29 (NIV)',
        focus: 'Rest'
    },
    {
        text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
        reference: 'Zephaniah 3:17 (NIV)',
        focus: 'Delight'
    },
    {
        text: 'Cast all your anxiety on him because he cares for you.',
        reference: '1 Peter 5:7 (NIV)',
        focus: 'Care'
    },
    {
        text: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
        reference: 'Psalm 46:10 (NIV)',
        focus: 'Stillness'
    },
    {
        text: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
        reference: 'Psalm 23:1-3 (NIV)',
        focus: 'Shepherd'
    },
    {
        text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future."',
        reference: 'Jeremiah 29:11 (NIV)',
        focus: 'Hope'
    },
    {
        text: 'The Lord will fight for you; you need only to be still.',
        reference: 'Exodus 14:14 (NIV)',
        focus: 'Peace'
    },
    {
        text: 'In all your ways submit to him, and he will make your paths straight.',
        reference: 'Proverbs 3:6 (NIV)',
        focus: 'Guidance'
    },
    {
        text: 'He heals the brokenhearted and binds up their wounds.',
        reference: 'Psalm 147:3 (NIV)',
        focus: 'Healing'
    },
    {
        text: 'Do not grieve, for the joy of the Lord is your strength.',
        reference: 'Nehemiah 8:10 (NIV)',
        focus: 'Joy'
    },
    {
        text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
        reference: 'Romans 8:28 (NIV)',
        focus: 'Purpose'
    },
    {
        text: 'I can do all this through him who gives me strength.',
        reference: 'Philippians 4:13 (NIV)',
        focus: 'Strength'
    },
    {
        text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.',
        reference: 'Psalm 34:18 (NIV)',
        focus: 'Comfort'
    },
    {
        text: 'Trust in the Lord with all your heart and lean not on your own understanding.',
        reference: 'Proverbs 3:5 (NIV)',
        focus: 'Trust'
    },
    {
        text: 'God is our refuge and strength, an ever-present help in trouble.',
        reference: 'Psalm 46:1 (NIV)',
        focus: 'Refuge'
    },
    {
        text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
        reference: 'Joshua 1:9 (NIV)',
        focus: 'Presence'
    },
    {
        text: 'Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.',
        reference: 'Matthew 6:34 (NIV)',
        focus: 'Today'
    },
    {
        text: 'Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.',
        reference: 'Lamentations 3:22-23 (NIV)',
        focus: 'Mercy'
    },
    {
        text: 'I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.',
        reference: 'John 16:33 (NIV)',
        focus: 'Victory'
    },
    {
        text: 'The Lord gives strength to his people; the Lord blesses his people with peace.',
        reference: 'Psalm 29:11 (NIV)',
        focus: 'Blessing'
    },
    {
        text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
        reference: 'Psalm 23:4 (NIV)',
        focus: 'Courage'
    },
    {
        text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
        reference: 'Isaiah 40:31 (NIV)',
        focus: 'Renewal'
    },
    {
        text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
        reference: '1 Corinthians 13:4 (NIV)',
        focus: 'Love'
    },
    {
        text: 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?',
        reference: 'Psalm 27:1 (NIV)',
        focus: 'Light'
    },
    {
        text: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.',
        reference: 'Philippians 4:19 (NIV)',
        focus: 'Provision'
    },
    {
        text: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.',
        reference: '1 John 1:9 (NIV)',
        focus: 'Forgiveness'
    },
    {
        text: 'The Lord is gracious and righteous; our God is full of compassion.',
        reference: 'Psalm 116:5 (NIV)',
        focus: 'Grace'
    },
    {
        text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
        reference: 'Matthew 6:33 (NIV)',
        focus: 'Priorities'
    },
    {
        text: 'The Lord is good, a refuge in times of trouble. He cares for those who trust in him.',
        reference: 'Nahum 1:7 (NIV)',
        focus: 'Goodness'
    },
    {
        text: 'He says, Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
        reference: 'Psalm 46:10 (NIV)',
        focus: 'Knowing'
    },
    {
        text: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.',
        reference: 'Romans 15:13 (NIV)',
        focus: 'Overflow'
    },
    {
        text: 'For where your treasure is, there your heart will be also.',
        reference: 'Matthew 6:21 (NIV)',
        focus: 'Heart'
    },
    {
        text: 'The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.',
        reference: 'Deuteronomy 31:8 (NIV)',
        focus: 'Faithfulness'
    },
    {
        text: 'Create in me a pure heart, O God, and renew a steadfast spirit within me.',
        reference: 'Psalm 51:10 (NIV)',
        focus: 'Purity'
    },
    {
        text: 'The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.',
        reference: 'Psalm 18:2 (NIV)',
        focus: 'Security'
    },
    {
        text: 'Wait for the Lord; be strong and take heart and wait for the Lord.',
        reference: 'Psalm 27:14 (NIV)',
        focus: 'Waiting'
    },
    {
        text: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
        reference: 'Micah 6:8 (NIV)',
        focus: 'Humility'
    },
    {
        text: 'The Lord your God in your midst, The Mighty One, will save; He will rejoice over you with gladness, He will quiet you with His love.',
        reference: 'Zephaniah 3:17 (NIV)',
        focus: 'Quietness'
    },
    {
        text: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!',
        reference: '2 Corinthians 5:17 (NIV)',
        focus: 'Newness'
    },
    {
        text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
        reference: 'Galatians 5:22-23 (NIV)',
        focus: 'Fruit'
    },
    {
        text: 'Let us then approach God\'s throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.',
        reference: 'Hebrews 4:16 (NIV)',
        focus: 'Confidence'
    },
    {
        text: 'Delight yourself in the Lord, and he will give you the desires of your heart.',
        reference: 'Psalm 37:4 (NIV)',
        focus: 'Desires'
    },
    {
        text: 'But he said to me, My grace is sufficient for you, for my power is made perfect in weakness.',
        reference: '2 Corinthians 12:9 (NIV)',
        focus: 'Sufficiency'
    },
    {
        text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.',
        reference: 'Psalm 28:7 (NIV)',
        focus: 'Shield'
    },
    {
        text: 'Call to me and I will answer you and tell you great and unsearchable things you do not know.',
        reference: 'Jeremiah 33:3 (NIV)',
        focus: 'Calling'
    },
    {
        text: 'Give thanks to the Lord, for he is good; his love endures forever.',
        reference: 'Psalm 107:1 (NIV)',
        focus: 'Thanksgiving'
    },
    {
        text: 'In their hearts humans plan their course, but the Lord establishes their steps.',
        reference: 'Proverbs 16:9 (NIV)',
        focus: 'Steps'
    },
    {
        text: 'The name of the Lord is a fortified tower; the righteous run to it and are safe.',
        reference: 'Proverbs 18:10 (NIV)',
        focus: 'Safety'
    },
    {
        text: 'But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession.',
        reference: '1 Peter 2:9 (NIV)',
        focus: 'Identity'
    },
    {
        text: 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.',
        reference: 'Psalm 34:8 (NIV)',
        focus: 'Taste'
    },
    {
        text: 'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.',
        reference: 'John 15:5 (NIV)',
        focus: 'Abide'
    },
    {
        text: 'The water I give them will become in them a spring of water welling up to eternal life.',
        reference: 'John 4:14 (NIV)',
        focus: 'Living Water'
    },
    {
        text: 'Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they?',
        reference: 'Matthew 6:26 (NIV)',
        focus: 'Valued'
    },
    {
        text: 'See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!',
        reference: '1 John 3:1 (NIV)',
        focus: 'Beloved'
    },
    {
        text: 'The Spirit you received brought about your adoption to sonship. And by him we cry, "Abba, Father."',
        reference: 'Romans 8:15 (NIV)',
        focus: 'Abba'
    },
    {
        text: 'My sheep listen to my voice; I know them, and they follow me.',
        reference: 'John 10:27 (NIV)',
        focus: 'Voice'
    },
    {
        text: 'Whoever drinks the water I give them will never thirst. Indeed, the water I give them will become in them a spring of water welling up to eternal life.',
        reference: 'John 4:14 (NIV)',
        focus: 'Thirst'
    },
    {
        text: 'Come to me, all you who are weary and burdened, and I will give you rest.',
        reference: 'Matthew 11:28 (NIV)',
        focus: 'Come'
    },
    {
        text: 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.',
        reference: 'John 8:12 (NIV)',
        focus: 'Light'
    },
    {
        text: 'As the Father has loved me, so have I loved you. Now remain in my love.',
        reference: 'John 15:9 (NIV)',
        focus: 'Remain'
    },
    {
        text: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
        reference: 'John 14:27 (NIV)',
        focus: 'Peace'
    },
    {
        text: 'Remain in me, as I also remain in you. No branch can bear fruit by itself; it must remain in the vine. Neither can you bear fruit unless you remain in me.',
        reference: 'John 15:4 (NIV)',
        focus: 'Connected'
    },
    {
        text: 'He tends his flock like a shepherd: He gathers the lambs in his arms and carries them close to his heart.',
        reference: 'Isaiah 40:11 (NIV)',
        focus: 'Carried'
    },
    {
        text: 'Are not two sparrows sold for a penny? Yet not one of them will fall to the ground outside your Father\'s care. So don\'t be afraid; you are worth more than many sparrows.',
        reference: 'Matthew 10:29,31 (NIV)',
        focus: 'Worth'
    },
    {
        text: 'I have called you friends, for everything that I learned from my Father I have made known to you.',
        reference: 'John 15:15 (NIV)',
        focus: 'Friends'
    },
    {
        text: 'Let the beloved of the Lord rest secure in him, for he shields him all day long, and the one the Lord loves rests between his shoulders.',
        reference: 'Deuteronomy 33:12 (NIV)',
        focus: 'Secure'
    },
    {
        text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
        reference: 'Zephaniah 3:17 (NIV)',
        focus: 'Delight'
    },
    {
        text: 'This is love: not that we loved God, but that he loved us and sent his Son as an atoning sacrifice for our sins.',
        reference: '1 John 4:10 (NIV)',
        focus: 'First Love'
    },
    {
        text: 'Neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.',
        reference: 'Romans 8:39 (NIV)',
        focus: 'Inseparable'
    },
    {
        text: 'Before I formed you in the womb I knew you, before you were born I set you apart.',
        reference: 'Jeremiah 1:5 (NIV)',
        focus: 'Known'
    }
];

const adorationScriptures = [
    {
        text: '"Holy, holy, holy is the Lord God Almighty, who was, and is, and is to come." "You are worthy, our Lord and God, to receive glory and honor and power, for you created all things, and by your will they were created and have their being."',
        reference: 'Revelation 4:8,11 (NIV)',
        focus: 'God\'s Holiness',
        acknowledge: 'Read the passage slowly. What does this reveal about God\'s character? How does this truth about who He is affect your heart?',
        adore: 'Speak words of praise and worship based on what you\'ve discovered about God. Use your own words to honor who He is.',
        surrender: 'How does seeing God\'s greatness change your perspective on your concerns? Surrender your will and trust to Him.',
        transformation: 'Ask God to transform you by His glory. How might living in awareness of this truth about God change how you live today?',
        closing: 'Holy God, You alone are worthy of all praise. Transform me by Your glory that I might reflect Your character in all I do. Amen.'
    },
    {
        text: 'The Lord is compassionate and gracious, slow to anger, abounding in love. He will not always accuse, nor will he harbor his anger forever; he does not treat us as our sins deserve or repay us according to our iniquities.',
        reference: 'Psalm 103:8-10 (NIV)',
        focus: 'God\'s Mercy',
        acknowledge: 'What do you learn about God\'s heart toward you from this passage? How does His mercy and compassion touch your soul?',
        adore: 'Praise God for His incredible mercy and patience. Thank Him for not treating you as your sins deserve.',
        surrender: 'In light of God\'s mercy, what needs to change in how you treat others? Surrender any unforgiveness or hardness.',
        transformation: 'How can you extend the same mercy to others that God has shown you? Ask Him to make you more like Him.',
        closing: 'Merciful Father, thank You for Your boundless compassion. Help me to show others the same mercy You have shown me. Amen.'
    },
    {
        text: 'Great is our Lord and mighty in power; his understanding has no limit. The Lord sustains the humble but casts the wicked to the ground.',
        reference: 'Psalm 147:5-6 (NIV)',
        focus: 'God\'s Power',
        acknowledge: 'What does this passage teach you about God\'s unlimited power and understanding? How does this comfort or challenge you?',
        adore: 'Worship God for His mighty power and perfect understanding. Praise Him for being greater than any challenge you face.',
        surrender: 'What situations in your life need God\'s mighty power? Surrender your limitations and trust in His strength.',
        transformation: 'How does knowing God\'s power change your perspective on your problems? Ask Him to increase your faith.',
        closing: 'Almighty God, You are mighty in power and perfect in understanding. I trust in Your strength and not my own. Amen.'
    },
    {
        text: 'How great is the love the Father has lavished on us, that we should be called children of God! And that is what we are!',
        reference: '1 John 3:1 (NIV)',
        focus: 'God\'s Love',
        acknowledge: 'What does it mean that God has "lavished" His love on you? How does being called God\'s child affect your identity?',
        adore: 'Thank God for His extravagant love toward you. Praise Him for adopting you as His beloved child.',
        surrender: 'What insecurities or fears about your worth need to be surrendered in light of God\'s love for you?',
        transformation: 'How should knowing you are God\'s beloved child change how you live today? Ask Him to help you walk in this identity.',
        closing: 'Father, thank You for lavishing Your love on me and calling me Your child. Help me to live worthy of this calling. Amen.'
    },
    {
        text: 'The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing.',
        reference: 'Zephaniah 3:17 (NIV)',
        focus: 'God\'s Joy',
        acknowledge: 'How does it feel to know that God rejoices over you and sings about you? What does this reveal about His heart toward you?',
        adore: 'Worship God for His joyful love toward you. Thank Him for finding delight in who you are.',
        surrender: 'What shame or self-doubt needs to be surrendered in light of God\'s joyful love for you?',
        transformation: 'How can you live today knowing that you bring God joy? Ask Him to help you see yourself through His eyes.',
        closing: 'Joyful Father, thank You for singing over me with delight. Help me to live in the confidence of Your love. Amen.'
    },
    {
        text: 'The Lord is faithful to all his promises and loving toward all he has made.',
        reference: 'Psalm 145:13 (NIV)',
        focus: 'God\'s Faithfulness',
        acknowledge: 'What promises of God do you need to remember today? How has He shown His faithfulness in your life?',
        adore: 'Praise God for His absolute faithfulness. Thank Him for never breaking His promises.',
        surrender: 'What worries about the future need to be surrendered to God\'s faithful character?',
        transformation: 'How can you live more confidently today, trusting in God\'s faithful promises?',
        closing: 'Faithful God, You never fail in Your promises. Help me to trust You completely and live in Your faithfulness. Amen.'
    },
    {
        text: 'The Lord reigns, let the earth be glad; let the distant shores rejoice. Clouds and thick darkness surround him; righteousness and justice are the foundation of his throne.',
        reference: 'Psalm 97:1-2 (NIV)',
        focus: 'God\'s Sovereignty',
        acknowledge: 'What does it mean that God reigns over all creation? How does His righteous rule affect your perspective today?',
        adore: 'Worship the Lord who reigns in righteousness and justice. Praise Him for His sovereign authority over all things.',
        surrender: 'What areas of your life are you trying to control instead of trusting God\'s sovereign rule? Surrender them to His throne.',
        transformation: 'How should living under God\'s righteous reign change your priorities and decisions today?',
        closing: 'Sovereign Lord, You reign in perfect righteousness. I submit to Your rule and trust Your justice in all things. Amen.'
    },
    {
        text: 'Your throne, O God, will last for ever and ever; a scepter of justice will be the scepter of your kingdom. You love righteousness and hate wickedness.',
        reference: 'Psalm 45:6-7 (NIV)',
        focus: 'God\'s Eternal Throne',
        acknowledge: 'How does God\'s eternal, unchanging throne give you security? What does His love for righteousness reveal about His character?',
        adore: 'Praise God for His eternal throne that will never fade. Worship Him for His perfect love of righteousness.',
        surrender: 'What unrighteous attitudes or actions need to be surrendered to the King who loves righteousness?',
        transformation: 'How can you reflect God\'s love for righteousness in your life today? Ask Him to increase your hatred of sin.',
        closing: 'Eternal King, Your throne endures forever. Transform my heart to love what You love and hate what You hate. Amen.'
    },
    {
        text: 'God is light; in him there is no darkness at all.',
        reference: '1 John 1:5 (NIV)',
        focus: 'God\'s Purity',
        acknowledge: 'What does it mean that God is pure light with no darkness? How does His perfect purity affect how you view Him?',
        adore: 'Worship God for His absolute purity and holiness. Praise Him that there is no shadow or darkness in His nature.',
        surrender: 'What darkness in your life needs to be brought into God\'s light? Surrender hidden sins to His purifying presence.',
        transformation: 'How can you walk in God\'s light today and reflect His purity? Ask Him to expose and cleanse any darkness.',
        closing: 'God of Light, You are perfectly pure with no darkness at all. Cleanse me and help me walk in Your light. Amen.'
    },
    {
        text: 'The Lord your God is God of gods and Lord of lords, the great God, mighty and awesome, who shows no partiality and accepts no bribes.',
        reference: 'Deuteronomy 10:17 (NIV)',
        focus: 'God\'s Majesty',
        acknowledge: 'What does this passage reveal about God\'s supreme authority and impartiality? How does His awesome nature inspire worship?',
        adore: 'Worship the Lord who is above all gods and lords. Praise Him for His mighty and awesome character.',
        surrender: 'How does knowing God shows no favoritism change how you approach Him? Surrender any false ideas about earning His favor.',
        transformation: 'How should God\'s impartial justice shape how you treat others today? Ask Him to make you fair and just.',
        closing: 'Mighty God, You are the Lord of lords, awesome in power. Help me to honor Your justice and impartiality. Amen.'
    },
    {
        text: 'He is the Rock, his works are perfect, and all his ways are just. A faithful God who does no wrong, upright and just is he.',
        reference: 'Deuteronomy 32:4 (NIV)',
        focus: 'God\'s Perfection',
        acknowledge: 'How does knowing God\'s works are perfect and He does no wrong affect your trust in Him?',
        adore: 'Praise God for His perfect works and just ways. Worship Him for His absolute uprightness and faithfulness.',
        surrender: 'What imperfect situations are you struggling to trust God with? Surrender them to His perfect wisdom.',
        transformation: 'How can you rest in God\'s perfect character when life seems imperfect? Ask for deeper trust in His ways.',
        closing: 'Perfect God, You do no wrong and all Your ways are just. Help me to trust Your perfect work in my life. Amen.'
    },
    {
        text: 'But you, Lord, are a compassionate and gracious God, slow to anger, abounding in love and faithfulness.',
        reference: 'Psalm 86:15 (NIV)',
        focus: 'God\'s Compassion',
        acknowledge: 'What does God\'s abundant compassion and patience mean for you today? How does this reveal His heart?',
        adore: 'Thank God for His overflowing compassion and grace. Praise Him for being slow to anger and rich in faithful love.',
        surrender: 'Where do you need to experience God\'s compassion today? Surrender your failures and receive His grace.',
        transformation: 'How can you show the same compassion to others that God shows you? Ask Him to fill you with His patience.',
        closing: 'Compassionate Father, You abound in love and faithfulness. Thank You for Your patience with me. Amen.'
    },
    {
        text: 'For the Lord is good and his love endures forever; his faithfulness continues through all generations.',
        reference: 'Psalm 100:5 (NIV)',
        focus: 'God\'s Goodness',
        acknowledge: 'What does it mean that God is good and His love endures forever? How has His faithfulness been evident in your life?',
        adore: 'Praise the Lord for His unchanging goodness. Worship Him for His eternal love that never fails.',
        surrender: 'What doubts about God\'s goodness need to be surrendered? Trust His enduring love even in difficult circumstances.',
        transformation: 'How can you live today in the confidence of God\'s eternal goodness? Ask Him to deepen your assurance.',
        closing: 'Good and faithful God, Your love endures forever. Help me to trust in Your goodness in all circumstances. Amen.'
    },
    {
        text: 'Oh, the depth of the riches of the wisdom and knowledge of God! How unsearchable his judgments, and his paths beyond tracing out!',
        reference: 'Romans 11:33 (NIV)',
        focus: 'God\'s Wisdom',
        acknowledge: 'What does God\'s infinite wisdom mean when you face confusing situations? How does His knowledge comfort you?',
        adore: 'Stand in awe of God\'s immeasurable wisdom and knowledge. Praise Him for understanding beyond human comprehension.',
        surrender: 'What confusion or lack of understanding needs to be surrendered to God\'s infinite wisdom?',
        transformation: 'How can you trust God\'s wisdom when His ways don\'t make sense? Ask Him for humble acceptance of His knowledge.',
        closing: 'All-wise God, Your wisdom is beyond searching out. I trust Your perfect knowledge even when I don\'t understand. Amen.'
    },
    {
        text: 'The Lord is righteous in all his ways and faithful in all he does.',
        reference: 'Psalm 145:17 (NIV)',
        focus: 'God\'s Righteousness',
        acknowledge: 'What does God\'s perfect righteousness in all His ways reveal about His character? How does this truth affect your faith?',
        adore: 'Worship God for His complete righteousness. Praise Him for being faithful in absolutely everything He does.',
        surrender: 'What unrighteous thoughts or actions need to be brought before the righteous God? Surrender and seek His cleansing.',
        transformation: 'How can you pursue righteousness today, reflecting God\'s character? Ask Him to make you more like Him.',
        closing: 'Righteous Lord, You are faithful in all You do. Make me righteous as You are righteous. Amen.'
    },
    {
        text: 'The Lord is gracious and compassionate, slow to anger and rich in love. The Lord is good to all; he has compassion on all he has made.',
        reference: 'Psalm 145:8-9 (NIV)',
        focus: 'God\'s Grace',
        acknowledge: 'How does God\'s grace and compassion toward all creation reveal His heart? What does His richness in love mean to you?',
        adore: 'Thank God for His abundant grace and compassion. Worship Him for His patient, loving nature toward all He has made.',
        surrender: 'Who in your life needs to receive the same grace God has shown you? Surrender any harsh judgments.',
        transformation: 'How can you extend God\'s gracious compassion to everyone you meet today? Ask Him to fill you with His love.',
        closing: 'Gracious God, You are rich in love and compassion. Help me to show Your grace to everyone I encounter. Amen.'
    },
    {
        text: 'Great is the Lord and most worthy of praise; his greatness no one can fathom.',
        reference: 'Psalm 145:3 (NIV)',
        focus: 'God\'s Greatness',
        acknowledge: 'What does it mean that God\'s greatness is beyond our understanding? How does this inspire your worship?',
        adore: 'Praise the Lord for His unfathomable greatness. Worship Him for being worthy of all praise and honor.',
        surrender: 'What limitations are you placing on God? Surrender your small thinking and embrace His limitless greatness.',
        transformation: 'How can you live today in awe of God\'s incomprehensible greatness? Ask Him to expand your vision of who He is.',
        closing: 'Great and mighty God, Your greatness is beyond measuring. I worship You with all my heart. Amen.'
    },
    {
        text: 'But the Lord sits enthroned forever; he has established his throne for judgment. He rules the world in righteousness and judges the peoples with equity.',
        reference: 'Psalm 9:7-8 (NIV)',
        focus: 'God\'s Justice',
        acknowledge: 'How does God\'s eternal throne and righteous judgment give you confidence? What does His equity mean for the world?',
        adore: 'Worship the Lord who reigns in perfect justice. Praise Him for ruling with righteousness and equity.',
        surrender: 'What injustices are you holding onto instead of trusting God\'s perfect judgment? Surrender them to His throne.',
        transformation: 'How can you reflect God\'s justice and equity in your interactions today? Ask Him to make you more fair and just.',
        closing: 'Just and righteous God, You reign forever in perfect equity. I trust Your judgment and surrender my grievances to You. Amen.'
    },
    {
        text: 'The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold.',
        reference: 'Psalm 18:2 (NIV)',
        focus: 'God\'s Protection',
        acknowledge: 'What do these images of God as rock, fortress, and shield reveal about His protective nature? How does this comfort you?',
        adore: 'Praise God for being your rock and fortress. Worship Him as your deliverer and stronghold in every storm.',
        surrender: 'What fears or dangers do you need to bring into God\'s protective refuge? Surrender them to His care.',
        transformation: 'How can you live today trusting God as your shield and deliverer? Ask Him to increase your sense of security in Him.',
        closing: 'My Rock and Fortress, You are my deliverer and stronghold. I find my refuge in You alone. Amen.'
    },
    {
        text: 'The Lord is near to all who call on him, to all who call on him in truth. He fulfills the desires of those who fear him; he hears their cry and saves them.',
        reference: 'Psalm 145:18-19 (NIV)',
        focus: 'God\'s Nearness',
        acknowledge: 'How does knowing God is near to those who call on Him affect your prayer life? What does His attentiveness mean to you?',
        adore: 'Thank God for His nearness and attentiveness. Praise Him for hearing your cries and fulfilling righteous desires.',
        surrender: 'What do you need to call out to God about in truth today? Surrender your deepest desires to Him.',
        transformation: 'How can you live in awareness of God\'s nearness throughout your day? Ask Him to help you sense His presence.',
        closing: 'Ever-present God, You are near to all who call on You. Thank You for hearing my prayers and being close to me. Amen.'
    },
    {
        text: 'The Lord watches over all who love him, but all the wicked he will destroy.',
        reference: 'Psalm 145:20 (NIV)',
        focus: 'God\'s Watchfulness',
        acknowledge: 'What does it mean that God watches over those who love Him? How does His protective care encourage you?',
        adore: 'Praise God for His vigilant care over His people. Worship Him for His justice and protective love.',
        surrender: 'What areas of your life do you need to trust to God\'s watchful care? Surrender control and rest in His oversight.',
        transformation: 'How can you love God more fully today, knowing He watches over you? Ask Him to deepen your love for Him.',
        closing: 'Watchful God, You guard those who love You. Thank You for Your constant care over my life. Amen.'
    },
    {
        text: 'The Lord is my strength and my defense; he has become my salvation. He is my God, and I will praise him, my father\'s God, and I will exalt him.',
        reference: 'Exodus 15:2 (NIV)',
        focus: 'God\'s Strength',
        acknowledge: 'How has God been your strength and defense? What does it mean that He is your salvation?',
        adore: 'Praise the Lord for His mighty strength and sure defense. Worship Him as your complete salvation.',
        surrender: 'What weaknesses do you need to bring to God\'s strength? Surrender your inadequacy to His mighty power.',
        transformation: 'How can you rely on God\'s strength instead of your own today? Ask Him to be your defense in every situation.',
        closing: 'Lord, You are my strength and my salvation. I will praise and exalt You all my days. Amen.'
    },
    {
        text: 'The Lord is exalted over all the nations, his glory above the heavens. Who is like the Lord our God, the One who sits enthroned on high, who stoops down to look on the heavens and the earth?',
        reference: 'Psalm 113:4-6 (NIV)',
        focus: 'God\'s Exaltation',
        acknowledge: 'How does God\'s exaltation above all nations and heavens inspire your worship? What amazes you about His condescension?',
        adore: 'Worship the Lord who is exalted above all creation yet stoops to care for us. Praise Him for His transcendent glory.',
        surrender: 'What earthly powers or concerns are you elevating above God? Surrender them and recognize His supreme position.',
        transformation: 'How should God\'s exalted position change your perspective on earthly matters? Ask Him to lift your eyes higher.',
        closing: 'Exalted Lord, Your glory is above the heavens. Yet You stoop to care for me. I worship You in wonder. Amen.'
    },
    {
        text: 'God is not human, that he should lie, not a human being, that he should change his mind. Does he speak and then not act? Does he promise and not fulfill?',
        reference: 'Numbers 23:19 (NIV)',
        focus: 'God\'s Truthfulness',
        acknowledge: 'What does God\'s unchanging truthfulness mean for His promises to you? How does His reliability differ from human nature?',
        adore: 'Praise God for His absolute truthfulness and reliability. Worship Him for always fulfilling what He promises.',
        surrender: 'What promises of God are you doubting? Surrender your unbelief and trust His faithful character.',
        transformation: 'How can you live today in complete confidence of God\'s trustworthy nature? Ask Him to strengthen your faith.',
        closing: 'Faithful and true God, You never lie and always fulfill Your promises. I trust You completely. Amen.'
    },
    {
        text: 'Your love, Lord, reaches to the heavens, your faithfulness to the skies. Your righteousness is like the highest mountains, your justice like the great deep.',
        reference: 'Psalm 36:5-6 (NIV)',
        focus: 'God\'s Immeasurable Love',
        acknowledge: 'What do these vast images reveal about the extent of God\'s love and faithfulness? How immeasurable are His attributes?',
        adore: 'Worship God for His boundless love that reaches to the heavens. Praise Him for faithfulness as high as the skies.',
        surrender: 'What limited views of God\'s love do you need to surrender? Open your heart to His immeasurable affection.',
        transformation: 'How can you live today in the vastness of God\'s love? Ask Him to expand your understanding of His care.',
        closing: 'Immeasurable God, Your love reaches to the heavens and Your faithfulness to the skies. I stand amazed by You. Amen.'
    },
    {
        text: 'The Lord is a refuge for the oppressed, a stronghold in times of trouble. Those who know your name trust in you, for you, Lord, have never forsaken those who seek you.',
        reference: 'Psalm 9:9-10 (NIV)',
        focus: 'God\'s Refuge',
        acknowledge: 'How has God been a refuge and stronghold in your troubles? What does His promise to never forsake mean to you?',
        adore: 'Thank God for being a refuge for the oppressed. Praise Him for His faithfulness to all who seek Him.',
        surrender: 'What troubles do you need to bring into God\'s stronghold? Surrender your anxieties to His protective care.',
        transformation: 'How can you find refuge in God today rather than trying to save yourself? Ask Him to be your stronghold.',
        closing: 'God of refuge, You are my stronghold in trouble. I trust in Your name, for You never forsake those who seek You. Amen.'
    },
    {
        text: 'But you, O Lord, are a shield around me, my glory, the One who lifts my head high.',
        reference: 'Psalm 3:3 (NIV)',
        focus: 'God\'s Glory',
        acknowledge: 'What does it mean that God is your glory and the one who lifts your head? How does He shield you?',
        adore: 'Worship the Lord who is your shield and glory. Praise Him for lifting your head when you are downcast.',
        surrender: 'What shame or discouragement is bowing your head? Surrender it to the God who lifts you up.',
        transformation: 'How can you walk with your head held high today, knowing God is your glory? Ask Him to restore your confidence.',
        closing: 'Lord, You are my shield and glory, the One who lifts my head. I worship You for Your uplifting presence. Amen.'
    },
    {
        text: 'The Lord is slow to anger but great in power; the Lord will not leave the guilty unpunished. His way is in the whirlwind and the storm, and clouds are the dust of his feet.',
        reference: 'Nahum 1:3 (NIV)',
        focus: 'God\'s Awesome Power',
        acknowledge: 'How does this description of God\'s awesome power inspire reverence? What does His patience combined with power reveal?',
        adore: 'Stand in awe of God\'s great power displayed in creation. Worship Him who commands the whirlwind and storm.',
        surrender: 'What situations seem too powerful for you to handle? Surrender them to the God of infinite power.',
        transformation: 'How should recognizing God\'s awesome power change your perspective today? Ask Him to increase your reverence.',
        closing: 'Powerful God, You command the storm and are great in might. I worship You in awe and reverence. Amen.'
    },
    {
        text: 'For this is what the high and exalted One says—he who lives forever, whose name is holy: "I live in a high and holy place, but also with the one who is contrite and lowly in spirit, to revive the spirit of the lowly and to revive the heart of the contrite."',
        reference: 'Isaiah 57:15 (NIV)',
        focus: 'God\'s Holiness & Humility',
        acknowledge: 'How amazing is it that the high and holy God dwells with the humble? What does this reveal about His heart?',
        adore: 'Worship the exalted, eternal, holy God who lives in the high and holy place. Praise Him for dwelling with the lowly.',
        surrender: 'What pride needs to be surrendered to experience God\'s reviving presence? Humble yourself before Him.',
        transformation: 'How can you cultivate a contrite and lowly spirit to experience God\'s nearness? Ask Him to revive your heart.',
        closing: 'Holy and exalted God, You dwell in the high place yet revive the humble heart. Create in me a contrite spirit. Amen.'
    },
    {
        text: 'Before the mountains were born or you brought forth the whole world, from everlasting to everlasting you are God.',
        reference: 'Psalm 90:2 (NIV)',
        focus: 'God\'s Eternality',
        acknowledge: 'What does God\'s eternal nature—existing before creation and continuing forever—mean for your temporary troubles?',
        adore: 'Worship the eternal God who has no beginning or end. Praise Him for existing from everlasting to everlasting.',
        surrender: 'What temporal concerns are consuming you? Surrender them to the perspective of God\'s eternal nature.',
        transformation: 'How can you live today with an eternal perspective? Ask God to help you see beyond the temporary.',
        closing: 'Eternal God, You are from everlasting to everlasting. Help me to view my life in light of Your eternity. Amen.'
    },
    {
        text: 'The Lord is a warrior; the Lord is his name.',
        reference: 'Exodus 15:3 (NIV)',
        focus: 'God\'s Warrior Nature',
        acknowledge: 'What does it mean that God is a warrior who fights for His people? How does this change your view of spiritual battles?',
        adore: 'Praise the Lord who is a mighty warrior. Worship Him for His strength in battle and His protection of His people.',
        surrender: 'What spiritual battles are you trying to fight alone? Surrender them to the Lord who is a warrior on your behalf.',
        transformation: 'How can you trust God as your warrior today rather than fighting in your own strength? Ask Him to fight for you.',
        closing: 'Lord, You are my warrior and defender. I trust You to fight my battles and give me victory. Amen.'
    },
    {
        text: 'Who among the gods is like you, Lord? Who is like you—majestic in holiness, awesome in glory, working wonders?',
        reference: 'Exodus 15:11 (NIV)',
        focus: 'God\'s Uniqueness',
        acknowledge: 'What makes God utterly unique and incomparable? How does His majestic holiness and awesome glory set Him apart?',
        adore: 'Worship the Lord who is like no other. Praise Him for His majestic holiness, awesome glory, and wonder-working power.',
        surrender: 'What false gods or idols are you comparing to the true God? Surrender them and recognize His supremacy.',
        transformation: 'How can you honor God\'s unique and supreme position in your life today? Ask Him to be your only God.',
        closing: 'Majestic and holy Lord, there is no one like You. You alone are awesome in glory and worthy of all worship. Amen.'
    },
    {
        text: 'You alone are the Lord. You made the heavens, even the highest heavens, and all their starry host, the earth and all that is on it, the seas and all that is in them. You give life to everything, and the multitudes of heaven worship you.',
        reference: 'Nehemiah 9:6 (NIV)',
        focus: 'God\'s Creatorship',
        acknowledge: 'What does God\'s creation of everything reveal about His power and wisdom? How does this inspire your worship?',
        adore: 'Worship the Lord who created all things. Praise Him for giving life to everything and being worthy of heaven\'s worship.',
        surrender: 'What aspects of creation are you worshiping instead of the Creator? Surrender created things and worship Him alone.',
        transformation: 'How can you see God\'s glory in His creation today and give Him praise? Ask Him to open your eyes to His handiwork.',
        closing: 'Creator God, You made the heavens and earth and give life to all. I worship You with the multitudes of heaven. Amen.'
    },
    {
        text: 'You are awesome, O God, in your sanctuary; the God of Israel gives power and strength to his people. Praise be to God!',
        reference: 'Psalm 68:35 (NIV)',
        focus: 'God\'s Awesome Nature',
        acknowledge: 'In what ways is God awesome and inspiring? How does He give power and strength to His people?',
        adore: 'Praise God for His awesome nature displayed in His sanctuary. Worship Him for empowering His people with strength.',
        surrender: 'What weaknesses do you need God\'s power for today? Surrender your inadequacy and receive His strength.',
        transformation: 'How can you walk in the power and strength God gives today? Ask Him to fill you with His might.',
        closing: 'Awesome God, You give power and strength to Your people. I praise You and receive Your empowering presence. Amen.'
    },
    {
        text: 'For great is the Lord and most worthy of praise; he is to be feared above all gods. For all the gods of the nations are idols, but the Lord made the heavens.',
        reference: 'Psalm 96:4-5 (NIV)',
        focus: 'God\'s Worthiness',
        acknowledge: 'Why is God worthy of all praise? How does His creative power set Him apart from false gods?',
        adore: 'Worship the Lord who is most worthy of all praise. Honor Him for His greatness and creative power.',
        surrender: 'What idols—even good things that have become ultimate things—need to be surrendered? Give God His rightful place.',
        transformation: 'How can you give God the worship He deserves today? Ask Him to help you fear Him above all else.',
        closing: 'Great and worthy God, You alone made the heavens. I worship You above all and give You highest praise. Amen.'
    },
    {
        text: 'The heavens declare the glory of God; the skies proclaim the work of his hands. Day after day they pour forth speech; night after night they reveal knowledge.',
        reference: 'Psalm 19:1-2 (NIV)',
        focus: 'God\'s Glory in Creation',
        acknowledge: 'What does creation declare about God\'s glory? How do the heavens proclaim His handiwork and character?',
        adore: 'Praise God whose glory is displayed in the heavens. Worship Him for the beauty and wonder of His creative work.',
        surrender: 'When have you missed seeing God\'s glory in creation? Surrender your spiritual blindness and ask for eyes to see.',
        transformation: 'How can you notice and praise God\'s glory revealed in creation today? Ask Him to open your eyes to His work.',
        closing: 'Glorious Creator, the heavens declare Your glory and the skies proclaim Your work. I praise You for Your beautiful creation. Amen.'
    },
    {
        text: 'Splendor and majesty are before him; strength and glory are in his sanctuary.',
        reference: 'Psalm 96:6 (NIV)',
        focus: 'God\'s Splendor',
        acknowledge: 'What does God\'s splendor and majesty mean to you? How do strength and glory characterize His presence?',
        adore: 'Worship God for His magnificent splendor and majesty. Praise Him for the strength and glory that surround His presence.',
        surrender: 'What distractions prevent you from seeing God\'s splendor? Surrender them and focus on His majestic beauty.',
        transformation: 'How can you live today in awareness of God\'s splendor and majesty? Ask Him to reveal His glory to you.',
        closing: 'Splendid and majestic God, strength and glory surround You. I worship You in the beauty of Your holiness. Amen.'
    },
    {
        text: 'Ascribe to the Lord, all you families of nations, ascribe to the Lord glory and strength. Ascribe to the Lord the glory due his name; bring an offering and come into his courts.',
        reference: 'Psalm 96:7-8 (NIV)',
        focus: 'God\'s Due Glory',
        acknowledge: 'Why does God deserve glory from all nations? What does it mean to give Him the glory due His name?',
        adore: 'Give the Lord the glory and strength that belong to Him alone. Worship Him with the honor His name deserves.',
        surrender: 'What glory are you keeping for yourself instead of giving to God? Surrender your pride and honor Him.',
        transformation: 'How can you ascribe glory to God in all you do today? Ask Him to help you live for His fame, not your own.',
        closing: 'Glorious Lord, You deserve all glory and honor. I bring my life as an offering and worship You alone. Amen.'
    },
    {
        text: 'Worship the Lord in the splendor of his holiness; tremble before him, all the earth.',
        reference: 'Psalm 96:9 (NIV)',
        focus: 'God\'s Holy Splendor',
        acknowledge: 'What does worshiping in the splendor of God\'s holiness mean? Why should we tremble before Him?',
        adore: 'Worship the Lord in reverent awe of His holy splendor. Praise Him with both joy and holy fear.',
        surrender: 'What casual or flippant attitudes toward God need to be surrendered? Approach Him with proper reverence.',
        transformation: 'How can you cultivate both intimacy and reverence in your relationship with God? Ask Him for holy awe.',
        closing: 'Holy and splendid God, I worship You with reverent awe. You are majestic and worthy of all honor. Amen.'
    },
    {
        text: 'Let the heavens rejoice, let the earth be glad; let them say among the nations, "The Lord reigns."',
        reference: '1 Chronicles 16:31 (NIV)',
        focus: 'God\'s Reign',
        acknowledge: 'What does it mean that the Lord reigns over all creation? How should this truth affect your daily life?',
        adore: 'Rejoice that the Lord reigns! Praise Him for His sovereign rule over heaven and earth.',
        surrender: 'What areas of life are you not allowing God to reign over? Surrender control and submit to His kingship.',
        transformation: 'How can you live today under the joyful reality that the Lord reigns? Ask Him to establish His rule in your heart.',
        closing: 'Reigning Lord, You rule over heaven and earth. I rejoice in Your kingship and submit to Your sovereign authority. Amen.'
    },
    {
        text: 'The Lord is King for ever and ever; the nations will perish from his land.',
        reference: 'Psalm 10:16 (NIV)',
        focus: 'God\'s Eternal Kingship',
        acknowledge: 'What does God\'s eternal kingship mean when earthly kingdoms rise and fall? How does this give you security?',
        adore: 'Worship the Lord who is King forever and ever. Praise Him for His unending, unshakeable reign.',
        surrender: 'What temporary powers or circumstances are you trusting more than the eternal King? Surrender them to His rule.',
        transformation: 'How can you live today with confidence in God\'s eternal kingdom? Ask Him to anchor your hope in His everlasting reign.',
        closing: 'Eternal King, You reign forever and ever. I trust in Your everlasting kingdom and submit to Your rule. Amen.'
    },
    {
        text: 'The Lord has established his throne in heaven, and his kingdom rules over all.',
        reference: 'Psalm 103:19 (NIV)',
        focus: 'God\'s Universal Rule',
        acknowledge: 'What does it mean that God\'s kingdom rules over all? How does His heavenly throne give you confidence?',
        adore: 'Praise the Lord whose throne is established in heaven. Worship Him for His rule over absolutely everything.',
        surrender: 'What do you think is outside of God\'s rule? Surrender your limited perspective and trust His universal authority.',
        transformation: 'How can you submit to God\'s rule in every area today? Ask Him to help you recognize His sovereignty.',
        closing: 'Sovereign Lord, Your throne is established and Your kingdom rules over all. I submit every area of my life to You. Amen.'
    },
    {
        text: 'The Lord reigns, he is robed in majesty; the Lord is robed in majesty and armed with strength; indeed, the world is established, firm and secure.',
        reference: 'Psalm 93:1 (NIV)',
        focus: 'God\'s Majestic Strength',
        acknowledge: 'How is God robed in majesty and armed with strength? What does His secure establishment of the world mean for you?',
        adore: 'Worship the Lord who reigns in majestic strength. Praise Him for establishing the world firm and secure.',
        surrender: 'What insecurities are you holding onto? Surrender them to the God who makes all things firm and secure.',
        transformation: 'How can you rest in God\'s majestic strength today? Ask Him to be your security and stability.',
        closing: 'Majestic and strong Lord, You reign in power and establish all things securely. I find my stability in You. Amen.'
    },
    {
        text: 'Your throne was established long ago; you are from all eternity.',
        reference: 'Psalm 93:2 (NIV)',
        focus: 'God\'s Ancient Throne',
        acknowledge: 'What does God\'s eternal throne mean for His reliability? How does His existence from all eternity comfort you?',
        adore: 'Praise God whose throne was established from eternity past. Worship Him who has always been and always will be.',
        surrender: 'What temporary concerns are dominating your thoughts? Surrender them to the eternal God whose throne never changes.',
        transformation: 'How can you live with an eternal perspective today? Ask God to help you see beyond the temporary.',
        closing: 'Eternal God, Your throne was established long ago and endures forever. I trust in Your unchanging nature. Amen.'
    },
    {
        text: 'The Lord reigns forever, your God, O Zion, for all generations. Praise the Lord.',
        reference: 'Psalm 146:10 (NIV)',
        focus: 'God\'s Everlasting Reign',
        acknowledge: 'What does God\'s reign through all generations mean for your family and legacy? How does this inspire hope?',
        adore: 'Praise the Lord who reigns forever through all generations. Worship Him for His unchanging, everlasting rule.',
        surrender: 'What generational concerns or family worries need to be surrendered to God\'s eternal reign?',
        transformation: 'How can you pass on faith in God\'s everlasting reign to the next generation? Ask Him to use you for His kingdom.',
        closing: 'Everlasting God, You reign forever through all generations. I trust Your eternal purposes for my family and me. Amen.'
    },
    {
        text: 'The Lord, the Lord, the compassionate and gracious God, slow to anger, abounding in love and faithfulness, maintaining love to thousands, and forgiving wickedness, rebellion and sin.',
        reference: 'Exodus 34:6-7 (NIV)',
        focus: 'God\'s Full Character',
        acknowledge: 'What does this full description of God\'s character reveal? How do all these attributes work together in His nature?',
        adore: 'Worship the Lord for His complete character—compassionate, gracious, patient, loving, faithful, and forgiving. Praise Him for who He fully is.',
        surrender: 'Which aspect of God\'s character do you need most today? Surrender your need and receive from His fullness.',
        transformation: 'How can you reflect God\'s multifaceted character in your life? Ask Him to make you more like Him in every way.',
        closing: 'Lord, You are compassionate, gracious, patient, loving, faithful, and forgiving. I worship You for all You are. Amen.'
    },
    {
        text: 'But you are a forgiving God, gracious and compassionate, slow to anger and abounding in love.',
        reference: 'Nehemiah 9:17 (NIV)',
        focus: 'God\'s Forgiving Nature',
        acknowledge: 'How does God\'s forgiving nature combined with His grace and compassion affect how you approach Him?',
        adore: 'Thank God for His forgiving heart. Praise Him for being gracious, compassionate, patient, and abounding in love.',
        surrender: 'What sins or failures do you need to bring to God\'s forgiving heart? Surrender them and receive His grace.',
        transformation: 'How can you extend the same forgiveness to others that God extends to you? Ask Him to make you forgiving.',
        closing: 'Forgiving God, You are gracious and compassionate, abounding in love. Thank You for Your mercy toward me. Amen.'
    },
    {
        text: 'Yet you, Lord, are our Father. We are the clay, you are the potter; we are all the work of your hand.',
        reference: 'Isaiah 64:8 (NIV)',
        focus: 'God\'s Creative Sovereignty',
        acknowledge: 'What does it mean that God is the potter and you are the clay? How does this shape your understanding of His work in you?',
        adore: 'Worship God as the divine potter who shapes and forms you. Praise Him for His creative work in your life.',
        surrender: 'What resistance to God\'s shaping do you need to surrender? Yield to His hands as the master craftsman.',
        transformation: 'How can you submit to God\'s molding today? Ask Him to shape you according to His perfect design.',
        closing: 'Divine Potter, You are my maker and I am the work of Your hands. Shape me according to Your will. Amen.'
    },
    {
        text: 'Ah, Sovereign Lord, you have made the heavens and the earth by your great power and outstretched arm. Nothing is too hard for you.',
        reference: 'Jeremiah 32:17 (NIV)',
        focus: 'God\'s Limitless Power',
        acknowledge: 'If nothing is too hard for God, what does that mean for your impossible situations? How does His creative power encourage you?',
        adore: 'Praise the Sovereign Lord who made all things by His great power. Worship Him for whom nothing is impossible.',
        surrender: 'What "impossible" situations are you trying to solve on your own? Surrender them to the God for whom nothing is too hard.',
        transformation: 'How can you live today trusting that nothing is too hard for God? Ask Him to increase your faith in His power.',
        closing: 'Sovereign Lord, You made the heavens and earth. Nothing is too hard for You. I trust Your limitless power. Amen.'
    },
    {
        text: 'For the Lord Most High is awesome, the great King over all the earth.',
        reference: 'Psalm 47:2 (NIV)',
        focus: 'God\'s Awesome Kingship',
        acknowledge: 'How is God awesome as the great King? What does His rule over all the earth mean for your life?',
        adore: 'Worship the Lord Most High who is awesome in power. Praise Him as the great King over all the earth.',
        surrender: 'What earthly authorities or powers are you fearing? Surrender those fears to the great King who rules over all.',
        transformation: 'How can you honor God as your awesome King today in practical ways? Ask Him to reign fully in your heart.',
        closing: 'Lord Most High, You are the awesome King over all the earth. I bow before You and honor Your reign. Amen.'
    },
    {
        text: 'Clap your hands, all you nations; shout to God with cries of joy. For the Lord Most High is awesome, the great King over all the earth.',
        reference: 'Psalm 47:1-2 (NIV)',
        focus: 'God\'s Universal Worship',
        acknowledge: 'Why should all nations worship God? What makes Him worthy of joyful celebration from every people?',
        adore: 'Join all nations in praising the awesome Lord Most High. Shout to God with cries of joy for His great kingship.',
        surrender: 'What holds back your joyful celebration of God? Surrender your reservations and worship Him with abandon.',
        transformation: 'How can you worship God with greater joy and enthusiasm today? Ask Him to fill you with celebratory praise.',
        closing: 'Awesome Lord, You are the great King worthy of all nations\' praise. I worship You with shouts of joy. Amen.'
    },
    {
        text: 'For the Lord is the great God, the great King above all gods. In his hand are the depths of the earth, and the mountain peaks belong to him. The sea is his, for he made it, and his hands formed the dry land.',
        reference: 'Psalm 95:3-5 (NIV)',
        focus: 'God\'s Ownership',
        acknowledge: 'What does it mean that everything belongs to God? How does His ownership of all creation affect your stewardship?',
        adore: 'Worship the great God and King above all gods. Praise Him for creating and owning everything in existence.',
        surrender: 'What are you holding onto as "yours" instead of recognizing it belongs to God? Surrender your possessions to His ownership.',
        transformation: 'How can you live as a faithful steward of what belongs to God today? Ask Him for a heart of generous surrender.',
        closing: 'Great God and King, everything belongs to You—the earth, mountains, seas, and all within them. I surrender all to You. Amen.'
    },
    {
        text: 'Come, let us bow down in worship, let us kneel before the Lord our Maker; for he is our God and we are the people of his pasture, the flock under his care.',
        reference: 'Psalm 95:6-7 (NIV)',
        focus: 'God\'s Caring Lordship',
        acknowledge: 'How does God care for you as His flock? What does it mean to be under the care of the Lord your Maker?',
        adore: 'Bow down and worship the Lord your Maker. Praise Him for His tender care over you as His sheep.',
        surrender: 'What anxieties about provision or protection need to be surrendered to your caring Shepherd?',
        transformation: 'How can you rest in God\'s care today like a sheep under a shepherd\'s watch? Ask Him to increase your trust.',
        closing: 'Lord and Maker, I am one of Your flock under Your care. I bow before You and trust Your shepherding. Amen.'
    },
    {
        text: 'For the Lord your God is God of gods and Lord of lords, the great God, mighty and awesome.',
        reference: 'Deuteronomy 10:17 (NIV)',
        focus: 'God\'s Supremacy',
        acknowledge: 'What does it mean that God is supreme over all other powers? How does His mighty and awesome nature inspire worship?',
        adore: 'Praise the Lord who is above all gods and all lords. Worship Him for His supreme authority and awesome might.',
        surrender: 'What powers or authorities are you fearing more than God? Surrender those fears to His supreme authority.',
        transformation: 'How can you live today recognizing God\'s supremacy over every other power? Ask Him to establish His lordship in your heart.',
        closing: 'Supreme Lord, You are God of gods and Lord of lords. I submit to Your authority and worship Your awesome might. Amen.'
    },
    {
        text: 'I am the Alpha and the Omega, says the Lord God, who is, and who was, and who is to come, the Almighty.',
        reference: 'Revelation 1:8 (NIV)',
        focus: 'God\'s Completeness',
        acknowledge: 'What does it mean that God is the Alpha and Omega—the beginning and the end? How does His almighty nature comfort you?',
        adore: 'Worship the Lord who is the beginning and the end. Praise Him for His complete and almighty nature.',
        surrender: 'What unfinished areas of life do you need to surrender to the One who completes all things?',
        transformation: 'How can you trust God with both beginnings and endings today? Ask Him to be your Alpha and Omega.',
        closing: 'Almighty God, You are the Alpha and Omega. I trust You with all beginnings and endings in my life. Amen.'
    },
    {
        text: 'One God and Father of all, who is over all and through all and in all.',
        reference: 'Ephesians 4:6 (NIV)',
        focus: 'God\'s Omnipresence',
        acknowledge: 'What does it mean that God is over all, through all, and in all? How does His presence everywhere affect your daily life?',
        adore: 'Praise the Father who is over all, through all, and in all. Worship Him for His presence that fills everything.',
        surrender: 'Where are you acting as if God is absent? Surrender those places to His omnipresent reality.',
        transformation: 'How can you live today aware that God is in all things? Ask Him to help you recognize His presence everywhere.',
        closing: 'Father over all, You are through all and in all. I worship You for Your presence that fills everything. Amen.'
    },
    {
        text: 'Where can I go from your Spirit? Where can I flee from your presence? If I go up to the heavens, you are there; if I make my bed in the depths, you are there.',
        reference: 'Psalm 139:7-8 (NIV)',
        focus: 'God\'s Inescapable Presence',
        acknowledge: 'What does God\'s inescapable presence mean for your sense of security? How does knowing He is everywhere comfort you?',
        adore: 'Praise God whose presence fills every place. Worship Him for being inescapable in His loving attention.',
        surrender: 'What places in your life are you trying to hide from God? Surrender them to His omnipresent love.',
        transformation: 'How can you live today in the confidence that God is always with you? Ask Him to increase your awareness of His presence.',
        closing: 'Ever-present God, I cannot go where You are not. I rest in Your inescapable, loving presence. Amen.'
    },
    {
        text: 'His dominion is an eternal dominion; his kingdom endures from generation to generation.',
        reference: 'Daniel 4:34 (NIV)',
        focus: 'God\'s Enduring Kingdom',
        acknowledge: 'What does God\'s eternal dominion mean for your temporary circumstances? How does His enduring kingdom give you hope?',
        adore: 'Worship the King whose dominion lasts forever. Praise Him for a kingdom that endures through all generations.',
        surrender: 'What earthly kingdoms or systems are you trusting more than God\'s eternal kingdom? Surrender them to His rule.',
        transformation: 'How can you live today as a citizen of God\'s eternal kingdom? Ask Him to establish His dominion in your heart.',
        closing: 'Eternal King, Your dominion lasts forever and Your kingdom endures through all generations. I submit to Your rule. Amen.'
    },
    {
        text: 'Now to the King eternal, immortal, invisible, the only God, be honor and glory for ever and ever. Amen.',
        reference: '1 Timothy 1:17 (NIV)',
        focus: 'God\'s Eternal Glory',
        acknowledge: 'What do God\'s attributes—eternal, immortal, invisible—reveal about His nature? How should this inspire your worship?',
        adore: 'Give honor and glory to the King eternal, immortal, and invisible. Worship the only God who deserves all praise forever.',
        surrender: 'What temporal, mortal, visible things are you glorifying instead of God? Surrender them and give Him all honor.',
        transformation: 'How can you give God honor and glory in all you do today? Ask Him to make His invisible presence real to you.',
        closing: 'King eternal, immortal, invisible, You alone are God. I give You honor and glory forever and ever. Amen.'
    },
    {
        text: 'Dominion and awe belong to God; he establishes order in the heights of heaven.',
        reference: 'Job 25:2 (NIV)',
        focus: 'God\'s Awesome Dominion',
        acknowledge: 'What does it mean that dominion and awe belong to God? How does His ordering of heaven inspire reverence?',
        adore: 'Worship God whose dominion and awe are beyond measure. Praise Him for establishing order in all creation.',
        surrender: 'What disorder in your life needs to be surrendered to the God who establishes perfect order?',
        transformation: 'How can you submit to God\'s ordering of your life today? Ask Him to bring His divine order to your circumstances.',
        closing: 'God of awesome dominion, You establish order in the heights of heaven. Bring Your order to my life. Amen.'
    },
    {
        text: 'How awesome is the Lord Most High, the great King over all the earth! He subdued nations under us, peoples under our feet.',
        reference: 'Psalm 47:2-3 (NIV)',
        focus: 'God\'s Victorious Kingship',
        acknowledge: 'How is God awesome as the victorious King? What does His power to subdue nations mean for your battles?',
        adore: 'Worship the Lord Most High, the awesome and victorious King. Praise Him for His power over all nations.',
        surrender: 'What battles or enemies are you trying to fight without God? Surrender them to the victorious King.',
        transformation: 'How can you trust God to give you victory today? Ask Him to subdue whatever opposes His purposes in your life.',
        closing: 'Lord Most High, You are the awesome and victorious King. I trust You to give me victory over all that opposes You. Amen.'
    },
    {
        text: 'God is clothed with splendor and majesty.',
        reference: 'Psalm 104:1 (NIV)',
        focus: 'God\'s Splendorous Majesty',
        acknowledge: 'What does it mean that God is clothed with splendor and majesty? How does His magnificent appearance inspire worship?',
        adore: 'Worship God who is robed in splendor and majesty. Praise Him for His magnificent, glorious appearance.',
        surrender: 'What ordinary or mundane views of God need to be surrendered? Embrace His splendorous majesty.',
        transformation: 'How can you see God in His splendor today? Ask Him to reveal His majestic glory to you.',
        closing: 'Splendorous and majestic God, You are clothed with glory. I worship You in all Your magnificent beauty. Amen.'
    },
    {
        text: 'The Lord wraps himself in light as with a garment; he stretches out the heavens like a tent.',
        reference: 'Psalm 104:2 (NIV)',
        focus: 'God\'s Radiant Glory',
        acknowledge: 'What does the image of God wrapped in light reveal about His glory? How does His cosmic power inspire awe?',
        adore: 'Praise God who wraps Himself in light as with a garment. Worship Him who stretches out the heavens with ease.',
        surrender: 'What darkness in your life needs the light of God\'s presence? Surrender it to His radiant glory.',
        transformation: 'How can you reflect God\'s light today? Ask Him to fill you with His radiant presence.',
        closing: 'Radiant God, You wrap Yourself in light and stretch out the heavens. Fill me with Your glorious light. Amen.'
    },
    {
        text: 'O Lord, our Lord, how majestic is your name in all the earth! You have set your glory in the heavens.',
        reference: 'Psalm 8:1 (NIV)',
        focus: 'God\'s Majestic Name',
        acknowledge: 'What makes God\'s name majestic throughout the earth? How does His glory set in the heavens declare His greatness?',
        adore: 'Worship the Lord whose name is majestic in all the earth. Praise Him for setting His glory in the heavens.',
        surrender: 'What names or reputations are you elevating above God\'s majestic name? Surrender them and honor Him alone.',
        transformation: 'How can you honor God\'s majestic name in all you do today? Ask Him to make His name great through your life.',
        closing: 'Lord, Your name is majestic in all the earth. I honor Your name and seek to glorify it in all I do. Amen.'
    },
    {
        text: 'Yours, Lord, is the greatness and the power and the glory and the majesty and the splendor, for everything in heaven and earth is yours. Yours, Lord, is the kingdom; you are exalted as head over all.',
        reference: '1 Chronicles 29:11 (NIV)',
        focus: 'God\'s Total Supremacy',
        acknowledge: 'What does this comprehensive declaration of God\'s attributes reveal? How does everything belonging to Him affect your stewardship?',
        adore: 'Ascribe to the Lord all greatness, power, glory, majesty, and splendor. Worship Him as the exalted head over all.',
        surrender: 'What are you claiming as your own instead of recognizing it all belongs to God? Surrender everything to His ownership.',
        transformation: 'How can you live today recognizing that all things belong to God? Ask Him to help you steward His possessions well.',
        closing: 'Lord, all greatness, power, glory, majesty, and splendor are Yours. Everything belongs to You. I worship You as head over all. Amen.'
    }
];

// Content arrays for Apostolic Prayers
const apostolicPrayers = [
    {
        prayer: "I keep asking that the God of our Lord Jesus Christ, the glorious Father, may give you the Spirit of wisdom and revelation, so that you may know him better. I pray that the eyes of your heart may be enlightened in order that you may know the hope to which he has called you, the riches of his glorious inheritance in his holy people, and his incomparably great power for us who believe.",
        reference: "Ephesians 1:17-19 (NIV)",
        author: "Paul",
        focus: "Spiritual Wisdom",
        respond: "Now pray this prayer to God for yourself, using your own words. Ask Him for the same spiritual blessings the apostle desired for the early Christians.",
        reach: "Think of someone in your life who needs God's blessing. Pray this apostolic prayer for them, asking God to work in their heart as the apostle prayed for his spiritual children.",
        closing: "Lord, thank You for the apostles who prayed so faithfully for Your people. Unite my heart with theirs in seeking Your kingdom and Your glory. Amen."
    },
    {
        prayer: "For this reason I kneel before the Father, from whom every family in heaven and on earth derives its name. I pray that out of his glorious riches he may strengthen you with power through his Spirit in your inner being, so that Christ may dwell in your hearts through faith. And I pray that you, being rooted and established in love, may have power, together with all the Lord's holy people, to grasp how wide and long and high and deep is the love of Christ, and to know this love that surpasses knowledge—that you may be filled to the measure of all the fullness of God.",
        reference: "Ephesians 3:14-19 (NIV)",
        author: "Paul",
        focus: "God's Love",
        respond: "Pray for God to strengthen you with His power and to help you comprehend the vastness of Christ's love. Ask to be filled with His fullness.",
        reach: "Pray this beautiful prayer for someone who needs to experience God's love more deeply. Ask God to reveal His love to them in powerful ways.",
        closing: "Father, thank You for Your boundless love that surpasses knowledge. Fill me with Your fullness and help me to be rooted in love. Amen."
    },
    {
        prayer: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        reference: "Romans 15:13 (NIV)",
        author: "Paul",
        focus: "Hope and Joy",
        respond: "Ask God to fill you with joy and peace today. Pray for His Spirit to give you overflowing hope in every circumstance.",
        reach: "Think of someone who needs hope and joy. Pray this blessing over them, asking God to lift their spirits and renew their hope.",
        closing: "God of hope, fill me with Your joy and peace. Let Your Spirit overflow in me with hope that cannot be shaken. Amen."
    },
    {
        prayer: "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
        reference: "2 Thessalonians 3:16 (NIV)",
        author: "Paul",
        focus: "Divine Peace",
        respond: "Ask the Lord of peace to grant you His peace in all circumstances. Invite His presence to be with you throughout your day.",
        reach: "Pray this blessing of peace over someone who is anxious or troubled. Ask God to calm their heart and mind with His presence.",
        closing: "Lord of peace, grant me Your peace that passes understanding. Be with me in every moment of this day. Amen."
    },
    {
        prayer: "May the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all.",
        reference: "2 Corinthians 13:14 (NIV)",
        author: "Paul",
        focus: "Trinity's Blessing",
        respond: "Pray for a deeper experience of Christ's grace, the Father's love, and the Holy Spirit's fellowship in your life.",
        reach: "Speak this apostolic blessing over your family and friends, asking for the full blessing of the Trinity to rest upon them.",
        closing: "Triune God, let Your grace, love, and fellowship fill my heart and overflow to all those around me. Amen."
    },
    {
        prayer: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us, to him be glory in the church and in Christ Jesus throughout all generations, for ever and ever! Amen.",
        reference: "Ephesians 3:20-21 (NIV)",
        author: "Paul",
        focus: "God's Unlimited Power",
        respond: "Worship God for His unlimited power to work beyond your imagination. Surrender your limitations and trust in His ability.",
        reach: "Pray for someone facing impossible circumstances, asking God to work beyond what they can ask or imagine in their situation.",
        closing: "Lord, You are able to do more than I can ask or imagine. I give You glory and trust in Your mighty power working within me. Amen."
    },
    {
        prayer: "And this is my prayer: that your love may abound more and more in knowledge and depth of insight, so that you may be able to discern what is best and may be pure and blameless for the day of Christ, filled with the fruit of righteousness that comes through Jesus Christ—to the glory and praise of God.",
        reference: "Philippians 1:9-11 (NIV)",
        author: "Paul",
        focus: "Abounding Love",
        respond: "Ask God to help your love grow in wisdom and discernment. Pray for purity of heart and spiritual fruit in your life.",
        reach: "Pray this over a fellow believer, asking God to develop their love and spiritual maturity for His glory.",
        closing: "Father, let my love abound in wisdom and discernment. Fill me with righteousness that brings You glory. Amen."
    },
    {
        prayer: "Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.",
        reference: "3 John 1:2 (NIV)",
        author: "John",
        focus: "Holistic Blessing",
        respond: "Pray for God's blessing on your physical health, your circumstances, and especially the health of your soul.",
        reach: "Pray this holistic blessing over someone you care about, asking God to bless them in body, soul, and circumstances.",
        closing: "Lord, bless my health, my circumstances, and especially the health of my soul. Let me prosper in all that honors You. Amen."
    },
    {
        prayer: "To him who loves us and has freed us from our sins by his blood, and has made us to be a kingdom and priests to serve his God and Father—to him be glory and power for ever and ever! Amen.",
        reference: "Revelation 1:5-6 (NIV)",
        author: "John",
        focus: "Christ's Love",
        respond: "Thank Jesus for His love and the freedom He purchased with His blood. Embrace your identity as part of His royal priesthood.",
        reach: "Pray for someone to understand Christ's deep love for them and their royal identity as His child.",
        closing: "Jesus, thank You for loving me and freeing me by Your blood. Help me live as Your royal priest to the glory of the Father. Amen."
    },
    {
        prayer: "Grace and peace be yours in abundance through the knowledge of God and of Jesus our Lord.",
        reference: "2 Peter 1:2 (NIV)",
        author: "Peter",
        focus: "Growing Knowledge",
        respond: "Ask God to increase your knowledge of Him and Jesus, and for this knowledge to bring abundance of grace and peace.",
        reach: "Pray for someone to grow deeper in their knowledge of God and experience His grace and peace abundantly.",
        closing: "Lord, increase my knowledge of You and Jesus. Let this knowledge bring abundant grace and peace to my life. Amen."
    }
];

// Prayer Set content for each movement of the Lord's Prayer
const prayerSetContent = {
    movement1: [
        {
            scripture: "Therefore, brothers and sisters, since we have confidence to enter the Most Holy Place by the blood of Jesus... let us draw near to God with a sincere heart and with the full assurance that faith brings.",
            reference: "Hebrews 10:19,22 (NIV)",
            prompt: "Come into God's presence as a beloved child. He is your Father - both intimately close and infinitely glorious. Worship Him for who He is. Surrender your heart, your day, and your will to Him."
        },
        {
            scripture: "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
            reference: "1 John 3:1 (NIV)",
            prompt: "Marvel at the Father's lavish love for you. You are His child - fully loved, fully accepted, fully known. Worship Him as your perfect Father and surrender yourself to His care."
        },
        {
            scripture: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God.",
            reference: "John 1:12 (NIV)",
            prompt: "Rejoice that you have the right to be called God's child through Christ. Approach your heavenly Father with confidence, worship, and complete surrender of all you are."
        },
        {
            scripture: "How great is the love the Father has lavished on us, that we should be called children of God!",
            reference: "1 John 3:1 (NIV)",
            prompt: "Rest in your identity as God's beloved child. Worship the Father who chose you, loves you, and calls you His own. Surrender every part of your life to His loving care."
        },
        {
            scripture: "The Spirit you received does not make you slaves, so that you live in fear again; rather, the Spirit you received brought about your adoption to sonship. And by him we cry, 'Abba, Father.'",
            reference: "Romans 8:15 (NIV)",
            prompt: "You are not a slave but a beloved child. Cry out 'Abba, Father' to the One who adopted you. Worship Him with intimate affection and surrender yourself completely to His fatherly love."
        }
    ],
    movement2: [
        {
            scripture: "Ascribe to the Lord the glory due his name; worship the Lord in the splendor of his holiness.",
            reference: "Psalm 29:2 (NIV)",
            prompt: "Honor God's holy name. Thank Him for who He has revealed Himself to be. Pray that the world would know Him as He truly is - in all His beauty, holiness, and love."
        },
        {
            scripture: "Exalt the Lord our God and worship at his footstool; he is holy.",
            reference: "Psalm 99:5 (NIV)",
            prompt: "Exalt God's name above every other name. Worship His holiness and perfect character. Intercede for the nations to recognize and revere His holy name."
        },
        {
            scripture: "Holy, holy, holy is the Lord Almighty; the whole earth is full of his glory.",
            reference: "Isaiah 6:3 (NIV)",
            prompt: "Join with the angels in declaring God's holiness. Worship Him for His glory that fills the earth. Pray for eyes to be opened worldwide to see His glory and honor His name."
        },
        {
            scripture: "O Lord, our Lord, how majestic is your name in all the earth!",
            reference: "Psalm 8:9 (NIV)",
            prompt: "Declare the majesty of God's name. Give thanks for all He has shown you of Himself. Pray that His majestic name would be honored in every corner of creation."
        },
        {
            scripture: "Therefore God exalted him to the highest place and gave him the name that is above every name, that at the name of Jesus every knee should bow.",
            reference: "Philippians 2:9-10 (NIV)",
            prompt: "Worship Jesus, whose name is above every name. Give thanks for His character revealed through Scripture. Pray for the day when every knee will bow and honor His glorious name."
        }
    ],
    movement3: [
        {
            scripture: "Seek first his kingdom and his righteousness, and all these things will be given to you as well.",
            reference: "Matthew 6:33 (NIV)",
            prompt: "Submit to God's reign in your life. Pray for His kingdom to come in your family, your church, the persecuted church worldwide, and for revival and renewal in the nations."
        },
        {
            scripture: "Your kingdom is an everlasting kingdom, and your dominion endures through all generations.",
            reference: "Psalm 145:13 (NIV)",
            prompt: "Surrender to God's eternal kingdom and authority. Intercede for His rule to be established in hearts, homes, and nations. Pray especially for the persecuted church and spiritual awakening."
        },
        {
            scripture: "The kingdom of God is not a matter of talk but of power.",
            reference: "1 Corinthians 4:20 (NIV)",
            prompt: "Pray for God's powerful kingdom to break through in demonstration, not just words. Intercede for your family, church leaders, persecuted believers, and revival in your nation."
        },
        {
            scripture: "For the kingdom of God is... righteousness, peace and joy in the Holy Spirit.",
            reference: "Romans 14:17 (NIV)",
            prompt: "Submit to God's kingdom of righteousness, peace, and joy. Pray for these kingdom realities to manifest in your sphere of influence and throughout the church worldwide."
        },
        {
            scripture: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses... to the ends of the earth.",
            reference: "Acts 1:8 (NIV)",
            prompt: "Yield to God's mission for His kingdom to advance to the ends of the earth. Intercede for missionaries, church planters, the persecuted church, and global revival."
        }
    ],
    movement4: [
        {
            scripture: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
            reference: "Philippians 4:19 (NIV)",
            prompt: "Ask for God's provision - His presence above all, His mercy for today, physical provision, and help in every area of need. Acknowledge your complete dependence on Him."
        },
        {
            scripture: "The Lord is my shepherd, I lack nothing.",
            reference: "Psalm 23:1 (NIV)",
            prompt: "Trust the Lord as your shepherd who provides everything you need. Pray for His presence to be your greatest treasure, and ask for His provision in all practical needs."
        },
        {
            scripture: "Give us today our daily bread.",
            reference: "Matthew 6:11 (NIV)",
            prompt: "Ask simply and humbly for today's needs - spiritual and physical. Pray for the bread of His presence, His mercy, wisdom, strength, and material provision."
        },
        {
            scripture: "Man shall not live on bread alone, but on every word that comes from the mouth of God.",
            reference: "Matthew 4:4 (NIV)",
            prompt: "Seek first the bread of God's Word and presence. Then bring your physical needs - health, finances, relationships, work. Trust Him as your complete provider."
        },
        {
            scripture: "I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.",
            reference: "John 6:35 (NIV)",
            prompt: "Come to Jesus, the bread of life. Ask Him to satisfy your deepest hunger and thirst. Then present your daily needs, trusting His faithful provision."
        }
    ],
    movement5: [
        {
            scripture: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
            reference: "Colossians 3:13 (NIV)",
            prompt: "Receive God's forgiveness for your sins. Then release everyone and everything to Him - forgiving those who have hurt you, letting go of offenses, surrendering control."
        },
        {
            scripture: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
            reference: "1 John 1:9 (NIV)",
            prompt: "Confess your sins specifically and receive His complete forgiveness. Now extend that same grace - release everyone who has wronged you into God's hands."
        },
        {
            scripture: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you.",
            reference: "Matthew 6:14 (NIV)",
            prompt: "Receive the Father's merciful forgiveness. As you have been forgiven, forgive others freely. Release bitterness, resentment, and the need for revenge."
        },
        {
            scripture: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
            reference: "Ephesians 4:32 (NIV)",
            prompt: "Remember how Christ forgave you - completely, sacrificially, lovingly. Receive His forgiveness afresh, then extend that same forgiveness to everyone who has hurt you."
        },
        {
            scripture: "Get rid of all bitterness, rage and anger, brawling and slander, along with every form of malice.",
            reference: "Ephesians 4:31 (NIV)",
            prompt: "Ask God to search your heart for unforgiveness, bitterness, or anger. Confess and receive cleansing. Then release everyone to God's care with true forgiveness."
        }
    ],
    movement6: [
        {
            scripture: "Submit yourselves, then, to God. Resist the devil, and he will flee from you.",
            reference: "James 4:7 (NIV)",
            prompt: "Like Jesus in Gethsemane, submit to God's will even in difficulty. Stand against spiritual forces of evil. Ask for protection from temptation and deliverance from the evil one."
        },
        {
            scripture: "Put on the full armor of God, so that you can take your stand against the devil's schemes.",
            reference: "Ephesians 6:11 (NIV)",
            prompt: "Clothe yourself in God's armor. Submit to His will like Jesus prayed 'not my will, but yours.' Stand firm against spiritual opposition and ask for deliverance from evil."
        },
        {
            scripture: "The Lord is faithful, and he will strengthen you and protect you from the evil one.",
            reference: "2 Thessalonians 3:3 (NIV)",
            prompt: "Trust God's faithfulness to strengthen and protect you. Surrender to His will in your trials. Pray for victory over temptation and spiritual warfare."
        },
        {
            scripture: "Watch and pray so that you will not fall into temptation. The spirit is willing, but the flesh is weak.",
            reference: "Matthew 26:41 (NIV)",
            prompt: "Echo Jesus' words in Gethsemane - remain alert in prayer. Submit to God's will even when it's hard. Ask for strength to resist temptation and overcome evil."
        },
        {
            scripture: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
            reference: "1 Corinthians 10:13 (NIV)",
            prompt: "Trust God's faithfulness in your trials. Submit to His purposes. Stand against the enemy's schemes and ask for divine protection and deliverance."
        }
    ],
    movement7: [
        {
            scripture: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'",
            reference: "Isaiah 30:21 (NIV)",
            prompt: "Be still and listen for God's gentle voice..."
        },
        {
            scripture: "My sheep listen to my voice; I know them, and they follow me.",
            reference: "John 10:27 (NIV)",
            prompt: "Quiet your heart to hear the Shepherd's voice..."
        },
        {
            scripture: "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
            reference: "Jeremiah 33:3 (NIV)",
            prompt: "Call out to God and wait expectantly for His answer..."
        },
        {
            scripture: "Be still, and know that I am God.",
            reference: "Psalm 46:10 (NIV)",
            prompt: "Rest in stillness and listen for what God wants to reveal..."
        },
        {
            scripture: "The Lord came and stood there, calling as at the other times, 'Samuel! Samuel!' Then Samuel said, 'Speak, for your servant is listening.'",
            reference: "1 Samuel 3:10 (NIV)",
            prompt: "Say to the Lord, 'Speak, for your servant is listening...'"
        }
    ]
};