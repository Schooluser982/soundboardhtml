let allowOverlap = false;
let activeSounds = [];

const soundboard = document.getElementById("soundboard");
const searchInput = document.getElementById("searchInput");
const toggleOverlap = document.getElementById("toggleOverlap");
const stopAll = document.getElementById("stopAll");

// RAW GitHub base URL (no caching issues)
const RAW_BASE = "https://raw.githubusercontent.com/Schooluser982/soundboardhtml/main/";

fetch(RAW_BASE + "sounds.json")
    .then(res => res.json())
    .then(sounds => {
        createButtons(sounds);

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            document.querySelectorAll(".sound-button").forEach(btn => {
                const name = btn.dataset.name.toLowerCase();
                btn.style.display = name.includes(query) ? "inline-block" : "none";
            });
        });
    });

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

function playSound(file) {
    if (!allowOverlap) stopAllSounds();

    const audio = new Audio(RAW_BASE + "sounds/" + file);
    activeSounds.push(audio);
    audio.play();

    audio.onended = () => {
        activeSounds = activeSounds.filter(a => a !== audio);
    };
}

function stopAllSounds() {
    activeSounds.forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
    activeSounds = [];
}

toggleOverlap.addEventListener("click", () => {
    allowOverlap = !allowOverlap;
    toggleOverlap.textContent = allowOverlap ? "🔊 Overlap: ON" : "🔇 Overlap: OFF";
});

stopAll.addEventListener("click", stopAllSounds);
