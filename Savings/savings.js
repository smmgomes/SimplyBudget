document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("savings");
  const amount = document.createElement("h2");
  amount.classList.add("savings_text");
  amount.textContent = "$ 1000";
  amount.style.textAlign = "center";
  amount.style.fontWeight = "100";
  amount.style.fontSize = "3.4vw";
  amount.style.paddingTop = "10vh";
  container.appendChild(amount);
  const canvas1 = document.createElement("canvas");
  const canvas2 = document.createElement("canvas");
  const canvas3 = document.createElement("canvas");
  container.appendChild(canvas1);
  container.appendChild(canvas2);
  container.appendChild(canvas3);
  window.confetti.create(canvas1);
  window.confetti.create(canvas2);
  window.confetti.create(canvas3);
  confetti({
    particleCount: 100,
    angle: 120,
    spread: 40,
    ticks: 150,
    gravity: 1,
    disableForReducedMotion: true,
  }).then(function () {
    container.removeChild(canvas1);
  });
  confetti({
    particleCount: 100,
    angle: 65,
    spread: 40,
    ticks: 150,
    gravity: 1,
    disableForReducedMotion: true,
  }).then(function () {
    container.removeChild(canvas2);
  });
  confetti({
    particleCount: 100,
    angle: 90,
    spread: 40,
    ticks: 150,
    gravity: 1,
    disableForReducedMotion: true,
  }).then(function () {
    container.removeChild(canvas3);
  });
});
