// Prayer content for daily rotation
const examenPrompts = {
    verses: [
        '"And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him" - Colossians 3:17',
        '"Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus" - 1 Thessalonians 5:18',
        '"Every good and perfect gift is from above, coming down from the Father of the heavenly lights" - James 1:17',
        '"The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing" - Zephaniah 3:17',
        '"In everything give thanks; for this is the will of God in Christ Jesus for you" - 1 Thessalonians 5:18',
        '"Be joyful always; pray continually; give thanks in all circumstances" - 1 Thessalonians 5:16-18',
        '"Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful" - Colossians 3:15'
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
    grace: [
        'Where did you sense God\'s presence or guidance today? In what moments did you feel His love, peace, or strength? How did He provide or protect?',
        'How did God show up in your conversations, decisions, and challenges today? Where did you experience His wisdom or comfort?',
        'What moments today felt touched by grace? Where did you sense God\'s hand guiding, protecting, or providing?',
        'How did God speak to you today through circumstances, people, or His Word? What invitations did He extend to you?',
        'What "coincidences" or perfect timing did you experience today? How might these have been God\'s gentle guidance?',
        'In what moments did you feel peace beyond understanding? Where did God\'s presence feel especially real?',
        'How did God use difficult moments today to grow your character or deepen your trust in Him?'
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
        'What do you anticipate in tomorrow? Ask for God\'s grace, wisdom, and presence for the day ahead. Surrender your plans to Him.',
        'What challenges or opportunities await you tomorrow? Ask God to prepare your heart and grant you His wisdom and strength.',
        'How can you live tomorrow in greater awareness of God\'s presence? Ask for His grace to walk in love and trust.',
        'What hopes or concerns do you carry for tomorrow? Place them in God\'s hands and ask for His peace and guidance.',
        'Who will you encounter tomorrow that needs God\'s love through you? Ask for opportunities to be His hands and feet.',
        'What specific ways can you serve others tomorrow? Ask God to open your eyes to needs around you.',
        'How can you prioritize time with God tomorrow? Ask Him to help you start the day connected to His heart.'
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
        text: 'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls.',
        reference: 'Matthew 11:28-29',
        focus: 'Rest'
    },
    {
        text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
        reference: 'Zephaniah 3:17',
        focus: 'Delight'
    },
    {
        text: 'Cast all your anxiety on him because he cares for you.',
        reference: '1 Peter 5:7',
        focus: 'Care'
    },
    {
        text: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
        reference: 'Psalm 46:10',
        focus: 'Stillness'
    },
    {
        text: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.',
        reference: 'Psalm 23:1-3',
        focus: 'Shepherd'
    },
    {
        text: 'For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future.',
        reference: 'Jeremiah 29:11',
        focus: 'Hope'
    },
    {
        text: 'The Lord will fight for you; you need only to be still.',
        reference: 'Exodus 14:14',
        focus: 'Peace'
    },
    {
        text: 'In all your ways acknowledge him, and he will make your paths straight.',
        reference: 'Proverbs 3:6',
        focus: 'Guidance'
    },
    {
        text: 'He heals the brokenhearted and binds up their wounds.',
        reference: 'Psalm 147:3',
        focus: 'Healing'
    },
    {
        text: 'The joy of the Lord is your strength.',
        reference: 'Nehemiah 8:10',
        focus: 'Joy'
    },
    {
        text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
        reference: 'Romans 8:28',
        focus: 'Purpose'
    },
    {
        text: 'I can do all this through him who gives me strength.',
        reference: 'Philippians 4:13',
        focus: 'Strength'
    },
    {
        text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.',
        reference: 'Psalm 34:18',
        focus: 'Comfort'
    },
    {
        text: 'Trust in the Lord with all your heart and lean not on your own understanding.',
        reference: 'Proverbs 3:5',
        focus: 'Trust'
    },
    {
        text: 'God is our refuge and strength, an ever-present help in trouble.',
        reference: 'Psalm 46:1',
        focus: 'Refuge'
    },
    {
        text: 'The Lord your God will be with you wherever you go.',
        reference: 'Joshua 1:9',
        focus: 'Presence'
    },
    {
        text: 'Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.',
        reference: 'Matthew 6:34',
        focus: 'Today'
    },
    {
        text: 'His mercies are new every morning; great is your faithfulness.',
        reference: 'Lamentations 3:23',
        focus: 'Mercy'
    },
    {
        text: 'I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.',
        reference: 'John 16:33',
        focus: 'Victory'
    },
    {
        text: 'The Lord gives strength to his people; the Lord blesses his people with peace.',
        reference: 'Psalm 29:11',
        focus: 'Blessing'
    },
    {
        text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me.',
        reference: 'Psalm 23:4',
        focus: 'Courage'
    },
    {
        text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.',
        reference: 'Isaiah 40:31',
        focus: 'Renewal'
    },
    {
        text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
        reference: '1 Corinthians 13:4',
        focus: 'Love'
    },
    {
        text: 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?',
        reference: 'Psalm 27:1',
        focus: 'Light'
    },
    {
        text: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.',
        reference: 'Philippians 4:19',
        focus: 'Provision'
    },
    {
        text: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.',
        reference: '1 John 1:9',
        focus: 'Forgiveness'
    },
    {
        text: 'The Lord is gracious and righteous; our God is full of compassion.',
        reference: 'Psalm 116:5',
        focus: 'Grace'
    },
    {
        text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
        reference: 'Matthew 6:33',
        focus: 'Priorities'
    },
    {
        text: 'The Lord is good, a refuge in times of trouble. He cares for those who trust in him.',
        reference: 'Nahum 1:7',
        focus: 'Goodness'
    },
    {
        text: 'He says, Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
        reference: 'Psalm 46:10',
        focus: 'Knowing'
    },
    {
        text: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.',
        reference: 'Romans 15:13',
        focus: 'Overflow'
    },
    {
        text: 'For where your treasure is, there your heart will be also.',
        reference: 'Matthew 6:21',
        focus: 'Heart'
    },
    {
        text: 'The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.',
        reference: 'Deuteronomy 31:8',
        focus: 'Faithfulness'
    },
    {
        text: 'Create in me a pure heart, O God, and renew a steadfast spirit within me.',
        reference: 'Psalm 51:10',
        focus: 'Purity'
    },
    {
        text: 'The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.',
        reference: 'Psalm 18:2',
        focus: 'Security'
    },
    {
        text: 'Wait for the Lord; be strong and take heart and wait for the Lord.',
        reference: 'Psalm 27:14',
        focus: 'Waiting'
    },
    {
        text: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
        reference: 'Micah 6:8',
        focus: 'Humility'
    },
    {
        text: 'The Lord your God in your midst, The Mighty One, will save; He will rejoice over you with gladness, He will quiet you with His love.',
        reference: 'Zephaniah 3:17',
        focus: 'Quietness'
    },
    {
        text: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!',
        reference: '2 Corinthians 5:17',
        focus: 'Newness'
    },
    {
        text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
        reference: 'Galatians 5:22-23',
        focus: 'Fruit'
    },
    {
        text: 'Let us then approach God\'s throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.',
        reference: 'Hebrews 4:16',
        focus: 'Confidence'
    },
    {
        text: 'Delight yourself in the Lord, and he will give you the desires of your heart.',
        reference: 'Psalm 37:4',
        focus: 'Desires'
    },
    {
        text: 'But he said to me, My grace is sufficient for you, for my power is made perfect in weakness.',
        reference: '2 Corinthians 12:9',
        focus: 'Sufficiency'
    },
    {
        text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.',
        reference: 'Psalm 28:7',
        focus: 'Shield'
    },
    {
        text: 'Call to me and I will answer you and tell you great and unsearchable things you do not know.',
        reference: 'Jeremiah 33:3',
        focus: 'Calling'
    },
    {
        text: 'Give thanks to the Lord, for he is good; his love endures forever.',
        reference: 'Psalm 107:1',
        focus: 'Thanksgiving'
    },
    {
        text: 'In their hearts humans plan their course, but the Lord establishes their steps.',
        reference: 'Proverbs 16:9',
        focus: 'Steps'
    },
    {
        text: 'The name of the Lord is a fortified tower; the righteous run to it and are safe.',
        reference: 'Proverbs 18:10',
        focus: 'Safety'
    },
    {
        text: 'But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession.',
        reference: '1 Peter 2:9',
        focus: 'Identity'
    },
    {
        text: 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.',
        reference: 'Psalm 34:8',
        focus: 'Taste'
    }
];

const adorationScriptures = [
    {
        text: 'Holy, holy, holy is the Lord God Almighty, who was, and is, and is to come... You are worthy, our Lord and God, to receive glory and honor and power, for you created all things, and by your will they were created and have their being.',
        reference: 'Revelation 4:8,11',
        focus: 'God\'s Holiness',
        acknowledge: 'Read the passage slowly. What does this reveal about God\'s character? How does this truth about who He is affect your heart?',
        adore: 'Speak words of praise and worship based on what you\'ve discovered about God. Use your own words to honor who He is.',
        surrender: 'How does seeing God\'s greatness change your perspective on your concerns? Surrender your will and trust to Him.',
        transformation: 'Ask God to transform you by His glory. How might living in awareness of this truth about God change how you live today?',
        closing: 'Holy God, You alone are worthy of all praise. Transform me by Your glory that I might reflect Your character in all I do. Amen.'
    },
    {
        text: 'The Lord is compassionate and gracious, slow to anger, abounding in love. He will not always accuse, nor will he harbor his anger forever; he does not treat us as our sins deserve or repay us according to our iniquities.',
        reference: 'Psalm 103:8-10',
        focus: 'God\'s Mercy',
        acknowledge: 'What do you learn about God\'s heart toward you from this passage? How does His mercy and compassion touch your soul?',
        adore: 'Praise God for His incredible mercy and patience. Thank Him for not treating you as your sins deserve.',
        surrender: 'In light of God\'s mercy, what needs to change in how you treat others? Surrender any unforgiveness or hardness.',
        transformation: 'How can you extend the same mercy to others that God has shown you? Ask Him to make you more like Him.',
        closing: 'Merciful Father, thank You for Your boundless compassion. Help me to show others the same mercy You have shown me. Amen.'
    },
    {
        text: 'Great is our Lord and mighty in power; his understanding has no limit. The Lord sustains the humble but casts the wicked to the ground.',
        reference: 'Psalm 147:5-6',
        focus: 'God\'s Power',
        acknowledge: 'What does this passage teach you about God\'s unlimited power and understanding? How does this comfort or challenge you?',
        adore: 'Worship God for His mighty power and perfect understanding. Praise Him for being greater than any challenge you face.',
        surrender: 'What situations in your life need God\'s mighty power? Surrender your limitations and trust in His strength.',
        transformation: 'How does knowing God\'s power change your perspective on your problems? Ask Him to increase your faith.',
        closing: 'Almighty God, You are mighty in power and perfect in understanding. I trust in Your strength and not my own. Amen.'
    },
    {
        text: 'How great is the love the Father has lavished on us, that we should be called children of God! And that is what we are!',
        reference: '1 John 3:1',
        focus: 'God\'s Love',
        acknowledge: 'What does it mean that God has "lavished" His love on you? How does being called God\'s child affect your identity?',
        adore: 'Thank God for His extravagant love toward you. Praise Him for adopting you as His beloved child.',
        surrender: 'What insecurities or fears about your worth need to be surrendered in light of God\'s love for you?',
        transformation: 'How should knowing you are God\'s beloved child change how you live today? Ask Him to help you walk in this identity.',
        closing: 'Father, thank You for lavishing Your love on me and calling me Your child. Help me to live worthy of this calling. Amen.'
    },
    {
        text: 'The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing.',
        reference: 'Zephaniah 3:17',
        focus: 'God\'s Joy',
        acknowledge: 'How does it feel to know that God rejoices over you and sings about you? What does this reveal about His heart toward you?',
        adore: 'Worship God for His joyful love toward you. Thank Him for finding delight in who you are.',
        surrender: 'What shame or self-doubt needs to be surrendered in light of God\'s joyful love for you?',
        transformation: 'How can you live today knowing that you bring God joy? Ask Him to help you see yourself through His eyes.',
        closing: 'Joyful Father, thank You for singing over me with delight. Help me to live in the confidence of Your love. Amen.'
    },
    // Continue with remaining 25 adoration scriptures...
    {
        text: 'The Lord is faithful to all his promises and loving toward all he has made.',
        reference: 'Psalm 145:13',
        focus: 'God\'s Faithfulness',
        acknowledge: 'What promises of God do you need to remember today? How has He shown His faithfulness in your life?',
        adore: 'Praise God for His absolute faithfulness. Thank Him for never breaking His promises.',
        surrender: 'What worries about the future need to be surrendered to God\'s faithful character?',
        transformation: 'How can you live more confidently today, trusting in God\'s faithful promises?',
        closing: 'Faithful God, You never fail in Your promises. Help me to trust You completely and live in Your faithfulness. Amen.'
    }
    // ... (Additional scriptures would continue here - truncated for brevity)
];