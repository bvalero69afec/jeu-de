const leaderboardElem = document.querySelector("#leaderboard");

function addLeaderboardEntryElem(leaderboardEntry) {
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

  const leaderboardEntryRankElem = document.createElement("span");
  leaderboardEntryRankElem.classList.add("leaderboard-entry-rank");
  leaderboardEntryRankElem.textContent = leaderboardEntryRankElemText;
  leaderboardEntryElem.appendChild(leaderboardEntryRankElem);

  const leaderboardEntryNameElem = document.createElement("span");
  leaderboardEntryNameElem.classList.add("leaderboard-entry-name");
  leaderboardEntryNameElem.textContent = leaderboardEntry.name;
  leaderboardEntryElem.appendChild(leaderboardEntryNameElem);

  const leaderboardEntryScoreElem = document.createElement("div");
  leaderboardEntryScoreElem.classList.add("leaderboard-entry-score");
  leaderboardEntryScoreElem.textContent = leaderboardEntry.score.toString();
  leaderboardEntryElem.appendChild(leaderboardEntryScoreElem);
}

const leaderboardJson = localStorage.getItem('leaderboard');
if (leaderboardJson !== null) {
  const leaderboard = JSON.parse(leaderboardJson);
  for (const leaderboardEntry of leaderboard) {
    addLeaderboardEntryElem(leaderboardEntry);
  }
}