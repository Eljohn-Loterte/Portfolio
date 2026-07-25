// ===== PORTFOLIO DATA — Edit your details here =====

function createPlaceholder(title, bg1, bg2) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
    </defs>
    <rect width="960" height="540" fill="url(#g)"/>
    <rect x="40" y="40" width="880" height="460" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <text x="480" y="240" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="32" font-weight="bold">${title}</text>
    <text x="480" y="310" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="monospace" font-size="18">PROJECT PREVIEW IMAGE (16:9)</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const profile = {
  name: "Eljohn Loterte",
  initials: "EL",
  title: "Data Analytics · Front-End Dev · Data Science",
  greeting: "hey, i'm eljohn 👋",
  bio: `I'm a data-driven developer who builds insightful dashboards, modern web interfaces, and machine learning solutions. I specialize in turning raw data into actionable insights and shipping pixel-perfect front-end experiences.`,
  bio2: `Right now I'm building cool data products every day. I love turning rough ideas into things people actually use.`,
  status: "Open to opportunities",
  email: "eljohn.loterte@email.com",
  location: "Metro Manila, PH",
  socials: {
    github: "https://github.com/Eljohn-Loterte",
    linkedin: "https://linkedin.com/in/eljohnloterte",
    kaggle: "https://kaggle.com/eljohnloterte",
    email: "mailto:eljohn.loterte@email.com",
  },
};

export const stats = [
  { value: "200K+", label: "Data Points" },
  { value: "3+", label: "Yrs Shipping" },
  { value: "12", label: "Models Live" },
  { value: "20+", label: "Dashboards" },
];

export const projects = [
  {
    date: "2024",
    title: "Customer Churn Prediction Engine",
    desc: "End-to-end ML pipeline predicting telecom customer churn with 94% accuracy. Features automated data ingestion, feature engineering, model training, and a React dashboard for real-time monitoring.",
    category: "Data Science",
    tech: ["Python", "Scikit-Learn", "XGBoost", "React", "FastAPI"],
    github: "https://github.com/Eljohn-Loterte",
    live: "https://github.com/Eljohn-Loterte",
    gradient: "linear-gradient(135deg, #0f766e, #134e4a)",
    emoji: "🧠",
    image: createPlaceholder("CHURN PREDICTION", "#0f766e", "#134e4a"),
  },
  {
    date: "2024",
    title: "Sales Analytics Dashboard",
    desc: "Interactive executive dashboard processing 2M+ transaction records with drill-down capabilities, anomaly detection, and automated KPI tracking across regions and product lines.",
    category: "Data Analytics",
    tech: ["Python", "Plotly Dash", "PostgreSQL", "Pandas"],
    github: "https://github.com/Eljohn-Loterte",
    live: "https://github.com/Eljohn-Loterte",
    gradient: "linear-gradient(135deg, #1e40af, #1e3a5f)",
    emoji: "📊",
    image: createPlaceholder("SALES ANALYTICS", "#1e40af", "#1e3a5f"),
  },
  {
    date: "2023",
    title: "Real Estate Market Explorer",
    desc: "Full-stack web app with interactive map visualizations, price prediction models, and neighborhood comparison tools. Built with geospatial data from multiple APIs.",
    category: "Front-End Dev",
    tech: ["React", "Mapbox GL", "D3.js", "Node.js", "MongoDB"],
    github: "https://github.com/Eljohn-Loterte",
    live: "https://github.com/Eljohn-Loterte",
    gradient: "linear-gradient(135deg, #7c3aed, #4c1d95)",
    emoji: "🏘️",
    image: createPlaceholder("REAL ESTATE EXPLORER", "#7c3aed", "#4c1d95"),
  },
  {
    date: "2023",
    title: "NLP Sentiment Analyzer",
    desc: "Deep learning model analyzing product reviews across e-commerce platforms. Includes a fine-tuned BERT model, REST API, and a sleek Next.js front-end for batch analysis.",
    category: "Data Science",
    tech: ["PyTorch", "Transformers", "Next.js", "FastAPI"],
    github: "https://github.com/Eljohn-Loterte",
    live: "https://github.com/Eljohn-Loterte",
    gradient: "linear-gradient(135deg, #be185d, #831843)",
    emoji: "💬",
    image: createPlaceholder("NLP SENTIMENT", "#be185d", "#831843"),
  },
  {
    date: "2022",
    title: "Fitness Tracker Dashboard",
    desc: "Responsive wellness dashboard integrating wearable device APIs. Features workout trend analysis, nutrition tracking, and personalized recommendation engine.",
    category: "Front-End Dev",
    tech: ["React", "TypeScript", "Chart.js", "Firebase"],
    github: "https://github.com/Eljohn-Loterte",
    live: "https://github.com/Eljohn-Loterte",
    gradient: "linear-gradient(135deg, #ea580c, #9a3412)",
    emoji: "💪",
    image: createPlaceholder("FITNESS TRACKER", "#ea580c", "#9a3412"),
  },
  {
    date: "2022",
    title: "Supply Chain Optimization Report",
    desc: "Automated BI reporting suite analyzing logistics data to identify bottlenecks, forecast demand, and reduce delivery times by 18% through data-driven route optimization.",
    category: "Data Analytics",
    tech: ["Power BI", "SQL", "Python", "Azure"],
    github: "https://github.com/Eljohn-Loterte",
    live: "https://github.com/Eljohn-Loterte",
    gradient: "linear-gradient(135deg, #0369a1, #0c4a6e)",
    emoji: "🚚",
    image: createPlaceholder("SUPPLY CHAIN BI", "#0369a1", "#0c4a6e"),
  },
];

export const experience = [
  {
    date: "2024",
    role: "Data Analyst & Front-End Developer",
    company: "TechVault Solutions",
  },
  {
    date: "2023",
    role: "Junior Data Scientist",
    company: "Insights AI Lab",
  },
  {
    date: "2022",
    role: "Front-End Developer Intern",
    company: "Pixel Studio",
  },
];

export const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "Tableau",
  "Excel",
  "SQL",
  "Python",
  "Tailwind",
  "Git",
  "SupaBase",
  "React",
];

export const stackItems = stack;

export const certifications = [
  {
    name: "AWS Certified Machine Learning — Specialty",
    issuer: "Amazon Web Services",
    date: "2024",
    link: "https://aws.amazon.com",
    image: createPlaceholder("AWS ML SPECIALTY", "#0f766e", "#134e4a"),
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2023",
    link: "https://coursera.org",
    image: createPlaceholder("GOOGLE DATA ANALYTICS", "#1e40af", "#1e3a5f"),
  },
  {
    name: "Meta Front-End Developer Specialization",
    issuer: "Meta",
    date: "2023",
    link: "https://coursera.org",
    image: createPlaceholder("META FRONT-END DEV", "#7c3aed", "#4c1d95"),
  },
];

export const affiliations = [
  {
    name: "Data Science Society PH",
    role: "Member & Technical Contributor",
    icon: "🌐",
  },
  {
    name: "Developer Student Clubs",
    role: "Core Team Lead — AI Track",
    icon: "🚀",
  },
  {
    name: "Analytics Association of the Philippines",
    role: "Student Member",
    icon: "📈",
  },
];

export const githubData = {
  username: "Eljohn-Loterte",
  totalContributions: 2028,
  currentStreak: 34,
  longestStreak: 58,
  contributions: [],
  topLanguages: [
    { name: "Python", pct: 42, color: "#3572A5" },
    { name: "JavaScript", pct: 28, color: "#f1e05a" },
    { name: "TypeScript", pct: 15, color: "#3178c6" },
    { name: "SQL", pct: 10, color: "#e38c00" },
    { name: "Other", pct: 5, color: "#6b6b76" },
  ],
};
