// Rooms for random clues
const rooms = {
    attic: "The Attic",
    basement: "The Basement",
    library: "The Library",
    kitchen: "The Kitchen"
};
// Variables for new features
let timeLeft = 60;
let inventory = [];
let isDarkMode = false;

// Timer Function
function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer').innerText = timeLeft;
        } else {
            clearInterval(timerInterval);
            alert('Time’s up! The mystery remains unsolved...');
            location.reload(); // Restart game on time out
        }
    }, 1000);
}

// Inventory Function
function updateInventory(item) {
    inventory.push(item);
    document.getElementById('inventory-items').innerText = inventory.join(', ');
    if (inventory.includes('Ancient Key')) {
        document.getElementById('library').classList.remove('locked');
        document.getElementById('library').classList.add('room');
    }
}

// Fetch clue and unlock items based on room
async function fetchClue(room) {
    const roomName = rooms[room];
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        document.getElementById('clue-text').innerText = `In the ${roomName}: ${data.slip.advice}`;

        if (room === 'attic' && !inventory.includes('Ancient Key')) {
            updateInventory('Ancient Key');
            document.getElementById('clue-text').innerText += ' 🎃 You found an Ancient Key!';
        }
    } catch (error) {
        document.getElementById('clue-text').innerText = `The spirits are silent...`;
    }
}

// Jump Scare Function
function randomJumpScare() {
    if (Math.random() > 0.7) { // 30% chance for jump scare
        const jumpScare = document.getElementById('jumpscare');
        jumpScare.classList.remove('hidden');
        setTimeout(() => jumpScare.classList.add('hidden'), 1000); // Show for 1 second
    }
}

// Dark Mode Toggle
document.getElementById('toggle-mode').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.getElementById('toggle-mode').innerText = isDarkMode ? '🌚 Light Mode' : '🌞 Dark Mode';
});

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
    room.addEventListener('click', () => {
        if (!room.classList.contains('locked')) {
            fetchClue(room.id);
            randomJumpScare();
        } else {
            document.getElementById('clue-text').innerText = 'This room is locked. Find the key!';
        }
    });
});

// Start the timer when the page loads
startTimer();
