const questions = {
  'Discovery: Who Are You?': [
    { id: 'uniqueQualities', question: "What unique qualities set your brand apart from competitors?", hint: "What strengths, talents, or expertise does your brand possess that others don’t?" },
    { id: 'brandExistence', question: "Why does your brand exist, beyond making money?", hint: "What’s the deeper purpose or mission that drives your brand?" },
    { id: 'brandSummary', question: "How would you describe your brand in one sentence?", hint: "Summarize your brand’s purpose, values, and personality in a concise statement." },
    { id: 'brandPersonality', question: "If your brand were a person, how would you describe their personality?", hint: "Is your brand playful, sophisticated, bold, or empathetic?" }
  ],
  'Definition: What\'s Your Story?': [
    { id: 'originStory', question: "What is the 'why' behind your brand’s creation?", hint: "Share the origin story of how and why your brand came to be." },
    { id: 'transformationPromise', question: "What transformation does your brand promise?", hint: "What’s the before-and-after experience you offer your audience?" },
    { id: 'emotionalResponse', question: "What emotional response do you want your audience to have when they engage with your brand?", hint: "Should they feel empowered, excited, comforted, or inspired?" },
    { id: 'brandValues', question: "What values or principles guide your brand?", hint: "What beliefs shape how your brand behaves, communicates, and creates?" }
  ],
  'Audience & Persona Development': [
    { id: 'biggestChallenge', question: "What is your audience’s biggest challenge, need, or desire?", hint: "What emotional or practical problems do they face?" },
    { id: 'dreamCustomer', question: "What does your dream customer look like?", hint: "Define their age, lifestyle, values, preferences, and behaviors." },
    { id: 'customerHangouts', question: "Where does your audience spend time, and how do they consume content?", hint: "Identify platforms, communities, or habits they frequent." },
    { id: 'desiredConnection', question: "How does your audience want to feel about your brand?", hint: "What emotional connection do you want to foster—trust, excitement, or belonging?" },
    { id: 'audienceFavorites', question: "What other brands does your audience love?", hint: "What can you learn from their preferences to shape your own strategy?" }
  ],
  'Brand Messaging: What\'s Your Message?': [
    { id: 'uniqueValueProposition', question: "What is your brand’s unique value proposition (UVP)?", hint: "What specific benefit does your brand offer that competitors don’t?" },
    { id: 'brandStory', question: "What story does your brand need to tell?", hint: "What narrative captures your mission, audience, and impact?" },
    { id: 'brandVoice', question: "What is the tone and voice of your brand?", hint: "Should your messaging sound professional, conversational, edgy, or nurturing?" },
    { id: 'keyPhrases', question: "What phrases or language should always appear in your messaging?", hint: "Develop a set of key phrases that communicate your values and personality." },
    { id: 'painPoints', question: "What pain points or desires does your messaging address?", hint: "Craft statements that empathize with your audience’s needs while offering solutions." }
  ],
  'Brand Identity: What Do You Look Like?': [
    { id: 'visualFeelings', question: "What feelings should your brand’s visuals evoke?", hint: "Should they feel energetic, calming, elegant, or innovative?" },
    { id: 'brandColors', question: "What colors best represent your brand’s personality and values?", hint: "Consider the psychological impact of each color and its alignment with your audience." },
    { id: 'typographyStyle', question: "What typography style fits your brand’s tone?", hint: "Do you need sleek and modern fonts, playful and informal ones, or classic and timeless typography?" },
    { id: 'graphicElements', question: "What visuals or graphic elements reflect your brand’s story?", hint: "Think about imagery, patterns, or shapes that represent your brand’s journey, mission, or personality." },
    { id: 'visualHierarchy', question: "What is the hierarchy of your brand’s visual elements?", hint: "Which elements (e.g., logo, tagline, colors) should stand out the most, and how do they guide focus?" },
    { id: 'visualConsistency', question: "How will your visual identity remain cohesive across different mediums?", hint: "Develop rules for consistent application of logos, colors, and typography in print, digital, and packaging." }
  ],
  'Implementation & Activation': [
    { id: 'firstImpression', question: "How will your brand make its first impression?", hint: "What platforms, campaigns, or collaborations will you use to launch and connect with your audience?" },
    { id: 'customerJourney', question: "What is your brand’s customer journey?", hint: "Map out how your audience will discover, interact with, and stay engaged with your brand." },
    { id: 'contentStrategies', question: "What content or marketing strategies will best activate your brand?", hint: "Should you focus on storytelling, influencer partnerships, social campaigns, or live events?" },
    { id: 'brandConsistencyTools', question: "What tools or systems will you use to ensure your brand stays consistent?", hint: "Do you need a brand style guide, templates, or automated scheduling tools?" }
  ],
  'Measurement & Optimization': [
    { id: 'successMetrics', question: "What metrics will you use to measure brand awareness and loyalty?", hint: "Track website traffic, social engagement, conversions, or repeat purchases." },
    { id: 'feedbackLoops', question: "What feedback loops can you create to improve your brand?", hint: "How will you gather customer feedback and use it to refine your branding?" },
    { id: 'brandReview', question: "How often will you revisit your brand strategy?", hint: "Set a schedule for reviewing your brand’s relevance and making necessary updates." },
    { id: 'futureEvolution', question: "What areas of your branding process are most likely to evolve?", hint: "Identify which elements (e.g., messaging, visuals, channels) might need adjustments as your brand grows." }
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
                <div class="flex flex-row items-center justify-center gap-2">
                  <button id="editBtn" class="block w-fit btn btn-outline px-4 py-2 mt-4 rounded-full font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-50">
                    ← Edit Responses
                  </button>
                  <button id="downloadPDFBtn" class="block w-fit btn btn-outline px-4 py-2 mt-4 rounded-full font-medium text-white border border-gray-800 bg-gray-800 hover:bg-gray-700">
                      ↓ Download PDF
                  </button>
                </div>
            `;

  elements.summary.innerHTML = summaryHTML;

  document.getElementById('editBtn').addEventListener('click', () => {
    elements.questionContainer.classList.remove('hidden');
    elements.summary.classList.remove('active');
    updateUI();
  });

  document.getElementById('downloadPDFBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf; // Access the jsPDF class from the library
    const doc = new jsPDF();

    doc.setFont("helvetica");  // Set font to Helvetica
    doc.setFontSize(12);  // Set font size

    let yOffset = 10;  // Starting Y position for text
    const lineHeight = 10;  // Line height

    // Loop through each step and each question to generate the PDF content
    steps.forEach(step => {
      doc.text(step, 10, yOffset);
      yOffset += lineHeight;

      questions[step].forEach(q => {
        const answer = answers[q.id] || 'Not answered';
        doc.text(`› ${q.question}`, 10, yOffset);
        yOffset += lineHeight;

        doc.text(answer, 10, yOffset);
        yOffset += lineHeight;
      });

      yOffset += lineHeight; // Add extra space after each step
    });

    // Save the generated PDF
    doc.save('brand_summary.pdf');
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