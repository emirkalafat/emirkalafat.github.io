document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const statusDisplay = document.getElementById("status");

  const cardValues = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
  ];

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchesFound = 0;

  // Shuffle cards
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Initialize the game
  function initGame() {
    const shuffledValues = shuffle(cardValues);
    shuffledValues.forEach((value) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">${value}</div>
                    <div class="card-back"></div>
                </div>`;
      card.dataset.value = value;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });
  }

  // Flip the card
  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("matched"))
      return;

    this.classList.add("flipped");

    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      checkForMatch();
    }
  }

  // Check if the two flipped cards match
  function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
      disableCards();
      matchesFound++;
      if (matchesFound === cardValues.length / 2) {
        statusDisplay.textContent =
          "Congratulations! You've found all matches!";
      }
    } else {
      unflipCards();
    }
  }

  // Disable matched cards
  function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
  }

  // Unflip unmatched cards
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }

  // Reset variables after a move
  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  initGame();
});
