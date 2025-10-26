const INCLUDE_EVENT = 'includes:loaded';
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');

let root;
let themeToggle;
let navToggle;
let nav;
let animatedElements;
let statValues;
let timelineList;
let detailTitle;
let detailSummary;
let detailActions;
let pills;
let topicPanels;
let projectFilters;
let projectGrid;
let stackGrid;
let pulseFeed;
let heroTypewriter;
let contactForm;

const mapDom = () => {
  root = document.documentElement;
  themeToggle = document.getElementById('themeToggle');
  navToggle = document.getElementById('navToggle');
  nav = document.getElementById('primaryNav');
  animatedElements = document.querySelectorAll('[data-animate]');
  statValues = document.querySelectorAll('.stat-value');
  timelineList = document.getElementById('timelineList');
  detailTitle = document.getElementById('detailTitle');
  detailSummary = document.getElementById('detailSummary');
  detailActions = document.getElementById('detailActions');
  pills = document.querySelectorAll('.pill');
  topicPanels = document.getElementById('topicPanels');
  projectFilters = document.getElementById('projectFilters');
  projectGrid = document.getElementById('projectGrid');
  stackGrid = document.getElementById('stackGrid');
  pulseFeed = document.getElementById('pulseFeed');
  heroTypewriter = document.getElementById('typewriter');
  contactForm = document.querySelector('.contact-form');
};

const setTheme = theme => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const renderStack = () => {
  if (!stackGrid) return;
  stackGrid.innerHTML = '';
  stackData.forEach(stack => {
    const card = document.createElement('article');
    card.className = 'stack-card';
    card.innerHTML = `
      <span class="stack-icon">${stack.icon}</span>
      <h3>${stack.title}</h3>
      <p>${stack.copy}</p>
      <div class="stack-tags">
        ${stack.tags.map(tag => `<span class="stack-tag">${tag}</span>`).join('')}
      </div>
    `;
    stackGrid.appendChild(card);
  });
};

const renderPulse = () => {
  if (!pulseFeed) return;
  pulseFeed.innerHTML = '';
  pulseData.forEach(entry => {
    const card = document.createElement('article');
    card.className = 'pulse-card';
    card.innerHTML = `
      <div class="pulse-meta">
        <span>${entry.date}</span>
        ${entry.tags.map(tag => `<span class="pulse-tag">${tag}</span>`).join('')}
      </div>
      <div class="pulse-title">${entry.title}</div>
      <p class="pulse-body">${entry.body}</p>
    `;
    pulseFeed.appendChild(card);
  });
};

const initTheme = () => {
  if (!root) return;
  if (storedTheme) {
    setTheme(storedTheme);
    return;
  }
  setTheme(prefersDark ? 'dark' : 'light');
};

const timelineData = [
  {
    id: 'install',
    date: 'Oct 26, 2025 · 07:55',
    title: 'Installed Cascade AI assistant',
    summary: 'Connected the AI pair programmer and aligned on goals for building a living portfolio that tracks progress in real time.',
    actions: [
      'Outlined objectives for an interactive, AI-assisted showcase',
      'Mapped first iteration scope around timeline, highlights, and live counters'
    ]
  },
  {
    id: 'education',
    date: '2012 — Present',
    title: 'Educational journey in motion',
    summary: 'From Cipriano M. Asandal Elementary to National University Lipa, I layered digital literacy, STEM leadership, and Computer Society initiatives.',
    actions: [
      'Dean’s Lister at NU Lipa (GPA 3.8) and IC3 Digital Literacy certified',
      'Led STEM outreach and programming bootcamps during senior high school',
      'Currently steering capstone squads focused on campus platforms'
    ]
  },
  {
    id: 'experience',
    date: '2023 — 2025',
    title: 'Shipping impact-driven initiatives',
    summary: 'Balanced internships, freelance revamps, and Computer Society leadership to deliver measurable change.',
    actions: [
      'Reduced reporting time by 55% via NU Lipa Innovation Lab dashboards',
      'Migrated community CMS to Jamstack for 3× faster load times',
      'Coordinated six hackathons and mentorship pods as org VP'
    ]
  },
  {
    id: 'build',
    date: 'Oct 26, 2025 · 08:05',
    title: 'Interactive portfolio build',
    summary: 'Launched the current iteration with responsive layout, data-driven sections, and evolving resource library.',
    actions: [
      'Implemented sticky navigation, theme toggle, and mobile nav interactions',
      'Animated stats to reflect active collaboration metrics',
      'Expanded pulse feed and library to document ongoing experiments'
    ]
  }
];

const stackData = [
  {
    icon: '⚛️',
    title: 'Frontend & product systems',
    copy: 'React, Next.js, Tailwind, and accessibility-first component libraries keep interfaces polished and inclusive.',
    tags: ['React', 'Next.js', 'Tailwind', 'Framer Motion']
  },
  {
    icon: '🧠',
    title: 'AI & automation',
    copy: 'LangChain workflows, prompt notebooks, and CI-ready scripts accelerate documentation and QA cycles.',
    tags: ['LangChain', 'Node CLI', 'OpenAI', 'GitHub Actions']
  },
  {
    icon: '🗃️',
    title: 'Data & platform ops',
    copy: 'PostgreSQL, MongoDB, and analytics dashboards translate collaboration artifacts into decision-ready insights.',
    tags: ['PostgreSQL', 'MongoDB', 'Supabase', 'Metabase']
  },
  {
    icon: '🎯',
    title: 'Leadership & delivery',
    copy: 'Program facilitation, agile retros, and documentation toolkits keep squads aligned and productive.',
    tags: ['Program Mgmt', 'Design Thinking', 'Mentorship', 'Notion']
  }
];

const pulseData = [
  {
    date: 'Oct 26 · 08:20',
    title: 'Hero metrics aligned',
    body: 'Refreshed the landing stats to reflect shipped projects, coding tenure, and team initiatives from 2023–2025.',
    tags: ['metrics']
  },
  {
    date: 'Oct 26 · 08:32',
    title: 'Library roadmap synced',
    body: 'Merged legacy portfolio resources—transcripts, coursework tags, and workshop kits—into the new resource vault.',
    tags: ['library']
  },
  {
    date: 'Oct 26 · 08:47',
    title: 'Experience timeline enriched',
    body: 'Documented internship wins, community CMS revamp, and Computer Society leadership inside the journey view.',
    tags: ['journey']
  }
];

const typewriterPhrases = ['real time.', 'motion.', 'collaboration.', 'product thinking.', 'cascade.'];
let typewriterIndex = 0;
let typewriterChar = 0;
let deleting = false;

const tickTypewriter = () => {
  if (!heroTypewriter) return;
  const current = typewriterPhrases[typewriterIndex % typewriterPhrases.length];
  if (!deleting) {
    typewriterChar += 1;
    heroTypewriter.textContent = current.slice(0, typewriterChar);
    if (typewriterChar === current.length) {
      deleting = true;
      setTimeout(tickTypewriter, 1400);
      return;
    }
  } else {
    typewriterChar -= 1;
    heroTypewriter.textContent = current.slice(0, typewriterChar);
    if (typewriterChar === 0) {
      deleting = false;
      typewriterIndex += 1;
    }
  }
  const delay = deleting ? 60 : 120;
  setTimeout(tickTypewriter, delay);
};

const topicContent = {
  web: {
    title: 'Web Experience',
    description: 'Designing responsive interfaces with component-driven architectures, ensuring accessibility and motion that reinforces narrative.'
  },
  data: {
    title: 'Data Storytelling',
    description: 'Transforming datasets into compelling visuals, blending dashboards with narrative context to highlight insight and impact.'
  },
  automation: {
    title: 'Automation',
    description: 'Leveraging AI-assisted workflows, scripting, and tooling to accelerate delivery while maintaining precision.'
  },
  games: {
    title: 'Game Design',
    description: 'Experimenting with interactive experiences, playful UI systems, and rapid prototyping pipelines.'
  },
  learning: {
    title: 'Continuous Learning',
    description: 'Documenting each collaboration to capture lessons learned, refinements, and future iterations.'
  },
  community: {
    title: 'Community Impact',
    description: 'Building resources that invite others into the process, sharing updates transparently and encouraging collaboration.'
  }
};

const projectData = [
  {
    id: 'resort-platform',
    title: 'Resort Management System',
    blurb: 'Full-stack platform that automated bookings, surfaced analytics, and cut admin workload by 40%.',
    category: 'web',
    image: 'assets/images/database.jpg',
    status: 'Shipped'
  },
  {
    id: 'quiz-app',
    title: 'Nationalian Quiz App',
    blurb: 'Mobile-first quiz experience that onboarded 500+ learners with adaptive pools and live leaderboards.',
    category: 'automation',
    image: 'assets/images/app.jpg',
    status: 'In the wild'
  },
  {
    id: 'mind-games',
    title: 'Mind Games Arena',
    blurb: 'Cognitive game bundle featuring AI opponents, pattern metrics, and award-winning UI polish.',
    category: 'growth',
    image: 'assets/images/game.jpg',
    status: 'Awarded'
  }
];

const renderTimeline = () => {
  if (!timelineList) return;
  timelineList.innerHTML = '';
  timelineData.forEach((item, index) => {
    const element = document.createElement('button');
    element.className = 'timeline-item';
    element.dataset.id = item.id;
    element.innerHTML = `<span class="date">${item.date}</span><span class="title">${item.title}</span>`;
    if (index === 0) element.classList.add('active');
    element.addEventListener('click', () => selectTimeline(item.id));
    timelineList.appendChild(element);
  });
  selectTimeline(timelineData[0].id);
};

const selectTimeline = id => {
  const active = timelineData.find(item => item.id === id);
  if (!active) return;
  [...timelineList.children].forEach(child => child.classList.toggle('active', child.dataset.id === id));
  detailTitle.textContent = active.title;
  detailSummary.textContent = active.summary;
  detailActions.innerHTML = '';
  active.actions.forEach(action => {
    const li = document.createElement('li');
    li.textContent = action;
    detailActions.appendChild(li);
  });
};

const renderTopics = () => {
  if (!topicPanels || !pills.length) return;
  topicPanels.innerHTML = '';
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const topic = pill.dataset.topic;
      pills.forEach(item => item.classList.toggle('active', item === pill));
      [...topicPanels.children].forEach(panel => panel.classList.toggle('active', panel.dataset.topic === topic));
    });
  });
  Object.entries(topicContent).forEach(([key, value], index) => {
    const panel = document.createElement('div');
    panel.className = 'topic-panel';
    panel.dataset.topic = key;
    panel.innerHTML = `<h3>${value.title}</h3><p>${value.description}</p>`;
    if (index === 0) panel.classList.add('active');
    topicPanels.appendChild(panel);
  });
  pills[0].classList.add('active');
};

const renderProjects = filter => {
  if (!projectGrid) return;
  const current = filter && filter !== 'all' ? projectData.filter(project => project.category === filter) : projectData;
  projectGrid.innerHTML = '';
  current.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.category = project.category;
    card.innerHTML = `
      <div class="cover">
        <span class="chip">${project.status}</span>
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="body">
        <h3>${project.title}</h3>
        <p>${project.blurb}</p>
      </div>
      <footer>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h4.8c.7 0 1.2.5 1.2 1.2V9" />
          <path d="M9 21H4.2A1.2 1.2 0 0 1 3 19.8V15" />
          <path d="M21 3 13.5 10.5" />
          <path d="M10.5 13.5 3 21" />
        </svg>
        <span>${project.category.charAt(0).toUpperCase() + project.category.slice(1)} track</span>
      </footer>
    `;
    projectGrid.appendChild(card);
  });
};

const initProjectFilters = () => {
  if (!projectFilters) return;
  projectFilters.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      projectFilters.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
      renderProjects(button.dataset.filter);
    });
  });
  renderProjects('all');
};

const animateStats = entries => {
  if (!statValues || !statValues.length) return;
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    statValues.forEach(node => {
      const target = Number(node.dataset.count || 0);
      if (!target || node.dataset.started) return;
      node.dataset.started = 'true';
      const duration = 1200;
      const start = performance.now();
      const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        node.textContent = Math.floor(progress * target).toString();
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
};

const revealOnScroll = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
};

const initObservers = () => {
  if (!animatedElements || !animatedElements.length) return;
  const revealObserver = new IntersectionObserver(revealOnScroll, { threshold: 0.2 });
  animatedElements.forEach(element => revealObserver.observe(element));
  const statObserver = new IntersectionObserver(animateStats, { threshold: 0.6 });
  const statSection = document.querySelector('.hero-stats');
  if (statSection) statObserver.observe(statSection);
};

const handleNavToggle = () => {
  if (!navToggle || !nav) return;
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', (!expanded).toString());
  nav.classList.toggle('open', !expanded);
};

const initNavigation = () => {
  if (!navToggle || !nav) return;
  navToggle.addEventListener('click', handleNavToggle);
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
};

const initThemeToggle = () => {
  if (!themeToggle) return;
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });
};

const initContactForm = () => {
  if (!contactForm) return;
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.textContent = 'Message queued';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      contactForm.reset();
    }, 1500);
  });
};

const boot = () => {
  mapDom();
  initTheme();
  renderTimeline();
  renderTopics();
  initProjectFilters();
  renderStack();
  renderPulse();
  initObservers();
  initNavigation();
  initThemeToggle();
  initContactForm();
  tickTypewriter();
};

if (window.__includesLoaded) {
  boot();
} else {
  document.addEventListener(INCLUDE_EVENT, boot, { once: true });
}
