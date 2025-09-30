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
    // Continue with remaining 25 adoration scriptures...
    {
        text: 'The Lord is faithful to all his promises and loving toward all he has made.',
        reference: 'Psalm 145:13 (NIV)',
        focus: 'God\'s Faithfulness',
        acknowledge: 'What promises of God do you need to remember today? How has He shown His faithfulness in your life?',
        adore: 'Praise God for His absolute faithfulness. Thank Him for never breaking His promises.',
        surrender: 'What worries about the future need to be surrendered to God\'s faithful character?',
        transformation: 'How can you live more confidently today, trusting in God\'s faithful promises?',
        closing: 'Faithful God, You never fail in Your promises. Help me to trust You completely and live in Your faithfulness. Amen.'
    }
    // ... (Additional scriptures would continue here - truncated for brevity)
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