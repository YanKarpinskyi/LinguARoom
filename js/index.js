// ==================== AUDIO PLAYER ====================
let isPlaying = false;
let currentAudio = null;
let currentSpeed = 1;

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const backBtn = document.getElementById("back-btn");
    console.log("Back button exists:", !!backBtn);
    console.log("Back button computed style:", window.getComputedStyle(backBtn).display);
    
    // Ініціалізація аудіо плеєра та вставки слів
    initAudioPlayer();
    initWordInsertion();
    
    // Блокування орієнтації екрану
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(err => {
            console.log("Orientation lock failed:", err);
        });
    }
});

// ==================== AUDIO PLAYER FUNCTIONS ====================
function initAudioPlayer() {
    const playButton = document.querySelector('.track-on_off > button');
    const trackImage = document.querySelector('.track-on_off > img');
    const speedButtons = document.querySelectorAll('.track-speed button');
    
    if (!playButton) return;
    
    // Створення аудіо елемента
    currentAudio = new Audio('./assets/audio/listening-task.mp3');
    currentAudio.playbackRate = currentSpeed;
    
    // Обробник кнопки Play/Pause
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio(playButton, trackImage);
        } else {
            playAudio(playButton, trackImage);
        }
    });
    
    // Обробники кнопок швидкості
    speedButtons.forEach(button => {
        button.addEventListener('click', () => {
            speedButtons.forEach(btn => btn.classList.remove('active-speed'));
            button.classList.add('active-speed');
            
            const speed = parseFloat(button.textContent);
            currentSpeed = speed;
            if (currentAudio) {
                currentAudio.playbackRate = speed;
            }
        });
    });
    
    // Коли аудіо закінчується
    currentAudio.addEventListener('ended', () => {
        pauseAudio(playButton, trackImage);
    });
}

function playAudio(button, image) {
    if (currentAudio) {
        currentAudio.play();
        isPlaying = true;
        
        button.innerHTML = '<img src="./assets/img/track-stop.png" alt=""> Pause';
        image.src = './assets/img/track-start.png';
        button.style.backgroundColor = '#8B4513';
        button.style.color = '#FFD700';
    }
}

function pauseAudio(button, image) {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        
        button.innerHTML = '<img src="./assets/img/track-start.png" alt=""> Start';
        image.src = './assets/img/track.png';
        button.style.backgroundColor = '#c7a382';
        button.style.color = '#47370c';
    }
}

// ==================== WORD INSERTION FUNCTIONS ====================
function initWordInsertion() {
    const grammarVariants = document.querySelectorAll('.grammar-variant');
    const grammarSentences = document.querySelectorAll('.grammar-sentence');
    const inputFields = document.querySelectorAll('.task-content > input');
    
    // Обробник для кнопок варіантів (перше речення)
    if (grammarVariants.length > 0 && grammarSentences.length > 0) {
        grammarVariants.forEach(button => {
            button.addEventListener('click', () => {
                const word = button.textContent.trim();
                insertWordInSentence(grammarSentences[0], word);
                
                grammarVariants.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
    }
    
    // Обробник для input полів
    inputFields.forEach((inputField, index) => {
        const sentenceIndex = index === 0 ? 1 : 2; // Друге речення для першого input
        
        if (inputField && grammarSentences[sentenceIndex]) {
            inputField.addEventListener('input', (e) => {
                const word = e.target.value.trim();
                if (word) {
                    insertWordInSentence(grammarSentences[sentenceIndex], word);
                }
            });
            
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const word = e.target.value.trim();
                    if (word) {
                        insertWordInSentence(grammarSentences[sentenceIndex], word);
                        e.target.style.borderBottom = '4px solid #2d8a08';
                    }
                }
            });
        }
    });
}

function insertWordInSentence(sentenceElement, word) {
    if (!sentenceElement) return;
    
    const originalText = sentenceElement.dataset.original || sentenceElement.textContent;
    if (!sentenceElement.dataset.original) {
        sentenceElement.dataset.original = originalText;
    }
    
    const newText = originalText.replace('_____', `<span class="inserted-word">${word}</span>`);
    sentenceElement.innerHTML = newText;
}

// ==================== NAVIGATION BUTTONS ====================
document.getElementById("do-practice").addEventListener("click", () => {
    console.log("do-practice clicked");
    document.querySelectorAll(".speech-bubble").forEach(el => {
        el.style.display = "block";
    });
    document.getElementsByClassName("choice")[0].style.display = "none";
    const backBtn = document.getElementById("back-btn");
    backBtn.style.display = "flex";
    backBtn.dataset.returnTo = "home";
    console.log("Back button display:", backBtn.style.display);
});

document.getElementById("test").addEventListener("click", () => {
    console.log("test clicked");
    document.getElementsByClassName("choice")[0].style.display = "none";
    document.getElementsByClassName("task")[0].style.display = "flex";
    const backBtn = document.getElementById("back-btn");
    backBtn.style.display = "flex";
    backBtn.dataset.returnTo = "home";
    console.log("Back button display:", backBtn.style.display);
});

document.getElementById("speak").addEventListener("click", () => {
    console.log("speak clicked");
    document.querySelectorAll(".speech-bubble").forEach(el => {
        el.style.display = "none";
    });
    document.getElementsByClassName("task")[2].style.display = "flex";
    const backBtn = document.getElementById("back-btn");
    backBtn.style.display = "flex";
    backBtn.dataset.returnTo = "bubbles";
    console.log("Back button display:", backBtn.style.display);
});

document.getElementById("listen").addEventListener("click", () => {
    console.log("listen clicked");
    document.querySelectorAll(".speech-bubble").forEach(el => {
        el.style.display = "none";
    });
    document.getElementsByClassName("task")[1].style.display = "flex";
    const backBtn = document.getElementById("back-btn");
    backBtn.style.display = "flex";
    backBtn.dataset.returnTo = "bubbles";
    console.log("Back button display:", backBtn.style.display);
    
    // Ініціалізація аудіо плеєра при відкритті listening task
    setTimeout(initAudioPlayer, 100);
});

document.getElementById("cafe-place-btn").addEventListener("click", () => {
    console.log("cafe clicked");
    document.getElementsByClassName("task")[2].style.display = "none";
    const backBtn = document.getElementById("back-btn");
    backBtn.dataset.returnTo = "places";
    backBtn.style.display = "flex";
    console.log("Back button display:", backBtn.style.display);
    
    const oldVideo = document.querySelector("#bg-video");
    if (oldVideo) oldVideo.remove();

    const audios = document.querySelectorAll(".bg-sounds");
    audios.forEach(audio => audio.pause());

    document.body.style.backgroundImage = "url('assets/img/girl-cafe.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    const newVideo = document.createElement("video");
    newVideo.id = "bg-video";
    newVideo.autoplay = true;
    newVideo.muted = false;
    newVideo.playsInline = true;
    newVideo.loop = false;

    Object.assign(newVideo.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-1",
        pointerEvents: "none", 
    });

    const source = document.createElement("source");
    source.src = "assets/video/place-cafe.mp4";
    source.type = "video/mp4";
    newVideo.appendChild(source);

    document.body.appendChild(newVideo);

    newVideo.addEventListener("ended", () => {
        newVideo.style.opacity = "0";
    });
});

// ==================== BACK BUTTON ====================
document.getElementById("back-btn").addEventListener("click", () => {
    console.log("back button clicked");
    const returnTo = document.getElementById("back-btn").dataset.returnTo;
    console.log("returnTo:", returnTo);
    
    // Зупинити аудіо при поверненні назад
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        isPlaying = false;
    }
    
    if (returnTo === "home") {
        document.querySelectorAll(".task").forEach(task => task.style.display = "none");
        document.querySelectorAll(".speech-bubble").forEach(el => {
            el.style.display = "none";
        });
        document.getElementsByClassName("choice")[0].style.display = "flex";
        document.getElementById("back-btn").style.display = "none";
    } else if (returnTo === "bubbles") {
        document.querySelectorAll(".task").forEach(task => task.style.display = "none");
        document.querySelectorAll(".speech-bubble").forEach(el => {
            el.style.display = "block";
        });
        document.getElementById("back-btn").dataset.returnTo = "home";
    } else if (returnTo === "places") {
        document.body.style.backgroundImage = "";
        const bgVideo = document.querySelector("#bg-video");
        if (bgVideo) bgVideo.remove();
        
        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.id = "bg-video";
        
        Object.assign(video.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-1"
        });
        
        const source = document.createElement("source");
        source.src = "./assets/video/lr-bg.mp4";
        source.type = "video/mp4";
        source.id = "bg";
        video.appendChild(source);
        
        document.body.insertBefore(video, document.body.firstChild);
        
        document.getElementsByClassName("task")[2].style.display = "flex";
        document.getElementById("back-btn").dataset.returnTo = "bubbles";
    }
});

// ==================== PWA SUPPORT ====================
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA можна встановити!');
    e.preventDefault();
    deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
    console.log('LinguARoom встановлено як додаток!');
    deferredPrompt = null;
});