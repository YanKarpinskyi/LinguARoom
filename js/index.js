document.getElementById("do-practice").addEventListener("click", () => {
    document.querySelectorAll(".speech-bubble").forEach(el => {el.style.display = "block";});
    document.getElementsByClassName("choice")[0].style.display = "none";
});

document.getElementById("test").addEventListener("click", () => {
    document.getElementsByClassName("choice")[0].style.display = "none";
    document.getElementsByClassName("task")[0].style.display = "flex";
});

document.getElementById("speak").addEventListener("click", () => {
    document.querySelectorAll(".speech-bubble").forEach(el => {el.style.display = "none";});
    document.getElementsByClassName("task")[2].style.display = "flex";
});

document.getElementById("listen").addEventListener("click", () => {
    document.querySelectorAll(".speech-bubble").forEach(el => {el.style.display = "none";});
    document.getElementsByClassName("task")[1].style.display = "flex";
});

document.getElementById("cafe-place-btn").addEventListener("click", () => {
    document.getElementsByClassName("task")[2].style.display = "none";
 
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
        zIndex: "1",        
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

document.addEventListener("DOMContentLoaded", () => {
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
