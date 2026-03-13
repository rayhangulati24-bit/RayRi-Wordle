(function () {
  "use strict";

  const ROWS = 6;
  const MESSAGE_DURATION = 2000;

  let answer = "";
  let currentRow = 0;
  let currentCol = 0;
  let gameOver = false;
  let boardEl;
  let keyboardEl;
  let messageEl;
  let playAgainEl;

  function wordLen() {
    return answer.length;
  }

  function getDayIndex() {
    const start = window.LEXICON_START_DATE;
    const now = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysSinceStart = Math.floor((now - start) / msPerDay);
    if (daysSinceStart < 0) return 0;
    return daysSinceStart % 25;
  }

  function getTodaysWord() {
    const words = window.LEXICON_ANSWERS;
    const idx = getDayIndex();
    return words[idx] || words[0];
  }

  function initBoard() {
    const len = wordLen();
    boardEl = document.getElementById("game-board");
    boardEl.innerHTML = "";
    boardEl.style.setProperty("--word-length", String(len));
    for (let r = 0; r < ROWS; r++) {
      const row = document.createElement("div");
      row.className = "row";
      row.setAttribute("role", "row");
      for (let c = 0; c < len; c++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.setAttribute("role", "gridcell");
        tile.setAttribute("aria-label", `Row ${r + 1}, letter ${c + 1}`);
        row.appendChild(tile);
      }
      boardEl.appendChild(row);
    }
  }

  function getTile(row, col) {
    return boardEl.querySelectorAll(".row")[row]?.querySelectorAll(".tile")[col];
  }

  function setTile(row, col, letter, state) {
    const tile = getTile(row, col);
    if (!tile) return;
    tile.textContent = letter;
    tile.classList.remove("filled", "correct", "present", "absent", "flip", "shake");
    if (letter) tile.classList.add("filled");
    if (state) {
      tile.classList.add(state);
      tile.setAttribute("data-state", state);
    }
  }

  function updateKeyboard(guess, result) {
    for (let i = 0; i < guess.length; i++) {
      const key = keyboardEl.querySelector(`[data-key="${guess[i]}"]`);
      if (!key) continue;
      const res = result[i];
      if (res === "correct") key.classList.add("correct");
      else if (res === "present" && !key.classList.contains("correct")) key.classList.add("present");
      else if (res === "absent") key.classList.add("absent");
    }
  }

  function evaluateGuess(guess) {
    const len = wordLen();
    const result = [];
    const counts = {};
    for (const c of answer) counts[c] = (counts[c] || 0) + 1;

    for (let i = 0; i < len; i++) {
      const g = guess[i];
      const a = answer[i];
      if (g === a) {
        result.push("correct");
        counts[g]--;
      } else result.push(null);
    }

    for (let i = 0; i < len; i++) {
      if (result[i]) continue;
      const g = guess[i];
      if (counts[g] > 0) {
        result[i] = "present";
        counts[g]--;
      } else result[i] = "absent";
    }
    return result;
  }

  function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = "message " + (type || "");
    messageEl.classList.remove("hidden");
    clearTimeout(messageEl._tm);
    messageEl._tm = setTimeout(() => {
      messageEl.classList.add("hidden");
      messageEl.textContent = "";
    }, MESSAGE_DURATION);
  }

  function flipRow(rowIndex, guess, result) {
    return new Promise((resolve) => {
      const row = boardEl.querySelectorAll(".row")[rowIndex];
      const tiles = row.querySelectorAll(".tile");
      tiles.forEach((tile, i) => {
        tile.textContent = guess[i] || "";
        tile.classList.add("filled");
      });

      setTimeout(() => {
        tiles.forEach((tile, i) => {
          tile.classList.add("flip", result[i]);
          tile.setAttribute("data-state", result[i]);
        });
        setTimeout(resolve, 500);
      }, 50);
    });
  }

  function shakeRow(rowIndex) {
    const row = boardEl.querySelectorAll(".row")[rowIndex];
    const tiles = row.querySelectorAll(".tile");
    tiles.forEach((t) => t.classList.add("shake"));
    setTimeout(() => tiles.forEach((t) => t.classList.remove("shake")), 500);
  }

  function submitGuess() {
    const row = boardEl.querySelectorAll(".row")[currentRow];
    const tiles = row.querySelectorAll(".tile");
    const guess = Array.from(tiles)
      .map((t) => t.textContent)
      .join("")
      .toLowerCase();

    if (guess.length !== wordLen()) {
      showMessage("Use " + wordLen() + " letters");
      shakeRow(currentRow);
      return;
    }

    if (!/^[a-zA-Z]+$/.test(guess)) {
      showMessage("Only letters");
      shakeRow(currentRow);
      return;
    }

    const result = evaluateGuess(guess);
    flipRow(currentRow, guess.toUpperCase().split(""), result).then(() => {
      updateKeyboard(guess.toUpperCase(), result);

      const won = result.every((r) => r === "correct");
      if (won) {
        gameOver = true;
        showMessage("You got it!", "win");
        playAgainEl.classList.remove("hidden");
        return;
      }

      currentRow++;
      if (currentRow >= ROWS) {
        gameOver = true;
        showMessage(`The word was ${answer.toUpperCase()}`, "lose");
        playAgainEl.classList.remove("hidden");
        return;
      }

      currentCol = 0;
    });
  }

  function typeLetter(letter) {
    if (gameOver) return;
    if (currentCol >= wordLen()) return;
    const tile = getTile(currentRow, currentCol);
    if (tile) {
      tile.textContent = letter;
      tile.classList.add("filled");
      currentCol++;
    }
  }

  function backspace() {
    if (gameOver) return;
    if (currentCol <= 0) return;
    currentCol--;
    const tile = getTile(currentRow, currentCol);
    if (tile) {
      tile.textContent = "";
      tile.classList.remove("filled");
    }
  }

  function resetGame() {
    answer = getTodaysWord();
    currentRow = 0;
    currentCol = 0;
    gameOver = false;
    initBoard();
    messageEl.classList.add("hidden");
    messageEl.textContent = "";
    playAgainEl.classList.add("hidden");
    keyboardEl.querySelectorAll(".key").forEach((k) => {
      k.classList.remove("correct", "present", "absent");
    });
    updateDayLabel();
  }

  function bindInput() {
    keyboardEl = document.getElementById("keyboard");
    messageEl = document.getElementById("message");
    playAgainEl = document.getElementById("play-again");

    keyboardEl.querySelectorAll(".key[data-key]").forEach((btn) => {
      btn.addEventListener("click", () => typeLetter(btn.dataset.key));
    });
    document.getElementById("enter-key").addEventListener("click", submitGuess);
    document.getElementById("backspace-key").addEventListener("click", backspace);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitGuess();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        typeLetter(e.key.toUpperCase());
      }
    });

    document.getElementById("play-again").addEventListener("click", resetGame);
    document.getElementById("help-btn").addEventListener("click", () => {
      document.getElementById("modal-overlay").classList.add("visible");
      document.getElementById("modal-overlay").setAttribute("aria-hidden", "false");
    });
    document.getElementById("modal-close").addEventListener("click", () => {
      document.getElementById("modal-overlay").classList.remove("visible");
      document.getElementById("modal-overlay").setAttribute("aria-hidden", "true");
    });
    document.getElementById("modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") {
        document.getElementById("modal-overlay").classList.remove("visible");
        document.getElementById("modal-overlay").setAttribute("aria-hidden", "true");
      }
    });
  }

  function updateDayLabel() {
    const n = getDayIndex() + 1;
    const el = document.getElementById("day-label");
    if (el) el.textContent = "Day " + n + " of RayRi";
  }

  function init() {
    answer = getTodaysWord();
    initBoard();
    bindInput();
    updateDayLabel();
  }

  init();
})();
