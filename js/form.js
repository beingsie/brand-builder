const questions = {
  'Discovery — Who Are You?': [
    { id: 'superpower', question: "What's your brand's superpower?", hint: "What makes your brand special and unique?" },
    { id: 'existence', question: "Why does your brand exist?", hint: "What problem does it solve or what joy does it bring?" },
    { id: 'vibe', question: "What's your brand's vibe?", hint: "Is it fun, serious, creative, bold?" }
  ],
  'Definition — What\'s Your Story?': [
    { id: 'mission', question: "What's your brand's mission?", hint: "What's your brand trying to do in the world?" },
    { id: 'feelings', question: "How do you want people to feel when they interact with your brand?", hint: "Excited, calm, inspired?" },
    { id: 'values', question: "What are your brand's values?", hint: "What does it believe in? Honesty, kindness, adventure?" }
  ],
  'Audience and Persona Development': [
    { id: 'dreamCustomer', question: "Who's your dream customer?", hint: "Describe them—are they young, old, playful, serious?" },
    { id: 'problemSolved', question: "What problem does your brand help them solve?", hint: "Are you helping them feel happy, organized, creative?" },
    { id: 'hangouts', question: "Where do they hang out?", hint: "Are they on Instagram, TikTok, in coffee shops?" }
  ],
  'Brand Messaging — What\'s Your Message?': [
    { id: 'elevatorPitch', question: "What catchy sentence sums up your brand?", hint: "Think of your elevator pitch!" },
    { id: 'phrases', question: "What words or phrases make your brand stand out?", hint: "Is it fun, clever, kind?" },
    { id: 'tone', question: "How does your brand talk?", hint: "Friendly, professional, funny?" }
  ],
  'Brand Identity — What Do You Look Like?': [
    { id: 'colors', question: "What colors represent your brand?", hint: "Bright? Bold? Calm?" },
    { id: 'image', question: "What shape or image can people easily recognize as your brand?", hint: "Logo or mascot?" },
    { id: 'pictures', question: "How does your brand look in pictures?", hint: "Bright and colorful, simple and sleek?" }
  ],
  'Implementation and Activation': [
    { id: 'location', question: "Where can people find your brand?", hint: "On a website, social media, or a store?" },
    { id: 'firstMove', question: "What's your first big move to tell the world about your brand?", hint: "Launch event, social media post, or a fun giveaway?" },
    { id: 'excitement', question: "How will you keep people excited about your brand?", hint: "Regular updates, cool offers, or exciting stories?" }
  ],
  'Measurement and Optimization': [
    { id: 'success', question: "How will you know if people love your brand?", hint: "Are they sharing, buying, telling their friends?" },
    { id: 'improvements', question: "What can you do better?", hint: "Do you need more fun colors, different products, or better stories?" },
    { id: 'progress', question: "How can you keep improving?", hint: "Ask your customers what they think, track your growth!" }
  ]
};

let currentStep = 0;
let currentQuestion = 0;
const answers = {};
const steps = Object.keys(questions);

const elements = {
  stepTitle: document.getElementById('stepTitle'),
  currentQuestion: document.getElementById('currentQuestion'),
  currentHint: document.getElementById('currentHint'),
  answerInput: document.getElementById('answerInput'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  stepIndicator: document.getElementById('stepIndicator'),
  questionContainer: document.getElementById('questionContainer'),
  summary: document.getElementById('summary')
};

function updateUI() {
  const step = steps[currentStep];
  const question = questions[step][currentQuestion];

  elements.stepTitle.textContent = step;
  elements.currentQuestion.textContent = question.question;
  elements.currentHint.textContent = question.hint;
  elements.answerInput.value = answers[question.id] || '';
  elements.stepIndicator.textContent = `Step ${currentStep + 1}/${steps.length}`;

  elements.prevBtn.disabled = currentStep === 0 && currentQuestion === 0;

  const isLastQuestion = currentStep === steps.length - 1 &&
    currentQuestion === questions[step].length - 1;

  elements.nextBtn.textContent = isLastQuestion ? 'Finish ✓' : 'Next →';
}

function showSummary() {
  elements.questionContainer.classList.add('hidden');
  elements.summary.classList.add('active');
  elements.stepTitle.textContent = 'Your Brand Summary';

  let summaryHTML = '';
  steps.forEach(step => {
    summaryHTML += `
                    <div class="px-2 py-6 border-b border-gray-300">
                        <h3 class="text-xl font-semibold text-gray-800">${step}</h3>
                        ${questions[step].map(q => `
                            <div class="p-2">
                                <p class="font-semibold">› ${q.question}</p>
                                <p class="summary-answer">${answers[q.id] || 'Not answered'}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
  });

  summaryHTML += `
                <button id="editBtn" class="block w-fit m-auto btn btn-outline px-4 py-2 mt-4 rounded-full font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50">
                    Edit Responses
                </button>
            `;

  elements.summary.innerHTML = summaryHTML;

  document.getElementById('editBtn').addEventListener('click', () => {
    elements.questionContainer.classList.remove('hidden');
    elements.summary.classList.remove('active');
    updateUI();
  });
}

elements.nextBtn.addEventListener('click', () => {
  const step = steps[currentStep];
  const question = questions[step][currentQuestion];
  answers[question.id] = elements.answerInput.value;

  if (currentQuestion < questions[step].length - 1) {
    currentQuestion++;
  } else if (currentStep < steps.length - 1) {
    currentStep++;
    currentQuestion = 0;
  } else {
    showSummary();
    return;
  }

  updateUI();
});

elements.prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
  } else if (currentStep > 0) {
    currentStep--;
    currentQuestion = questions[steps[currentStep]].length - 1;
  }

  updateUI();
});

// Initialize the UI
updateUI();