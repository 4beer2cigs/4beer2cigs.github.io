const leaderboardData = [
  { alias: "Joe Mama", country: "UK", time: "1:17:84", date: "2024-09-24", category: "Any%", videoLink: "https://www.youtube.com/watch?v=fjvo-L3a0pI&t=252s" },
  { alias: "Joe Mama", country: "UK", time: "1:42:82", date: "2024-09-24", category: "Any%", videoLink: "https://www.youtube.com/watch?v=ohIvCTubBI8&t=328s" },
  { alias: "Joe Mama", country: "UK", time: "1:34:65", date: "2024-09-14", category: "Any%", videoLink: "https://www.youtube.com/watch?v=297lyznwpxs" },
  { alias: "Joe Mama", country: "UK", time: "1:31:00", date: "2024-09-06", category: "Any%", videoLink: "https://www.youtube.com/watch?v=r2LJNqZg55k" },
  { alias: "letmark", country: "SW", time: "3:52:00", date: "2024-09-26", category: "Any%", videoLink: "https://www.youtube.com/watch?v=qRT8x1Pqu_U" },
  { alias: "Purely4views", country: "N/A", time: "7:17:00", date: "2024-08-19", category: "Any%", videoLink: "https://www.youtube.com/watch?v=G0of2OlIi1g" },
  { alias: "Purely4views", country: "N/A", time: "6:40:32", date: "2024-08-19", category: "Any%", videoLink: "https://www.youtube.com/watch?v=asir-2Umn-A&t=5s" },
  { alias: "Purely4views", country: "N/A", time: "03:22:00", date: "2024-08-22", category: "Any%", videoLink: "https://www.youtube.com/watch?v=PeDyjBiVI34" },
  { alias: "Purely4views", country: "N/A", time: "1:18:02", date: "2024-09-24", category: "Any%", videoLink: "https://www.youtube.com/watch?v=gVbjNQN4AL8" },
  { alias: "Purely4views", country: "N/A", time: "0:59:04", date: "2024-09-25", category: "Any%", videoLink: "https://www.youtube.com/watch?v=CCfB0YPKddI" },
  { alias: "Purely4views", country: "N/A", time: "1:02:00", date: "2024-09-25", category: "Any%", videoLink: "https://www.youtube.com/watch?v=j6sGLvxS3CM" },
  { alias: "SlowGhetti", country: "N/A", time: "7:23:00", date: "2024-09-27", category: "Any%", videoLink: "https://www.youtube.com/watch?v=WjP5i8CPPQo" },
  { alias: "Dornia", country: "N/A", time: "11:07:00", date: "2024-09-27", category: "Any%", videoLink: "https://youtube.com/watch?v=ZyL0vHhai_o" },
  { alias: "Dornia", country: "N/A", time: "1:10:00", date: "2024-09-24", category: "Any%", videoLink: "https://www.youtube.com/watch?v=yGhKMU5agFA" },
  { alias: "Dornia", country: "N/A", time: "1:05:00", date: "2024-09-23", category: "Any%", videoLink: "https://www.youtube.com/watch?v=kuVIELdBDfo" },
  { alias: "Dornia", country: "N/A", time: "2:54:08", date: "2024-08-25", category: "Any%", videoLink: "https://www.youtube.com/watch?v=b9hj-Qn5rQM" },
  { alias: "Dornia", country: "N/A", time: "4:02:22", date: "2024-08-24", category: "Any%", videoLink: "https://www.youtube.com/watch?v=p3HZrvoREzg" },
  { alias: "Dornia", country: "N/A", time: "3:25:00", date: "2024-08-22", category: "Any%", videoLink: "https://www.youtube.com/watch?v=uEaa4_KHMxk" },
  { alias: "GTSY", country: "CA", time: "3:24:51", date: "2024-09-11", category: "Any%", videoLink: "https://www.youtube.com/watch?v=Bdbzmm69eD0" },
  { alias: "Tina", country: "BR", time: "1:34:03", date: "2024-09-24", category: "Any%", videoLink: "https://www.youtube.com/watch?v=HLaXk2mwctw" },
  { alias: "Tina", country: "BR", time: "1:34:61", date: "2024-09-24", category: "Any%", videoLink: "https://www.youtube.com/watch?v=HLaXk2mwctw" },
  { alias: "Based Mod", country: "N/A", time: "4:10:00", date: "2024-09-10", category: "Any%", videoLink: "https://www.youtube.com/watch?v=uhycE9OE6NU" },
];

function renderLeaderboard(filteredData = leaderboardData) {
  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = ""; 
  filteredData.sort((a, b) => parseTime(a.time) - parseTime(b.time));

  if (filteredData.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.textContent = "No runs found for the selected filters.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  filteredData.forEach((run) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${run.alias}</td>
      <td>${run.country}</td>
      <td>${run.time}</td>
      <td>${run.date}</td>
      <td>${run.category}</td>
      <td><a href="${run.videoLink}" target="_blank">Click Here</a></td>
    `;
    tbody.appendChild(row);
  });
}

function applyFilters() {
  const categoryFilter = document.getElementById("category").value;
  const regionFilter = document.getElementById("region").value;
  const dateRange = document.getElementById("date-range").value;

  const now = new Date();
  let startDate = null;

  if (dateRange === "lastYear") {
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
  } else if (dateRange === "lastMonth") {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
  } else if (dateRange === "lastWeek") {
      startDate = new Date(now.setDate(now.getDate() - 7));
  }

  const filteredData = leaderboardData.filter((run) => {
      const runDate = new Date(run.date); 

      if (categoryFilter !== "all" && run.category !== categoryFilter) return false;
      if (regionFilter !== "all" && run.country !== regionFilter) return false;
      if (startDate && runDate < startDate) return false;

      return true;
  });

  renderLeaderboard(filteredData);
}

function clearFilters() {
  document.getElementById("category").value = "all";
  document.getElementById("region").value = "all";
  document.getElementById("date-range").value = "all";
  document.getElementById("start-date").classList.add("hidden");
  document.getElementById("end-date").classList.add("hidden");
  document.getElementById("date-to").classList.add("hidden");
  document.getElementById("start-date").value = "";
  document.getElementById("end-date").value = "";
  renderLeaderboard();
}

function toggleCustomDate() {
  const dateRange = document.getElementById('date-range');
  const customDateSection = document.getElementById('custom-date-section');
  if (dateRange.value === 'custom') {
      customDateSection.classList.remove('hidden');
  } else {
      customDateSection.classList.add('hidden');
  }
}

function toggleRules() {
  const rulesSection = document.getElementById("rules");
  rulesSection.classList.toggle("hidden");
}

function toggleHistory() {
  const historySection = document.getElementById("history");
  historySection.classList.toggle("hidden");
}

function toggleCigaretteContent() {
  const contentSection = document.getElementById("cigarette-content");
  contentSection.classList.toggle("hidden");
}

function dontShowAgainRules() {
  localStorage.setItem("hideRules", "true");
  document.getElementById("rules").classList.add("hidden");
}

function submitRun() {
  const emailTemplate = "mailto:4beer2cigs@gmail.com?subject=Submit%20Speedrun&body=Please%20enter%20the%20following%20details:%0D%0A" +
    "Alias%20:%20%0D%0A" +
    "Run%20Time:%20%0D%0A" +
    "Date:%20%0D%0A" +
    "Video%20Link:%20%0D%0A%0D%0A" +
    "Note:%20A%20video%20is%20required%20for%20submission.%20Please%20ensure%20it%20is%20uploaded%20to%20a%20public%20site%20for%20verification.%0D%0A" +
    "Verification%20will%20take%2024%20hours%20after%20submission.";

  window.location.href = emailTemplate; 
}

function parseTime(time) {
  const [minutes, seconds, hundredths] = time.split(':').map(Number);
  const milliseconds = hundredths * 10;
  return minutes * 60000 + seconds * 1000 + milliseconds;
}


window.onload = function() {
  renderLeaderboard();
};