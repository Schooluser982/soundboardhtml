let allowOverlap = false;
let activeSounds = [];

const soundboard = document.getElementById("soundboard");
const searchInput = document.getElementById("searchInput");
const toggleOverlap = document.getElementById("toggleOverlap");
const stopAll = document.getElementById("stopAll");

// Load sound list
fetch("sounds.json")
    .then(res => res.json())
    .then(sounds => {
        createButtons(sounds);

        // Search filter
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            document.querySelectorAll(".sound-button").forEach(btn => {
                const name = btn.dataset.name.toLowerCase();
                btn.style.display = name.includes(query) ? "inline-block" : "none";
            });
        });
    });

// Create buttons for each sound
function createButtons(sounds) {
    sounds.forEach(sound => {
        const btn = document.createElement("button");
        btn.className = "sound-button";
        btn.textContent = sound.name;
        btn.dataset.name = sound.name;

        btn.addEventListener("click", () => playSound(sound.file));

        soundboard.appendChild(btn);
    });
}

// Play sound
function playSound(file) {
    if (!allowOverlap) stopAllSounds();

    const audio = new Audio(`sounds/${file}`);
    activeSounds.push(audio);
    audio.play();

    audio.onended = () => {
        activeSounds = activeSounds.filter(a => a !== audio);
    };
}

// Stop all sounds
function stopAllSounds() {
    activeSounds.forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
    activeSounds = [];
}

// Toggle overlap
toggleOverlap.addEventListener("click", () => {
    allowOverlap = !allowOverlap;
    toggleOverlap.textContent = allowOverlap ? "🔊 Overlap: ON" : "🔇 Overlap: OFF";
});

// Stop all button
stopAll.addEventListener("click", stopAllSounds);
