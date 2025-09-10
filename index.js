const giftBox = document.getElementById('giftBox');
const message = document.getElementById('message');
const birthdayText = document.getElementById("birthdayText");
const birthdayMusic = document.getElementById("birthdayMusic");

const counterEl = document.getElementById("counter");
const counterContainer = document.getElementById("counterContainer");
const happyBirthdayEl = document.getElementById("happyBirthday");

const videoContainer = document.getElementById("videoContainer");
const birthdayVideo = document.getElementById("birthdayVideo");
const videoOverlay = document.getElementById("videoOverlay");

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const musicStart = document.getElementById("musicStart");

const texts = [
  "Vậy là đã 18 rồi à! Chúc bạn tôi một tuổi mới thật rực rỡ và đáng nhớ. 18 là cột mốc trưởng thành, vì thế hãy sống hết mình để sau này nhìn lại sẽ mỉm cười vì đã có một tuổi 18 thật trọn vẹn. Học tập ở nơi xa, chúc bạn luôn bình an, mạnh mẽ, giữ vững niềm tin và không ngừng tiến về phía trước. Chúc bạn thật nhiều sức khỏe, năng lượng tích cực và may mắn để thực hiện được những dự định, ước mơ riêng của mình. Hãy luôn vững vàng, kiên định và tỏa sáng theo cách của riêng bản thân. Fighting! 🤝"
];

// Counter chạy từ 0 -> 18
function startCounter() {
  let count = 0;
  const interval = setInterval(() => {
    counterEl.textContent = count;
    counterEl.classList.remove("counter-animate");
    void counterEl.offsetWidth;
    counterEl.classList.add("counter-animate");

    if (count >= 18) {
      clearInterval(interval);
      setTimeout(() => counterContainer.style.display = "none", 600);

      happyBirthdayEl.textContent = `🎉 Chúc mừng sinh nhật tuổi 18 🎂`;
      happyBirthdayEl.classList.remove("hidden"); 
      happyBirthdayEl.classList.add("happy-explode");

      for (let i = 0; i < 120; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        document.body.appendChild(confetti);
      }

      setTimeout(() => {
        happyBirthdayEl.style.display = "none";
        giftBox.style.display = "block";
      }, 3000);
    }
    count++;
  }, 500);
}

// Khi mở hộp quà
giftBox.addEventListener("click", () => {
  giftBox.style.display = 'none';
  videoContainer.classList.remove("hidden");

  const introTextEl = document.getElementById("introTyping");
  introTextEl.innerHTML = "";

  // Bắt đầu phát video ngay lập tức
  birthdayVideo.muted = false;
  birthdayVideo.play().catch(err => {
    console.log("Không phát được video:", err);
  });

  // Hiệu ứng gõ chữ intro
  typeWriter(["Cùng nhìn lại quá trình sau"], introTextEl);

  // Sau 4s thì ẩn chữ intro (video vẫn phát)
  setTimeout(() => {
    document.getElementById("videoIntroText").style.display = "none";
  }, 4000);

  // Khi video kết thúc → hiện thiệp
  birthdayVideo.onended = () => {
    videoContainer.classList.add("hidden");
    message.classList.remove("hidden");
    message.classList.add("show");
    typeWriter(texts, birthdayText);

    birthdayMusic.play();
    releaseBalloons();
    setInterval(releaseBalloons, 3000);

    setTimeout(() => {
      const endingScreen = document.getElementById("endingScreen");
      const endingText = endingScreen.querySelector("span");

      message.style.display = "none";
      endingScreen.style.display = "flex";

      setTimeout(() => endingText.classList.add("show"), 100);

      setTimeout(() => {
        endingText.classList.remove("show");
        setTimeout(() => {
          document.querySelector(".curtain-left").classList.add("show");
          document.querySelector(".curtain-right").classList.add("show");
        }, 3000);
      }, 5000);

    }, 32000);
  };
});

function typeWriter(texts, element, textIndex = 0, i = 0) {
  if (textIndex < texts.length) {
    const text = texts[textIndex];
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      setTimeout(() => typeWriter(texts, element, textIndex, i + 1), 40);
    } else {
      setTimeout(() => {
        element.innerHTML += '<br>';
        typeWriter(texts, element, textIndex + 1);
      }, 2000);
    }
  }
}

function releaseBalloons() {
  for (let i = 0; i < 30; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    balloon.style.animationDuration = (6 + Math.random() * 5) + "s";
    document.body.appendChild(balloon);

    setTimeout(() => balloon.remove(), 12000);
  }
}

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  musicStart.play();
  counterContainer.classList.remove("hidden");
  startCounter();
});
