import type { Translations } from './fr';

export const en: Translations = {
  // Navigation & Header
  nav: {
    startProject: 'Start a project',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Français',
  },

  // Hero Section
  hero: {
    titleLine1: 'We\ndesign',
    titleLine2: '',
    titleLine3Prefix: 'ultra-fast',
    ctaLabel: 'Our method',
    typewriterWords: ['interfaces', 'experiences', 'websites', 'platforms'],
    agency: 'Digital Agency',
    location: 'UX in Brussels',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weatherCodes: {
      0: 'Sunny',
      1: 'Partly cloudy',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Freezing fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Light snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Sleet',
      80: 'Light showers',
      81: 'Moderate showers',
      82: 'Heavy showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Severe thunderstorm',
    },
  },

  // Method Section
  method: {
    title: 'Our\nApproach',
    contact: 'Get in Touch',
    methods: [
      {
        number: '001',
        eyebrow: 'Understand before acting',
        title: 'free audit',
        quote: 'We sit down with you, talk straight, no unnecessary tech jargon.',
        description:
          'Everything starts with a diagnosis. We analyze your performance (SEO, speed, UX) to identify real blockers. You leave with clear answers, no strings attached.',
      },
      {
        number: '002',
        eyebrow: 'Performance as standard',
        title: 'the horde engine',
        quote: 'We handle the technical complexity so you can focus on your vision.',
        description:
          "We use our own technical architecture to build ultra-fast interfaces. No workarounds, just a robust product that lets us deliver faster and better.",
      },
      {
        number: '003',
        eyebrow: 'Zero middlemen',
        title: 'direct<br>cooperation',
        quote: "We don't manage a file. We join your team for the duration of the mission.",
        description:
          'Forget endless email chains. We work directly via Slack or WhatsApp. You see progress in real-time.',
      },
    ],
  },

  // Service Section
  services: {
    title: 'What we offer',
    servicesList: 'Service list',
    startProject: 'Start a project',
    items: [
      {
        title: 'Audit and<br>performance',
        subtitle: 'Understand before acting',
        servicesList: [
          'UX/UI Audit',
          'Technical SEO Audit',
          'Core Web Vitals Analysis',
          'Recommendations Report',
        ],
        content:
          "Want to optimize your site's conversion? We perform a complete diagnosis (Loading speed, UX, SEO) to identify friction points blocking your users. A factual analysis for immediate action.",
      },
      {
        title: 'Optimization<br>and redesign',
        subtitle: 'Improve what exists',
        servicesList: [
          'Performance optimization',
          'UI/UX Redesign',
          'Technical migration',
          'Responsive and mobile-first',
        ],
        content:
          "No need to throw everything away. We work on your existing site to boost its performance (Core Web Vitals), modernize its interface and make it ultra-fast on mobile.",
      },
      {
        title: 'From scratch<br>and MVP',
        subtitle: 'Build on solid foundations',
        servicesList: [
          'Visual Identity',
          'Showcase website',
          'Web application',
          'MVP and prototyping',
          'E-commerce',
        ],
        content:
          'Product launch or new identity? We design custom platforms. A solid architecture designed with your long-term finances in mind.',
      },
    ],
  },

  // About Section
  about: {
    question: "What is the horde?",
    description:
      "We're two enthusiasts: a designer, a developer. 9 years of web experience. No hassle, no project managers, no useless meetings. Just the two of us and your project.",
    keyboardAlt: 'Horde keyboard',
    foundersAlt: 'Horde Agency co-founders',
    cta: 'Discover us',
  },

  // New Homepage
  homepage: {
    hero: {
      topLine1: 'We',
      topLine2: 'Design',
      agencyLine1: 'Web agency',
      agencyLine2: 'based in Brussels',
      bottomLine1: 'Optimized',
      bottomLine2: 'websites',
    },
    about: {
      titleLine1: 'What is',
      titleLine2: 'Horde?',
      description:
        'Horde is a Brussels web agency that designs ultra-fast websites and turns visitors into clients. ↓ Free audit, redesign, or from-scratch creation → we deliver lightweight, well-referenced websites built to last.',
      cta: 'Get in touch',
    },
    projects: {
      countLabel: 'Our latest projects',
    },
    services: {
      title: 'Our website creation services',
    },
    demarche: {
      title: 'A clear method to build a fast, useful website',
      expectationLine1: 'What you can',
      expectationLine2: 'expect',
      expectationLine3: 'when working',
      expectationLine4: 'with us',
      cta: 'Request a free audit',
      steps: [
        {
          number: '1',
          title: 'Free SEO, UX and performance audit',
          quote: 'We identify what blocks results before suggesting anything.',
          description:
            'We review your current website or project: speed, SEO structure, mobile experience, user journey and conversion points. You leave with clear priorities, plain language and no commitment.',
        },
        {
          number: '2',
          title: 'Action plan and custom creation',
          quote: 'A website should serve a business goal, not just look good.',
          description:
            'We choose the right approach for your context: redesign, optimization, landing page, showcase website, e-commerce or MVP. Design, content, tech and CMS are planned together to create a fast, clear and durable website.',
        },
        {
          number: '3',
          title: 'Launch and autonomy',
          quote: 'No unnecessary dependency: you keep the keys to the project.',
          description:
            'We deliver a website ready to evolve: performant, well structured, documented and easy to manage. Your team can edit content, add pages and keep the site alive without depending on us for every change.',
        },
      ],
    },
    us: {
      titleLine1: 'a small',
      titleLine2: 'human team',
      description:
        'We are a small agency that puts the human side first. We take the time to find the right solutions with you and help make your digital presence match the ambition of your projects.',
      cta: 'Our culture',
    },
    fallbackDescription: 'Web agency specialized in performance and UX.',
  },

  // Project Section
  projects: {
    title: 'Selected\nprojects',
    otherProjects: 'Other projects',
    inProgress: '(on it...)',
  },

  // Projects Page
  projectsPage: {
    title: 'Fast website projects in Brussels',
    description: 'Explore our fast website projects in Brussels: showcase sites, e-commerce and custom high-performance interfaces built to convert.',
    heading: 'Our latest\nprojects',
    intro: 'Various articles about technology, design, and our experience',
    servicePageHeading: 'Projects, methods and field notes around {service}',
    all: 'All',
    projectCount: 'Project count',
    viewGrid: 'Grid',
    viewList: 'List',
    filtersLabel: 'Filters',
  },

  // Single Project Page
  projectSingle: {
    breadcrumbHome: 'Home',
    breadcrumbProjects: 'Projects',
    projectServices: 'Services related to this project',
    serviceFilterLabel: 'Filter by services:',
    externalUrl: 'View website',
    gallery: 'Gallery',
    allProjects: 'All',
    allWork: 'All work',
    breadcrumbAriaLabel: 'Breadcrumb',
  },

  // Blog Page
  blogPage: {
    title: 'Fast website blog: web performance and UX',
    description: 'Actionable guides to speed up your website, improve UX, and build reliable web experiences. By Horde Agence, a web agency in Brussels.',
    heading: 'Articles about technology, design,\nand our experience building for the web',
    articleCount: 'Article count',
    viewGrid: 'Grid',
    viewList: 'List',
    readMore: 'Read article',
    minRead: 'min read',
    publishedOn: 'Published on',
    updatedOn: 'Updated on',
    by: 'By',
    category: 'Category',
    tags: 'Tags',
    relatedArticles: 'Related articles',
    allArticles: 'All articles',
    shareArticle: 'Share',
    tableOfContents: 'Table of contents',
    about: 'About the author',
    allLabel: 'All',
    filtersLabel: 'Filters',
    categoriesAriaLabel: 'Main categories',
    breadcrumbAriaLabel: 'Breadcrumb',
    breadcrumbHome: 'Home',
    authorIntro: 'Written by',
    authorBioLabel: 'About the author',
    keyTakeaways: 'Key takeaways',
    copyLink: 'Copy link',
    taggedArticles: 'Articles tagged',
    categoryArticles: 'Articles about',
    categoryPageHeading: 'Articles, methods and field notes about {category}',
    listingTitleSuffix: 'Horde Blog',
    tagPageTitle: 'Articles about {tag} | Horde',
    tagPageDescription:
      'Find our articles about {tag}: advice, analysis and field notes around web, design and performance.',
    tagPageHeading: 'Articles, methods and field notes around {tag}',
    articleSingular: 'article',
    articlePlural: 'articles',
    tagLabel: 'Tag',
    noTagArticles: 'No articles with this tag yet.',
    noCategoryArticles: 'No articles in this category yet.',
    rssTitle: 'Horde Blog - Brussels UX Web Agency',
    rssDescription: 'Articles about web performance, UX design and fast website development by Horde Agence.',
    emptyContent: 'Article content coming soon...',
  },

  // Services Page
  servicesPage: {
    title: 'Web design services in Brussels',
    description:
      'We take a consultative approach to create digital experiences that build lasting connections between brands and people.',
    heading: 'The right solution to make\nyour business grow',
    intro:
      'Audit, web redesign, e-commerce, landing page, SaaS MVP or optimization: we choose the right approach to build a fast, clear website designed for SEO, UX and conversion.',
    breadcrumbHome: 'Home',
    breadcrumbServices: 'Services',
    breadcrumbAriaLabel: 'Breadcrumb',
  },

  // Footer
  footer: {
    summary: 'in a nutshell (just in case)',
    sayHello: 'Say hello :)',
    menu: 'Menu',
    contactAriaLabel: "Contact Let's Talk",
  },

  // Contact Page
  contact: {
    title: 'Contact a web agency in Brussels',
    description: 'Let\'s discuss your fast custom website project with Horde Agence in Brussels: free website audit, performance guidance and end-to-end support.',
    knockKnock: 'Knock knock, say hello!',
    startWhen: 'We can’t wait to hear your ideas for your project.',
    alternativeContacts: 'Alternative Contacts',
    bookCall: 'Book a call',
    breadcrumbAriaLabel: 'Breadcrumb',
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact',
  },

  authorsPage: {
    label: 'Author',
    articlesByAuthor: 'Articles by this author',
    emptyState: 'No published articles yet.',
  },

  // Contact Form
  form: {
    needLabel: 'I need',
    objectifLabel: 'Goal',
    objectifPlaceholder: 'What you have in mind...',
    nameLabel: 'Name',
    namePlaceholder: 'An autograph, please',
    emailLabel: 'Email',
    companyLabel: 'Company',
    companyPlaceholder: 'Company name',
    submit: 'Transmit',
    submitting: 'Transmitting...',
    successMessage: 'Message sent successfully!',
    errorMessage: 'An error occurred. Please try again.',
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email address',
    maxLengthPrefix: 'Max',
    maxLengthSuffix: 'characters',
    options: {
      auditOffert: 'Audit (offert)',
      creationEcommerce: 'E-Commerce',
      creationLandingPage: 'Landing Page',
      creationMvpSaas: 'Saas Mvp',
      optimisationSiteWeb: 'Optimisation',
      refonteSiteWeb: 'Refonte',
      autre: 'Other',
    },
  },

  serviceSingle: {
    exclusionsContactPrefix: 'Still unclear about this service? Contact us by email at',
  },

  // 404 Page
  notFound: {
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has been moved.',
    error: 'Error 404',
    heading: 'Page\nnot found',
    backHome: 'Back to home',
  },

  // Legal Layout
  legal: {
    label: 'Legal',
    lastUpdate: 'Last updated',
    navigation: 'Navigation',
    mentionsLegales: 'Legal Notices',
    confidentialite: 'Privacy',
    cookies: 'Cookies',
    backHome: 'Back to home',
  },

  legalPages: {
    privacy: {
      title: 'Privacy Policy',
      description: 'Horde Agency Privacy Policy. Discover how we protect your personal data.',
      updatedAt: 'January 2025',
      sections: [
        {
          heading: 'Introduction',
          html: '<p>Horde Agency is committed to protecting the privacy of users of its website. This privacy policy explains how we collect, use and protect your personal information in accordance with the General Data Protection Regulation (GDPR).</p>',
        },
        {
          heading: 'Data Controller',
          html: '<p>The data controller is:<br><strong>Horde Agency</strong><br>Brussels, Belgium<br>Email: <a href="mailto:hello@hordeagence.com" title="hello@hordeagence.com">hello@hordeagence.com</a></p>',
        },
        {
          heading: 'Data Collected',
          html: '<p>We collect the following data:</p><ul><li><strong>Contact data</strong>: name, email, company (via the contact form)</li><li><strong>Navigation data</strong>: IP address, browser type, pages visited</li><li><strong>Cookies</strong>: see our <a href="/en/cookies" title="Cookie Policy">cookie policy</a></li></ul>',
        },
        {
          heading: 'Purposes of Processing',
          html: '<p>Your data is used to:</p><ul><li>Respond to your contact requests</li><li>Improve our website and services</li><li>Analyze site usage via Plausible Analytics (aggregated statistics)</li><li>Comply with our legal obligations</li></ul>',
        },
        {
          heading: 'Your Rights',
          html: '<p>Under the GDPR, you have the following rights:</p><ul><li><strong>Right of access</strong>: obtain a copy of your data</li><li><strong>Right to rectification</strong>: correct your data</li><li><strong>Right to erasure</strong>: delete your data</li><li><strong>Right to portability</strong>: receive your data in a structured format</li><li><strong>Right to object</strong>: object to processing</li></ul><p>To exercise these rights, contact us at <a href="mailto:hello@hordeagence.com" title="hello@hordeagence.com">hello@hordeagence.com</a>.</p>',
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      description: 'Cookie usage policy on the Horde Agency website.',
      updatedAt: 'January 2025',
      sections: [
        {
          heading: 'What is a cookie?',
          html: '<p>A cookie is a small text file stored on your device (computer, tablet, smartphone) when you visit a website. Cookies allow the site to remember your actions and preferences for a given period.</p>',
        },
        {
          heading: 'Cookies we use',
          html: '<h3>Essential cookies</h3><p>These cookies are necessary for the site to function. They allow you to navigate and use basic features.</p><h3>Analytical cookies</h3><p>We use Plausible Analytics (instance served via <code>stats.hordeagence.com</code>) to understand how visitors interact with our site. Data is used for aggregated traffic statistics.</p>',
        },
        {
          heading: 'Managing cookies',
          html: '<p>You can control and/or delete cookies as you wish in your browser settings.</p>',
        },
        {
          heading: 'Contact',
          html: '<p>For any questions, contact us at <a href="mailto:hello@hordeagence.com" title="hello@hordeagence.com">hello@hordeagence.com</a>.</p>',
        },
      ],
    },
    legalNotices: {
      title: 'Legal Notices',
      description: 'Legal notices of Horde Agency. Find the legal information about our company.',
      updatedAt: 'January 2026',
      sections: [
        {
          heading: 'Site Publisher',
          html: '<p>This site is published by:<br><strong>Horde Agency</strong><br>Activity carried out under an affiliation with Smart Belgium (SMartCoop).<br>Operating office: Brussels, Belgium<br>Email: <a href="mailto:hello@hordeagence.com" title="hello@hordeagence.com">hello@hordeagence.com</a></p>',
        },
        {
          heading: 'Hosting',
          html: '<p>The site is hosted by:<br><strong>Hostinger</strong><br>Hostinger International Ltd.<br>https://www.hostinger.com</p>',
        },
        {
          heading: 'Analytics',
          html: '<p>We use Plausible Analytics to measure website traffic. The instance is served from <code>stats.hordeagence.com</code>. This privacy-focused tool is used for aggregated traffic statistics.</p>',
        },
        {
          heading: 'Intellectual Property',
          html: '<p>All content on this site is subject to Belgian and international copyright and intellectual property law. All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations.</p><p>Reproduction of all or part of this site on any medium whatsoever is strictly prohibited without the express authorization of Horde Agency.</p>',
        },
        {
          heading: 'Personal Data',
          html: '<p>For information regarding the collection and processing of your personal data, please see our <a href="/en/confidentialite" title="Privacy Policy">Privacy Policy</a>.</p>',
        },
        {
          heading: 'Applicable Law',
          html: '<p>These legal notices are governed by Belgian law. In the event of a dispute, the courts of Brussels shall have sole jurisdiction.</p>',
        },
      ],
    },
  },

  seo: {
    serviceDescription: 'Web agency specialized in ultra-fast websites, redesign, e-commerce and SEO optimization in Brussels',
    serviceSlogan: 'Fast, useful websites built to last',
  },

  // Accessibility
  a11y: {
    skipToContent: 'Skip to main content',
    scrollToContent: 'Skip to content',
  },

  // About Page
  aboutPage: {
    title: 'About Horde, web agency in Brussels',
    description: 'Meet Horde Agence, a Brussels web agency focused on fast custom websites, clean UX, and reliable delivery.',
    heroTitle1: 'Two\nminds,',
    heroTitle2: 'One\nvision',
    scrollDown: '↓',
    introText1: "We start from a simple observation: today, many websites are built by marketing teams looking to sell templates as fast as possible without caring about your story.",
    introText2: "Moreover, you probably don't need a heavy CMS, nor a bloated system with twenty plugins, or a complex web app. What you need is a fast, well-referenced, easy-to-maintain website. That's exactly what we build.",
    highlightText: "Our sites are designed for you. They're lightweight, secure, and performant. This means sub-second load times, SEO that performs with less ad budget, and peace of mind on the maintenance side.",
    workingTitle1: 'Our\nway',
    workingTitle2: 'of working\nwith you',
    workingWithUs: [
      {
        quote: "There's two of us, open to your suggestions so the project reflects you",
        text: "We're available on WhatsApp, and we provide you with a platform to access everything we produce in real time",
      },
      {
        quote: "We handle the technical complexity so you can stay focused on your vision.",
        text: "We don't impose a system on you, we implement the technology that best meets your business needs to ensure your new site is practical for the long term",
      },
      {
        quote: "We sit down with you, we guide you, without unnecessary tech jargon.",
        text: "No surprises: the quoted price is the final price paid, in full transparency, with no additional costs. We want you to be autonomous after delivery",
      },
    ],
    teamTitle1: 'Two\nminds,',
    teamTitle2: 'One\nvision',
    alexTitle: 'Alexandre - Designer',
    alexDescription: "9 years turning vague ideas into interfaces that meet real needs. Obsessed with details and allergic to generic.",
    nicoTitle: 'Nicolas - Developer',
    nicoDescription: "9 years building flawless sites. Performance, SEO, and security: non-negotiable.",
    cta: 'Work with us',
    foundersAlt: 'Horde co-founders',
    keyboardAlt: 'Mechanical keyboard',
    alexAlt: 'Alexandre, Horde co-founder',
    nicoAlt: 'Nicolas, Horde co-founder',
  },
};
