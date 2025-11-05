const leaderboardElem = document.querySelector("#leaderboard");

//Construct the element of a leaderboard entry and add it to the leaderboard element
function addLeaderboardEntryElem(leaderboardEntry) {
  //Choose a specific style class and rank text depending on the player rank
  let leaderboardEntryElemClass;
  let leaderboardEntryRankElemText;
  switch (leaderboardEntry.rank) {
    case 1:
      leaderboardEntryElemClass = "leaderboard-rank-first-entry";
      leaderboardEntryRankElemText = "🥇";
      break;
    case 2:
      leaderboardEntryElemClass = "leaderboard-rank-second-entry";
      leaderboardEntryRankElemText = "🥈";
      break;
    case 3:
      leaderboardEntryElemClass = "leaderboard-rank-third-entry";
      leaderboardEntryRankElemText = "🥉";
      break;
    default:
      leaderboardEntryElemClass = "leaderboard-rank-others-entry";
      leaderboardEntryRankElemText = `${ leaderboardEntry.rank }.`;
  }

  const leaderboardEntryElem = document.createElement("li");
  leaderboardEntryElem.classList.add(leaderboardEntryElemClass);
  leaderboardElem.appendChild(leaderboardEntryElem);

  //Construct the rank element of the leaderboard entry
  const leaderboardEntryRankElem = document.createElement("span");
  leaderboardEntryRankElem.classList.add("leaderboard-entry-rank");
  leaderboardEntryRankElem.textContent = leaderboardEntryRankElemText;
  leaderboardEntryElem.appendChild(leaderboardEntryRankElem);

  //Construct the player name element of the leaderboard entry
  const leaderboardEntryNameElem = document.createElement("span");
  leaderboardEntryNameElem.classList.add("leaderboard-entry-name");
  leaderboardEntryNameElem.textContent = leaderboardEntry.name;
  leaderboardEntryElem.appendChild(leaderboardEntryNameElem);

  //Construct the player score element of the leaderboard entry
  const leaderboardEntryScoreElem = document.createElement("div");
  leaderboardEntryScoreElem.classList.add("leaderboard-entry-score");
  leaderboardEntryScoreElem.textContent = leaderboardEntry.score.toString();
  leaderboardEntryElem.appendChild(leaderboardEntryScoreElem);
}

const leaderboardJson = localStorage.getItem('leaderboard'); //Get the leaderboard json saved in the local storage of the browser
if (leaderboardJson !== null) {
  const leaderboard = JSON.parse(leaderboardJson); //Deserialize the leaderboard json into an array
  //Construct the leaderboard entry elements
  for (const leaderboardEntry of leaderboard) {
    addLeaderboardEntryElem(leaderboardEntry);
  }
}