// Pixel art patterns for each letter
const letterPatterns = {
  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  " ": [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

// สร้าง pixel blocks
function createPixelBlocks() {
  const container = document.getElementById("pixelContainer");
  const text = "KOA LOVE TONKHAO";

  for (let row = 0; row < 7; row++) {
    const pixelRow = document.createElement("div");
    pixelRow.className = "pixel-row";

    let currentCol = 0;
    for (let char of text) {
      const pattern = letterPatterns[char] || letterPatterns[" "];

      for (let col = 0; col < pattern[0].length; col++) {
        const pixelBlock = document.createElement("div");
        pixelBlock.className = "pixel-block";
        pixelBlock.dataset.row = row;
        pixelBlock.dataset.col = currentCol;
        pixelBlock.dataset.active = pattern[row][col];
        pixelRow.appendChild(pixelBlock);
        currentCol++;
      }

      // เพิ่มช่องว่างระหว่างตัวอักษร (ยกเว้น space)
      if (char !== " ") {
        const spaceBlock = document.createElement("div");
        spaceBlock.className = "pixel-block";
        spaceBlock.dataset.row = row;
        spaceBlock.dataset.col = currentCol;
        spaceBlock.dataset.active = 0;
        pixelRow.appendChild(spaceBlock);
        currentCol++;
      }
    }

    container.appendChild(pixelRow);
  }

  console.log(`Total columns created: ${currentCol}`);
}

// แอนิเมชันเปลี่ยนสี pixel blocks แบบทีละตัวอักษร
function animatePixels() {
  const text = "KOA LOVE TONKHAO";
  const letters = text.split("");
  let letterDelay = 0;

  letters.forEach((letter, letterIndex) => {
    if (letter === " ") {
      letterDelay += 200; // หน่วงเวลาสำหรับช่องว่าง
      return;
    }

    setTimeout(() => {
      // หาตำแหน่งของตัวอักษรแต่ละตัว
      let currentPosition = 0;
      for (let i = 0; i < letterIndex; i++) {
        const prevLetter = letters[i];
        const prevPattern = letterPatterns[prevLetter] || letterPatterns[" "];
        currentPosition += prevPattern[0].length;
        // เพิ่มช่องว่างเฉพาะตัวอักษรที่ไม่ใช่ space
        if (prevLetter !== " ") {
          currentPosition += 1;
        }
      }

      const pattern = letterPatterns[letter];
      if (pattern) {
        console.log(
          `Animating letter: ${letter} at position: ${currentPosition}`
        );
        // แอนิเมชันสำหรับตัวอักษรแต่ละตัว
        for (let row = 0; row < 7; row++) {
          for (let col = 0; col < pattern[0].length; col++) {
            if (pattern[row][col] === 1) {
              const block = document.querySelector(
                `[data-row="${row}"][data-col="${currentPosition + col}"]`
              );
              if (block) {
                setTimeout(() => {
                  block.classList.add("active");
                }, (row * pattern[0].length + col) * 50);
              } else {
                console.log(
                  `Block not found: row=${row}, col=${currentPosition + col}`
                );
              }
            }
          }
        }
      }
    }, letterDelay);

    letterDelay += 800; // หน่วงเวลาระหว่างตัวอักษร
  });
}

// สร้าง floating hearts
function createFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 300);
}

// Event listeners
document.getElementById("loveLetterBtn").addEventListener("click", function () {
  const pageOne = document.getElementById("pageOne");
  const pageTwo = document.getElementById("pageTwo");

  // เอฟเฟกต์การเด้งของหน้าแรก
  pageOne.classList.add("bounce-out");

  // เลื่อนหน้าสองขึ้นมา
  setTimeout(() => {
    pageTwo.classList.add("slide-up");

    // เริ่มแอนิเมชัน pixel หลังจากเลื่อนหน้าเสร็จ
    setTimeout(() => {
      animatePixels();
    }, 400);
  }, 200);
});

// เริ่มต้นเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", function () {
  createPixelBlocks();
  createFloatingHearts();
});

// ป้องกันการ scroll
document.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
});
