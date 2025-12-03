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

document.getElementById("back-btn").addEventListener("click", () => {
    console.log("back button clicked");
    const returnTo = document.getElementById("back-btn").dataset.returnTo;
    console.log("returnTo:", returnTo);
    
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

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const backBtn = document.getElementById("back-btn");
    console.log("Back button exists:", !!backBtn);
    console.log("Back button computed style:", window.getComputedStyle(backBtn).display);
    
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(err => {
            console.log("Orientation lock failed:", err);
        });
    }
});

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