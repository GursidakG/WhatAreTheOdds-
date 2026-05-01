const tickerItems = [
  "BOS 78 · LAL 74 · Q3 4:12 · LAL +4.5",
  "NYK -2.5 moved to -3.5 in 22m",
  "TOR ML +132 best at BetMGM",
  "DAL total 226.5 · under steam",
  "UFC main event public 71% / sharp 49%",
];

const pulses = [
  { game: "Lakers at Celtics", move: "Spread moved +3.0 to +4.5", tag: "Moved up", tone: "move-up" },
  { game: "Knicks at Heat", move: "Total dropped 218.5 to 216.0", tag: "Moved down", tone: "move-down" },
  { game: "Leafs at Bruins", move: "Bruins ML shortened -118 to -136", tag: "Steam", tone: "move-up" },
  { game: "Dodgers at Padres", move: "Padres +142 available vs +129 market", tag: "Edge", tone: "move-up" },
];

const edges = [
  { label: "Padres ML", odds: "+142", detail: "+3.8% edge" },
  { label: "Lakers +4.5", odds: "-108", detail: "Best by 1.5 pts" },
  { label: "Leafs/Bruins U5.5", odds: "+104", detail: "+2.9% edge" },
];

const books = [
  { name: "FanDuel", open: "+118", current: "+124", movement: "Moved up +6", hold: "4.2%", updated: "12s", best: true },
  { name: "DraftKings", open: "+115", current: "+120", movement: "Moved up +5", hold: "4.7%", updated: "19s", best: false },
  { name: "BetMGM", open: "+116", current: "+119", movement: "Moved up +3", hold: "5.1%", updated: "23s", best: false },
  { name: "Caesars", open: "+112", current: "+118", movement: "Moved up +6", hold: "5.4%", updated: "30s", best: false },
  { name: "BetRivers", open: "+120", current: "+121", movement: "Moved up +1", hold: "4.8%", updated: "41s", best: false },
];

const liveGames = [
  { game: "Lakers at Celtics", clock: "Q3 · 4:12", ml: "+124", spread: "+4.5", total: "221.5" },
  { game: "Knicks at Heat", clock: "Q2 · 8:07", ml: "-112", spread: "-2.5", total: "216.0" },
  { game: "Leafs at Bruins", clock: "2nd · 12:44", ml: "-136", spread: "-1.5", total: "5.5" },
  { game: "Dodgers at Padres", clock: "Top 5th", ml: "+142", spread: "+1.5", total: "8.5" },
  { game: "Arsenal at Chelsea", clock: "64'", ml: "+205", spread: "Draw +220", total: "2.5" },
  { game: "UFC Main Event", clock: "Sat · 10:15", ml: "-128", spread: "KO +310", total: "O2.5" },
];

const valueRows = [
  ["Padres at Dodgers", "Moneyline", "FanDuel", "+142", "+129", "41.3%", "+3.8%", "High"],
  ["Lakers at Celtics", "Spread", "BetMGM", "+4.5 -108", "+3.0 -110", "51.9%", "+3.1%", "Med"],
  ["Leafs at Bruins", "Total", "DraftKings", "U5.5 +104", "U5.5 -102", "49.0%", "+2.9%", "Med"],
  ["Knicks at Heat", "Moneyline", "Caesars", "-112", "-124", "52.8%", "+2.4%", "Low"],
];

const state = {
  slip: [],
  currentView: "lobby",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function renderTicker() {
  $("#tickerTrack").innerHTML = tickerItems.map((item) => `<span>${item}</span>`).join("");
}

function renderPulse() {
  $("#pulseList").innerHTML = pulses
    .map(
      (item) => `
        <article class="pulse-item">
          <strong>${item.game}</strong>
          <span>${item.move}</span>
          <span class="${item.tone}">${item.tag}</span>
        </article>
      `
    )
    .join("");
}

function renderEdges() {
  $("#edgeList").innerHTML = edges
    .map(
      (edge) => `
        <article class="edge-item">
          <span>${edge.label}<br><small class="muted">${edge.detail}</small></span>
          <strong>${edge.odds}</strong>
        </article>
      `
    )
    .join("");
}

function renderOddsTable() {
  $("#oddsRows").innerHTML = books
    .map(
      (book) => `
        <tr class="${book.best ? "best-row" : ""}">
          <td>${book.name} ${book.best ? '<span class="badge badge--best">Best</span>' : ""}</td>
          <td><strong>${book.open}</strong></td>
          <td><strong>${book.current}</strong></td>
          <td><span class="move-up">${book.movement}</span></td>
          <td>${book.hold}</td>
          <td>${book.updated}</td>
          <td><button class="ghost-button add-leg" type="button" data-leg="Lakers ML ${book.current} at ${book.name}">Add</button></td>
        </tr>
      `
    )
    .join("");
}

function renderLiveCards(changedIndex = -1) {
  $("#liveGrid").innerHTML = liveGames
    .map(
      (game, index) => `
        <article class="live-card ${index === changedIndex ? "changed" : ""}">
          <div class="live-card__top">
            <strong>${game.game}</strong>
            <span class="badge">${game.clock}</span>
          </div>
          <div class="live-card__odds">
            <button class="live-price add-leg" type="button" data-leg="${game.game} ML ${game.ml}">
              <span>ML</span><strong>${game.ml}</strong>
            </button>
            <button class="live-price add-leg" type="button" data-leg="${game.game} Spread ${game.spread}">
              <span>Spread</span><strong>${game.spread}</strong>
            </button>
            <button class="live-price add-leg" type="button" data-leg="${game.game} Total ${game.total}">
              <span>Total</span><strong>${game.total}</strong>
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderValueRows() {
  $("#valueRows").innerHTML = valueRows
    .map(
      (row) => `
        <tr>
          ${row.map((cell, index) => `<td>${index === 6 ? `<strong class="move-up">${cell}</strong>` : cell}</td>`).join("")}
          <td><button class="ghost-button add-leg" type="button" data-leg="${row[0]} ${row[1]} ${row[3]}">Add</button></td>
        </tr>
      `
    )
    .join("");
}

function switchView(view) {
  state.currentView = view;
  $$(".view").forEach((el) => el.classList.toggle("is-active", el.id === `view-${view}`));
  $$("[data-view]").forEach((el) => el.classList.toggle("is-active", el.dataset.view === view));
  $("#main").focus({ preventScroll: true });
}

function decimalFromAmerican(label) {
  const match = label.match(/[+-]\d{3}/);
  if (!match) return 1.9;
  const odds = Number(match[0]);
  return odds > 0 ? 1 + odds / 100 : 1 + 100 / Math.abs(odds);
}

function renderSlip() {
  const count = state.slip.length;
  $("#slipCount").textContent = String(count);
  const mobileSlip = $("#mobileSlipButton");
  if (mobileSlip) mobileSlip.textContent = `Slip ${count ? count : ""}`.trim();

  if (!count) {
    $("#slipItems").innerHTML = '<p class="empty">Add a line to calculate payout.</p>';
    $("#payoutValue").textContent = "$0.00";
    $("#slipWarning").textContent = "";
    return;
  }

  $("#slipItems").innerHTML = state.slip
    .map(
      (leg, index) => `
        <article class="slip-item">
          <span>${leg}</span>
          <button class="icon-button remove-leg" type="button" data-index="${index}" aria-label="Remove ${leg}">×</button>
        </article>
      `
    )
    .join("");

  const stake = Number($("#stakeInput").value) || 0;
  const decimal = state.slip.reduce((product, leg) => product * decimalFromAmerican(leg), 1);
  $("#payoutValue").textContent = `$${(stake * decimal).toFixed(2)}`;
  $("#slipWarning").textContent = count > 1 ? "Parlay payout shown before final book confirmation." : "Review changed odds before placing any wager.";
}

function openSlip() {
  $("#betslip").classList.add("is-open");
}

function closeSlip() {
  $("#betslip").classList.remove("is-open");
}

function validateAge(event) {
  event.preventDefault();
  const month = Number($("#dobMonth").value);
  const day = Number($("#dobDay").value);
  const year = Number($("#dobYear").value);
  const region = $("#region").value;
  const error = $("#ageError");
  const currentYear = new Date().getFullYear();
  const plausible = month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900 && year <= currentYear;
  const age = currentYear - year;

  if (!plausible || !region) {
    error.textContent = "Enter a valid date of birth and region to continue.";
    return;
  }

  if (age < 19) {
    error.textContent = "You must meet your local age requirement to access this demo.";
    return;
  }

  error.textContent = "";
  $("#ageGate").classList.add("is-hidden");
}

function simulateRefresh() {
  const index = Math.floor(Math.random() * liveGames.length);
  $("#connectionStatus").textContent = "Connected · updated just now";
  $("#boardUpdated").textContent = "Updated just now";
  renderLiveCards(index);
  setTimeout(() => {
    $("#connectionStatus").textContent = "Connected · updated 12s ago";
    $("#boardUpdated").textContent = "Updated 12s ago";
  }, 1400);
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-view]");
    if (nav) switchView(nav.dataset.view);

    const legButton = event.target.closest(".add-leg");
    if (legButton) {
      state.slip.push(legButton.dataset.leg);
      renderSlip();
      openSlip();
    }

    const remove = event.target.closest(".remove-leg");
    if (remove) {
      state.slip.splice(Number(remove.dataset.index), 1);
      renderSlip();
    }
  });

  $("#ageForm").addEventListener("submit", validateAge);
  $("#openSlipButton").addEventListener("click", openSlip);
  $("#mobileSlipButton").addEventListener("click", openSlip);
  $("#closeSlipButton").addEventListener("click", closeSlip);
  $("#stakeInput").addEventListener("input", renderSlip);
  $("#refreshButton").addEventListener("click", simulateRefresh);
  $("#limitButton")?.addEventListener("click", () => {
    openSlip();
    $("#slipWarning").textContent = "Limit controls should be connected before real-money betting.";
  });
}

function init() {
  renderTicker();
  renderPulse();
  renderEdges();
  renderOddsTable();
  renderLiveCards();
  renderValueRows();
  renderSlip();
  bindEvents();
}

init();
