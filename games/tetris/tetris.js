document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const startButton = document.getElementById("start-button");
  const width = 10;
  let score = 0;
  let timerId = null; // Başlangıçta durdurulmuş

  // Create the grid cells
  for (let i = 0; i < 200; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
  }
  for (let i = 0; i < 10; i++) {
    const cell = document.createElement("div");
    cell.classList.add("taken");
    grid.appendChild(cell);
  }

  let squares = Array.from(document.querySelectorAll(".grid div"));

  // Tetriminoes
  const lTetrimino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetrimino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetrimino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetrimino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetrimino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetriminoes = [
    lTetrimino,
    zTetrimino,
    tTetrimino,
    oTetrimino,
    iTetrimino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  // Randomly select a tetrimino
  let random = Math.floor(Math.random() * theTetriminoes.length);
  let current = theTetriminoes[random][currentRotation];

  // Draw the Tetrimino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetrimino");
    });
  }

  // Undraw the Tetrimino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetrimino");
    });
  }

  // Move the Tetrimino down
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      // Start a new Tetrimino falling
      random = Math.floor(Math.random() * theTetriminoes.length);
      current = theTetriminoes[random][currentRotation];
      currentPosition = 4;
      draw();
      addScore();
      gameOver();
    }
  }

  // Game over
  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "Game Over";
      clearInterval(timerId);
    }
  }

  // Start game on button click
  startButton.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId); // Durdur
      timerId = null;
      startButton.textContent = "Start Game";
    } else {
      draw();
      timerId = setInterval(moveDown, 1000); // Başlat
      startButton.textContent = "Pause Game";
    }
  });

  // Event listeners for controls
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveLeft();
    else if (event.key === "ArrowRight") moveRight();
    else if (event.key === "ArrowUp") rotate();
    else if (event.key === "ArrowDown") moveDown();
  });

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isAtRightEdge) currentPosition += 1;
    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) currentRotation = 0;
    current = theTetriminoes[random][currentRotation];
    draw();
  }
});
