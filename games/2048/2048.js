document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const scoreDisplay = document.getElementById("score");
  const restartButton = document.getElementById("restart");
  const width = 4;
  let squares = [];
  let score = 0;

  // Create the game grid
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = "";
      grid.appendChild(square);
      squares.push(square);
    }
    generateNumber();
    generateNumber();
  }

  // Generate a new number (2 or 4)
  function generateNumber() {
    const emptySquares = squares.filter((square) => square.innerHTML === "");
    if (emptySquares.length > 0) {
      const randomSquare =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      randomSquare.innerHTML = Math.random() > 0.9 ? 4 : 2;
      randomSquare.classList.add("tile-animate");
      updateColors();
    } else {
      checkGameOver();
    }
  }

  // Move tiles
  function move(direction) {
    let moved = false;

    if (direction === "left") moved = moveLeft();
    if (direction === "right") moved = moveRight();
    if (direction === "up") moved = moveUp();
    if (direction === "down") moved = moveDown();

    if (moved) {
      mergeTiles(direction);
      if (direction === "left") moveLeft();
      if (direction === "right") moveRight();
      if (direction === "up") moveUp();
      if (direction === "down") moveDown();

      generateNumber();
      console.log(`Moved ${direction}. Current score: ${score}`);
    } else {
      console.log(`No tiles moved for ${direction}.`);
    }

    updateColors();
    checkGameOver();
  }

  // Merge tiles
  function mergeTiles(direction) {
    for (let i = 0; i < width * width; i++) {
      if (direction === "left" && i % width !== width - 1) merge(i, i + 1);
      if (direction === "right" && i % width !== 0) merge(i, i - 1);
      if (direction === "up" && i < width * (width - 1)) merge(i, i + width);
      if (direction === "down" && i >= width) merge(i, i - width);
    }
  }

  function merge(a, b) {
    if (
      squares[a].innerHTML !== "" &&
      squares[a].innerHTML === squares[b].innerHTML
    ) {
      let sum = parseInt(squares[a].innerHTML) + parseInt(squares[b].innerHTML);
      squares[a].innerHTML = sum;
      squares[a].classList.add("tile-animate");
      squares[b].innerHTML = "";
      score += sum;
      scoreDisplay.innerHTML = score;
    }
  }

  // Move left
  function moveLeft() {
    let moved = false;
    for (let row = 0; row < width; row++) {
      const rowStart = row * width;
      const rowEnd = rowStart + width;
      const currentRow = squares
        .slice(rowStart, rowEnd)
        .map((square) => square.innerHTML);

      const filteredRow = currentRow.filter((num) => num !== "");
      const emptySpaces = Array(width - filteredRow.length).fill("");
      const newRow = filteredRow.concat(emptySpaces);

      newRow.forEach((num, index) => {
        if (squares[rowStart + index].innerHTML !== num) {
          moved = true;
          squares[rowStart + index].innerHTML = num;
        }
      });
    }
    return moved;
  }

  // Move right
  function moveRight() {
    let moved = false;
    for (let row = 0; row < width; row++) {
      const rowStart = row * width;
      const rowEnd = rowStart + width;
      const currentRow = squares
        .slice(rowStart, rowEnd)
        .map((square) => square.innerHTML);

      const filteredRow = currentRow.filter((num) => num !== "");
      const emptySpaces = Array(width - filteredRow.length).fill("");
      const newRow = emptySpaces.concat(filteredRow);

      newRow.forEach((num, index) => {
        if (squares[rowStart + index].innerHTML !== num) {
          moved = true;
          squares[rowStart + index].innerHTML = num;
        }
      });
    }
    return moved;
  }

  // Move up
  function moveUp() {
    let moved = false;
    for (let col = 0; col < width; col++) {
      const currentColumn = [];
      for (let row = 0; row < width; row++) {
        currentColumn.push(squares[col + row * width].innerHTML);
      }

      const filteredColumn = currentColumn.filter((num) => num !== "");
      const emptySpaces = Array(width - filteredColumn.length).fill("");
      const newColumn = filteredColumn.concat(emptySpaces);

      newColumn.forEach((num, index) => {
        if (squares[col + index * width].innerHTML !== num) {
          moved = true;
          squares[col + index * width].innerHTML = num;
        }
      });
    }
    return moved;
  }

  // Move down
  function moveDown() {
    let moved = false;
    for (let col = 0; col < width; col++) {
      const currentColumn = [];
      for (let row = 0; row < width; row++) {
        currentColumn.push(squares[col + row * width].innerHTML);
      }

      const filteredColumn = currentColumn.filter((num) => num !== "");
      const emptySpaces = Array(width - filteredColumn.length).fill("");
      const newColumn = emptySpaces.concat(filteredColumn);

      newColumn.forEach((num, index) => {
        if (squares[col + index * width].innerHTML !== num) {
          moved = true;
          squares[col + index * width].innerHTML = num;
        }
      });
    }
    return moved;
  }

  // Check game over
  function checkGameOver() {
    const emptySquares = squares.some((square) => square.innerHTML === "");
    const possibleMoves = squares.some((square, index) => {
      const right = index % width !== width - 1 && squares[index + 1];
      const down = index < width * (width - 1) && squares[index + width];
      return (
        (right && square.innerHTML === right.innerHTML) ||
        (down && square.innerHTML === down.innerHTML)
      );
    });

    if (!emptySquares && !possibleMoves) {
      alert("Game Over! Your score: " + score);
      console.log("Game Over! No more moves available.");
    }
  }

  // Update tile colors
  function updateColors() {
    squares.forEach((square) => {
      square.className = "";
      if (square.innerHTML) {
        square.classList.add(`tile-${square.innerHTML}`);
      }
    });
  }

  // Restart game
  restartButton.addEventListener("click", () => {
    squares.forEach((square) => (square.innerHTML = ""));
    score = 0;
    scoreDisplay.innerHTML = score;
    generateNumber();
    generateNumber();
    console.log("Game restarted.");
  });

  // Key controls
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") move("left");
    if (event.key === "ArrowRight") move("right");
    if (event.key === "ArrowUp") move("up");
    if (event.key === "ArrowDown") move("down");
  });

  createBoard();
});
