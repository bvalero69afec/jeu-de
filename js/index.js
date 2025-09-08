const NUMBER_OF_PLAYERS = 5;
const MAX_ROLL = 5;

const players = [];
for (let i = 0; i < NUMBER_OF_PLAYERS; ++i) {
  players[i] = {
    name: `Joueur ${i + 1}`,
    score: 0,
    roll: 0
  };
}

const gameContainer = document.querySelector("#game-container");

function updatePlayerCardScore(playerCardScore, playerId) {
  playerCardScore.textContent = players[playerId].score.toString();
}

function updatePlayerCardRollButton(playerCardRollButton, playerId) {
  playerCardRollButton.textContent = `Lancer (${ players[playerId].roll })`;
}

for (let i = 0; i < NUMBER_OF_PLAYERS; ++i) {
  const playerCard = document.createElement("div");
  playerCard.classList.add("player-card");
  playerCard.setAttribute("data-player", i.toString());
  gameContainer.appendChild(playerCard);

  const playerCardName = document.createElement("div");
  playerCardName.classList.add("player-card-name");
  playerCardName.textContent = players[i].name;
  playerCard.appendChild(playerCardName);

  const playerCardBody = document.createElement("div");
  playerCardBody.classList.add("player-card-body");
  playerCard.appendChild(playerCardBody);

  const playerCardScore = document.createElement("div");
  playerCardScore.classList.add("player-card-score");
  updatePlayerCardScore(playerCardScore, i);
  playerCardBody.appendChild(playerCardScore);

  const playerCardRollButton = document.createElement("button");
  playerCardRollButton.classList.add("player-card-roll-button");
  updatePlayerCardRollButton(playerCardRollButton, i);
  playerCard.appendChild(playerCardRollButton);
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

gameContainer.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("player-card-roll-button")) {
    const playerCard = target.closest(".player-card");
    const playerId = Number.parseInt(playerCard.dataset.player);

    const rollScore = getRandomIntInclusive(1, 10);
    players[playerId].score += rollScore;
    const playerCardScore = playerCard.querySelector(".player-card-score");
    updatePlayerCardScore(playerCardScore, playerId);

    players[playerId].roll++;
    updatePlayerCardRollButton(target, playerId);
    if (players[playerId].roll >= MAX_ROLL) {
      target.disabled = true;
    }

    let gameEnded = true;
    for (const player of players) {
      if (player.roll < MAX_ROLL) {
        gameEnded = false;
        break;
      }
    }

    if (gameEnded) {
      const leaderboard = [];

      for (let i = 0; i < NUMBER_OF_PLAYERS; ++i) {
        const player = players[i];
        leaderboard[i] = {
          name: player.name,
          score: player.score
        };
      }

      leaderboard.sort(function (a, b) {
        if (a.score === b.score) {
          return a.name.localeCompare(b.name);
        }
        return b.score - a.score;
      });

      let previousRank = null;
      let previousScore = null;
      for (let i = 0; i < leaderboard.length; ++i) {
        const leaderboardEntry = leaderboard[i];
        const score = leaderboardEntry.score;

        let rank;
        if (score !== previousScore) {
          rank = i + 1;
        } else {
          rank = previousRank;
        }

        leaderboardEntry.rank = rank;

        previousRank = rank;
        previousScore = score;
      }

      const leaderboardJson = JSON.stringify(leaderboard);
      localStorage.setItem("leaderboard", leaderboardJson);

      const delayMs = 2 * 1000;
      setTimeout(function () {
        window.location.assign("leaderboard.html#leaderboard");
      }, delayMs);
    }
  }
});