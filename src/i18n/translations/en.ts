import type { Translations } from './fr';

export const en: Translations = {
  // Navigation & Header
  nav: {
    startProject: 'Start a project',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Version Française',
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
        title: 'direct<br>collabo-<br>ration',
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
  },

  // Project Section
  projects: {
    title: 'Selected\nprojects',
    otherProjects: 'Other projects',
    inProgress: '(on it...)',
  },

  // Projects Page
  projectsPage: {
    title: 'Projects',
    description: 'Discover our latest work: showcase websites, web applications and e-commerce platforms designed with performance and design in mind.',
    heading: 'Our latest\nprojects',
    projectCount: 'Project count',
    viewGrid: 'Grid',
    viewList: 'List',
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
    title: 'Contact',
    description: 'Contact us about your digital project',
    knockKnock: 'Knock, knock.',
    startWhen: 'When do we start\nyour new project?',
    alternativeContacts: 'Alternative Contacts',
    bookCall: 'Book a call',
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
    options: {
      auditPerformance: 'Audit & performance',
      optimisationRefonte: 'Optimization & redesign',
      fromScratchMvp: 'From scratch & MVP',
      autre: 'Other',
    },
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

  // Accessibility
  a11y: {
    skipToContent: 'Skip to main content',
  },
} as const;
