//Constants
const NUMBER_OF_PLAYERS = 5;
const MAX_ROLL = 5;

//Initialize players
const players = [];
for (let i = 0; i < NUMBER_OF_PLAYERS; ++i) {
  players[i] = {
    name: `Joueur ${i + 1}`,
    score: 0,
    roll: 0
  };
}

const gameContainer = document.querySelector("#game-container");

//Update the text of the score element of the player card with its current score
function updatePlayerCardScore(playerCardScore, playerId) {
  playerCardScore.textContent = players[playerId].score.toString();
}

//Update the text of the roll button element of the player card with its current number of rolls
function updatePlayerCardRollButton(playerCardRollButton, playerId) {
  playerCardRollButton.textContent = `Lancer (${ players[playerId].roll })`;
}

//Construct all player card elements and add them in the game container
for (let i = 0; i < NUMBER_OF_PLAYERS; ++i) {
  const playerCard = document.createElement("div");
  playerCard.classList.add("player-card");
  playerCard.setAttribute("data-player", i.toString()); //Identify the card element with the player id
  gameContainer.appendChild(playerCard);

  //Construct the player name element of the card
  const playerCardName = document.createElement("div");
  playerCardName.classList.add("player-card-name");
  playerCardName.textContent = players[i].name;
  playerCard.appendChild(playerCardName);

  //Construct the body element of the card
  const playerCardBody = document.createElement("div");
  playerCardBody.classList.add("player-card-body");
  playerCard.appendChild(playerCardBody);

  //Construct the player score element of the card body
  const playerCardScore = document.createElement("div");
  playerCardScore.classList.add("player-card-score");
  updatePlayerCardScore(playerCardScore, i);
  playerCardBody.appendChild(playerCardScore);

  //Construct the roll button element of the card
  const playerCardRollButton = document.createElement("button");
  playerCardRollButton.classList.add("player-card-roll-button");
  updatePlayerCardRollButton(playerCardRollButton, i);
  playerCard.appendChild(playerCardRollButton);
}

//Get a random integer number between two numbers, inclusive
function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

//Add a global click event listener on the game container for all roll buttons
gameContainer.addEventListener("click", function (event) {
  const target = event.target;
  //Check if a roll button element is clicked inside the game container
  if (target.classList.contains("player-card-roll-button")) {
    const playerCard = target.closest(".player-card"); //Retrieve the player card element of the roll button
    const playerId = Number.parseInt(playerCard.dataset.player); //Retrieve the player id from the card element

    //Roll a die and update the new player total score
    const rollScore = getRandomIntInclusive(1, 10);
    players[playerId].score += rollScore;
    const playerCardScore = playerCard.querySelector(".player-card-score");
    updatePlayerCardScore(playerCardScore, playerId);

    //Increment the number of rolls of the player and update its text
    players[playerId].roll++;
    updatePlayerCardRollButton(target, playerId);
    //Disable the button if we reached the roll limit
    if (players[playerId].roll >= MAX_ROLL) {
      target.disabled = true;
    }

    //Check if all players reached the roll limit to end the game
    let gameEnded = true;
    for (const player of players) {
      if (player.roll < MAX_ROLL) {
        gameEnded = false;
        break;
      }
    }

    if (gameEnded) {
      const leaderboard = [];

      //Add player name and score entries in the leaderboard
      for (let i = 0; i < NUMBER_OF_PLAYERS; ++i) {
        const player = players[i];
        leaderboard[i] = {
          name: player.name,
          score: player.score
        };
      }

      //Sort the leaderboard by score in descending order. If tie, sort lexicographically by name
      leaderboard.sort(function (a, b) {
        if (a.score === b.score) {
          return a.name.localeCompare(b.name);
        }
        return b.score - a.score;
      });

      //Calculate the rank (competition ranking system, for example "1,2,2,4") of each player
      //Track the previous rank and score while iterating on the sorted leaderboard to determine the next rank
      let previousRank = null;
      let previousScore = null;
      for (let i = 0; i < leaderboard.length; ++i) {
        const leaderboardEntry = leaderboard[i];
        const score = leaderboardEntry.score;

        let rank;
        //Check if it's not a tie with the player above
        if (score !== previousScore) {
          rank = i + 1; //Set the rank to the player index from the sorted leaderboard + 1
        } else {
          rank = previousRank; //Set the rank to the same as the player above since it's a tie
        }

        leaderboardEntry.rank = rank;

        previousRank = rank;
        previousScore = score;
      }

      const leaderboardJson = JSON.stringify(leaderboard); //Serialize the leaderboard array to JSON
      localStorage.setItem("leaderboard", leaderboardJson); //Save the leaderboard json inside the local storage of the browser

      //Wait and redirect to the leaderboard page
      const delayMs = 2 * 1000;
      setTimeout(function () {
        window.location.assign("leaderboard.html#leaderboard");
      }, delayMs);
    }
  }
});