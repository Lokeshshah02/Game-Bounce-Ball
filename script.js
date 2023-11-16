const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: 50,
  y: 50,
  radius: 20,
  dx: 5,
  dy: 5,
};

let isBouncing = false;

let bounceCount = 0;

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.strokeStyle = "darkgreen";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

function moveBall(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  ball.x = clickX;
  ball.y = clickY;

  if (!isBouncing) {
    isBouncing = true;
  }

  bounceCount++;
  updateBounceCounter();
}

function resetCounter() {
  isBouncing = false;
  bounceCount = 0;
  updateBounceCounter();
}

function updateBounceCounter() {
  document.getElementById(
    "bounceCounter"
  ).textContent = `Bounce Count: ${bounceCount}`;
}

function update() {
  if (isBouncing) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.dx = -ball.dx;
      bounceCount++;
      updateBounceCounter();
    }

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
      bounceCount++;
      updateBounceCounter();
    }
  }

  drawBall();
  requestAnimationFrame(update);
}

canvas.addEventListener("click", moveBall);

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("resetButton")
    .addEventListener("click", resetCounter);
  update();
});
