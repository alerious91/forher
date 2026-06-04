const steps = [
    {
        question: "Baadik m3asbe?",
        hint: "are you still mad?",
        emoji: "🥺"
    },
    {
        question: "M2akde?",
        hint: "are you sure?",
        emoji: "😟"
    },
    {
        question: "M2akde m2akde?",
        hint: "are you sure sure?",
        emoji: "😓"
    },
    {
        question: "M2akde m2akde m2akde?",
        hint: "really really really sure?",
        emoji: "🫠"
    }
];

let currentStep = 0;

function onYes() {
    currentStep++;

    if (currentStep >= steps.length) {
        // Last "yes" — show a final nudge before giving up
        currentStep = steps.length - 1;
        // Shake the no button to draw attention to it
        const noBtn = document.getElementById('no-btn');
        noBtn.classList.remove('shake');
        void noBtn.offsetWidth;
        noBtn.classList.add('shake');
        noBtn.addEventListener('animationend', () => noBtn.classList.remove('shake'), { once: true });

        // Wiggle the emoji too
        const emojiEl = document.getElementById('emoji');
        emojiEl.style.animation = 'none';
        emojiEl.textContent = '😭';
        setTimeout(() => {
            emojiEl.style.animation = 'float 3s ease-in-out infinite';
        }, 100);
        return;
    }

    const s = steps[currentStep];
    swapContent(s.emoji, s.question, s.hint);

    // Shrink the yes button slightly each time to nudge her toward No
    const yesBtn = document.getElementById('yes-btn');
    const currentPad = 14 - currentStep * 2;
    const currentFont = 16 - currentStep;
    yesBtn.style.padding = `${Math.max(currentPad, 8)}px ${Math.max(40 - currentStep * 6, 20)}px`;
    yesBtn.style.fontSize = `${Math.max(currentFont, 12)}px`;
    yesBtn.style.opacity = `${1 - currentStep * 0.15}`;
}

function onNo() {
    swapContent("💛", "No more mdeya2a.", "Bhbk 🌶️", true);
    document.getElementById('buttons').style.display = 'none';
    document.body.classList.add('happy');
    launchConfetti();
}

function swapContent(emoji, question, hint, isLove = false) {
    const emojiEl   = document.getElementById('emoji');
    const questionEl = document.getElementById('question');
    const hintEl    = document.getElementById('hint');
    const container = document.getElementById('container');

    emojiEl.textContent   = emoji;
    questionEl.textContent = question;
    hintEl.textContent    = hint;

    // Re-trigger fade animation
    container.classList.remove('fade-in');
    void container.offsetWidth;
    container.classList.add('fade-in');

    if (isLove) {
        container.classList.add('love-msg');
    }
}

function launchConfetti() {
    const emojis = ['💛', '🌶️', '✨', '🎉', '💕', '🤍', '⭐'];
    const container = document.getElementById('confetti');

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'piece';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.fontSize = (14 + Math.random() * 22) + 'px';
            const dur = 2.5 + Math.random() * 2;
            el.style.animation = `fall ${dur}s linear forwards`;
            container.appendChild(el);
            setTimeout(() => el.remove(), dur * 1000 + 100);
        }, i * 70);
    }
}
