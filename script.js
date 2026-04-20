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
  miniVideo.src = "video.mp4";
  miniVideo.style.position = "absolute";
  miniVideo.style.bottom = "20px";
  miniVideo.style.left = "50%";
  miniVideo.style.transform = "translateX(-50%)";
  miniVideo.style.width = "200px";
  miniVideo.style.height = "120px";
  miniVideo.style.cursor = "pointer";
  miniVideo.style.borderRadius = "10px";
  miniVideo.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
  miniVideo.style.zIndex = "10";
  miniVideo.muted = true;
  miniVideo.autoplay = true;
  miniVideo.loop = true;
  
  miniVideo.addEventListener("error", () => {
    console.warn("Мини-видео не загружено");
    miniVideo.style.display = "none";
  });
  
  document.body.appendChild(miniVideo);

  // 🎬 Полноэкранное видео (3 минуты 40 секунд)
  const fullVideo = document.createElement("video");
  fullVideo.src = "happyBirthday.mp4";
  fullVideo.style.position = "fixed";
  fullVideo.style.top = "0";
  fullVideo.style.left = "0";
  fullVideo.style.width = "100%";
  fullVideo.style.height = "100%";
  fullVideo.style.objectFit = "contain";
  fullVideo.style.backgroundColor = "black";
  fullVideo.style.display = "none";
  fullVideo.style.zIndex = "1000";
  fullVideo.controls = true;
  
  fullVideo.addEventListener("error", () => {
    console.warn("Полноэкранное видео не загружено");
    fullVideo.style.display = "none";
    returnBtn.style.display = "none";
    showCake = true;
  });
  
  document.body.appendChild(fullVideo);

  // 🔘 Кнопка "Закрыть" для видео
  const returnBtn = document.createElement("button");
  returnBtn.innerText = "✕ Закрыть";
  returnBtn.style.position = "fixed";
  returnBtn.style.top = "20px";
  returnBtn.style.right = "20px";
  returnBtn.style.padding = "12px 24px";
  returnBtn.style.fontSize = "18px";
  returnBtn.style.fontWeight = "bold";
  returnBtn.style.backgroundColor = "rgba(0,0,0,0.7)";
  returnBtn.style.color = "white";
  returnBtn.style.border = "none";
  returnBtn.style.borderRadius = "8px";
  returnBtn.style.cursor = "pointer";
  returnBtn.style.zIndex = "1001";
  returnBtn.style.display = "none";
  returnBtn.style.transition = "all 0.3s";
  
  returnBtn.addEventListener("mouseenter", () => {
    returnBtn.style.backgroundColor = "rgba(0,0,0,0.9)";
  });
  returnBtn.addEventListener("mouseleave", () => {
    returnBtn.style.backgroundColor = "rgba(0,0,0,0.7)";
  });
  
  returnBtn.addEventListener("click", () => {
    fullVideo.pause();
    fullVideo.style.display = "none";
    returnBtn.style.display = "none";
    showCake = true;
    miniVideo.style.display = "block";
  });
  
  document.body.appendChild(returnBtn);

  // Показываем кнопку закрытия когда видео началось
  fullVideo.addEventListener("play", () => {
    returnBtn.style.display = "block";
  });

  // Когда видео закончилось - закрываем его
  fullVideo.addEventListener("ended", () => {
    fullVideo.style.display = "none";
    returnBtn.style.display = "none";
    showCake = true;
    miniVideo.style.display = "block";
  });

  // 🎊 Частицы
  window.addEventListener("mousemove", function (e) {
    if (particles.length < 200) {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
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
      this.life = 1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size *= 0.95;
      this.life -= 0.02;
    }
    draw() {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  class FireworkParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 8 - 4;
      this.speedY = Math.random() * 8 - 4;
      this.life = 100;
      this.color = `hsl(${Math.random() * 360},100%,60%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += 0.1;
      this.life -= 2;
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
    for (let i = 0; i < 60; i++) {
      fireworks.push(new FireworkParticle(x, y));
    }
  }

  // 🎂 Торт с свечами
  function drawCake() {
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,0,0,0.3)";

    ctx.fillStyle = "#ffb6c1";
    ctx.fillRect(x - 120, y + 20, 240, 60);
    ctx.fillStyle = "#ff69b4";
    ctx.fillRect(x - 90, y - 20, 180, 50);
    ctx.fillStyle = "#ff1493";
    ctx.fillRect(x - 60, y - 60, 120, 40);
    
    ctx.fillStyle = "#fff0f5";
    ctx.fillRect(x - 58, y - 62, 116, 8);
    
    for (let i = -40; i <= 40; i += 20) {
      ctx.fillStyle = "#ff6347";
      ctx.fillRect(x + i, y - 90, 8, 28);
      
      ctx.fillStyle = "#333";
      ctx.fillRect(x + i + 3, y - 92, 2, 5);
      
      if (candlesOn) {
        let flicker = Math.random() * 6;
        ctx.fillStyle = `rgba(255, 200, 50, ${0.8 + Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.arc(x + i + 4, y - 95, 8 + flicker * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(255, 100, 0, ${0.3 + Math.random() * 0.2})`;
        ctx.beginPath();
        ctx.arc(x + i + 4, y - 95, 12 + flicker, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.shadowBlur = 0;
  }

  function drawText() {
    ctx.fillStyle = "white";
    ctx.font = "bold 48px 'Arial', 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "black";
    ctx.fillText("🎉 С ДНЁМ РОЖДЕНИЯ! 🎉", canvas.width / 2, 80);
    ctx.font = "24px Arial";
    ctx.fillText("Кликни на торт чтобы запустить салют!", canvas.width / 2, 140);
    ctx.shadowBlur = 0;
  }

  function drawButtons() {
    let y = canvas.height / 2 + 130;
    let btnWidth = 130;
    let btnHeight = 50;
    let spacing = 20;
    let startX = canvas.width / 2 - btnWidth - spacing / 2;
    
    ctx.fillStyle = candlesOn ? "#666" : "#ff6b6b";
    ctx.shadowBlur = 5;
    ctx.fillRect(startX, y, btnWidth, btnHeight);
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.fillText("🕯️ Задуть", startX + btnWidth / 2, y + 32);
    
    ctx.fillStyle = candlesOn ? "#4ecdc4" : "#666";
    ctx.fillRect(startX + btnWidth + spacing, y, btnWidth, btnHeight);
    ctx.fillStyle = "white";
    ctx.fillText("🔥 Зажечь", startX + btnWidth + spacing + btnWidth / 2, y + 32);
    
    ctx.shadowBlur = 0;
  }

  // 🖱️ Клик на мини-видео
  miniVideo.addEventListener("click", () => {
    showCake = false;
    miniVideo.style.display = "none";
    fullVideo.style.display = "block";
    fullVideo.muted = false;
    fullVideo.volume = 1;
    fullVideo.currentTime = 0;
    fullVideo.play().catch(err => {
      console.warn("Автовоспроизведение заблокировано:", err);
      returnBtn.style.display = "block";
    });
  });

  canvas.addEventListener("click", function (e) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;
    
    let btnY = canvas.height / 2 + 130;
    let btnWidth = 130;
    let btnHeight = 50;
    let spacing = 20;
    let startX = canvas.width / 2 - btnWidth - spacing / 2;
    
    if (x > startX && x < startX + btnWidth && y > btnY && y < btnY + btnHeight) {
      candlesOn = false;
      createFirework(x, y);
    }
    else if (x > startX + btnWidth + spacing && x < startX + btnWidth + spacing + btnWidth && 
             y > btnY && y < btnY + btnHeight) {
      candlesOn = true;
      createFirework(x, y);
    }
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
      if (p.life <= 0) particles.splice(i, 1);
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
