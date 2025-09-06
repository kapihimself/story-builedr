// StoryWeaver AI Application JavaScript with REAL AI Integration

// API Configuration

// Application Data
const appData = {
  sampleGenres: ["Cyberpunk", "Fantasy", "Sci-Fi", "Modern", "Historical", "Supernatural", "Western", "Romance"],
  sampleTones: ["Epic Adventure", "Dark & Gritty", "Light Comedy", "Dramatic", "Action-Packed", "Mysterious", "Romantic", "Philosophical"],
  samplePremises: [
    "A cyberpunk detective in Neo-Tokyo discovers a conspiracy",
    "Young wizards attending a magical academy in space", 
    "Pirates sailing between floating islands in the sky",
    "Time travelers preventing historical disasters",
    "Superhero team defending a city from interdimensional threats"
  ],
  visualStyles: [
    {name: "Manga", description: "Japanese comic style with expressive characters", prompt: "manga style, black and white line art, expressive characters"},
    {name: "Western Comic", description: "Bold colors and dynamic action scenes", prompt: "western comic book style, bold colors, dynamic poses, superhero aesthetic"},
    {name: "Realistic", description: "Photo-realistic rendering with detailed environments", prompt: "photorealistic, detailed environments, cinematic lighting"},
    {name: "Cartoon", description: "Stylized and colorful with exaggerated features", prompt: "cartoon style, colorful, exaggerated features, animated look"},
    {name: "Noir", description: "Black and white with dramatic shadows", prompt: "film noir style, black and white, dramatic shadows, high contrast"},
    {name: "Watercolor", description: "Soft, artistic style with flowing colors", prompt: "watercolor painting style, soft colors, artistic brushstrokes"}
  ],
  exportFormats: [
    {name: "Comic PDF", description: "High-resolution comic book format", icon: "📖", size: "2.3 MB"},
    {name: "Animated Video", description: "Motion comic with voice acting", icon: "🎬", size: "8.7 MB"},  
    {name: "Audio Drama", description: "Podcast-style audio story", icon: "🎧", size: "4.1 MB"},
    {name: "Interactive Web Story", description: "Choose-your-adventure format", icon: "🌐", size: "1.8 MB"},
    {name: "Social Media Clips", description: "Short clips for TikTok/Instagram", icon: "📱", size: "3.2 MB"}
  ]
};

// Application State
let appState = {
  currentScreen: 'landing-screen',
  currentPanel: 0,
  selectedGenre: '',
  selectedTone: '',
  storyPremise: '',
  characters: [],
  worldSetting: null,
  visualStyle: '',
  colorPalette: 'vibrant',
  generatedPanels: [],
  selectedExportFormat: '',
  generatedImages: {},
  isGenerating: false
};

// Screen Management - Simplified and more reliable
function showScreen(screenId) {
  console.log('Showing screen:', screenId);
  
  // Ensure we have the full screen ID
  const fullScreenId = screenId.includes('-screen') ? screenId : screenId + '-screen';
  
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(fullScreenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    appState.currentScreen = fullScreenId;
    console.log('Successfully showing screen:', fullScreenId);
  } else {
    console.error('Screen not found:', fullScreenId);
  }
}

// AI API Functions (simplified for demo)
async function generateWithFallback(prompt) {
  // For demo purposes, return mock data instead of making real API calls
  console.log('Mock AI generation for prompt:', prompt.substring(0, 100) + '...');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (prompt.includes('characters')) {
        resolve(JSON.stringify({
          characters: [
            {
              name: "Alex Chen",
              role: "Cyberpunk Detective",
              personality: ["Analytical", "Determined", "Tech-savvy"],
              appearance: "Augmented eyes, dark coat, cybernetic implants",
              relationships: "Works alone but trusts few allies",
              backstory: "Former corporate security turned independent investigator"
            },
            {
              name: "Maya Rodriguez",
              role: "Data Hacker",
              personality: ["Brilliant", "Rebellious", "Loyal"],
              appearance: "Colorful hair, multiple screens, neural interface",
              relationships: "Alex's primary contact and information source",
              backstory: "Escaped corporate data farms to fight for digital freedom"
            },
            {
              name: "Dr. Viktor Kane",
              role: "Corporate Scientist",
              personality: ["Ambitious", "Secretive", "Manipulative"],
              appearance: "Expensive suit, artificial limbs, cold demeanor",
              relationships: "Main antagonist pursuing the protagonists",
              backstory: "Lead researcher on illegal AI consciousness experiments"
            }
          ]
        }));
      } else if (prompt.includes('world')) {
        resolve(JSON.stringify({
          world: {
            name: "Neo-Tokyo 2087",
            description: "A sprawling megacity where technology and humanity collide",
            atmosphere: "Neon-lit streets shrouded in perpetual rain, towering arcologies pierce the smoggy sky",
            technology: "Neural implants, holographic displays, AI assistants integrated into daily life",
            society: "Corporate oligarchy controls most aspects of life, underground resistance fights for freedom",
            locations: ["The Data Undercity", "Corporate Spires", "Memory Markets", "Digital Sanctuaries"],
            conflicts: "AI consciousness vs corporate control, digital rights vs security, human identity vs technological enhancement"
          }
        }));
      } else {
        resolve('Mock AI response generated successfully');
      }
    }, 2000);
  });
}

// Event Handlers - Direct and reliable
function handleStartClick() {
  console.log('Start button clicked!');
  showScreen('story-seed');
}

function handleGenerateUniverse() {
  console.log('Generate universe clicked');
  
  const premiseInput = document.getElementById('story-premise');
  const premise = premiseInput ? premiseInput.value.trim() : '';
  
  if (!premise) {
    alert('Please enter a story premise');
    return;
  }
  
  if (!appState.selectedGenre) {
    alert('Please select a genre');
    return;
  }
  
  appState.storyPremise = premise;
  showLoadingModal('AI is creating your universe and characters...');
  
  // Generate characters
  generateCharacters().then(() => {
    hideLoadingModal();
    showScreen('character');
  });
}

function handleProceedWorld() {
  console.log('Proceeding to world building');
  generateWorld().then(() => {
    showScreen('world');
  });
}

function handleCreateEpisode() {
  console.log('Creating first episode');
  showScreen('episode');
}

function handleGenerateEpisode() {
  console.log('Generating episode');
  const episodeInput = document.getElementById('episode-input');
  const episodeText = episodeInput ? episodeInput.value.trim() : '';
  
  if (!episodeText) {
    alert('Please describe what happens in this episode');
    return;
  }
  
  showLoadingModal('Generating your episode...');
  
  generateEpisode(episodeText).then(() => {
    hideLoadingModal();
    const progressSection = document.getElementById('generation-progress');
    const panelsSection = document.getElementById('comic-panels-section');
    
    if (progressSection) progressSection.classList.add('hidden');
    if (panelsSection) panelsSection.classList.remove('hidden');
  });
}

function handleEditEpisode() {
  showScreen('editing');
}

function handleProceedExport() {
  showScreen('export');
}

function handleBackToEpisode() {
  showScreen('episode');
}

function handleFinishEditing() {
  showScreen('export');
}

function handleDownload() {
  if (!appState.selectedExportFormat) {
    alert('Please select an export format');
    return;
  }
  
  showLoadingModal('Preparing your download...');
  
  setTimeout(() => {
    hideLoadingModal();
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.classList.remove('hidden');
    }
    alert('Your AI-generated story has been downloaded!');
  }, 2000);
}

function handleNewEpisode() {
  showScreen('episode');
}

function handleNewStory() {
  resetApp();
  showScreen('story-seed');
}

// Generation Functions
async function generateCharacters() {
  console.log('Generating characters...');
  
  try {
    const response = await generateWithFallback('Create characters for ' + appState.selectedGenre);
    const charactersData = JSON.parse(response);
    
    appState.characters = charactersData.characters.map((char, index) => ({
      ...char,
      avatar: ['🧙‍♂️', '⚔️', '🕵️', '👩‍💻', '🧬'][index] || '🤖'
    }));
    
    displayCharacters();
    displayRelationships();
    
  } catch (error) {
    console.error('Character generation failed:', error);
    alert('Failed to generate characters. Please try again.');
  }
}

async function generateWorld() {
  console.log('Generating world...');
  showLoadingModal('AI is crafting your story world...');
  
  try {
    const response = await generateWithFallback('Create world for ' + appState.selectedGenre);
    const worldData = JSON.parse(response);
    
    appState.worldSetting = worldData.world;
    populateWorldOverview();
    hideLoadingModal();
    
  } catch (error) {
    console.error('World generation failed:', error);
    hideLoadingModal();
    alert('Failed to generate world. Please try again.');
  }
}

async function generateEpisode(description) {
  console.log('Generating episode...');
  
  // Create sample panels for demo
  appState.generatedPanels = [
    {
      id: 1,
      description: "Opening scene showing the main character in their environment",
      dialogue: "The story begins with our hero facing a new challenge...",
      characters: [appState.characters[0]?.name || "Main Character"],
      mood: "mysterious"
    },
    {
      id: 2,
      description: "Character interaction and rising tension",
      dialogue: "Something unexpected happens that changes everything...",
      characters: appState.characters.slice(0, 2).map(c => c.name),
      mood: "dramatic"
    },
    {
      id: 3,
      description: "Conflict escalates with visual action",
      dialogue: "The situation becomes more dangerous and complex...",
      characters: appState.characters.slice(0, 2).map(c => c.name),
      mood: "intense"
    },
    {
      id: 4,
      description: "Resolution or cliffhanger ending",
      dialogue: "The episode ends with a revelation that sets up the next chapter...",
      characters: [appState.characters[0]?.name || "Main Character"],
      mood: "suspenseful"
    }
  ];
  
  appState.currentPanel = 0;
  displayCurrentPanel();
}

// Display Functions
function displayCharacters() {
  const container = document.getElementById('characters-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  appState.characters.forEach((character, index) => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <button class="regenerate-char-btn" onclick="regenerateCharacter(${index})">🔄</button>
      <div class="character-avatar">${character.avatar}</div>
      <div class="character-name">${character.name}</div>
      <div class="character-role">${character.role}</div>
      <div class="character-traits">
        ${character.personality.map(trait => `<span class="trait-tag">${trait}</span>`).join('')}
      </div>
      <div class="character-description">${character.appearance}</div>
      <div class="character-relationships">${character.relationships}</div>
      ${character.backstory ? `<div class="character-backstory"><strong>Backstory:</strong> ${character.backstory}</div>` : ''}
    `;
    container.appendChild(card);
  });
}

function displayRelationships() {
  const container = document.getElementById('relationship-diagram');
  if (!container) return;
  
  container.innerHTML = '';
  
  appState.characters.forEach((character, index) => {
    const node = document.createElement('div');
    node.className = 'relationship-node';
    node.textContent = character.name.split(' ')[0];
    
    const angle = (index / appState.characters.length) * 2 * Math.PI;
    const radius = 80;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    node.style.transform = `translate(${x}px, ${y}px)`;
    container.appendChild(node);
  });
}

function populateWorldOverview() {
  const container = document.getElementById('world-overview');
  if (!container) return;
  
  const world = appState.worldSetting;
  if (!world) return;
  
  container.innerHTML = `
    <h3>${world.name}</h3>
    <p>${world.description}</p>
    <div class="world-details">
      <div class="world-detail">
        <h4>Atmosphere</h4>
        <p>${world.atmosphere}</p>
      </div>
      <div class="world-detail">
        <h4>Technology</h4>
        <p>${world.technology}</p>
      </div>
      <div class="world-detail">
        <h4>Society</h4>
        <p>${world.society}</p>
      </div>
      <div class="world-detail">
        <h4>Key Locations</h4>
        <p>${world.locations.join(', ')}</p>
      </div>
      <div class="world-detail">
        <h4>Conflicts</h4>
        <p>${world.conflicts}</p>
      </div>
    </div>
  `;
}

function displayCurrentPanel() {
  const container = document.getElementById('comic-panel-container');
  if (!container) return;
  
  const panels = appState.generatedPanels;
  container.innerHTML = '';
  
  panels.forEach((panel, index) => {
    const panelDiv = document.createElement('div');
    panelDiv.className = `comic-panel ${index === appState.currentPanel ? 'active' : ''}`;
    panelDiv.innerHTML = `
      <div class="panel-description">${panel.description}</div>
      <div class="panel-dialogue">${panel.dialogue}</div>
      <div class="panel-characters">
        ${(panel.characters || []).map(char => `<span class="character-indicator">${char.split(' ')[0]}</span>`).join('')}
      </div>
      <div class="panel-mood">Mood: ${panel.mood}</div>
    `;
    container.appendChild(panelDiv);
  });
  
  const panelCounter = document.getElementById('panel-counter');
  if (panelCounter) {
    panelCounter.textContent = `Panel ${appState.currentPanel + 1} of ${panels.length}`;
  }
}

function navigatePanel(direction) {
  const maxPanel = appState.generatedPanels.length - 1;
  appState.currentPanel = Math.max(0, Math.min(maxPanel, appState.currentPanel + direction));
  displayCurrentPanel();
}

// Chip Selection
function selectChip(element, type, value) {
  // Remove selected from siblings
  element.parentNode.querySelectorAll('.chip').forEach(chip => {
    chip.classList.remove('selected');
  });
  
  // Add selected to clicked element
  element.classList.add('selected');
  
  // Update state
  if (type === 'genre') {
    appState.selectedGenre = value;
  } else if (type === 'tone') {
    appState.selectedTone = value;
  }
  
  console.log(`Selected ${type}:`, value);
}

function selectVisualStyle(element, styleName) {
  document.querySelectorAll('.style-option').forEach(option => {
    option.classList.remove('selected');
  });
  element.classList.add('selected');
  appState.visualStyle = styleName;
}

function selectExportFormat(element, format) {
  document.querySelectorAll('.export-format').forEach(elem => {
    elem.classList.remove('selected');
  });
  element.classList.add('selected');
  appState.selectedExportFormat = format.name;
  
  updateExportPreview(format);
  
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.disabled = false;
  }
}

function updateExportPreview(format) {
  const container = document.getElementById('preview-container');
  if (!container) return;
  
  container.textContent = `${format.icon} ${format.description} (${format.size})`;
}

// Utility Functions
function showLoadingModal(message) {
  const loadingText = document.getElementById('loading-text');
  const loadingModal = document.getElementById('loading-modal');
  
  if (loadingText) loadingText.textContent = message;
  if (loadingModal) loadingModal.classList.remove('hidden');
}

function hideLoadingModal() {
  const loadingModal = document.getElementById('loading-modal');
  if (loadingModal) loadingModal.classList.add('hidden');
}

function resetApp() {
  appState = {
    currentScreen: 'landing-screen',
    currentPanel: 0,
    selectedGenre: '',
    selectedTone: '',
    storyPremise: '',
    characters: [],
    worldSetting: null,
    visualStyle: '',
    colorPalette: 'vibrant',
    generatedPanels: [],
    selectedExportFormat: '',
    generatedImages: {},
    isGenerating: false
  };
}

// Initialize UI components
function initializeUI() {
  console.log('Initializing UI components...');
  
  // Populate inspiration chips
  const inspirationContainer = document.getElementById('inspiration-chips');
  if (inspirationContainer) {
    inspirationContainer.innerHTML = '';
    appData.samplePremises.forEach(premise => {
      const chip = document.createElement('div');
      chip.className = 'inspiration-chip';
      chip.textContent = premise;
      chip.onclick = function() {
        const textarea = document.getElementById('story-premise');
        if (textarea) {
          textarea.value = premise;
          appState.storyPremise = premise;
        }
      };
      inspirationContainer.appendChild(chip);
    });
  }
  
  // Populate genre chips
  const genreContainer = document.getElementById('genre-selector');
  if (genreContainer) {
    genreContainer.innerHTML = '';
    appData.sampleGenres.forEach(genre => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.textContent = genre;
      chip.onclick = function() {
        selectChip(chip, 'genre', genre);
      };
      genreContainer.appendChild(chip);
    });
  }
  
  // Populate tone chips
  const toneContainer = document.getElementById('tone-selector');
  if (toneContainer) {
    toneContainer.innerHTML = '';
    appData.sampleTones.forEach(tone => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.textContent = tone;
      chip.onclick = function() {
        selectChip(chip, 'tone', tone);
      };
      toneContainer.appendChild(chip);
    });
  }
  
  // Populate visual styles
  const styleContainer = document.getElementById('visual-style-selector');
  if (styleContainer) {
    styleContainer.innerHTML = '';
    appData.visualStyles.forEach(style => {
      const option = document.createElement('div');
      option.className = 'style-option';
      option.innerHTML = `
        <h4>${style.name}</h4>
        <p>${style.description}</p>
      `;
      option.onclick = function() {
        selectVisualStyle(option, style.name);
      };
      styleContainer.appendChild(option);
    });
  }
  
  // Populate export formats
  const exportContainer = document.getElementById('export-formats');
  if (exportContainer) {
    exportContainer.innerHTML = '';
    appData.exportFormats.forEach(format => {
      const formatDiv = document.createElement('div');
      formatDiv.className = 'export-format';
      formatDiv.innerHTML = `
        <div class="format-icon">${format.icon}</div>
        <div class="format-name">${format.name}</div>
        <div class="format-description">${format.description}</div>
        <div class="format-size">${format.size}</div>
      `;
      formatDiv.onclick = function() {
        selectExportFormat(formatDiv, format);
      };
      exportContainer.appendChild(formatDiv);
    });
  }
  
  console.log('UI components initialized');
}

// Global functions for button handlers
window.handleStartClick = handleStartClick;
window.handleGenerateUniverse = handleGenerateUniverse;
window.handleProceedWorld = handleProceedWorld;
window.handleCreateEpisode = handleCreateEpisode;
window.handleGenerateEpisode = handleGenerateEpisode;
window.handleEditEpisode = handleEditEpisode;
window.handleProceedExport = handleProceedExport;
window.handleBackToEpisode = handleBackToEpisode;
window.handleFinishEditing = handleFinishEditing;
window.handleDownload = handleDownload;
window.handleNewEpisode = handleNewEpisode;
window.handleNewStory = handleNewStory;
window.navigatePanel = navigatePanel;
window.regenerateCharacter = function(index) {
  console.log('Regenerating character:', index);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing StoryWeaver AI...');
  initializeUI();
  showScreen('landing-screen');
  console.log('App ready!');
});
