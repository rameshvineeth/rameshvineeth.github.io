// Projects & Experience Filter Engine + Native Accessible Dialog Modal
import { playBlip, playSuccessChime } from './sound.js';

export const projectsData = [
  {
    id: 'lumen-flow',
    category: 'agentic',
    role: 'Creator & Systems Architect',
    company: 'Lumen (Wispr Flow Clone)',
    location: 'Sydney, Australia · Open Source',
    period: 'Systems & Audio AI',
    title: 'Ultra-Low Latency Voice Intelligence Flow in Rust (Deepgram + Groq)',
    summary: 'Engineered an ultra-low latency voice dictation and agentic text formatting engine in Rust (Wispr Flow clone). Leverages streaming binary WebSockets to Deepgram Nova-2 with sub-150ms Groq LPU contextual LLM inference for real-time desktop dictation.',
    metrics: ['Sub-180ms Voice-to-Text', 'Zero-Allocation Rust Core', 'Deepgram & Groq LPUs'],
    tech: ['Rust', 'Deepgram Nova-2', 'Groq LPUs', 'Tokio', 'WebSockets', 'CPAL Audio', 'Tauri / Crossbeam'],
    deepDive: `
      <h4>Real-Time Voice Architecture & High-Performance Systems</h4>
      <p>Lumen is an ultra-low latency, native desktop voice intelligence engine built from the ground up in <strong>Rust</strong>. Inspired by Wispr Flow, it replaces bloated Electron/Python audio wrappers with a zero-allocation, concurrent systems pipeline delivering instantaneous speech-to-text and contextual LLM restructuring.</p>
      <h4>Engineering & Systems Innovations:</h4>
      <ul>
        <li><strong>Zero-Overhead Audio Acquisition:</strong> Engineered lock-free ring buffers using <code>cpal</code> and <code>crossbeam-channel</code> to capture 16kHz linear PCM audio directly from the hardware audio subsystem with zero garbage collection spikes.</li>
        <li><strong>Streaming Binary WebSockets (Deepgram Nova-2):</strong> Orchestrated full-duplex asynchronous WebSocket channels via <code>tokio-tungstenite</code> to stream raw audio chunks to Deepgram Nova-2 speech-to-text models with sub-100ms interim token emissions.</li>
        <li><strong>Sub-150ms Contextual Rewriting (Groq LPUs):</strong> Piped streaming transcript buffers directly into Groq LPU inference engines (Llama-3 70B/8B), performing real-time grammatical perfection, intent formatting, filler-word elimination, and voice-command routing in under 150ms time-to-first-token.</li>
        <li><strong>Native OS Injection:</strong> Built native platform keypress and clipboard emulation for instantaneous, seamless text injection into any IDE, browser, or terminal window.</li>
      </ul>
    `,
    link: 'https://github.com/rameshvineeth'
  },
  {
    id: 'cumen',
    category: 'agentic',
    role: 'Founder',
    company: 'Cumen (Cumen.space)',
    location: 'Sydney, Australia',
    period: 'May 2026 – Present',
    title: 'Autonomous AI Job Search Platform & Recruiter Automation',
    summary: 'Owning product and engineering for an AI-driven career acceleration engine. Designing end-to-end user journeys, autonomous application generation, and recruiter workflow automation.',
    metrics: ['AI Application Generation', 'Recruiter Workflow Automation', 'Autonomous User Journeys'],
    tech: ['Python', 'TypeScript', 'FastAPI', 'React', 'LangGraph', 'PostgreSQL', 'Docker'],
    deepDive: `
      <h4>Product Architecture & Engineering</h4>
      <p>Cumen solves the high-friction breakdown in modern technical hiring by orchestrating specialized AI agents. Built end-to-end intelligence pipelines that parse unstructured candidate credentials, model domain-specific relevance, and dynamically tailor application artifacts.</p>
      <h4>Key Technical Innovations:</h4>
      <ul>
        <li>Engineered autonomous application generation using LangGraph state machines to validate qualification alignments before submission.</li>
        <li>Built reciprocal matching models mapping candidate graph embeddings to live employer engineering stacks.</li>
        <li>Architected low-latency microservices deployed with containerized workflows for zero downtime.</li>
      </ul>
    `,
    link: 'https://cumen.space'
  },
  {
    id: 'block-majority',
    category: 'agentic',
    role: 'Software Engineer',
    company: 'Block Majority',
    location: 'Sydney, Australia',
    period: 'Jun 2025 – Nov 2025 (6 Months)',
    title: 'MCP Client/Server & Private Blockchain Settlement for ANZ Bank',
    summary: 'Engineered Model Context Protocol (MCP) clients and servers for ANZ Bank. Orchestrated private chain blockchain transactions, dynamic natural language rules engine, and immutable audit layers.',
    metrics: ['Sub-50ms Settlement', '100% Agent Traceability', 'GCP CI/CD Pipelines'],
    tech: ['MCP Protocol', 'Solidity', 'TypeScript', 'FastAPI', 'Docker', 'GCP', 'Private Blockchains'],
    deepDive: `
      <h4>ANZ Bank Integration Architecture</h4>
      <p>Developed enterprise MCP client/server layers for ANZ Bank, bridging off-chain banking APIs with private permissioned distributed ledgers.</p>
      <h4>Key Deliverables:</h4>
      <ul>
        <li>Implemented dynamic rules engine allowing banking compliance officers to define transaction settlement policies in natural language, compiled down to deterministic AST validations.</li>
        <li>Engineered an immutable audit layer on private blockchain networks, recording cryptographic proofs of every agentic decision to satisfy APRA compliance mandates.</li>
        <li>Automated containerized deployments on Google Cloud Platform (GCP) VMs with reproducible Docker CI/CD pipelines.</li>
      </ul>
    `,
    link: 'https://github.com/rameshvineeth'
  },
  {
    id: 'vively',
    category: 'healthcare',
    role: 'Data Scientist',
    company: 'Vively',
    location: 'Sydney, Australia',
    period: 'Jun 2024 – Sep 2024 (4 Months)',
    title: 'Continuous Glucose Time-Series & Metabolic RAG Systems',
    summary: 'Increased DAU by 18% through automated food intake logging with LLM & RAG metadata retrieval. Built time-series CGM anomaly forecasting and adversarial prompt injection defenses.',
    metrics: ['+18% Daily Active Users', 'Zero Prompt Injection Bypasses', 'AWS Production Cluster'],
    tech: ['Python', 'Time-Series Forecasting', 'RAG', 'Meta Prompt Guard', 'AWS', 'PostgreSQL'],
    deepDive: `
      <h4>Metabolic Health Intelligence</h4>
      <p>At Vively, eliminated tedious manual nutritional logging by pioneering a conversational and visual logging pipeline powered by LLMs and vector RAG retrieval.</p>
      <h4>Engineering Accomplishments:</h4>
      <ul>
        <li>Trained and deployed non-linear time-series models on AWS to forecast glucose spikes from real-time CGM data points.</li>
        <li>Architected optimized vector retrieval pipelines, reducing query latency by 40% across dense nutritional databases.</li>
        <li>Trial-tested and integrated Meta Prompt Guard frameworks, establishing robust perimeter defenses against indirect prompt injection attacks.</li>
      </ul>
    `
  },
  {
    id: 'zebo-ai',
    category: 'healthcare',
    role: 'Software Engineer',
    company: 'Zebo.AI',
    location: 'Bengaluru, India',
    period: 'Feb 2023 – Jan 2024 (1 Year / 12 Months)',
    title: 'U-Net Computer Vision Segmentation & Observability Pipelines',
    summary: 'Designed high-throughput backend infrastructure and ML pipelines for clinical computer vision. Built U-Net segmentation models, skin-masking algorithms, and live inference observability dashboards.',
    metrics: ['Sub-15ms Latency', 'Zero-Render Drift Dashboard', 'PostgreSQL Sharding'],
    tech: ['Python', 'PyTorch', 'U-Net', 'OpenTelemetry', 'PostgreSQL', 'Redis', 'React'],
    deepDive: `
      <h4>High-Throughput Clinical ML Infrastructure</h4>
      <p>Collaborated cross-functionally with product managers and clinicians to build scalable ML infrastructure capable of handling high-concurrency image segmentation requests.</p>
      <h4>Key Contributions:</h4>
      <ul>
        <li>Engineered and trained U-Net segmentation models with custom skin-masking morphological algorithms for clinical severity scoring.</li>
        <li>Shipped an internal real-time observability dashboard tracking precision/recall, model latency, and statistical feature drift.</li>
        <li>Optimized backend inference throughput via dynamic request batching, asynchronous worker pools, and database index sharding.</li>
      </ul>
    `
  },
  {
    id: 'fintrust-ai',
    category: 'agentic',
    role: 'Contract Lead Engineer',
    company: 'FinTrust AI MVP',
    location: 'Global / Remote',
    period: 'Contract Project (Production MVP)',
    title: 'Full-Stack Autonomous AI Fintech & Risk Scoring Platform',
    summary: 'Engineered a full-stack AI fintech platform supporting Web3 wallet authentication, loan risk scoring, automated budget coaching via OpenAI function calling, and real-time Tremor dashboards.',
    metrics: ['Full-Stack MVP', 'OpenAI Function Calling', 'Web3 Wallet Auth'],
    tech: ['TypeScript', 'NestJS', 'React', 'Vite', 'Tailwind CSS', 'Tremor', 'Solidity'],
    deepDive: `
      <h4>Financial Agent Architecture</h4>
      <p>Built an end-to-end intelligent financial management platform combining decentralized wallet credentials with conversational AI financial coaching.</p>
      <h4>Core Capabilities:</h4>
      <ul>
        <li>Built an autonomous financial coach utilizing OpenAI function calling to query balance sheets, calculate debt-to-income ratios, and recommend algorithmic budget adjustments.</li>
        <li>Architected backend microservices in NestJS with risk-scoring pipelines, transaction audit logs, and secure financial workflows.</li>
        <li>Designed real-time interactive visibility dashboards using React, Vite, and Tremor components.</li>
      </ul>
    `
  },
  {
    id: 'autonomous-devops',
    category: 'devops',
    role: 'Creator & Architect',
    company: 'DevOps Autonomous Agent',
    location: 'Open Source',
    period: 'Autonomous Systems',
    title: 'Autonomous Engineering Operations via Devin API',
    summary: 'Built an AI-driven operations platform that monitors GitHub repositories, triages issue reports, orchestrates Devin AI remediation workflows, runs test suites, and automatically opens pull requests.',
    metrics: ['450+ Dev Hours Saved', 'Automated PR Validation', 'Docker Containerized'],
    tech: ['Node.js', 'Express', 'Devin API', 'Docker', 'Docker Compose', 'GitHub Webhooks'],
    deepDive: `
      <h4>Self-Healing Engineering Loops</h4>
      <p>Pioneered an autonomous repository maintenance framework bridging continuous integration monitoring with agentic coding assistants.</p>
      <h4>System Flow:</h4>
      <ul>
        <li>Listens to GitHub webhook events for runtime crash alerts and security vulnerability advisories.</li>
        <li>Spins up Devin remediation sessions via REST APIs, passing reproduction steps, lint errors, and test harnesses.</li>
        <li>Observability dashboards track remediation timelines, test suite passes, and saved developer hours.</li>
      </ul>
    `
  },
  {
    id: 'image-annotation',
    category: 'devops',
    role: 'Cloud Architect',
    company: 'Scalable Image Annotation Pipeline',
    location: 'AWS Cloud',
    period: 'Infrastructure',
    title: 'Elastic Distributed Image Processing on AWS Cloud',
    summary: 'Architected high-availability image processing infrastructure on AWS using Flask, EC2 Auto Scaling Groups (ASG), and Elastic Load Balancers (ELB) to handle burst dynamic traffic spikes.',
    metrics: ['Zero-Drop Elastic Scaling', 'High-Availability ASG', 'VPC & S3 Storage'],
    tech: ['Python', 'Flask', 'AWS EC2', 'ASG', 'ELB', 'RDS', 'S3', 'VPC', 'Lambda'],
    deepDive: `
      <h4>Fault-Tolerant Cloud Architecture</h4>
      <p>Engineered an enterprise image annotation ingest pipeline capable of absorbing extreme spikes in concurrent computer vision uploads.</p>
      <h4>Infrastructure Design:</h4>
      <ul>
        <li>Implemented AWS Elastic Load Balancers (ELB) distributing traffic across Auto Scaling Groups (ASG) based on CPU and memory thresholds.</li>
        <li>Configured isolated VPC subnets, RDS PostgreSQL storage, and secure S3 asset buckets with presigned URLs.</li>
      </ul>
    `
  },
  {
    id: 'research-jain',
    category: 'academic',
    role: 'Undergraduate Research Assistant',
    company: 'Jain University',
    location: 'Bengaluru, India',
    period: 'Aug 2022 – Feb 2023 (7 Months)',
    title: 'Hybrid Convolution BERT Attention & 6-DOF Robotic Arm RL',
    summary: 'Reduced transformer inference cost by 22% by redesigning BERT self-attention mechanisms with hybrid convolution heads. Evaluated reinforcement learning control policies for a 6-DOF robotic arm in Gazebo.',
    metrics: ['-22% Inference Cost', '6-DOF Robotic Arm', 'Gazebo RL Simulation'],
    tech: ['Python', 'PyTorch', 'Transformers', 'Gazebo', 'Reinforcement Learning', 'ROS'],
    deepDive: `
      <h4>Attention Optimization & Robotics</h4>
      <p>Conducted core research into transformer architectural efficiency and spatial robotics control.</p>
      <h4>Research Discoveries:</h4>
      <ul>
        <li>Replaced quadratic attention calculations with localized hybrid 1D convolution heads, yielding a 22% reduction in memory footprint and inference latency.</li>
        <li>Modelled physical dynamics for a 6-DOF robotic manipulator in Gazebo simulation and trained continuous action space RL policies for obstacle avoidance.</li>
      </ul>
    `
  },
  {
    id: 'verzeo-nlp',
    category: 'academic',
    role: 'Data Science Intern',
    company: 'Verzeo',
    location: 'Bengaluru, India',
    period: 'May 2021 – Jul 2021 (3 Months)',
    title: 'NLP Sentiment Analysis & Affective Signal Mining',
    summary: 'Built and evaluated sentiment analysis models to extract subjective signals and affective states from unstructured text data. Conducted exploratory data analysis (EDA) to surface statistical patterns and derive actionable insights.',
    metrics: ['Affective State Modeling', 'Statistical EDA', 'Unstructured Text Mining'],
    tech: ['Python', 'NLP', 'Scikit-Learn', 'Pandas', 'EDA', 'Sentiment Analysis'],
    deepDive: `
      <h4>Unstructured Signal Intelligence</h4>
      <p>Conducted end-to-end data science workflows on diverse, high-volume customer feedback and social text streams.</p>
      <h4>Key Deliverables:</h4>
      <ul>
        <li>Built and tuned multi-class NLP sentiment classifiers extracting fine-grained affective states and subjective opinion polarity.</li>
        <li>Executed exploratory statistical data analysis (EDA) to map key thematic clusters and trend shifts over time.</li>
        <li>Automated insight generation pipelines to deliver quantitative signal dashboards for stakeholders.</li>
      </ul>
    `
  },
  {
    id: 'ieee-publication',
    category: 'academic',
    role: 'Published Author',
    company: 'IEEE Xplore / OTCON-2023',
    location: 'International Conference',
    period: 'Peer-Reviewed Paper',
    title: 'A Proposed Chatbot Psykh: Personal Therapist Using RASA Framework',
    summary: 'Published peer-reviewed research on conversational mental health agent architectures utilizing natural language understanding and emotional sentiment tracking. 290+ reads, 7 citations.',
    metrics: ['290+ Reads', '7 Citations', 'IEEE Xplore Indexed'],
    tech: ['RASA Framework', 'NLP', 'Sentiment Analysis', 'Python', 'Dialogue Management'],
    deepDive: `
      <h4>IEEE Peer-Reviewed Contribution</h4>
      <p>Published in IEEE Xplore from the OTCON-2023 Conference. Explored conversational therapy boundaries using dialogue trees, affective state classification, and conversational safety bounds.</p>
      <p>Available on IEEE Xplore: <a href="https://ieeexplore.ieee.org/document/10114025" target="_blank" style="color:var(--purple-bright);text-decoration:underline;">Document ID 10114025</a></p>
    `,
    link: 'https://ieeexplore.ieee.org/document/10114025'
  }
];

export function initProjects() {
  const bentoGrid = document.getElementById('experience-bento-grid');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const modalClose = document.getElementById('project-modal-close');

  function renderCards(filter = 'all') {
    if (!bentoGrid) return;
    const items = filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

    bentoGrid.innerHTML = items
      .map((item, idx) => {
        // Asymmetrical span layout
        const spanClass = (idx % 3 === 0) ? 'card-span-8' : (idx % 3 === 1) ? 'card-span-4' : 'card-span-6';

        return `
          <article class="bento-card ${spanClass} scroll-reveal" data-project-id="${item.id}">
            <div>
              <div class="card-badge-row">
                <span class="role-badge">${item.role} · ${item.company}</span>
                <span class="tenure-badge">${item.period}</span>
              </div>
              <h3 class="bento-title">${item.title}</h3>
              <p class="bento-desc">${item.summary}</p>
            </div>
            <div>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
                ${item.metrics.map(m => `<span style="font-size:0.72rem; font-weight:700; color:var(--purple-bright); background:var(--purple-light); padding:2px 8px; border-radius:4px;">✦ ${m}</span>`).join('')}
              </div>
              <div class="bento-tech-tags" style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
                ${item.tech.slice(0, 5).map(t => `<span class="tech-tag" style="display: inline-flex; align-items: center; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; color: var(--purple-bright); background: var(--purple-light); border: 1px solid rgba(82, 54, 171, 0.14); padding: 3px 9px; border-radius: var(--radius-pill);">${t}</span>`).join(' ')}
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  // Filter tabs click
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playBlip(620, 0.03);
      const cat = btn.dataset.category;
      renderCards(cat);
    });
  });

  function openProjectModal(projId) {
    const project = projectsData.find((p) => p.id === projId);
    if (!project || !modal || !modalBody) return;

    playSuccessChime();

    modalBody.innerHTML = `
      <div style="margin-bottom: var(--space-md);">
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">
          <span class="role-badge">${project.role}</span>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--purple-muted);">${project.period} · ${project.location}</span>
        </div>
        <h2 style="font-size: 1.8rem; color: var(--purple-deep); margin-bottom: 6px;">${project.company}</h2>
        <p style="font-size: 1.15rem; font-weight: 600; color: var(--purple-bright);">${project.title}</p>
      </div>

      <div style="margin-bottom: var(--space-md);">${project.deepDive}</div>

      <div style="margin-bottom: var(--space-md);">
        <h4 style="font-size: 0.9rem; color: var(--purple-deep); margin-bottom: 8px;">Key Production Metrics:</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${project.metrics.map(m => `<span style="font-size: 0.76rem; font-weight: 700; color: var(--purple-bright); background: var(--purple-light); padding: 4px 10px; border-radius: var(--radius-pill);">✦ ${m}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: var(--space-lg);">
        <h4 style="font-size: 0.92rem; font-weight: 700; color: var(--purple-deep); margin-bottom: 10px;">Technologies &amp; Infrastructure:</h4>
        <div class="bento-tech-tags" style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
          ${project.tech.map(t => `<span class="tech-tag" style="display: inline-flex; align-items: center; font-family: var(--font-mono); font-size: 0.76rem; font-weight: 700; color: var(--purple-bright); background: var(--purple-light); border: 1px solid rgba(82, 54, 171, 0.18); padding: 5px 12px; border-radius: var(--radius-pill); white-space: nowrap;">${t}</span>`).join(' ')}
        </div>
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn-pill btn-purple-filled btn-sm">Visit Project / Live System ↗</a>` : ''}
        <button class="btn-pill btn-frosted btn-sm" id="modal-inner-close">Close Details</button>
      </div>
    `;

    modal.showModal();

    const innerClose = modalBody.querySelector('#modal-inner-close');
    if (innerClose) {
      innerClose.addEventListener('click', () => modal.close());
    }
  }

  // Open modal on bento card click if bentoGrid exists
  if (bentoGrid) {
    renderCards('all');
    bentoGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.bento-card');
      if (!card) return;
      openProjectModal(card.dataset.projectId);
    });
  }

  // Open modal on CRT chandelier monitor click
  const crtMonitors = document.querySelectorAll('.crt-monitor[data-project-id]');
  crtMonitors.forEach((monitor) => {
    monitor.addEventListener('click', () => {
      openProjectModal(monitor.dataset.projectId);
    });
    monitor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(monitor.dataset.projectId);
      }
    });
  });

  // Close modal button
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      playBlip(500, 0.04);
      modal.close();
    });
  }

  // Close on outside backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  }

  // Initial render
  renderCards('all');
}
