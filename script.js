// Rooms for random clues
const rooms = {
    attic: "The Attic",
    basement: "The Basement",
    library: "The Library",
    kitchen: "The Kitchen"
};

// Function to fetch random spooky clue
async function fetchClue(room) {
    const roomName = rooms[room];
    try {
        const response = await fetch('https://api.adviceslip.com/advice'); // Random advice API
        const data = await response.json();
        document.getElementById('clue-text').innerText = `In the ${roomName}: ${data.slip.advice}`;
    } catch (error) {
        document.getElementById('clue-text').innerText = `The spirits are silent...`;
        console.error("Error fetching clue:", error);
    }
}

// Sound Effect
const hauntedSound = new Audio('https://www.myinstants.com/media/sounds/ghost-voice.mp3');
let isSoundOn = false;

document.getElementById('sound-btn').addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        hauntedSound.play();
        hauntedSound.loop = true;
        document.getElementById('sound-btn').innerText = '🔇 Mute Sound';
    } else {
        hauntedSound.pause();
        document.getElementById('sound-btn').innerText = '🔊 Play Sound';
    }
});

// Event listeners for room clicks
document.querySelectorAll('.room').forEach(room => {
    room.addEventListener('click', () => fetchClue(room.id));
});
