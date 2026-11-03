const COLORS = ["#21a6c7", "#ee789f", "#f2b92f", "#59aa75", "#8d75d5", "#ef5c32"];
const ROLES = [
  { name: "學霸型", icon: "📚", description: "把時間投資在課業，學分成長最快。", start: { credit: 28, money: 5000, energy: 10, social: 2, exp: 0 }, goal: "學分 ≥ 152", bonus: 8 },
  { name: "社交型", icon: "💬", description: "校園人脈王，社交格獲得額外人際。", start: { credit: 12, money: 4000, energy: 10, social: 6, exp: 0 }, goal: "人際 ≥ 18", bonus: 8 },
  { name: "打工型", icon: "💼", description: "用精神換現金，財富累積最有感。", start: { credit: 14, money: 6000, energy: 9, social: 3, exp: 0 }, goal: "金錢 ≥ 18,000", bonus: 8 },
  { name: "社團型", icon: "📣", description: "經歷滿載，合作與活動都難不倒你。", start: { credit: 16, money: 4500, energy: 10, social: 4, exp: 1 }, goal: "經歷 ≥ 12", bonus: 8 },
  { name: "實習衝刺型", icon: "📈", description: "提早累積職場經驗，生涯事件加成。", start: { credit: 20, money: 5000, energy: 8, social: 3, exp: 2 }, goal: "經歷 ≥ 14", bonus: 8 },
  { name: "平衡生活型", icon: "🌤️", description: "維持穩定節奏，精神與各項資源均衡。", start: { credit: 18, money: 5000, energy: 10, social: 3, exp: 1 }, goal: "精神 ≥ 6", bonus: 10 }
];
const TILES = [
  { name: "新生報到", type: "rest", icon: "🎒", text: "新的旅程開始！", effect: { energy: 2 } },
  { name: "通識課", type: "course", icon: "📖", text: "完成通識課，取得學分。", effect: { credit: 12, energy: -2 } },
  { name: "打工班表", type: "work", icon: "💰", text: "努力工作換取生活費。", effect: { money: 1800, energy: -2, exp: 1 } },
  { name: "機會卡", type: "chance", icon: "✦", text: "抽一張機會卡！" },
  { name: "社團博覽會", type: "social", icon: "🎪", text: "找到志同道合的夥伴。", effect: { social: 3, energy: -1, money: -300 } },
  { name: "休息區", type: "rest", icon: "☕", text: "好好休息，恢復精神。", effect: { energy: 4 } },
  { name: "期中考", type: "course", icon: "✎", text: "擲骰檢定你的準備程度。" },
  { name: "人生卡", type: "life", icon: "⚡", text: "突發狀況來了！" },
  { name: "分組報告", type: "choice", icon: "👥", text: "選擇你的報告策略。" },
  { name: "校園市集", type: "social", icon: "🛍️", text: "花錢換取快樂與人際。", effect: { social: 2, money: -600 } },
  { name: "實驗課", type: "course", icon: "⚗️", text: "動手做，學分與經歷一起拿。", effect: { credit: 10, exp: 2, energy: -3 } },
  { name: "機會卡", type: "chance", icon: "✦", text: "抽一張機會卡！" },
  { name: "咖啡充電", type: "rest", icon: "☕", text: "短暫休息，保持續航。", effect: { energy: 3, money: -250 } },
  { name: "校外實習", type: "work", icon: "💼", text: "累積寶貴的職場經歷。", effect: { money: 1200, exp: 3, energy: -3 } },
  { name: "選擇事件", type: "choice", icon: "↔", text: "人生沒有標準答案。" },
  { name: "期末考", type: "course", icon: "🏁", text: "最後衝刺，擲骰檢定。" },
  { name: "人際聚餐", type: "social", icon: "🍜", text: "朋友是大學最珍貴的資產。", effect: { social: 4, money: -900, energy: -1 } },
  { name: "人生卡", type: "life", icon: "⚡", text: "突發狀況來了！" },
  { name: "圖書館", type: "course", icon: "🔎", text: "安靜讀書，穩定獲得學分。", effect: { credit: 9, energy: -1 } },
  { name: "休息區", type: "rest", icon: "🌿", text: "讓自己喘口氣。", effect: { energy: 4 } },
  { name: "機會卡", type: "chance", icon: "✦", text: "抽一張機會卡！" },
  { name: "證照考試", type: "course", icon: "🏅", text: "挑戰證照，經歷大幅提升。" },
  { name: "社團幹部", type: "social", icon: "📣", text: "承擔責任，也收穫成長。", effect: { social: 2, exp: 3, energy: -3 } },
  { name: "畢業門口", type: "rest", icon: "🎓", text: "快到了！再走幾步看看。" }
];
const EVENTS = {
  chance: [
    { title: "教授的驚喜加分", text: "你在課堂上的好表現被看見了！", icon: "🌟", changes: { credit: 8, exp: 1 } },
    { title: "校園創業競賽", text: "一個改變履歷的機會，但需要投入時間。", icon: "🚀", choices: [{ label: "全力參賽（+10 經歷，-3 精神）", changes: { exp: 10, energy: -3 } }, { label: "當觀眾（+1 人際）", changes: { social: 1 } }] },
    { title: "學長姐的二手寶物", text: "你撿到一台狀況良好的二手筆電！", icon: "💻", changes: { money: 1200, exp: 1 } }
  ],
  life: [
    { title: "報告組員失蹤", text: "簡報截止就在明天，你要怎麼辦？", icon: "🫠", choices: [{ label: "自己扛下來（+6 學分，-4 精神）", changes: { credit: 6, energy: -4 } }, { label: "尋求支援（+2 人際，-1 金錢）", changes: { social: 2, money: -1000 } }] },
    { title: "突然感冒了", text: "身體是革命的本錢，今天必須放慢腳步。", icon: "🤒", changes: { energy: -2, credit: -3 } },
    { title: "意外獲得獎學金", text: "努力終於被看見，這筆錢可以讓你喘口氣。", icon: "💌", changes: { money: 2500, credit: 4 } }
  ]
};

let state = { players: [], current: 0, round: 1, totalTurns: 0, gameOver: false, lastRoll: null, hasRolledThisTurn: false, pendingDraw: null, roleDrawIndex: 0, roleDrawn: false, interventionIndex: 0, interventionPending: false };
const $ = id => document.getElementById(id);
function signed(n) { return n > 0 ? `+${n}` : `${n}`; }
function makePlayer(name, roleIndex, index) {
  const role = ROLES[roleIndex];
  const initial = role ? role.start : { credit: 0, money: 0, energy: 0, social: 0, exp: 0 };
  return { id: index, name: name || `玩家 ${index + 1}`, roleIndex, color: COLORS[index], position: 0, laps: 0, ...initial };
}
function renderPlayerSetup() {
  const count = Number($("playerCount").value);
  $("playerSetup").innerHTML = Array.from({ length: count }, (_, i) => `
    <div class="player-row" style="--player-color:${COLORS[i]}">
      <span class="player-number">${i + 1}</span>
      <input id="playerName${i}" value="玩家 ${i + 1}" maxlength="12" aria-label="玩家${i + 1}名稱">
    </div>`).join("");
}
function startGame() {
  const count = Number($("playerCount").value);
  state = { players: Array.from({ length: count }, (_, i) => makePlayer($(`playerName${i}`).value.trim(), -1, i)), current: 0, round: 1, totalTurns: 0, gameOver: false, lastRoll: null, hasRolledThisTurn: false, pendingDraw: null, roleDrawIndex: 0, roleDrawn: false, interventionIndex: 0, interventionPending: false };
  $("setupScreen").classList.add("hidden"); $("gameScreen").classList.remove("hidden");
  $("playerCountLabel").textContent = `${count} 位`;
  buildBoard(); updateUI(); addLog("遊戲開始！請每位玩家抽取一張角色卡。"); showNextRoleDraw();
}
function buildBoard() {
  const board = $("board");
  board.innerHTML = `<div class="board-center"><div class="campus-art"><h3>大學生<span>求生記</span></h3><small>University Survival</small><div class="card-decks"><button class="deck-stack chance-deck" data-deck="chance" type="button"><span>✦</span><b>機會卡</b><small>DRAW</small></button><button class="deck-stack life-deck" data-deck="life" type="button"><span>⚡</span><b>人生卡</b><small>DRAW</small></button><button class="deck-stack choice-deck" data-deck="choice" type="button"><span>↔</span><b>選擇事件</b><small>DRAW</small></button></div></div></div>`;
  const positions = [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[6,7],[5,7],[4,7],[3,7],[2,7],[1,6],[1,5],[1,4],[1,3],[1,2],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[1,7]];
  positions.forEach((pos, index) => {
    const tile = TILES[index]; const el = document.createElement("div");
    el.className = `board-tile tile-${tile.type}${index === 0 ? " start-tile" : ""}${index === TILES.length - 1 ? " goal-tile" : ""}`; el.dataset.position = index; el.style.gridRow = pos[0]; el.style.gridColumn = pos[1];
    el.innerHTML = `<span class="tile-index">${String(index + 1).padStart(2, "0")}</span><span class="tile-icon">${tile.icon}</span><span>${tile.name}</span><div class="tokens" id="tokens-${index}"></div>`;
    board.appendChild(el);
  });
  board.querySelectorAll("[data-deck]").forEach(deck => deck.addEventListener("click", () => drawCard(deck.dataset.deck)));
}
function updateUI() {
  const p = state.players[state.current]; const role = p.roleIndex >= 0 ? ROLES[p.roleIndex] : null;
  $("turnLabel").textContent = `輪到 ${p.name}`;
  $("yearLabel").textContent = Math.min(4, Math.floor(p.laps / 2) + 1);
  $("roundLabel").textContent = state.round;
  $("activePlayer").innerHTML = `<i style="--player-color:${p.color}"></i>${p.name}${role ? ` · ${role.name}` : " · 待抽角色卡"}`;
  $("actionHint").textContent = state.pendingDraw ? `請點擊中央的${deckLabel(state.pendingDraw)}完成抽卡。` : state.lastRoll ? `上次擲出 ${state.lastRoll}，準備下一步。` : "準備好踏出第一步了嗎？";
  $("diceFace").textContent = state.lastRoll || "?";
  $("rollButton").disabled = state.gameOver || state.hasRolledThisTurn || !state.roleDrawn;
  document.querySelectorAll(".board-tile").forEach(el => el.classList.remove("active-tile"));
  document.querySelectorAll(".deck-stack").forEach(el => el.classList.toggle("draw-ready", el.dataset.deck === state.pendingDraw));
  document.querySelectorAll(".tokens").forEach(el => { el.innerHTML = ""; });
  state.players.forEach(player => {
    const tile = $(`tokens-${player.position}`); if (!tile) return;
    tile.insertAdjacentHTML("beforeend", `<span class="token" style="background:${player.color}" title="${player.name}">${player.id + 1}</span>`);
  });
  const currentTile = document.querySelector(`[data-position="${p.position}"]`); if (currentTile) currentTile.classList.add("active-tile");
  $("scoreboard").innerHTML = state.players.map(player => { const playerRole = player.roleIndex >= 0 ? ROLES[player.roleIndex] : null; return `<div class="score-row"><div class="score-name"><span style="--player-color:${player.color}">${player.name}</span><span class="${player.id === state.current ? "active-mark" : ""}">${playerRole ? playerRole.name : "待抽卡"}</span></div><div class="mini-stats"><span>學分 <b>${player.credit}</b></span><span>💰 <b>$${player.money.toLocaleString()}</b></span><span>人際 <b>${player.social}</b></span><span>經歷 <b>${player.exp}</b></span><span>精神 <b>${player.energy}</b></span></div></div>`; }).join("");
}
function addLog(text) {
  $("eventLog").insertAdjacentHTML("afterbegin", `<div class="log-entry">${text}</div>`);
}
function applyChanges(player, changes) {
  Object.entries(changes || {}).forEach(([key, value]) => { player[key] = Math.max(key === "money" ? 0 : 0, player[key] + value); });
}
function nextTurn() {
  state.current = (state.current + 1) % state.players.length;
  if (state.current === 0) state.round++;
  state.lastRoll = null; state.hasRolledThisTurn = false; state.pendingDraw = null; state.interventionPending = false; updateUI();
}
function rollDice() {
  if (state.gameOver || state.hasRolledThisTurn) return;
  const button = $("rollButton"); button.disabled = true;
  state.hasRolledThisTurn = true;
  const roll = Math.floor(Math.random() * 6) + 1; state.lastRoll = roll;
  const p = state.players[state.current]; const oldPosition = p.position;
  p.position = (p.position + roll) % TILES.length; if (p.position < oldPosition) p.laps++;
  if (p.position === 0) { p.money += 1000; p.energy = Math.min(12, p.energy + 1); addLog(`<strong>${p.name}</strong> 經過起點，獲得 $1,000。`); }
  updateUI(); setTimeout(() => resolveTile(p), 450);
}
function resolveTile(player) {
  const tile = TILES[player.position]; addLog(`<strong>${player.name}</strong> 抵達「${tile.name}」。`);
  if (tile.type === "chance" || tile.type === "life" || tile.type === "choice") {
    state.pendingDraw = tile.type;
    updateUI();
  }
  else if (tile.name === "期中考" || tile.name === "期末考") showExam(player);
  else { applyChanges(player, tile.effect); showResult(`${tile.icon} ${tile.name}`, tile.text, tile.effect, player); }
}
function deckLabel(deck) {
  return ({ chance: "機會卡", life: "人生卡", choice: "選擇事件卡" })[deck] || "卡牌";
}
function showNextRoleDraw() {
  const player = state.players[state.roleDrawIndex];
  if (!player) {
    state.roleDrawn = true;
    closeEventModal();
    updateUI();
    addLog("所有玩家已抽取角色卡，遊戲正式開始！");
    return;
  }
  $("modalKicker").textContent = "CHARACTER CARD";
  $("modalIcon").textContent = "🎴";
  $("modalTitle").textContent = `${player.name}，請抽取角色卡`;
  $("modalText").textContent = "每位玩家只能抽取一張角色卡。角色會決定你的初始資源與人生目標。";
  $("modalChoices").innerHTML = `<button class="choice-button role-draw-button">抽取角色卡</button>`;
  $("modalContinue").classList.add("hidden");
  $("eventModal").classList.remove("hidden");
  $("modalChoices").querySelector("button").onclick = () => drawRoleCard(player);
}
function drawRoleCard(player) {
  const usedRoles = state.players.map(p => p.roleIndex).filter(index => index >= 0);
  const availableRoles = ROLES.map((_, index) => index).filter(index => !usedRoles.includes(index));
  const roleIndex = availableRoles[Math.floor(Math.random() * availableRoles.length)];
  const role = ROLES[roleIndex];
  Object.assign(player, role.start, { roleIndex });
  $("modalKicker").textContent = "CHARACTER CARD DRAWN";
  $("modalIcon").textContent = role.icon;
  $("modalTitle").textContent = `${player.name}：${role.name}`;
  $("modalText").textContent = `${role.description}｜人生目標：${role.goal}`;
  $("modalChoices").innerHTML = `<div class="change-summary"><span>學分 <b>${role.start.credit}</b></span><span>金錢 <b>$${role.start.money.toLocaleString()}</b></span><span>精神 <b>${role.start.energy}</b></span><span>人際 <b>${role.start.social}</b></span></div>`;
  $("modalContinue").classList.remove("hidden");
  $("modalContinue").textContent = state.roleDrawIndex < state.players.length - 1 ? "下一位玩家抽卡" : "完成角色設定，開始遊戲";
  $("modalContinue").onclick = () => {
    state.roleDrawIndex++;
    updateUI();
    showNextRoleDraw();
  };
}
function drawCard(deck) {
  if (state.pendingDraw !== deck || state.gameOver) return;
  const player = state.players[state.current];
  state.pendingDraw = null;
  updateUI();
  if (deck === "choice") showChoiceEvent(player);
  else showEvent(EVENTS[deck][Math.floor(Math.random() * EVENTS[deck].length)], player, deck);
}
function showEvent(event, player, kicker) {
  openModal(kicker === "life" ? "LIFE CARD" : "CHANCE CARD", event, player);
}
function showChoiceEvent(player) {
  openModal("CHOICE EVENT", { title: "這週末怎麼過？", text: "時間有限，你必須在成長與休息之間做選擇。", icon: "↔", choices: [{ label: "參加志工活動（+4 經歷，+2 人際，-2 精神）", changes: { exp: 4, social: 2, energy: -2 } }, { label: "接案賺錢（+$2,500，-3 精神）", changes: { money: 2500, energy: -3 } }, { label: "好好休息（+4 精神）", changes: { energy: 4 } }] }, player);
}
function showExam(player) {
  const roll = Math.floor(Math.random() * 6) + 1; const pass = roll >= 3;
  const event = { title: pass ? "考試通過！" : "考試失利...", text: `你擲出了 ${roll} 點，${pass ? "準備充分，拿下漂亮的成績！" : "別灰心，下一次會更好。"}`, icon: pass ? "🎉" : "📝", changes: pass ? { credit: 18, exp: 2 } : { credit: 4, energy: -2 } };
  applyChanges(player, event.changes); showResult(event.title, event.text, event.changes, player);
}
function showResult(title, text, changes, player) {
  openModal("CAMPUS RESULT", { title, text, icon: "✦" }, player, changes);
}
function openModal(kicker, event, player, changes = null) {
  $("modalKicker").textContent = kicker; $("modalIcon").textContent = event.icon || "✦"; $("modalTitle").textContent = event.title; $("modalText").textContent = event.text;
  const choices = $("modalChoices"); choices.innerHTML = "";
  if (event.choices) event.choices.forEach(choice => { const button = document.createElement("button"); button.className = "choice-button"; button.textContent = choice.label; button.onclick = () => { applyChanges(player, choice.changes); closeEventModal(); completeTurn(); }; choices.appendChild(button); });
  else { const result = changes || event.changes || {}; choices.innerHTML = `<div class="change-summary">${Object.entries(result).map(([key, val]) => `<span>${keyLabel(key)} <b class="${val >= 0 ? "positive" : "negative"}">${signed(val)}</b></span>`).join("")}</div>`; $("modalContinue").classList.remove("hidden"); $("modalContinue").onclick = () => { closeEventModal(); completeTurn(); }; }
  $("eventModal").classList.remove("hidden");
}
function keyLabel(key) { return ({ credit: "學分", money: "金錢", energy: "精神", social: "人際", exp: "經歷" })[key] || key; }
function closeEventModal() { $("eventModal").classList.add("hidden"); $("modalContinue").classList.add("hidden"); }
function completeTurn() {
  closeEventModal();
  state.interventionIndex = 0;
  state.interventionPending = state.players.length > 1;
  updateUI();
  if (state.interventionPending) showNextIntervention();
  else finishTurn();
}
function showNextIntervention() {
  while (state.interventionIndex < state.players.length && state.interventionIndex === state.current) state.interventionIndex++;
  if (state.interventionIndex >= state.players.length) {
    state.interventionPending = false;
    finishTurn();
    return;
  }
  const interveningPlayer = state.players[state.interventionIndex];
  const activePlayer = state.players[state.current];
  $("modalKicker").textContent = "PLAYER INTERVENTION";
  $("modalIcon").textContent = "🙋";
  $("modalTitle").textContent = `${interveningPlayer.name}，要干預嗎？`;
  $("modalText").textContent = `目前是 ${activePlayer.name} 的效果階段。干預會消耗 $300，讓你獲得 1 點人際，並使對方消耗 1 點精神。`;
  $("modalChoices").innerHTML = `<button class="choice-button" data-intervention="yes">干預（-$300，自己 +1 人際，${activePlayer.name} -1 精神）</button><button class="choice-button" data-intervention="no">不干預，讓他繼續</button>`;
  $("modalContinue").classList.add("hidden");
  $("eventModal").classList.remove("hidden");
  $("modalChoices").querySelectorAll("[data-intervention]").forEach(button => {
    button.onclick = () => resolveIntervention(button.dataset.intervention === "yes", interveningPlayer, activePlayer);
  });
}
function resolveIntervention(intervene, interveningPlayer, activePlayer) {
  if (intervene && interveningPlayer.money >= 300) {
    applyChanges(interveningPlayer, { money: -300, social: 1 });
    applyChanges(activePlayer, { energy: -1 });
    addLog(`<strong>${interveningPlayer.name}</strong> 選擇干預 ${activePlayer.name}，支付 $300。`);
  } else if (intervene) {
    addLog(`<strong>${interveningPlayer.name}</strong> 想要干預，但金錢不足，改為不干預。`);
  } else {
    addLog(`<strong>${interveningPlayer.name}</strong> 選擇不干預。`);
  }
  state.interventionIndex++;
  updateUI();
  showNextIntervention();
}
function finishTurn() {
  closeEventModal();
  if (checkEnd()) return;
  setTimeout(nextTurn, 250);
}
function checkEnd() {
  const winnerTrigger = state.players.some(p => p.credit >= 128 || p.laps >= 8);
  if (!winnerTrigger) return false;
  state.gameOver = true; const results = state.players.map(p => ({ ...p, total: p.credit + Math.floor(p.money / 1000) + p.social + p.exp + Math.floor(p.energy / 2) + (p.credit >= 128 ? ROLES[p.roleIndex].bonus : 0) })).sort((a, b) => b.total - a.total);
  openModal("GRADUATION DAY", { title: `${results[0].name} 成為校園人生 MVP！`, text: results.map((p, i) => `第 ${i + 1} 名｜${p.name}：${p.total} 分`).join("　"), icon: "🎓" }, results[0]);
  $("modalContinue").classList.remove("hidden"); $("modalContinue").textContent = "再玩一次"; $("modalContinue").onclick = () => { closeEventModal(); $("gameScreen").classList.add("hidden"); $("setupScreen").classList.remove("hidden"); renderPlayerSetup(); };
  addLog(`<strong>遊戲結束！</strong> ${results[0].name} 獲得最高總分 ${results[0].total}。`); return true;
}
$("playerCount").addEventListener("change", renderPlayerSetup);
$("startButton").addEventListener("click", startGame);
$("rollButton").addEventListener("click", rollDice);
$("rulesButton").addEventListener("click", () => $("rulesModal").classList.remove("hidden"));
$("closeRules").addEventListener("click", () => $("rulesModal").classList.add("hidden"));
$("rulesOkay").addEventListener("click", () => $("rulesModal").classList.add("hidden"));
$("closeModal").addEventListener("click", closeEventModal);
$("newGameButton").addEventListener("click", () => { if (confirm("確定要放棄目前進度並重新開始嗎？")) { $("gameScreen").classList.add("hidden"); $("setupScreen").classList.remove("hidden"); renderPlayerSetup(); } });
renderPlayerSetup();
