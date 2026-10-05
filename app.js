// Returns { status: "yes" | "mod" | "risky" | "no", reason }
function check(socketId, sw) {
  const s = SOCKETS[socketId];
  if (s.family !== sw.family) {
    return { status: "no", reason: `${FAMILY_LABEL[sw.family]} switch, but your board has ${s.name} sockets. Different footprint, so it won't fit.` };
  }
  if (s.family === "he") {
    return { status: "risky", reason: "Fits physically, but magnetic boards are calibrated per magnet. Only use switches your manufacturer officially supports." };
  }
  if (s.family !== "mx") return { status: "yes", reason: "Same socket family. Plug and play." };

  if (s.pinGauge === "thin" && sw.gauge !== "thin") {
    return { status: "risky", reason: "Outemu sockets are made for thin pins. Thicker pins can stretch or crack the socket, and afterwards Outemu switches may stop making contact." };
  }
  if (sw.pins === 5 && s.pcbPins === 3) {
    return { status: "mod", reason: "5-pin switch on a 3-pin PCB. Clip the two small plastic side legs with flush cutters (never the metal pins) and it'll fit." };
  }
  return { status: "yes", reason: sw.pins === 3 && s.pcbPins === 5 ? "3-pin switch on a 5-pin board works fine, it's just held by the plate." : "Plug and play." };
}

const LABEL = { yes: "Works", mod: "Needs a small mod", risky: "Risky", no: "Won't fit" };
const ORDER = { yes: 0, mod: 1, risky: 2, no: 3 };
const $ = (id) => document.getElementById(id);
const state = { socket: localStorage.getItem("socket") || "", q: "", type: "all", show: "all" };

function renderSocketOptions() {
  $("socket").innerHTML = `<option value="">Select your socket type…</option>` +
    Object.entries(SOCKETS).map(([id, s]) => `<option value="${id}">${s.name}</option>`).join("");
  $("board").innerHTML = `<option value="">…or pick a known keyboard</option>` +
    KEYBOARDS.map((k, i) => `<option value="${i}">${k.name}</option>`).join("");
}

function setSocket(id) {
  state.socket = id;
  localStorage.setItem("socket", id);
  $("socket").value = id;
  $("socket-desc").textContent = id ? SOCKETS[id].desc : "";
  render();
}

function render() {
  const list = $("results");
  if (!state.socket) {
    list.innerHTML = `<p class="empty">Pick your keyboard or socket type above to see what fits.</p>`;
    $("summary").textContent = "";
    return;
  }
  const q = state.q.toLowerCase();
  const rows = SWITCHES.map((sw) => ({ sw, r: check(state.socket, sw) }))
    .filter(({ sw, r }) =>
      (state.type === "all" || sw.type === state.type) &&
      (state.show === "all" || (state.show === "usable" ? r.status !== "no" : r.status === state.show)) &&
      (`${sw.name} ${sw.brand}`.toLowerCase().includes(q)))
    .sort((a, b) => ORDER[a.r.status] - ORDER[b.r.status] || a.sw.name.localeCompare(b.sw.name));

  const counts = SWITCHES.reduce((c, sw) => (c[check(state.socket, sw).status]++, c), { yes: 0, mod: 0, risky: 0, no: 0 });
  $("summary").innerHTML = Object.keys(LABEL).map((k) => `<span class="pill ${k}">${counts[k]} ${LABEL[k]}</span>`).join("");

  list.innerHTML = rows.length ? rows.map(({ sw, r }) => `
    <article class="card ${r.status}">
      <div class="card-head">
        <h3>${sw.name}</h3>
        <span class="badge ${r.status}">${LABEL[r.status]}</span>
      </div>
      <div class="meta">
        <span class="tag ${sw.type}">${sw.type}</span>
        <span>${FAMILY_LABEL[sw.family]}</span>
        ${sw.pins ? `<span>${sw.pins}-pin</span>` : ""}
        <span>${sw.force}g</span>
      </div>
      <p>${r.reason}</p>
    </article>`).join("") : `<p class="empty">No switches match those filters.</p>`;
}

function runCustom() {
  if (!state.socket) { $("custom-out").textContent = "Select your socket type first."; return; }
  const sw = { family: $("c-family").value, pins: +$("c-pins").value, gauge: $("c-thin").checked ? "thin" : "standard" };
  const r = check(state.socket, sw);
  $("custom-out").innerHTML = `<span class="badge ${r.status}">${LABEL[r.status]}</span> ${r.reason}`;
}

renderSocketOptions();
$("c-family").innerHTML = Object.entries(FAMILY_LABEL).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
$("socket").onchange = (e) => setSocket(e.target.value);
$("board").onchange = (e) => e.target.value !== "" && setSocket(KEYBOARDS[e.target.value].socket);
$("search").oninput = (e) => { state.q = e.target.value; render(); };
$("type").onchange = (e) => { state.type = e.target.value; render(); };
$("show").onchange = (e) => { state.show = e.target.value; render(); };
$("c-run").onclick = runCustom;
setSocket(state.socket in SOCKETS ? state.socket : "");
