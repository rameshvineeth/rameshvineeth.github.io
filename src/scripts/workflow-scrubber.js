// Interactive Workflow Scrubber Engine (Hero Section, Screenshot 1)
import { playBlip } from './sound.js';

export const workflowScenarios = {
  mcp: {
    name: 'Block Majority',
    role: 'SOFTWARE ENGINEER · SYDNEY',
    period: 'Jun 2025 – Nov 2025 (6 Months)',
    title: 'MCP Client/Server & Private Blockchain Settlement (ANZ Bank)',
    description: 'Worked on MCP client and server development for ANZ Bank, ensuring efficient API integration and authentications to orchestrate blockchain transactions on private chains with cross-chain settlement using agents, binding on-chain/off-chain components. Developed dynamic rules engine in natural language, GCP Docker CI/CD, and an immutable audit layer on private blockchain networks to securely record agentic decisions.',
    metrics: 'ANZ Bank MCP · Sub-50ms Settlement · 100% Agent Traceability · GCP CI/CD',
    logs: [
      { type: 'accent', text: '[INFO] Initializing MCP Client/Server handshake on ANZ Bank gateway...' },
      { type: 'highlight', text: '[AUTH] Verified OAuth2 & Agent Session Token for private distributed ledger.' },
      { type: 'log', text: '[ORCHESTRATE] Dynamic rules engine compiled natural language policy into AST.' },
      { type: 'success', text: '[TRANSACT] Executed cross-chain asset atomic settlement with cryptographic proof: Tx 0x9f4a...e12d.' },
      { type: 'success', text: '[AUDIT] Immutable agent decision recorded on permissioned chain block #41,209.' },
      { type: 'accent', text: '[STATUS] Settlement complete in 42ms with 100% APRA compliance verification.' }
    ]
  },
  rag: {
    name: 'Vively',
    role: 'DATA SCIENTIST · SYDNEY',
    period: 'Jun 2024 – Sep 2024 (4 Months)',
    title: 'Metabolic CGM Time-Series ML & Food Intake RAG',
    description: 'Increased DAU by 18% by developing user-facing food intake logging feature, eliminating manual logging flow with LLM and RAG for metadata retrieval. Worked on non-linear time-series models with Continuous Glucose Monitor (CGM) data points deployed on AWS, optimized query latency by 40%, and trial-tested Meta Prompt Guard to secure inputs from adversarial prompt injection attacks.',
    metrics: 'DAU Growth: +18% · Query Latency: -40% · Meta Prompt Guard: 100%',
    logs: [
      { type: 'accent', text: '[INGEST] Reading continuous CGM sensor stream: 288 blood glucose telemetry points/day.' },
      { type: 'highlight', text: '[TIME-SERIES] Forecasting glucose excursion: +28mg/dL metabolic spike detected.' },
      { type: 'log', text: '[NLP] User input: "Log salmon avocado salad with balsamic vinaigrette."' },
      { type: 'highlight', text: '[PROMPT-GUARD] Scanning conversational input through Meta Prompt Guard... CLEAN.' },
      { type: 'success', text: '[RAG] Retrieved nutritional vector metadata via Cosine Similarity in 38ms.' },
      { type: 'success', text: '[OUTPUT] Nutrition logged automatically to AWS cluster. Daily Active Users +18%.' }
    ]
  },
  unet: {
    name: 'Zebo',
    role: 'SOFTWARE ENGINEER · BENGALURU',
    period: 'Feb 2023 – Jan 2024 (1 Year / 12 Months)',
    title: 'Clinical U-Net Segmentation & Distributed Observability',
    description: 'Partnered cross-functionally to design backend infrastructure for high-traffic ML pipelines. Developed U-Net segmentation models and skin-masking algorithms for clinical severity scoring. Shipped internal real-time metrics dashboard for model performance tracking (precision/recall, inference latency, drift detection), with database indexing and sharding.',
    metrics: 'Inference Cost: -22% · Sub-15ms Latency · Sharded PostgreSQL & Redis',
    logs: [
      { type: 'accent', text: '[PIPELINE] High-concurrency async clinical image batch received at ingest gateway.' },
      { type: 'log', text: '[CV] Executing morphological skin-masking and pre-processing algorithms...' },
      { type: 'highlight', text: '[INFERENCE] U-Net forward pass executing across distributed GPU inference cluster.' },
      { type: 'success', text: '[SEGMENTATION] Lesion boundaries segmented with Dice coefficient: 0.962.' },
      { type: 'log', text: '[METRICS] Tracking drift, latency, and precision/recall on real-time dashboard.' },
      { type: 'success', text: '[DB] Results indexed and cached in sharded PostgreSQL & Redis cluster.' }
    ]
  },
  freelance: {
    name: 'Freelance',
    role: 'CONTRACT LEAD ENGINEER · REMOTE',
    period: 'Contract Project (Production MVP)',
    title: 'FinTrust AI MVP — Full-Stack AI Fintech & Risk Scoring Platform',
    description: 'Built a full-stack AI-powered fintech platform supporting wallet authentication, transaction management, budgeting, financial insights, loan scoring, and administration tools. Developed an AI financial coach using OpenAI function calling capable of answering financial queries and interacting with platform services. Implemented backend APIs, risk-scoring pipelines, audit logging, and responsive dashboards using React, Vite, and Tremor.',
    metrics: 'Full-Stack MVP · TypeScript & NestJS · OpenAI Function Calling · Solidity',
    logs: [
      { type: 'accent', text: '[INIT] Initializing FinTrust AI fintech engine & Web3 wallet gateway...' },
      { type: 'highlight', text: '[AUTH] Connected Web3 wallet authenticated via cryptographic signature.' },
      { type: 'log', text: '[COACH] AI Financial Coach activated via OpenAI function calling API.' },
      { type: 'highlight', text: '[RISK-ENGINE] Calculating debt-to-income ratio & loan risk score: 785 (Prime).' },
      { type: 'success', text: '[PIPELINE] NestJS backend executing transaction audit trail & risk scoring.' },
      { type: 'success', text: '[DASHBOARD] Synchronized real-time financial visibility on React Tremor dashboard.' }
    ]
  },
  jain: {
    name: 'Jain Uni',
    role: 'RESEARCH ASSISTANT · BENGALURU',
    period: 'Aug 2022 – Feb 2023 (7 Months)',
    title: 'Hybrid Convolution BERT Attention & 6-DOF Robotic Arm RL',
    description: 'Reduced transformer inference cost by 22% by redesigning BERT self-attention mechanisms with localized hybrid convolution block heads. Contributed to Gazebo simulation modeling and evaluated continuous action space reinforcement learning control policies for motion control of a 6-DOF robotic arm.',
    metrics: 'Inference Cost: -22% · 6-DOF Robotic Arm · Gazebo RL Simulation',
    logs: [
      { type: 'accent', text: '[RESEARCH] Profiling transformer attention bottlenecks on NLP benchmark.' },
      { type: 'highlight', text: '[ATTENTION] Redesigning quadratic self-attention using 1D hybrid convolution heads.' },
      { type: 'success', text: '[BENCHMARK] Inference memory footprint reduced by 22% with zero perplexity loss.' },
      { type: 'log', text: '[SIMULATION] Initializing Gazebo physics environment for 6-DOF robotic arm.' },
      { type: 'highlight', text: '[RL-CONTROL] Training continuous action space PPO agent for obstacle avoidance.' },
      { type: 'success', text: '[OUTPUT] Verified trajectory convergence across 10,000 robotic simulation epochs.' }
    ]
  },
  verzeo: {
    name: 'Verzeo',
    role: 'DATA SCIENCE INTERN · BENGALURU',
    period: 'May 2021 – Jul 2021 (3 Months)',
    title: 'NLP Sentiment Analysis & Affective Signal Mining',
    description: 'Built and evaluated natural language processing (NLP) sentiment analysis models to extract subjective signals and affective states from high-volume unstructured text data. Conducted exploratory data analysis (EDA) to surface statistical patterns and derive actionable insights from unstructured sources.',
    metrics: 'Affective State Modeling · Statistical EDA · Unstructured Text Mining',
    logs: [
      { type: 'accent', text: '[INGEST] Ingesting multi-channel unstructured text corpus for sentiment mining.' },
      { type: 'log', text: '[EDA] Conducting exploratory data analysis: token frequency, n-grams, and TF-IDF.' },
      { type: 'highlight', text: '[PREPROCESS] Text normalization: lemmatization, stop-word pruning, and syntax tagging.' },
      { type: 'highlight', text: '[MODELING] Training multi-class sentiment classifier for affective state extraction.' },
      { type: 'success', text: '[EVALUATION] Achieved 91.4% classification accuracy across validation holdout set.' },
      { type: 'success', text: '[INSIGHTS] Automated analytical reporting pipeline delivering actionable signal trends.' }
    ]
  }
};

export function initWorkflowScrubber() {
  const container = document.getElementById('workflow-scrubber');
  if (!container) return;

  const tabs = container.querySelectorAll('.scrubber-tab');
  const terminal = container.querySelector('.scrubber-terminal');
  const roleEl = container.querySelector('.scrubber-node-role');
  const periodEl = container.querySelector('.scrubber-period-badge');
  const titleEl = container.querySelector('.scrubber-node-title');
  const descEl = container.querySelector('.scrubber-node-desc');
  const metricsEl = container.querySelector('.scrubber-node-metrics');
  const playBtn = container.querySelector('.scrubber-play-btn');
  const progressFill = container.querySelector('.scrubber-progress-fill');
  const timecode = container.querySelector('.scrubber-timecode');

  let currentKey = 'mcp';
  let isPlaying = true;
  let logStep = 0;
  let progress = 35;
  let timer = null;

  function renderScenario(key) {
    currentKey = key;
    const data = workflowScenarios[key];
    if (!data) return;

    if (roleEl && data.role) roleEl.textContent = data.role;
    if (periodEl && data.period) periodEl.textContent = data.period;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    if (metricsEl) metricsEl.textContent = data.metrics;

    renderLogs(data.logs);
  }

  function renderLogs(logs) {
    if (!terminal) return;
    terminal.innerHTML = logs
      .map((l) => {
        let cls = '';
        if (l.type === 'success') cls = 'log-success';
        else if (l.type === 'accent') cls = 'log-accent';
        else if (l.type === 'highlight') cls = 'log-highlight';
        return `<div class="${cls}">❯ ${l.text}</div>`;
      })
      .join('');
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Scrubber loop with IntersectionObserver pause
  function tick() {
    if (!isPlaying) return;
    progress = (progress + 1.2) % 100;
    if (progressFill) progressFill.style.width = `${progress}%`;

    const seconds = Math.floor((progress / 100) * 92);
    const m = Math.floor(seconds / 60);
    const s = String(seconds % 60).padStart(2, '0');
    if (timecode) timecode.textContent = `0:${s} / 1:32`;
  }

  function startTicker() {
    if (!timer && isPlaying) {
      timer = setInterval(tick, 150);
    }
  }

  function stopTicker() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  if ('IntersectionObserver' in window) {
    const scrubberObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTicker();
        } else {
          stopTicker();
        }
      });
    }, { threshold: 0.1 });
    scrubberObserver.observe(container);
  } else {
    startTicker();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTicker();
    } else {
      startTicker();
    }
  });

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.dataset.scenario;
      playBlip(580, 0.04);
      renderScenario(key);
    });
  });

  // Play / Pause
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.innerHTML = isPlaying ? '❚❚' : '▶';
      playBlip(640, 0.03);
      if (isPlaying) startTicker();
      else stopTicker();
    });
  }

  // Initial render
  renderScenario('mcp');
}
