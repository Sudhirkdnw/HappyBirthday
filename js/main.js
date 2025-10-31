// 🎯 Set your fixed countdown target date and time
let countdownDate = new Date("October 31, 2025 22:43:00").getTime();

let timer = setInterval(() => {
  let now = new Date().getTime();
  let distance = countdownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2,"0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2,"0");

  // ⏳ When countdown ends
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown-screen").style.display = "none";
    document.getElementById("banner-container").classList.add("show");
  }
}, 1000);

// 🕒 Function to format and display live date & time
function updateLiveDateTime() {
  const now = new Date();

  const options = {
    month: "long",
    day: "2-digit",
  };

  const formattedDate = now.toLocaleDateString("en-US", options).toUpperCase(); // e.g. NOVEMBER 06

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 → 12

  const timeString = `${hours}:${minutes} ${ampm}`;

  document.getElementById(
    "live-date"
  ).innerText = `${formattedDate} | ${timeString}`;
}

// Initial call + auto update every second
updateLiveDateTime();
setInterval(updateLiveDateTime, 1000);

const bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", (event) => {
  const xPos = event.offsetX;
  const yPos = event.offsetY;
  const spanEl = document.createElement("span");
  spanEl.style.left = xPos + "px";
  spanEl.style.top = yPos + "px";
  const size = Math.random() * 100;
  spanEl.style.width = size + "px";
  spanEl.style.height = size + "px";
  bodyEl.appendChild(spanEl);
  setTimeout(() => {
    spanEl.remove();
  }, 3000);
});

// helper functions
const PI2 = Math.PI * 2;
const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
const timestamp = (_) => new Date().getTime();

// container
class Birthday {
  constructor() {
    this.resize();

    // create a lovely place to store the firework
    this.fireworks = [];
    this.counter = 0;
  }

  resize() {
    this.width = canvas.width = window.innerWidth;
    let center = (this.width / 2) | 0;
    this.spawnA = (center - center / 4) | 0;
    this.spawnB = (center + center / 4) | 0;

    this.height = canvas.height = window.innerHeight;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.5;
  }

  onClick(evt) {
    let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
    let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

    let count = random(3, 5);
    for (let i = 0; i < count; i++)
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          x,
          y,
          random(0, 260),
          random(30, 110)
        )
      );

    this.counter = -1;
  }

  update(delta) {
    ctx.globalCompositeOperation = "hard-light";
    ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = "lighter";
    for (let firework of this.fireworks) firework.update(delta);

    // if enough time passed... create new new firework
    this.counter += delta * 3; // each second
    if (this.counter >= 1) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          random(0, this.width),
          random(this.spawnC, this.spawnD),
          random(0, 360),
          random(30, 110)
        )
      );
      this.counter = 0;
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000)
      this.fireworks = this.fireworks.filter((firework) => !firework.dead);
  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false;
    this.offsprings = offsprings;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;

    this.shade = shade;
    this.history = [];
  }
  update(delta) {
    if (this.dead) return;

    let xDiff = this.targetX - this.x;
    let yDiff = this.targetY - this.y;
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      // is still moving
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;

      this.history.push({
        x: this.x,
        y: this.y,
      });

      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        let babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          let targetX =
            (this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
          let targetY =
            (this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;

          birthday.fireworks.push(
            new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
          );
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i];
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + this.shade + ",100%," + i + "%)";
        ctx.arc(point.x, point.y, 1, 0, PI2, false);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = "hsl(" + this.shade + ",100%,50%)";
      ctx.arc(this.x, this.y, 1, 0, PI2, false);
      ctx.fill();
    }
  }
}

let canvas = document.getElementById("birthday");
let ctx = canvas.getContext("2d");

let then = timestamp();

let birthday = new Birthday();
window.onresize = () => birthday.resize();
document.onclick = (evt) => birthday.onClick(evt);
document.ontouchstart = (evt) => birthday.onClick(evt);
(function loop() {
  requestAnimationFrame(loop);

  let now = timestamp();
  let delta = now - then;

  then = now;
  birthday.update(delta / 1000);
})();
