const nameTrigger = document.querySelector('.name-trigger');
const modal = document.getElementById('memoryModal');
const closeBtn = document.querySelector('.close-memory');

if (nameTrigger && modal && closeBtn) {

  nameTrigger.addEventListener('click', () => {
    modal.classList.add('active');
  });

  function closeMemory(){
    modal.classList.remove('active');

    setTimeout(() => {
      playAnnouncement();
    }, 300);
  }

  closeBtn.addEventListener('click', closeMemory);

  modal.addEventListener('click', (e) => {
    if(e.target === modal){
      closeMemory();
    }
  });
}

const overlay = document.getElementById('announcementOverlay');
const announcementText = document.getElementById('announcementText');
const wrapper = document.querySelector('.wrapper');

function playAnnouncement(){

  if(!overlay || !announcementText || !wrapper) return;

  wrapper.classList.add('blur');
  overlay.classList.add('active');

  const message = `Passenger,
  please proceed to Gate Love by approve and then validate your ticket.
  Your flight is ready to depart.`;

  let i = 0;
  announcementText.innerHTML = "";

  function type(){
    if(i < message.length){
      announcementText.innerHTML += message.charAt(i);
      i++;
      setTimeout(type, 40);
    } else {
      setTimeout(() => {
        overlay.classList.remove('active');
        wrapper.classList.remove('blur');
      }, 2000);
    }
  }

  type();
}


let isValidated = false;
let currentSession = 1;
const totalSessions = 3;

const ticket = document.querySelector(".ticket");
const validateBtn = document.getElementById("validateBtn");
const status = document.getElementById("statusText");
const startFlightBtn = document.getElementById("startFlightBtn");
const flightSection = document.querySelector(".flight-section");
const plane = document.getElementById("plane");
const photos = document.querySelectorAll(".flight-photo");
const endingScreen = document.getElementById("endingScreen");
const restartBtn = document.getElementById("restartFlight");


if(qrBox){
  qrBox.addEventListener("click", () => {
    qrText.style.display = "none";
    stamp.classList.add("show");
  });
}

if (planeSound) {
  planeSound.volume = 1;
  planeSound.loop = false;
}

function playPlaneSound(duration = 5000) {
  if (!planeSound) return;

  planeSound.currentTime = 0;

  fadeInAudio(planeSound, 1, 1500);

  setTimeout(() => {
    fadeOutAudio(planeSound, 1200);
  }, duration);
}

if (validateBtn) {
  validateBtn.addEventListener("click", () => {

    status.textContent = "Validated ✓";
    status.style.color = "#0e0d0d";
    status.style.border = "1px solid #141112";

    ticket.classList.add("tear");

    setTimeout(() => {
      ticket.classList.add("show-letter");

      startFlightBtn.disabled = false;
      startFlightBtn.style.opacity = "1";
      startFlightBtn.style.cursor = "pointer";

      isValidated = true;
    }, 800);
  });
}


if (startFlightBtn) {
  startFlightBtn.addEventListener("click", () => {

    if (!isValidated) return;

    document.querySelector(".wrapper").style.display = "none";

    flightSection.classList.add("active");

    resetFlight();

    plane.classList.remove("fly");
    plane.style.animation = "none";
    plane.offsetHeight;
    plane.style.animation = "";

    setTimeout(() => {

      plane.classList.add("fly");

      if (planeSound) {
        planeSound.currentTime = 0;
        fadeInAudio(planeSound, 0.15, 2000);
      }

    }, 100);

    setTimeout(() => {
      showSession(currentSession);
    }, 1200);

  });
}

function resetFlight() {

  photos.forEach(photo => {
    photo.classList.remove("show", "hide");
  });

  endingScreen.classList.remove("show");

  plane.classList.remove("fly");

  currentSession = 1;
}

function showSession(sessionNumber) {

  if (sessionNumber > totalSessions) {

    setTimeout(() => {
      endingScreen.classList.add("show");
    }, 800);

    return;
  }

  const sessionPhotos = document.querySelectorAll(
    `.flight-photo[data-session="${sessionNumber}"]`
  );

  if (!sessionPhotos.length) return;

  sessionPhotos[0].classList.add("show");

  setTimeout(() => {
    if (sessionPhotos[1]) {
      sessionPhotos[1].classList.add("show");
    }
  }, 1500);

  setTimeout(() => {

    sessionPhotos.forEach(photo => {
      photo.classList.remove("show");
      photo.classList.add("hide");
    });

    currentSession++;

    setTimeout(() => {
      showSession(currentSession);
    }, 1000);

  }, 5000);
}

function fadeInAudio(audio, targetVolume = 1, duration = 1500) {

  audio.volume = 0;
  audio.play();

  let step = targetVolume / (duration / 50);

  let fade = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(audio.volume + step, targetVolume);
    } else {
      clearInterval(fade);
    }
  }, 50);
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
}
