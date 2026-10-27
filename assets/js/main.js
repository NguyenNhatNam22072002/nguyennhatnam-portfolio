// Detailed Case Study Data including code architecture snippets
const caseStudies = {
  clearhear: {
    title: "ClearHear App",
    subtitle: "On-Device Live Speech Captioning & Offline LLM Summarization",
    category: "Artificial Intelligence & Edge Computing",
    role: "Lead Mobile Developer (Flutter)",
    overview: "ClearHear is a privacy-first mobile application built for environments where spoken audio cannot be sent to cloud servers (such as medical consultations, legal depositions, and private executive boardrooms). By packaging sherpa-onnx and flutter_llama directly inside the Flutter bundle, it achieves real-time speech transcription and automated meeting notes generation with 0ms network latency and zero recurring server costs.",
    techStack: ["Flutter", "Dart", "GetX Pattern", "ONNX Runtime", "sherpa-onnx (Offline STT)", "flutter_llama (Qwen2.5 GGUF)", "SQLite (sqflite)", "Custom Canvas Audio Waveforms"],
    screenshots: [
      { src: "assets/images/clearhear_main.png", title: "Live Speech-to-Text & Diarization" },
      { src: "assets/images/clearhear_session_detail.jpg", title: "Local Qwen LLM Meeting Notes" },
      { src: "assets/images/clearhear_settings.png", title: "Privacy Controls & Neural Model Config" }
    ],
    codeSnippet: `// Isolate-Driven Offline STT Pipeline
class SherpaOfflineEngine {
  late final SendPort _workerSendPort;

  Future<void> initEngine() async {
    final receivePort = ReceivePort();
    await Isolate.spawn(_inferenceWorker, receivePort.sendPort);
    _workerSendPort = await receivePort.first as SendPort;
  }

  void streamPcmChunk(Uint8List pcmBuffer) {
    _workerSendPort.send(AudioChunkMessage(pcmBuffer));
  }
}`,
    deepDive: [
      {
        title: "1. Real-Time Offline Speech-to-Text Engine (sherpa-onnx)",
        description: "Integrated the C++ sherpa-onnx speech recognition engine via Dart FFI. Audio buffers from the device microphone are continuously sampled at 16kHz in 100ms frames and offloaded to a dedicated background Isolate. This ensures the main UI thread consistently runs at a fluid 60 FPS without frame drops during heavy neural inference."
      },
      {
        title: "2. Quantized On-Device LLM (flutter_llama / Qwen2.5 GGUF)",
        description: "Compiled llama.cpp native libraries to run 4-bit quantized Qwen2.5 (0.5B / 1.5B) GGUF weights. Upon session completion, the raw conversation transcript is processed strictly inside local RAM/NPU. The app automatically synthesizes speaker-labeled summaries, action items, and topic tags within seconds."
      },
      {
        title: "3. Live Audio Waveform Canvas & Reactive Diarization",
        description: "Developed a custom Painter visualizer calculating real-time RMS (Root Mean Square) decibels from microphone input buffers. Used GetX reactive state management to trigger instant speaker badge transitions (diarization) as different speakers talk."
      }
    ]
  },
  canvas: {
    title: "Canvas Living (Generator)",
    subtitle: "White-Label Community Living Platform (20+ Commercial Brands)",
    category: "Enterprise Multi-Tenant Mobile Ecosystem",
    role: "Mobile Developer (Android Native Kotlin & iOS Swift)",
    overview: "Canvas Living is a multi-tenant mobile platform engineered for premier student housing operators and luxury residential communities across the globe. Rather than maintaining dozens of distinct codebases, we architected a white-label generator pipeline supporting 20+ distinct brand variants (Brookland, Catalina, Aura Holdings, Ingenia, Serenity Pines) from a unified clean architecture repository.",
    techStack: ["Kotlin", "Java", "Swift", "Android SDK", "iOS UIKit", "Clean Architecture", "MVVM Pattern", "Gradle Flavors", "Xcode Configurations", "Firebase Cloud Messaging (FCM)"],
    screenshots: [
      { src: "assets/images/canvas_screen_facilities.jpg", title: "Amenity Scheduling & Facility Passes" },
      { src: "assets/images/canvas_screen_feed.jpg", title: "Interactive Community Feed & Events" },
      { src: "assets/images/canvas_screen_services.jpg", title: "Apartment On-Demand Services" }
    ],
    storeLink: "https://apps.apple.com/vn/app/serenity-pines/id6478105349?l=vi",
    codeSnippet: `// Multi-Flavor Variant Configuration (Gradle)
flavorDimensions "brand"
productFlavors {
    serenityPines {
        dimension "brand"
        applicationId "com.canvas.serenitypines"
        resValue "string", "app_name", "Serenity Pines"
    }
    catalina {
        dimension "brand"
        applicationId "com.canvas.catalina"
        resValue "string", "app_name", "Catalina Living"
    }
}`,
    deepDive: [
      {
        title: "1. Multi-Flavor & Multi-Target Build Orchestration",
        description: "Constructed modular productFlavors in Gradle (Android) and Build Schemes/xcconfig in Xcode (iOS). Automated scripts dynamically inject brand logos, brand color palettes, API base URLs, and store credentials at compilation time, cutting client update cycles by over 80%."
      },
      {
        title: "2. Clean Architecture with Strict MVVM Separation",
        description: "Separated Domain UseCases (AmenityBookingUseCase, FeedRepository, ResidentProfile) from presentation ViewModels. ViewModels emit state streams via Coroutines Flow / Combine, ensuring robust crash resistance and seamless offline caching."
      },
      {
        title: "3. Universal Links & Push Notification Routing",
        description: "Engineered deep linking via Android App Links and Apple Universal Links paired with Firebase Cloud Messaging. Tapping a notification routes residents straight to their specific lease notice, gate QR pass, or maintenance ticket."
      }
    ]
  },
  vesta: {
    title: "Rentle Mobile (Vesta App)",
    subtitle: "PropTech Tenant Lifecycle & In-App Contract Signing Platform",
    category: "Fintech & Property Management",
    role: "Mobile Engineer (Flutter)",
    overview: "Vesta App is a complete commercial PropTech mobile application that digitizes every stage of the residential tenant journey: from discovering verified listings and uploading digital KYC credentials, to signing legally binding lease contracts directly on the phone screen and handling recurring payments.",
    techStack: ["Flutter", "Dart", "Clean Architecture", "GetIt", "WatchIt", "Retrofit", "Dio", "SSL Pinning", "iOS Keychain / Android Keystore"],
    screenshots: [
      { src: "assets/images/vesta_stay_in_control.jpg", title: "Resident Dashboard & Quick Controls" },
      { src: "assets/images/vesta_community.jpg", title: "Building Notices & Community Hub" },
      { src: "assets/images/vesta_support.jpg", title: "Document Vault & Signed Leases" }
    ],
    storeLink: "https://apps.apple.com/vn/app/vesta/id1497335423?l=vi",
    codeSnippet: `// Biometric Digital Signature & Keystore Encryption
class SecureSignatureVault {
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  Future<void> storeSignedContract({
    required String contractId,
    required Uint8List signatureBytes,
  }) async {
    final encryptedSignature = await encryptPayload(signatureBytes);
    await _storage.write(key: 'sig_$contractId', value: encryptedSignature);
  }
}`,
    deepDive: [
      {
        title: "1. Digital E-Signature Capture & Document Stamping",
        description: "Built a custom touch gesture signature pad using Bezier curve interpolation to capture high-fidelity vector signatures. The signature is rendered and embedded directly into encrypted PDF tenancy agreements on device."
      },
      {
        title: "2. Banking-Grade Security & Network SSL Pinning",
        description: "Protected client data with SSL Certificate Pinning through Dio interceptors to block Man-in-the-Middle (MITM) vulnerabilities. Sensitive authentication tokens and user biometric keys are stored in hardware-backed iOS Keychain and Android Keystore."
      },
      {
        title: "3. Service Locator & Reactive Dependency Injection",
        description: "Leveraged GetIt paired with WatchIt to maintain a lightweight, highly decoupled architectural foundation. Provides lightning-fast navigation, zero memory leaks, and frictionless unit testing coverage."
      }
    ]
  }
};

// Hero Simulator App Switcher
function switchSimApp(type) {
  document.getElementById('sim-screen-clearhear').style.display = 'none';
  document.getElementById('sim-screen-canvas').style.display = 'none';
  document.getElementById('sim-screen-vesta').style.display = 'none';

  document.getElementById('btn-tab-clearhear').classList.remove('active');
  document.getElementById('btn-tab-canvas').classList.remove('active');
  document.getElementById('btn-tab-vesta').classList.remove('active');

  if (type === 'clearhear') {
    document.getElementById('sim-screen-clearhear').style.display = 'flex';
    document.getElementById('btn-tab-clearhear').classList.add('active');
  } else if (type === 'canvas') {
    document.getElementById('sim-screen-canvas').style.display = 'flex';
    document.getElementById('btn-tab-canvas').classList.add('active');
  } else if (type === 'vesta') {
    document.getElementById('sim-screen-vesta').style.display = 'flex';
    document.getElementById('btn-tab-vesta').classList.add('active');
    initSignatureCanvas();
  }
}

// Waveform Simulator Animation for ClearHear
function initWaveforms() {
  const container = document.getElementById('sim-waveforms');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const bar = document.createElement('div');
    bar.className = 'sim-waveform-bar';
    bar.style.height = `${Math.floor(Math.random() * 24 + 6)}px`;
    container.appendChild(bar);
  }
  setInterval(() => {
    const screen = document.getElementById('sim-screen-clearhear');
    if (screen && screen.style.display !== 'none') {
      const bars = document.querySelectorAll('.sim-waveform-bar');
      bars.forEach(b => {
        b.style.height = `${Math.floor(Math.random() * 28 + 6)}px`;
      });
    }
  }, 200);
}

// Voice STT Simulation
const sampleSentences = [
  { speaker: "Speaker 1", time: "00:15", text: "Latency is below 80 milliseconds across all audio frames." },
  { speaker: "Speaker 2", time: "00:21", text: "Zero network packets transmitted during entire conversation." },
  { speaker: "Speaker 1", time: "00:28", text: "Ready to trigger on-device Qwen2.5 GGUF summarization." }
];
let sentenceIdx = 0;
function simAddSpeech() {
  if (sentenceIdx >= sampleSentences.length) sentenceIdx = 0;
  const s = sampleSentences[sentenceIdx++];
  const box = document.getElementById('sim-transcript-box');
  if (!box) return;
  const bubble = document.createElement('div');
  bubble.className = 'sim-chat-bubble';
  bubble.style.background = s.speaker === 'Speaker 1' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(192, 132, 252, 0.15)';
  bubble.style.border = s.speaker === 'Speaker 1' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(192, 132, 252, 0.3)';
  bubble.innerHTML = `
    <div style="font-size: 0.68rem; color: ${s.speaker === 'Speaker 1' ? '#38bdf8' : '#c084fc'}; font-weight: 700; margin-bottom: 2px;">${s.speaker} • ${s.time}</div>
    <div>${s.text}</div>
  `;
  box.appendChild(bubble);
  box.scrollTop = box.scrollHeight;
}

function simSummarize() {
  const box = document.getElementById('sim-transcript-box');
  if (!box) return;
  const summaryBubble = document.createElement('div');
  summaryBubble.className = 'sim-chat-bubble';
  summaryBubble.style.background = 'rgba(16, 185, 129, 0.2)';
  summaryBubble.style.border = '1px solid rgba(16, 185, 129, 0.4)';
  summaryBubble.innerHTML = `
    <div style="font-size: 0.68rem; color: #34d399; font-weight: 700; margin-bottom: 2px;">⚡ Qwen2.5 Local Summary (Generated in 1.2s)</div>
    <div style="font-size: 0.75rem; color: #fff;">• Speech verified offline via sherpa-onnx.<br>• 100% privacy maintained with zero backend data transmission.</div>
  `;
  box.appendChild(summaryBubble);
  box.scrollTop = box.scrollHeight;
}

// Canvas White-Label Tenant Switcher
function switchTenant(name, color) {
  const title = document.getElementById('sim-canvas-brand-title');
  if (title) {
    title.innerText = name;
    title.style.color = color;
  }
  document.querySelectorAll('#sim-screen-canvas .tech-pill').forEach(p => p.classList.remove('active'));
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// Vesta Signature Pad
let sigCanvas, sigCtx, isDrawing = false;
function initSignatureCanvas() {
  sigCanvas = document.getElementById('sigCanvas');
  if (!sigCanvas) return;
  sigCtx = sigCanvas.getContext('2d');
  sigCanvas.width = sigCanvas.offsetWidth;
  sigCanvas.height = sigCanvas.offsetHeight;
  sigCtx.strokeStyle = '#38bdf8';
  sigCtx.lineWidth = 2.5;
  sigCtx.lineCap = 'round';

  sigCanvas.onmousedown = (e) => { isDrawing = true; sigCtx.beginPath(); sigCtx.moveTo(e.offsetX, e.offsetY); };
  sigCanvas.onmousemove = (e) => { if (isDrawing) { sigCtx.lineTo(e.offsetX, e.offsetY); sigCtx.stroke(); } };
  sigCanvas.onmouseup = () => isDrawing = false;
  sigCanvas.onmouseleave = () => isDrawing = false;

  sigCanvas.ontouchstart = (e) => {
    isDrawing = true;
    const rect = sigCanvas.getBoundingClientRect();
    sigCtx.beginPath();
    sigCtx.moveTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    e.preventDefault();
  };
  sigCanvas.ontouchmove = (e) => {
    if (isDrawing) {
      const rect = sigCanvas.getBoundingClientRect();
      sigCtx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
      sigCtx.stroke();
    }
    e.preventDefault();
  };
  sigCanvas.ontouchend = () => isDrawing = false;
}

function clearSignature() {
  if (sigCtx && sigCanvas) {
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    const status = document.getElementById('sig-status');
    if (status) status.innerText = '';
  }
}

function submitSignature() {
  const status = document.getElementById('sig-status');
  if (status) {
    status.innerText = '✓ Signed & Stamped into Lease PDF (Encrypted)';
  }
}

// Open Case Study Modal
function openCaseStudy(key) {
  const data = caseStudies[key];
  if (!data) return;

  let screenshotsHtml = data.screenshots.map(s => `
    <div style="text-align: center;">
      <div class="iphone-device" style="width: 175px; height: 370px; margin: 0 auto; cursor: pointer;" onclick="openZoom('${s.src}')">
        <img src="${s.src}" alt="${s.title}">
      </div>
      <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 10px; font-weight: 500;">${s.title}</div>
    </div>
  `).join('');

  let techPillsHtml = data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('');

  let deepDiveHtml = data.deepDive.map(d => `
    <div style="margin-bottom: 24px; padding: 22px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px;">
      <h5 style="font-size: 1.15rem; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">${d.title}</h5>
      <p style="color: #cbd5e1; font-size: 0.98rem; line-height: 1.75;">${d.description}</p>
    </div>
  `).join('');

  let storeBtnHtml = data.storeLink ? `
    <a href="${data.storeLink}" target="_blank" rel="noopener" class="btn-primary" style="margin-top: 16px;">
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.96 2.76.99.08 2.05-.51 2.69-1.26z"/></svg>
      Open Application on Apple App Store &rarr;
    </a>
  ` : '';

  const content = `
    <div style="margin-bottom: 24px;">
      <div style="display: inline-block; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #38bdf8; letter-spacing: 0.1em; margin-bottom: 8px;">
        ${data.category} • ${data.role}
      </div>
      <h2 style="font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 8px;" class="font-display">${data.title}</h2>
      <p style="font-size: 1.2rem; color: #94a3b8; font-weight: 600;">${data.subtitle}</p>
    </div>

    <p style="color: #cbd5e1; font-size: 1.05rem; line-height: 1.8; margin-bottom: 34px;">${data.overview}</p>

    <!-- Screenshots Showcase -->
    <div style="margin-bottom: 38px;">
      <h4 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 20px;">📱 Actual App Screens (Click to enlarge)</h4>
      <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
        ${screenshotsHtml}
      </div>
    </div>

    <!-- Code Architecture Blueprint -->
    <div style="margin-bottom: 38px;">
      <h4 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 14px;">💻 Code Architecture Pattern</h4>
      <div style="background: #020617; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; overflow-x: auto;">
        <pre class="font-mono" style="font-size: 0.85rem; color: #38bdf8; line-height: 1.6;"><code>${data.codeSnippet.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </div>

    <!-- Technical Deep Dive -->
    <div style="margin-bottom: 38px;">
      <h4 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 20px;">⚙️ Engineering Challenges & Implementations</h4>
      ${deepDiveHtml}
    </div>

    <!-- Tech Stack -->
    <div style="margin-bottom: 32px;">
      <h4 style="font-size: 1rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Technologies Employed</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${techPillsHtml}
      </div>
    </div>

    ${storeBtnHtml}
  `;

  document.getElementById('drawerContent').innerHTML = content;
  document.getElementById('caseStudyDrawer').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
  document.getElementById('caseStudyDrawer').classList.remove('active');
  document.body.style.overflow = '';
}

function openZoom(src) {
  document.getElementById('zoomImg').src = src;
  document.getElementById('zoomModal').classList.add('active');
}
function closeZoom() {
  document.getElementById('zoomModal').classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeZoom();
    closeCaseStudy();
  }
});

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initWaveforms();
  initSignatureCanvas();
});
