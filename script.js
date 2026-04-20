window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let fireworks = [];
  let candlesOn = true;
  let showCake = true;

  // 🎥 Мини-видео снизу (WhatsApp-style)
  const miniVideo = document.createElement("video");
  miniVideo.src = "video.mp4.mp4"; // ваш файл рядом с index.html
  miniVideo.style.position = "absolute";
  miniVideo.style.bottom = "20px";
  miniVideo.style.left = "50%";
  miniVideo.style.transform = "translateX(-50%)";
  miniVideo.style.width = "200px";
  miniVideo.style.height = "120px";
  miniVideo.style.cursor = "pointer";
  miniVideo.muted = true; // превью без звука
  miniVideo.autoplay = true;
  miniVideo.loop = true;
  document.body.appendChild(miniVideo);

  // 🎬 Полноэкранное видео
  const fullVideo = document.createElement("video");
  fullVideo.src = "video.mp4.mp4";
  fullVideo.style.position = "absolute";
  fullVideo.style.top = "0";
  fullVideo.style.left = "0";
  fullVideo.style.width = "100%";
  fullVideo.style.height = "100%";
  fullVideo.style.objectFit = "cover";
  fullVideo.style.display = "none";
  fullVideo.controls = true;
  document.body.appendChild(fullVideo);

  // 🔘 Кнопка "Закрыть" для видео
  const returnBtn = document.createElement("button");
  returnBtn.innerText = "Закрыть";
  returnBtn.style.position = "absolute";
  returnBtn.style.top = "20px";
  returnBtn.style.right = "20px";
  returnBtn.style.padding = "10px 20px";
  returnBtn.style.fontSize = "18px";
  returnBtn.style.display = "none";
  document.body.appendChild(returnBtn);

  returnBtn.addEventListener("click", () => {
    fullVideo.pause();
    fullVideo.style.display = "none";
    returnBtn.style.display = "none";
    showCake = true;
    miniVideo.style.display = "block";
  });

  fullVideo.addEventListener("ended", () => {
    returnBtn.style.display = "block";
  });

  // 🎊 Частицы
  window.addEventListener("mousemove", function (e) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  // 💥 Фейерверки
  window.addEventListener("click", function (e) {
    createFirework(e.clientX, e.clientY);
  });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2;
      this.speedX = Math.random() * 4 - 2;
      this.speedY = Math.random() * 4 - 2;
      this.color = `hsl(${Math.random() * 360},100%,60%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size *= 0.96;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class FireworkParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * 6 - 3;
      this.life = 100;
      this.color = `hsl(${Math.random() * 360},100%,50%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
    }
    draw() {
      ctx.globalAlpha = this.life / 100;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function createFirework(x, y) {
    for (let i = 0; i < 50; i++) {
      fireworks.push(new FireworkParticle(x, y));
    }
  }

  // 🎂 Торт с свечами
  function drawCake() {
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    ctx.fillStyle = "#ffb6c1";
    ctx.fillRect(x - 120, y + 20, 240, 60);
    ctx.fillStyle = "#ff69b4";
    ctx.fillRect(x - 90, y - 20, 180, 50);
    ctx.fillStyle = "#ff1493";
    ctx.fillRect(x - 60, y - 60, 120, 40);

    for (let i = -40; i <= 40; i += 20) {
      ctx.fillStyle = "red";
      ctx.fillRect(x + i, y - 90, 6, 25);
      if (candlesOn) {
        let flicker = Math.random() * 4;
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(x + i + 3, y - 95, 6 + flicker, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawText() {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🎉 С ДНЁМ РОЖДЕНИЯ! 🎉", canvas.width / 2, 100);
  }

  function drawButtons() {
    let y = canvas.height / 2 + 120;
    ctx.fillStyle = "#444";
    ctx.fillRect(canvas.width / 2 - 150, y, 120, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Задуть", canvas.width / 2 - 90, y + 30);
    ctx.fillStyle = "#444";
    ctx.fillRect(canvas.width / 2 + 30, y, 120, 50);
    ctx.fillStyle = "white";
    ctx.fillText("Зажечь", canvas.width / 2 + 90, y + 30);
  }

  // 🖱️ Клик на мини-видео
  miniVideo.addEventListener("click", () => {
    showCake = false;
    miniVideo.style.display = "none";
    fullVideo.style.display = "block";
    fullVideo.muted = false; // звук включен
    fullVideo.volume = 1;
    fullVideo.play();
  });

  canvas.addEventListener("click", function (e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let btnY = canvas.height / 2 + 120;

    // кнопки Задуть/Зажечь
    if (x > canvas.width / 2 - 150 && x < canvas.width / 2 - 30 &&
        y > btnY && y < btnY + 50) candlesOn = false;
    if (x > canvas.width / 2 + 30 && x < canvas.width / 2 + 150 &&
        y > btnY && y < btnY + 50) candlesOn = true;
  });

  // 🔄 Анимация
  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showCake) {
      drawCake();
      drawText();
      drawButtons();
    }

    particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.size < 0.5) particles.splice(i, 1);
    });

    fireworks.forEach((f, i) => {
      f.update();
      f.draw();
      if (f.life <= 0) fireworks.splice(i, 1);
    });

    requestAnimationFrame(animate);
  }

  animate();
};
