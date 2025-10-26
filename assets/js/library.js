const INCLUDE_EVENT = 'includes:loaded';
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');

let root;
let themeToggle;
let navToggle;
let nav;
let animatedElements;
let libraryGrid;
let playlistGrid;
let downloadGrid;
let workshopGrid;

const mapDom = () => {
  root = document.documentElement;
  themeToggle = document.getElementById('themeToggle');
  navToggle = document.getElementById('navToggle');
  nav = document.getElementById('primaryNav');
  animatedElements = document.querySelectorAll('[data-animate]');
  libraryGrid = document.getElementById('libraryGrid');
  playlistGrid = document.getElementById('playlistGrid');
  downloadGrid = document.getElementById('downloadGrid');
  workshopGrid = document.getElementById('workshopGrid');
};

const setTheme = theme => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const initTheme = () => {
  if (!root) return;
  if (storedTheme) {
    setTheme(storedTheme);
    return;
  }
  setTheme(prefersDark ? 'dark' : 'light');
};

const libraryCollections = [
  {
    title: 'Prompt notebooks',
    description: 'Reusable prompt stacks for Cascade pair sessions, from ideation kickoffs to QA passes.',
    links: [
      { label: 'Ideation prompts', href: 'https://www.notion.so/' },
      { label: 'QA checklist', href: 'https://www.notion.so/' }
    ]
  },
  {
    title: 'Interface inspiration',
    description: 'Curated Dribbble shots and open-source repos to remix for web, dashboard, and mobile flows.',
    links: [
      { label: 'Soumyajit portfolio', href: 'https://soumyajit.vercel.app/' },
      { label: 'Framer motion gallery', href: 'https://www.framer.com/motion/' }
    ]
  },
  {
    title: 'Automation snippets',
    description: 'Node and Python gists for syncing documentation, tracking activity pulses, and posting updates.',
    links: [
      { label: 'Node CLI skeleton', href: 'https://github.com/' },
      { label: 'LangChain template', href: 'https://github.com/' }
    ]
  },
  {
    title: 'Learning loop logs',
    description: 'Session recaps and reflection templates to keep iteration continuous and measurable.',
    links: [
      { label: 'Retro template', href: 'https://www.figma.com/' },
      { label: 'Growth loop canvas', href: 'https://miro.com/' }
    ]
  }
];

const downloadData = [
  {
    title: 'Transcript & GPA snapshot',
    description: 'Dean’s List standing (GPA 3.8/4.0) plus IC3 Digital Literacy certification summary.',
    meta: ['NU Lipa · 2023–2025', 'PDF · 2 pages'],
    href: 'assets/docs/transcript-summary.pdf',
    label: 'Download transcript summary'
  },
  {
    title: 'Coursework heatmap',
    description: 'Modules covering Advanced Web Systems, Software Engineering, HCI, and Cloud Fundamentals.',
    meta: ['Updated quarterly', 'CSV + Notion board'],
    href: 'assets/docs/coursework-heatmap.zip',
    label: 'Grab coursework pack'
  },
  {
    title: 'Leadership & program brief',
    description: 'Highlights from Computer Society VP initiatives, hackathons, and mentorship pods.',
    meta: ['Computer Society 2023–2025', 'PDF · 3 pages'],
    href: 'assets/docs/leadership-brief.pdf',
    label: 'Download leadership brief'
  }
];

const workshopData = [
  {
    title: 'STEM bootcamp facilitator kit',
    description: 'Slide decks, activity sheets, and retrospectives used across four campus coding workshops.',
    items: ['Git fundamentals handout', 'UI critique checklist', 'Retro template (FigJam)'],
    href: 'https://www.notion.so/',
    label: 'Open facilitator kit'
  },
  {
    title: 'Hackathon operations playbook',
    description: 'Logistics checklist, mentor briefing notes, and day-of run sheets for six NU Lipa hackathons.',
    items: ['Venue & sponsor checklist', 'Mentor briefing doc', 'Post-event survey form'],
    href: 'https://www.notion.so/',
    label: 'View operations playbook'
  },
  {
    title: 'Mentorship pod toolkit',
    description: 'Goal tracker, pairing worksheet, and feedback prompts powering the Computer Society pods.',
    items: ['Mentorship agenda (Google Doc)', 'Pairing worksheet', 'Feedback prompt cards'],
    href: 'https://www.notion.so/',
    label: 'Access mentorship toolkit'
  }
];

const playlistData = [
  {
    title: 'Ship a landing page in a day',
    description: 'Stacked resources to go from blank canvas to responsive launch with Cascade assist.',
    items: ['Define hero narrative with prompts', 'Assemble component kit references', 'Automate QA with scripted checks'],
    tags: ['web', 'launch', 'rapid']
  },
  {
    title: 'Data storytelling sprint',
    description: 'Blend dashboards with narrative copy to surface insight and next-step recommendations.',
    items: ['Set up Supabase + Prisma schema', 'Craft narrative beats per dataset', 'Export highlights to Notion changelog'],
    tags: ['data', 'storytelling', 'insight']
  },
  {
    title: 'Creative lab weekend',
    description: 'Explore motion, shaders, and experimental UI to refresh the portfolio visuals.',
    items: ['Prototype canvas in Three.js', 'Experiment with shader gradients', 'Capture clips for the pulse feed'],
    tags: ['motion', 'visuals', 'experiments']
  }
];

const renderLibrary = () => {
  if (!libraryGrid) return;
  libraryGrid.innerHTML = '';
  libraryCollections.forEach(entry => {
    const card = document.createElement('article');
    card.className = 'library-card';
    card.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      <div class="library-links">
        ${entry.links.map(link => `<a class="library-link" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join('')}
      </div>
    `;
    libraryGrid.appendChild(card);
  });
};

const renderDownloads = () => {
  if (!downloadGrid) return;
  downloadGrid.innerHTML = '';
  downloadData.forEach(entry => {
    const card = document.createElement('article');
    card.className = 'download-card';
    card.innerHTML = `
      <div class="download-body">
        <h3>${entry.title}</h3>
        <p>${entry.description}</p>
        <div class="download-meta">
          ${entry.meta.map(tag => `<span class="download-tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="download-actions">
        <a href="${entry.href}" class="download-link" target="_blank" rel="noreferrer">${entry.label}</a>
      </div>
    `;
    downloadGrid.appendChild(card);
  });
};

const renderWorkshops = () => {
  if (!workshopGrid) return;
  workshopGrid.innerHTML = '';
  workshopData.forEach(entry => {
    const card = document.createElement('article');
    card.className = 'workshop-card';
    card.innerHTML = `
      <div class="workshop-header">
        <h3>${entry.title}</h3>
        <p>${entry.description}</p>
      </div>
      <ul>
        ${entry.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <a href="${entry.href}" class="workshop-link" target="_blank" rel="noreferrer">${entry.label}</a>
    `;
    workshopGrid.appendChild(card);
  });
};

const renderPlaylists = () => {
  if (!playlistGrid) return;
  playlistGrid.innerHTML = '';
  playlistData.forEach(entry => {
    const card = document.createElement('article');
    card.className = 'playlist-card';
    card.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      <ul>
        ${entry.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <div class="playlist-tags">
        ${entry.tags.map(tag => `<span class="playlist-tag">${tag}</span>`).join('')}
      </div>
    `;
    playlistGrid.appendChild(card);
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

const boot = () => {
  mapDom();
  initTheme();
  renderLibrary();
  renderPlaylists();
  renderDownloads();
  renderWorkshops();
  initObservers();
  initNavigation();
  initThemeToggle();
};

if (window.__includesLoaded) {
  boot();
} else {
  document.addEventListener(INCLUDE_EVENT, boot, { once: true });
}
