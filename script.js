const totalSlides = 15;
let currentSlide = 1;
let isAnimating = false;

const progressBar = document.getElementById("progress-bar");
const slideCounter = document.getElementById("slide-counter");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const dotsContainer = document.getElementById("dots-container");

// Build dots
for (let i = 1; i <= totalSlides; i++) {
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 1 ? " active" : "");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateUI() {
  slideCounter.textContent =
    String(currentSlide).padStart(2, "0") +
    " / " +
    String(totalSlides).padStart(2, "0");
  prevBtn.disabled = currentSlide === 1;
  nextBtn.disabled = currentSlide === totalSlides;
  progressBar.style.width = (currentSlide / totalSlides) * 100 + "%";
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i + 1 === currentSlide);
  });
}

function goToSlide(target) {
  if (
    isAnimating ||
    target === currentSlide ||
    target < 1 ||
    target > totalSlides
  )
    return;
  isAnimating = true;

  const current = document.getElementById("slide-" + currentSlide);
  const next = document.getElementById("slide-" + target);

  current.classList.add("exit-up");
  current.classList.remove("active");

  setTimeout(() => {
    current.classList.remove("exit-up");
    next.classList.add("active");
    currentSlide = target;
    updateUI();
    setTimeout(() => {
      isAnimating = false;
    }, 650);
  }, 300);
}

function changeSlide(dir) {
  goToSlide(currentSlide + dir);
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    changeSlide(1);
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    changeSlide(-1);
  }
});

// Touch/swipe
let touchStart = null;
document.addEventListener("touchstart", (e) => {
  touchStart = e.touches[0].clientX;
});
document.addEventListener("touchend", (e) => {
  if (touchStart === null) return;
  const diff = touchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
  touchStart = null;
});

updateUI();
