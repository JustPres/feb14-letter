const quizTypes = {
    love: [
        {
            question: "What's your partner's favorite food?",
            options: ["Pizza", "Sushi", "Pasta", "Burgers"]
        },
        {
            question: "Where was your first date?",
            options: ["Restaurant", "Movie Theater", "Park", "Coffee Shop"]
        },
        {
            question: "What's your partner's dream vacation destination?",
            options: ["Paris", "Maldives", "New York", "Tokyo"]
        },
        {
            question: "What's your partner's favorite way to relax?",
            options: ["Reading", "Watching Movies", "Taking a Walk", "Listening to Music"]
        },
        {
            question: "What's your partner's biggest fear?",
            options: ["Heights", "Spiders", "Public Speaking", "Darkness"]
        },
        {
            question: "What makes your partner laugh the most?",
            options: ["Funny Movies", "Dad Jokes", "Silly Dance Moves", "Memes"]
        },
        {
            question: "What's your partner's ideal weekend activity?",
            options: ["Outdoor Adventure", "Netflix Marathon", "Shopping", "Cooking Together"]
        },
        {
            question: "What's your partner's love language?",
            options: ["Physical Touch", "Words of Affirmation", "Acts of Service", "Quality Time"]
        }
    ],
    fun: [
        {
            question: "What would your partner choose as a superpower?",
            options: ["Invisibility", "Flying", "Mind Reading", "Time Travel"]
        },
        {
            question: "If your partner was a dessert, what would they be?",
            options: ["Chocolate Cake", "Ice Cream", "Cheesecake", "Apple Pie"]
        },
        // Add more fun questions
    ],
    deep: [
        {
            question: "What's your partner's biggest life goal?",
            options: ["Career Success", "Family Life", "Personal Growth", "World Travel"]
        },
        {
            question: "How does your partner handle stress?",
            options: ["Exercise", "Meditation", "Talking it Out", "Alone Time"]
        },
        // Add more deep questions
    ]
};

let currentQuestion = 0;
let score = 0;
let playerAnswers = [];
let timer;
let timeLeft = 30;
let questions = quizTypes.love; // Default quiz type

window.startQuiz = function() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const quizType = document.getElementById('quizType').value;
    
    if (!player1 || !player2) {
        alert('Please enter both players names');
        return;
    }

    questions = quizTypes[quizType];
    document.getElementById('quizMode').textContent = document.getElementById('quizType').options[document.getElementById('quizType').selectedIndex].text;
    
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('questionContainer').classList.remove('hidden');
    showQuestion();
    startTimer();
    updateProgress();
}

window.showQuestion = function() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const counterEl = document.getElementById('questionCounter');
    
    questionEl.textContent = questions[currentQuestion].question;
    counterEl.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    optionsEl.innerHTML = '';

    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'w-full px-4 py-3 text-left rounded-lg bg-light border border-gray-200 hover:bg-gray-200 hover:border-gray-300 focus:outline-none transition';
        button.textContent = option;
        button.onclick = () => selectOption(button, index);
        optionsEl.appendChild(button);
    });

    timeLeft = 30;
    updateTimer();
}

window.selectOption = function(button, index) {
    const options = document.querySelectorAll('#options button');
    options.forEach(opt => {
        opt.classList.remove('bg-primary', 'text-white', 'border-primary');
        opt.classList.add('bg-light', 'border-gray-200');
    });
    button.classList.remove('bg-light', 'border-gray-200');
    button.classList.add('bg-primary', 'text-white', 'border-primary');
}

window.nextQuestion = function() {
    const selected = document.querySelector('#options button.bg-primary');
    if (!selected) {
        alert('Please select an answer');
        return;
    }

    playerAnswers.push(selected.textContent);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
        updateProgress();
    } else {
        clearInterval(timer);
        showResults();
    }
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').textContent = `${timeLeft}s`;
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

window.showResults = function() {
    document.getElementById('questionContainer').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    
    // Calculate score based on matching answers (placeholder)
    score = Math.floor(Math.random() * 100);
    
    document.getElementById('score').textContent = `${score}%`;
    document.getElementById('resultMessage').textContent = getResultMessage(score);

    // Show answer summary
    const summaryEl = document.getElementById('answerSummary');
    summaryEl.innerHTML = playerAnswers.map((answer, index) => `
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div class="text-sm text-gray-500 mb-1">Question ${index + 1}</div>
            <div class="font-medium">${answer}</div>
        </div>
    `).join('');
}

window.handleEmailSend = async function() {
    const email = document.getElementById('email').value;
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const emailSpinner = document.getElementById('emailSpinner');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const errorMessage = document.getElementById('errorMessage');

    if (!email) {
        errorMessage.textContent = 'Please enter an email address';
        errorMessage.classList.remove('hidden');
        return;
    }

    emailSpinner.classList.remove('hidden');
    sendEmailBtn.disabled = true;
    errorMessage.classList.add('hidden');

    try {
        // Create the email template parameters
        const templateParams = {
            name: player1,
            email: email,
            message: `Dear ${player1} and ${player2},\n\nHere are your CoupleQuiz results:\n\nScore: ${score}%\n${getResultMessage(score)}\n\nYour Answers:\n${playerAnswers.map((answer, index) => 
                `Question ${index + 1}: ${answer}`
            ).join('\n')}\n\nThank you for playing CoupleQuiz! 💕`
        };

        // Send the email using EmailJS
        const response = await emailjs.send(
            "service_ayks2go",
            "template_6gtepzx",
            templateParams
        );
        
        console.log('Email success:', response);
        sendEmailBtn.innerHTML = 'Results Sent! ✓';
        sendEmailBtn.classList.remove('bg-button', 'border-button');
        sendEmailBtn.classList.add('bg-green-500', 'border-green-500');
    } catch (error) {
        console.error('Email error:', error);
        errorMessage.textContent = 'Failed to send email. Please try again.';
        errorMessage.classList.remove('hidden');
        emailSpinner.classList.add('hidden');
        sendEmailBtn.disabled = false;
    }
}

window.shareResults = function() {
    if (navigator.share) {
        navigator.share({
            title: 'CoupleQuiz Results',
            text: `We got a ${score}% match on CoupleQuiz! ${getResultMessage(score)}`,
            url: window.location.href
        });
    } else {
        alert('Sharing is not supported on this browser');
    }
}

window.playAgain = function() {
    currentQuestion = 0;
    score = 0;
    playerAnswers = [];
    timeLeft = 30;
    document.getElementById('results').classList.add('hidden');
    document.getElementById('playerSetup').classList.remove('hidden');
    document.getElementById('progress').style.width = '0%';
    document.getElementById('sendEmailBtn').innerHTML = '<span>Send Results to Email</span>';
    document.getElementById('sendEmailBtn').classList.remove('bg-green-500', 'border-green-500');
    document.getElementById('sendEmailBtn').classList.add('bg-button', 'border-button');
    document.getElementById('sendEmailBtn').disabled = false;
    document.getElementById('emailSpinner').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
}

function getResultMessage(score) {
    if (score >= 80) return "Incredible! Your connection is truly special! 💑";
    if (score >= 60) return "Amazing! Your love is growing stronger! 💕";
    return "Every day is a new chance to learn more about each other! 💫";
}

// Memory Timeline App JavaScript

// DOM Elements
const newMemoryBtn = document.getElementById('newMemoryBtn');
const createFirstMemoryBtn = document.getElementById('createFirstMemoryBtn');
const memoryModal = document.getElementById('memoryModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveMemoryBtn = document.getElementById('saveMemoryBtn');
const memoryForm = document.getElementById('memoryForm');
const memoryPhoto = document.getElementById('memoryPhoto');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const photoPreview = document.getElementById('photoPreview');
const previewImage = document.getElementById('previewImage');
const removePhotoBtn = document.getElementById('removePhotoBtn');
const emptyState = document.getElementById('emptyState');
const timeline = document.getElementById('timeline');
const memoryList = document.getElementById('memoryList');
const modalTitle = document.getElementById('modalTitle');
const detailModal = document.getElementById('detailModal');
const memoryDetail = document.getElementById('memoryDetail');
const closeDetailBtn = document.getElementById('closeDetailBtn');
const editMemoryBtn = document.getElementById('editMemoryBtn');
const deleteMemoryBtn = document.getElementById('deleteMemoryBtn');

// State
let memories = [];
let currentPhotoData = null;
let editingMemoryId = null;

// Initialize App
function initApp() {
    // Load memories from local storage
    loadMemories();
    
    // Set today's date as default
    document.getElementById('memoryDate').valueAsDate = new Date();
    
    // Check if we have memories to display
    updateTimelineView();
    
    // Set up event listeners
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    newMemoryBtn.addEventListener('click', openNewMemoryModal);
    createFirstMemoryBtn.addEventListener('click', openNewMemoryModal);
    closeModalBtn.addEventListener('click', closeMemoryModal);
    cancelBtn.addEventListener('click', closeMemoryModal);
    saveMemoryBtn.addEventListener('click', saveMemory);
    
    // Photo handling
    memoryPhoto.addEventListener('change', handlePhotoUpload);
    removePhotoBtn.addEventListener('click', removePhoto);
    
    // Detail modal
    closeDetailBtn.addEventListener('click', closeDetailModal);
    editMemoryBtn.addEventListener('click', handleEditMemory);
    deleteMemoryBtn.addEventListener('click', handleDeleteMemory);
}

// Memory Management
function loadMemories() {
    const storedMemories = localStorage.getItem('timeline-memories');
    if (storedMemories) {
        memories = JSON.parse(storedMemories);
    }
}

function saveMemories() {
    localStorage.setItem('timeline-memories', JSON.stringify(memories));
}

function saveMemory() {
    // Validate form
    const title = document.getElementById('memoryTitle').value.trim();
    const date = document.getElementById('memoryDate').value;
    const story = document.getElementById('memoryStory').value.trim();
    
    if (!title || !date) {
        alert('Please enter a title and date for your memory');
        return;
    }
    
    // Create memory object
    const tagsInput = document.getElementById('memoryTags').value.trim();
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
    
    const memory = {
        id: editingMemoryId || Date.now().toString(),
        title,
        date,
        story,
        tags,
        photo: currentPhotoData,
        createdAt: editingMemoryId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Add to memories array or update existing
    if (editingMemoryId) {
        const index = memories.findIndex(m => m.id === editingMemoryId);
        if (index !== -1) {
            // Preserve created date
            memory.createdAt = memories[index].createdAt;
            memories[index] = memory;
        }
    } else {
        memories.push(memory);
    }
    
    // Sort memories by date
    memories.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Save to localStorage
    saveMemories();
    
    // Reset form and close modal
    resetForm();
    closeMemoryModal();
    
    // Update timeline
    updateTimelineView();
}

function handleDeleteMemory() {
    if (confirm('Are you sure you want to delete this memory?')) {
        // Remove memory from array
        memories = memories.filter(memory => memory.id !== editingMemoryId);
        
        // Save to localStorage
        saveMemories();
        
        // Close modal and update timeline
        closeDetailModal();
        updateTimelineView();
    }
}

function handleEditMemory() {
    // Switch to the edit modal
    closeDetailModal();
    openMemoryModal(editingMemoryId);
}

// UI Functions
function updateTimelineView() {
    if (memories.length === 0) {
        emptyState.classList.remove('hidden');
        timeline.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        timeline.classList.remove('hidden');
        renderTimeline();
    }
}

function renderTimeline() {
    memoryList.innerHTML = '';
    
    // Group memories by year
    const groupedMemories = groupMemoriesByYear(memories);
    
    // Create timeline connector
    const connector = document.createElement('div');
    connector.className = 'timeline-connector';
    memoryList.appendChild(connector);
    
    // Render each year group
    let itemIndex = 0;
    
    Object.keys(groupedMemories).sort((a, b) => b - a).forEach(year => {
        // Year marker
        const yearMarker = document.createElement('h2');
        yearMarker.className = 'year-marker';
        yearMarker.textContent = year;
        memoryList.appendChild(yearMarker);
        
        // Memories in this year
        groupedMemories[year].forEach(memory => {
            const memoryItem = createMemoryItem(memory, itemIndex);
            memoryList.appendChild(memoryItem);
            itemIndex++;
        });
    });
}

function groupMemoriesByYear(memories) {
    const grouped = {};
    
    memories.forEach(memory => {
        const year = new Date(memory.date).getFullYear();
        if (!grouped[year]) {
            grouped[year] = [];
        }
        grouped[year].push(memory);
    });
    
    return grouped;
}

function createMemoryItem(memory, index) {
    const date = new Date(memory.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
    });
    
    const memoryItem = document.createElement('div');
    memoryItem.className = 'relative pl-8 pb-8 memory-item';
    memoryItem.style.setProperty('--i', index);
    
    // Timeline dot
    const dot = document.createElement('div');
    dot.className = 'timeline-dot';
    memoryItem.appendChild(dot);
    
    // Memory card
    const card = document.createElement('div');
    card.className = 'memory-card bg-white cursor-pointer';
    card.addEventListener('click', () => openMemoryDetail(memory.id));
    
    // Card content
    let cardContent = '';
    
    // Photo if available
    if (memory.photo) {
        cardContent += `
            <div class="relative">
                <img src="${memory.photo}" alt="${memory.title}" class="w-full h-48 object-cover">
                <div class="memory-date">${formattedDate}</div>
            </div>
        `;
    }
    
    // Text content
    cardContent += `
        <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">${memory.title}</h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-3">${memory.story}</p>
            <div class="flex flex-wrap">
                ${memory.tags.map(tag => `<span class="memory-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.innerHTML = cardContent;
    memoryItem.appendChild(card);
    
    return memoryItem;
}

// Modal Functions
function openNewMemoryModal() {
    resetForm();
    modalTitle.textContent = 'Add New Memory';
    editingMemoryId = null;
    openModal(memoryModal);
}

function openMemoryModal(memoryId) {
    if (memoryId) {
        // Edit existing memory
        const memory = memories.find(m => m.id === memoryId);
        if (memory) {
            modalTitle.textContent = 'Edit Memory';
            editingMemoryId = memoryId;
            
            // Fill form fields
            document.getElementById('memoryTitle').value = memory.title;
            document.getElementById('memoryDate').value = memory.date;
            document.getElementById('memoryStory').value = memory.story;
            document.getElementById('memoryTags').value = memory.tags.join(', ');
            
            // Show photo if available
            if (memory.photo) {
                currentPhotoData = memory.photo;
                previewImage.src = memory.photo;
                photoPlaceholder.classList.add('hidden');
                photoPreview.classList.remove('hidden');
            } else {
                removePhoto();
            }
        }
    }
    
    openModal(memoryModal);
}

function closeMemoryModal() {
    closeModal(memoryModal);
    resetForm();
}

function openMemoryDetail(memoryId) {
    const memory = memories.find(m => m.id === memoryId);
    if (!memory) return;
    
    editingMemoryId = memoryId;
    
    const date = new Date(memory.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
    
    let detailHTML = `
        <h2 class="text-2xl font-bold mb-2">${memory.title}</h2>
        <p class="text-gray-500 mb-4">${formattedDate}</p>
    `;
    
    if (memory.photo) {
        detailHTML += `
            <div class="mb-4">
                <img src="${memory.photo}" alt="${memory.title}" class="w-full rounded-lg">
            </div>
        `;
    }
    
    detailHTML += `
        <div class="text-gray-700 mb-6 whitespace-pre-line">${memory.story}</div>
        
        <div class="flex flex-wrap mb-4">
            ${memory.tags.map(tag => `<span class="memory-tag">${tag}</span>`).join('')}
        </div>
    `;
    
    memoryDetail.innerHTML = detailHTML;
    openModal(detailModal);
}

function closeDetailModal() {
    closeModal(detailModal);
}

function openModal(modal) {
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hidden');
    
    // Add fade-in animation
    const modalContent = modal.querySelector('div');
    modalContent.classList.add('fade-in');
}

function closeModal(modal) {
    document.body.style.overflow = '';
    modal.classList.add('hidden');
}

// Photo Handling
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        currentPhotoData = event.target.result;
        previewImage.src = currentPhotoData;
        photoPlaceholder.classList.add('hidden');
        photoPreview.classList.remove('hidden');
    };
    
    reader.readAsDataURL(file);
}

function removePhoto() {
    currentPhotoData = null;
    previewImage.src = '';
    photoPreview.classList.add('hidden');
    photoPlaceholder.classList.remove('hidden');
    memoryPhoto.value = '';
}

// Form reset
function resetForm() {
    memoryForm.reset();
    document.getElementById('memoryDate').valueAsDate = new Date();
    removePhoto();
    editingMemoryId = null;
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 