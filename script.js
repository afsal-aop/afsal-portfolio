/* ============================================================
   AFSAL AOP — Portfolio Interactivity
   Handles: Navigation, Modal System, Scroll Reveals,
   Active Section Tracking, Smooth Scrolling
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const navbar     = document.querySelector('.navbar');
  const navLinks   = document.querySelector('.nav-links');
  const navToggle  = document.querySelector('.nav-toggle');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections   = document.querySelectorAll('.section, .hero');
  const modal      = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const revealEls  = document.querySelectorAll('.reveal, .stagger-children');

  /* ============================================================
     PROJECT DATA STORE
     Each project's modal content is stored here for easy editing.
     ============================================================ */
  const projectData = {
    /* ---------- AI & ML ---------- */
    'hand-sign': {
      title: 'Real-Time Hand Sign Detection',
      category: 'AI & Machine Learning',
      image: 'assets/hand_sign_detection.jpg',
      about: 'Built a real-time hand gesture recognition system using MediaPipe and OpenCV. | Extracted 21 hand landmark coordinates and trained a classification model for gesture prediction. | Generated a custom dataset using captured landmark data for multiple hand signs. | Implemented real-time inference using webcam input to display predicted gestures instantly. | Applied NumPy and Scikit-learn/TensorFlow for model training and prediction.',
      techStack: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'NumPy', 'Scikit-learn'],
      github: '#',
      demo: '#'
    },
    'cow-breed': {
      title: 'Cow Breed Classification',
      category: 'AI & Machine Learning',
      image: 'assets/cow_breed.png',
      about: 'An AI model designed specifically for predicting cow breeds from images. | A MobileNetV2 neural network analyzes uploaded photos or camera feeds to output the specific cow breed and its confidence score. | Automated dataset splitting, fine-tuned transfer learning, TFLite conversion for mobile deployment, and dual web interfaces. | A deep learning backend connected to interactive web frontends, allowing users to upload or snap photos for instant prediction. | A smart agricultural tool for farmers and researchers to quickly identify and predict cow breeds on the fly.',
      techStack: ['Python', 'TensorFlow', 'OpenCV', 'Streamlit', 'Gradio'],
      github: '#',
      demo: '#'
    },
    'pneumonia': {
      title: 'Pneumonia Detection',
      category: 'AI & Machine Learning',
      image: 'assets/medical_imaging.jpg',
      about: 'A deep learning system that classifies chest X-rays for pneumonia using clinically-grounded spatial attention. | It processes X-ray images through a neural network, applying custom spatial weights to different lung zones (e.g., heavily weighting the lower lung) to calculate a pneumonia probability score. | Built-in image validation to reject non-X-ray images, clinical zone weighting priors, a conservative prediction threshold of 0.65, and visual heatmap generation. | A pre-trained ResNet18 feature extractor coupled with a custom spatial attention layer and a classifier head, connected to an inference API that processes base64 images and returns JSON. | To assist medical professionals by diagnosing pneumonia from radiographs and providing interpretable spatial heatmaps for clinical explainability.',
      techStack: ['Python', 'PyTorch', 'Torchvision', 'Matplotlib', 'PIL'],
      github: '#',
      demo: '#'
    },
    'dental': {
      title: 'Dental Cavity Detection',
      category: 'AI & Machine Learning',
      image: 'assets/dental.png',
      about: 'Built an end-to-end AI system for detecting dental issues from radiographic images using YOLOv8. | Trained an object detection model to identify problem regions with bounding box predictions. | Developed a FastAPI backend to process images and return real-time diagnostic results. | Designed a Next.js 14 dashboard for uploading X-rays and visualizing predictions. | Integrated Supabase for managing patient data, authentication, and diagnostic history. | Enabled real-time detection using OpenCV for live image inputs.',
      techStack: ['Python', 'YOLOv8', 'OpenCV', 'Roboflow', 'FastAPI', 'PIL'],
      github: '#',
      demo: '#'
    },
    'fraud': {
      title: 'Credit Card Fraud Detection',
      category: 'AI & Machine Learning',
      image: 'assets/fraud_detection.png',
      about: 'A deep learning system that classifies credit card transactions as fraudulent or legitimate. | It analyzes transaction metrics through a neural network to calculate a real-time fraud probability score. | Automated data scaling, interactive dashboard, and instant probability scoring. | A Sequential neural network model integrated with a web-based interactive frontend. | A financial security tool used to instantly identify and flag fraudulent credit card charges.',
      techStack: ['Python', 'Scikit-learn', 'TensorFlow/Keras', 'Streamlit'],
      github: '#',
      demo: '#'
    },
    'eye-tracking': {
      title: 'Eye-Tracking Virtual Mouse',
      category: 'AI & Machine Learning',
      image: 'assets/eye_mouse.png',
      about: 'A Python-based accessibility tool that allows users to control their computer mouse hands-free using eye movements. | The script uses a webcam to monitor facial landmarks, mapping the user`s iris position to screen coordinates to move the cursor, while monitoring eye aspect ratios to detect double-blinks for clicking. | Real-time iris tracking for smooth cursor movement, double-blink detection for left-clicking, and a lightweight graphical interface to start or stop the camera feed. | A multithreaded desktop application where a Tkinter frontend manages a background computer vision loop that processes live webcam frames without freezing the UI. | An assistive technology solution designed to enable hands-free computer navigation for users with physical mobility limitations.',
      techStack: ['Python', 'OpenCV', 'Machine Learning', 'PyAutoGUI', 'Tkinter'],
      github: '#',
      demo: '#'
    },
    'digital-twin-mice': {
      title: 'Digital Twin for Laboratory Mice',
      category: 'AI & Machine Learning',
      image: 'assets/lab_mice.png',
      about: 'A virtual lab mouse simulation using a Random Forest classifier to predict pharmacological outcomes. | The ML model analyzes the drug type and dosage parameters to classify the expected toxicity level (Healthy, Toxic, or Lethal). | Interactive 3D lab mice, real-time ML toxicity predictions, and dynamic Pharmacokinetics charts. | The UI sends injection parameters to the Python backend, where the trained Random Forest model predicts the health state and triggers the corresponding 3D animation. | A cruelty-free, predictive AI environment for testing drug toxicity without physical animal subjects.',
      techStack: ['Three.js', 'Python', 'Scikit-Learn', 'Random Forest', 'Blender'],
      github: '#',
      demo: '#'
    },

    /* ---------- Robotics & IoT ---------- */
    'robo-car': {
      title: 'Bluetooth-Controlled Robotic Car',
      category: 'Robotics & IoT',
      image: 'assets/robotics_cover.jpg',
      about: 'A Bluetooth-controlled robotic car prototype designed to demonstrate embedded hardware integration and wireless teleoperation. | A paired Bluetooth device (like a smartphone app) transmits character commands. The Arduino receives these over serial communication, parses the intent, and outputs corresponding signals to the drivetrain and steering mechanisms. | Wireless Bluetooth navigation, servo-actuated precision steering, multi-directional DC motor control, and real-time operational feedback via serial monitor. | A localized embedded system where the Arduino serves as the central processing unit, bridging low-voltage wireless serial data from the Bluetooth receiver into high-current physical actuation via motor drivers and PWM channels. | An educational robotics build utilized to bridge the gap between software programming and physical engineering, mastering the fundamentals of wireless automation and motor control.',
      techStack: ['Arduino UNO', 'L298N', 'DC Motors', 'Servo Motor', 'HC-05', 'C++'],
      github: '#',
      demo: '#'
    },
    'vacuum': {
      title: 'Autonomous Vacuum Cleaner',
      category: 'Robotics & IoT',
      image: 'assets/vacum_cleaner.png',
      about: 'An autonomous, Arduino-powered robotic vacuum cleaner | The robot drives forward until its ultrasonic sensor detects an obstacle within 15cm; it then stops, reverses, scans left and right using a servo motor, and turns toward the clearest path to continue cleaning. | Automated obstacle avoidance, multi-directional distance scanning, and smooth motor acceleration for maneuvering. | A reactive control loop running on an Arduino microcontroller, where real-time sensor inputs dictate the directional outputs of an Adafruit Motor Shield driving the wheels and vacuum fan. | A DIY hardware project designed to autonomously roam and clean open floor spaces without human intervention.',
      techStack: ['Arduino UNO', 'AFMotor', 'C++', 'DC Motors', 'NewPing', 'Ultra sonic','Servo Motor', 'Adafruit Motor Shield'],
      github: '#',
      demo: '#'
    },
    'digital-twin-robot': {
      title: 'Digital Twin of Mobile Robot',
      category: 'Robotics & IoT',
      image: 'assets/digital_twin.PNG',
      about: 'A digital twin system that synchronizes a physical two-wheeled mobile robot with a 3D virtual simulation in real time. | ROS 2 sends movement commands to both the physical robot and simulation simultaneously, using real-world wheel encoder feedback to lock the virtual model to the real robot`s exact position. | Real-time 1:1 hardware-to-simulation sync, dual control modes (keyboard and joystick), visual Action Graph control logic, and encoder odometry tracking. | The simulation runs in Isaac Sim while a Raspberry Pi and Arduino Nano drive the physical motors, both connected seamlessly over ROS 2 communication topics (/cmd_vel and /odom). | Provides an educational and prototyping platform for robotics developers to safely test, tune, and monitor autonomous vehicle controls in virtual space before physical deployment.',
      techStack: ['NVIDIA Isaac Sim', 'ROS 2', 'Python', 'C++', 'Ubuntu 22.04', 'Raspberry Pi 4', 'Arduino Nano'],
      github: '#',
      demo: '#'
    },
    'autonomous-driving': {
      title: 'Self-Driving Car in Isaac Sim',
      category: 'Robotics & IoT',
      image: 'assets/autonomous_driving.jpg',
      about: 'An autonomous self-driving car simulated in NVIDIA Isaac Sim using machine learning for lane tracking and computer vision for sign recognition. | A CNN processes camera frames to steer the car along the road, while OpenCV detects ArUco markers to execute priority driving commands. | Vision-based lane following, real-time ArUco navigation overrides (stop, speed up, turn), and built-in teleoperation data collection. | ROS 2 streams camera feeds from Isaac Sim into a PyTorch model and ArUco pipeline, publishing steering and velocity commands back to the vehicle. | A safe simulation testbed to train, test, and validate vision-based autonomous driving systems before deploying them to physical robots.',
      techStack: ['NVIDIA Isaac Sim', 'Python', 'ROS 2', 'OpenCV', 'PyTorch'],
      github: '#',
      demo: '#'
    },
    'richi-mini': {
      title: 'Richi Mini Robot',
      category: 'Robotics & IoT',
      image: 'assets/richi_mini.jpeg',
      about: 'A conversational companion robot that integrates speech-to-text, a large language model (LLM), and text-to-speech for natural dialogue. Richi Mini runs on a Raspberry Pi 4 with a custom 3D-printed enclosure, servo-actuated expressions, and a speaker/microphone array. The robot uses Whisper for speech recognition and a locally hosted LLaMA model for generating contextual responses.',
      techStack: ['Raspberry Pi 4', 'Whisper STT', 'LLaMA', 'gTTS', 'Servo Motors', 'Python'],
      github: '#',
      demo: '#'
    },
    'turtlebot': {
      title: 'TurtleBot Navigation',
      category: 'Robotics & IoT',
      image: 'assets/turtle_bot.png',
      about: 'A workflow for implementing SLAM mapping and autonomous navigation using the TurtleBot 4 on ROS 2 Humble. | The robot scans its surroundings via LiDAR to build a 2D floor plan, saves it, and then uses that map to drive to specific coordinates. | Synchronous or asynchronous SLAM mapping, RViz real-time visualization, map file saving, and interactive goal-setting. | SLAM creates .yaml and .pgm map files, the localization module finds the robot`s starting pose, and Nav2 plans the route to the target destination. | ',
      techStack: ['TurtleBot4', 'ROS 2 Humble', 'Nav2', 'SLAM Toolbox', 'RViz'],
      github: '#',
      demo: '#'
    },

    /* ---------- Agentic AI & Software ---------- */
    'code-refactor': {
      title: 'Agentic AI Codebase Refactoring Assistant',
      category: 'Agentic AI & Software',
      image: 'assets/self_heal.png',
      about: 'A zero-infrastructure multi-agent proxy system that intercepts API schema drift and heals payloads dynamically. | The system catches API errors, uses an LLM to infer payload fixes, caches the solution in PostgreSQL, and routes traffic via an async event bus. | Zero-trust security validation, lossless AST code patching, agentic SLA negotiation, and chaos engineering stress testing. | An event-driven central orchestrator coordinates plug-and-play autonomous sub-agents (Security, AST Patching, Stress Test) to validate, heal, and permanently patch code. | To ensure 100% API uptime by autonomously fixing broken schemas on the fly and generating GitHub Pull Requests for permanent source code fixes.',
      techStack: ['Python', 'FastAPI', 'Pydantic', 'LibCST', 'PostgreSQL', 'Groq'],
      github: '#',
      demo: '#'
    },
    'shopping-agent': {
      title: 'AI shopping assistant chatbot',
      category: 'Agentic AI',
      image: 'assets/shoping_assistant.png',
      about: 'An AI shopping assistant chatbot that helps users discover and purchase products using text or images. | The AI processes user inputs or photos, searches the store database, fetches reviews, and processes user-confirmed orders. | Image-based product search, dynamic price and rating filtering, and an automated checkout tool. | An interactive e-commerce tool for customers to easily shop conversationally without navigating traditional website menus.',
      techStack: ['Python', 'SQLite', 'LangChain', 'Groq', 'Qwen', 'Streamlit'],
      github: '#',
      demo: '#'
    },
    'telecom-chatbot': {
      title: 'AI-Powered Telecom Customer Service Chatbot',
      category: 'Agentic AI & Software',
      image: 'assets/agentic_ai_cover.jpg',
      about: 'A telecom customer support chatbot that uses RAG (Retrieval-Augmented Generation) to answer queries about mobile services, connectivity, and billing. | User questions are matched against a multi-source Chroma vector database, and relevant context is passed to the AI to generate grounded support responses. | Multi-source context retrieval, pre-populated sample questions, dynamic document chunking (for PDFs), and stream-based chat UI. | Separate ingest scripts feed FAQs, PDFs, and resolved SQLite tickets into independent Chroma collections; a merged retriever pulls context from all three to inform the LLM via LangChain. | Designed to provide fast, accurate troubleshooting and policy information to telecom customers, reducing the need for live agent escalation.',
      techStack: ['Python', 'Streamlit', 'LangChain', 'Chroma', 'SQLite', 'HuggingFace'],
      github: '#',
      demo: '#'
    },
    'elearning': {
      title: 'AI-Powered E-Learning Platform',
      category: 'Agentic AI & Software',
      image: 'assets/eduai.png',
      about: 'An AI-integrated e-learning platform that combines academic modules, games, and quizzes with machine learning analytics. | Students complete gamified quizzes, while a background ML model evaluates their data to predict future academic performance. | Gamified learning (avatars/badges), subject-specific quizzes, progress dashboards, and predictive student grade modeling. | A client-server web app where a Python backend serves interactive frontend pages and queries a pre-trained ML model for analytics. | To provide a digital learning environment that teaches core subjects while using data science to forecast student outcomes.',
      techStack: ['Python', 'Jupyter Notebook', 'JSON', 'HTML', 'CSS', 'JavaScript'],
      github: '#',
      demo: '#'
    },
    'asset-mgmt': {
      title: 'Asset & Inventory Management System',
      category: 'Agentic AI & Software',
      image: 'assets/appsheet.png',
      about: 'Built a University Asset & Inventory Management application using Google AppSheet. | Structured relational data across departments, assets, and transaction logs. | Automated workflows, reducing manual data entry efforts significantly. | Enforced validation rules to eliminate duplicate asset allocation. | Designed mobile-friendly interfaces for real-time asset tracking. | Managed tracking for 100+ assets during testing, improving accuracy and reducing manual errors.',
      techStack: ['Google AppSheet', 'Google Sheets', 'AppSheet Expressions', 'Workflow Automation', 'Data Management', 'Bootstrap'],
      github: '#',
      demo: '#'
    },
    'manworx-platform': {
      title: 'Manworx E-Commerce Platform',
      category: 'Software',
      image: 'assets/manworx.png',
      about: 'An e-commerce website for a men"s fashion brand named ManWorx. | Users navigate through interconnected static web pages to browse clothing, read fashion blogs, and manage items in a shopping cart UI. | Product catalog, shopping cart layout, blog section, contact form with an embedded Google Map, and a mobile-friendly hamburger menu. | A multi-page static web structure utilizing CSS Flexbox and media queries to dynamically adjust the layout for desktop, tablet, and mobile screens.',
      techStack: ['JavaScript', 'FontAwesome', 'CSS3','HTML5'],
      github: '#',
      demo: '#'
    },

    /* ---------- Hackathons ---------- */
    'maritime-disaster': {
      title: 'Smart Maritime Disaster Warning System',
      category: 'Hackathon',
      image: 'assets/iot_maritime.jpg',
      about: 'A maritime safety system that predicts operational hazards and delivers automated alerts, SMS, and voice calls, utilizing mesh networking for deep-sea reach. | An ML risk model assesses sea conditions and triggers localized communications (calls/SMS), routing these alerts through a mesh network to connect with vessels far from shore. | Predictive hazard modeling, multilingual automated voice and SMS alerts, long-range mesh networking connectivity, and an interactive warning dashboard. | A Python backend queries the ML model for risk scores and dispatches Twilio alerts, while a decentralized mesh network relays these critical warnings from boat to boat beyond standard cellular range. | An early warning system that protects fishermen and coastal vessels by ensuring life-saving, native-language alerts reach them even in remote waters.',
      techStack: ['Python', 'Scikit-Learn', 'Twilio', 'Mesh Networking','Machine Learning'],
      github: '#',
      demo: '#'
    },
    'women-entrepreneurship': {
      title: 'AI-Powered Artisan Marketplace',
      category: 'Hackathon',
      image: 'assets/woman_web.png',
      about: 'A digital e-commerce and support platform designed to empower local artisans and showcase handmade products. | The platform connects artisans with buyers through a map-based marketplace, using AI tools and chatbots to help sellers manage listings, translate languages, and track their business impact. | interactive impact dashboard, custom location mapping, multi-language translation, AI assistant pipeline, and integrated communication bots (Telegram/WhatsApp). | A decoupled system where a React web frontend interacts with a Python AI backend and a Supabase database, while a standalone Node.js microservice handles Telegram bot communications.| To digitize traditional artisan businesses, providing them with AI-driven seller tools, multilingual support, and a direct-to-consumer marketplace.',
      techStack: ['Python', 'React', 'AI', 'Node.js', 'Supabase'],
      github: '#',
      demo: '#'
    },
    'hack-cow-breed': {
      title: 'Cow Breed Classification',
      category: 'Hackathon',
      image: 'assets/cow_breed.png',
      about: 'An AI model designed specifically for predicting cow breeds from images. | A MobileNetV2 neural network analyzes uploaded photos or camera feeds to output the specific cow breed and its confidence score. | Automated dataset splitting, fine-tuned transfer learning, TFLite conversion for mobile deployment, and dual web interfaces. | A deep learning backend connected to interactive web frontends, allowing users to upload or snap photos for instant prediction. | A smart agricultural tool for farmers and researchers to quickly identify and predict cow breeds on the fly.',
      techStack: ['Python', 'TensorFlow', 'OpenCV', 'Streamlit', 'Gradio'],
      github: '#',
      demo: '#'
    },
    'hack-pneumonia': {
      title: 'Pneumonia Detection Using Medical Imaging',
      category: 'Hackathon',
      image: 'assets/medical_imaging.jpg',
      about: 'A deep learning system that classifies chest X-rays for pneumonia using clinically-grounded spatial attention. | It processes X-ray images through a neural network, applying custom spatial weights to different lung zones (e.g., heavily weighting the lower lung) to calculate a pneumonia probability score. | Built-in image validation to reject non-X-ray images, clinical zone weighting priors, a conservative prediction threshold of 0.65, and visual heatmap generation. | A pre-trained ResNet18 feature extractor coupled with a custom spatial attention layer and a classifier head, connected to an inference API that processes base64 images and returns JSON. | To assist medical professionals by diagnosing pneumonia from radiographs and providing interpretable spatial heatmaps for clinical explainability.',
      techStack: ['Python', 'PyTorch', 'Torchvision', 'Matplotlib', 'PIL'],
      github: '#',
      demo: '#'
    },
    'hack-code-refactor': {
      title: 'Self-Healing API Proxy',
      category: 'Hackathon',
      image: 'assets/self_heal.png',
      about: 'A zero-infrastructure multi-agent proxy system that intercepts API schema drift and heals payloads dynamically. | The system catches API errors, uses an LLM to infer payload fixes, caches the solution in PostgreSQL, and routes traffic via an async event bus. | Zero-trust security validation, lossless AST code patching, agentic SLA negotiation, and chaos engineering stress testing. | An event-driven central orchestrator coordinates plug-and-play autonomous sub-agents (Security, AST Patching, Stress Test) to validate, heal, and permanently patch code. | To ensure 100% API uptime by autonomously fixing broken schemas on the fly and generating GitHub Pull Requests for permanent source code fixes.',
      techStack: ['Python', 'FastAPI', 'Pydantic', 'LibCST', 'PostgreSQL', 'Groq'],
      github: '#',
      demo: '#'
    }
  };


  /* ============================================================
     NAVBAR – Scroll Shadow & Active Section Tracking
     ============================================================ */
  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      if (!id) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  /* ---------- Mobile Menu ---------- */
  function toggleMobileMenu() {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  }

  navToggle.addEventListener('click', toggleMobileMenu);

  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  });

  /* ============================================================
     MODAL SYSTEM
     ============================================================ */
  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalAbout').textContent = data.about;
    document.getElementById('modalGithub').href = data.github;
    document.getElementById('modalDemo').href = data.demo;

    // Tech stack tags
    const techContainer = document.getElementById('modalTechStack');
    techContainer.innerHTML = '';
    data.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  // Attach click handlers to all project cards
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset.project);
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ============================================================
     SCROLL REVEAL (Intersection Observer)
     ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve to avoid re-triggering
          // revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ============================================================
     SMOOTH SCROLL (Polyfill for browsers without native support)
     ============================================================ */
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     EVENT LISTENERS
     ============================================================ */
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveNav();
  }, { passive: true });

  // Initial calls
  handleNavbarScroll();
  updateActiveNav();

})();
