window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let fireworks = [];
  let candlesOn = true;
  let showCake = true;

  // 🎨 БЕЛОЕ ПРЕВЬЮ С НАДПИСЬЮ "От 6е" (вместо мини-видео)
  const previewDiv = document.createElement("div");
  previewDiv.style.position = "absolute";
  previewDiv.style.bottom = "20px";
  previewDiv.style.left = "50%";
  previewDiv.style.transform = "translateX(-50%)";
  previewDiv.style.width = "200px";
  previewDiv.style.height = "120px";
  previewDiv.style.backgroundColor = "white";
  previewDiv.style.borderRadius = "10px";
  previewDiv.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
  previewDiv.style.cursor = "pointer";
  previewDiv.style.zIndex = "10";
  previewDiv.style.display = "flex";
  previewDiv.style.alignItems = "center";
  previewDiv.style.justifyContent = "center";
  previewDiv.style.fontSize = "24px";
  previewDiv.style.fontWeight = "bold";
  previewDiv.style.color = "#ff1493";
  previewDiv.style.fontFamily = "Arial, sans-serif";
  previewDiv.innerText = "От 6е";
  
  // Добавляем иконку видео
  previewDiv.style.flexDirection = "column";
  previewDiv.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 5px;">🎬</div>
    <div>От 6е</div>
  `;
  
  document.body.appendChild(previewDiv);

  // 🎬 Полноэкранный YouTube плеер
  const videoContainer = document.createElement("div");
  videoContainer.style.position = "fixed";
  videoContainer.style.top = "0";
  videoContainer.style.left = "0";
  videoContainer.style.width = "100%";
  videoContainer.style.height = "100%";
  videoContainer.style.backgroundColor = "black";
  videoContainer.style.zIndex = "1000";
  videoContainer.style.display = "none";
  
  const YOUTUBE_VIDEO_ID = "6XsSIXABVSA";
  
  videoContainer.innerHTML = `
    <div style="position: relative; width: 100%; height: 100%;">
      <iframe 
        id="youtubePlayer"
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0" 
        frameborder="0" 
        allow="autoplay; encrypted-media; fullscreen" 
        allowfullscreen>
      </iframe>
      <div id="videoOverlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer;"></div>
    </div>
  `;
  
  document.body.appendChild(videoContainer);

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
    const iframe = document.getElementById("youtubePlayer");
    if (iframe) {
      iframe.src = iframe.src;
    }
    videoContainer.style.display = "none";
    returnBtn.style.display = "none";
    showCake = true;
    previewDiv.style.display = "flex";
  });
  
  document.body.appendChild(returnBtn);

  // Показываем кнопку закрытия когда видео открыто
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === "style" && videoContainer.style.display === "block") {
        returnBtn.style.display = "block";
        setTimeout(() => {
          const overlay = document.getElementById("videoOverlay");
          if (overlay) overlay.style.display = "none";
        }, 2000);
      }
    });
  });
  observer.observe(videoContainer, { attributes: true });

  // 🖱️ Клик на белое превью
  previewDiv.addEventListener("click", () => {
    showCake = false;
    previewDiv.style.display = "none";
    videoContainer.style.display = "block";
  });

  // 🎊 Частицы при движении мыши
  window.addEventListener("mousemove", function (e) {
    if (particles.length < 200) {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    }
  });

  // 💥 Фейерверки при клике
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
    ctx.fillText("Нажми на белую кнопку снизу для поздравления! 🎬", canvas.width / 2, 180);
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

  // 🖱️ Клик на canvas для кнопок
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

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }

    for (let i = 0; i < fireworks.length; i++) {
      fireworks[i].update();
      fireworks[i].draw();
      if (fireworks[i].life <= 0) {
        fireworks.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
};
