// Hotswap socket families. A switch only physically fits sockets of its own family.
const SOCKETS = {
  "mx-5": { name: "MX-style, 5-pin PCB", family: "mx", pcbPins: 5, pinGauge: "standard",
    desc: "Standard Kailh/Gateron MX hotswap sockets with holes for the two extra plastic legs. The most flexible type." },
  "mx-3": { name: "MX-style, 3-pin PCB", family: "mx", pcbPins: 3, pinGauge: "standard",
    desc: "MX hotswap sockets, but the PCB only has the center hole. 5-pin switches need their two plastic side legs clipped." },
  "outemu": { name: "Outemu sockets (budget boards)", family: "mx", pcbPins: 3, pinGauge: "thin",
    desc: "Older budget boards (many Redragon/E-Yooso models). Sockets are made for Outemu's thinner metal pins." },
  "choc-v1": { name: "Kailh Choc v1 (low profile)", family: "choc1",
    desc: "Kailh Choc v1 low-profile sockets. Only Choc v1 switches fit." },
  "choc-v2": { name: "Kailh Choc v2 (low profile)", family: "choc2",
    desc: "Kailh Choc v2 low-profile sockets (MX-style cross stem). Only Choc v2 switches fit." },
  "gateron-lp": { name: "Gateron Low Profile 2.0 (KS-33)", family: "glp2",
    desc: "Used by NuPhy Air V2 and similar. Not cross-compatible with the older KS-27 low-profile v1." },
  "optical-gateron": { name: "Gateron optical", family: "opt-gateron",
    desc: "Light-based switches. Only Gateron-style optical switches fit, never regular mechanical ones." },
  "magnetic": { name: "Magnetic / Hall effect", family: "he",
    desc: "Analog Hall-effect boards. Switches fit physically, but the magnet must match what the firmware is calibrated for." },
};

// pins: 3 or 5 (common retail version). gauge: metal pin thickness.
const SWITCHES = [
  // Linear
  { name: "Cherry MX Red", brand: "Cherry", type: "linear", family: "mx", pins: 3, force: 45 },
  { name: "Cherry MX Black", brand: "Cherry", type: "linear", family: "mx", pins: 3, force: 60 },
  { name: "Cherry MX2A Red", brand: "Cherry", type: "linear", family: "mx", pins: 3, force: 45 },
  { name: "Gateron Yellow (KS-3)", brand: "Gateron", type: "linear", family: "mx", pins: 5, force: 50 },
  { name: "Gateron Milky Yellow", brand: "Gateron", type: "linear", family: "mx", pins: 5, force: 50 },
  { name: "Gateron Oil King", brand: "Gateron", type: "linear", family: "mx", pins: 5, force: 55 },
  { name: "Gateron Ink Black V2", brand: "Gateron", type: "linear", family: "mx", pins: 5, force: 60 },
  { name: "Akko V3 Cream Yellow", brand: "Akko", type: "linear", family: "mx", pins: 5, force: 50 },
  { name: "Novelkeys Cream", brand: "NovelKeys", type: "linear", family: "mx", pins: 5, force: 55 },
  { name: "Durock Alpaca", brand: "Durock", type: "linear", family: "mx", pins: 5, force: 62 },
  { name: "Kailh Box Red", brand: "Kailh", type: "linear", family: "mx", pins: 3, force: 45 },
  { name: "Outemu Red", brand: "Outemu", type: "linear", family: "mx", pins: 3, gauge: "thin", force: 50 },
  // Tactile
  { name: "Cherry MX Brown", brand: "Cherry", type: "tactile", family: "mx", pins: 3, force: 55 },
  { name: "Gateron Brown (KS-3)", brand: "Gateron", type: "tactile", family: "mx", pins: 5, force: 55 },
  { name: "Glorious Panda", brand: "Glorious", type: "tactile", family: "mx", pins: 5, force: 67 },
  { name: "Gazzew Boba U4T", brand: "Gazzew", type: "tactile", family: "mx", pins: 5, force: 62 },
  { name: "Akko V3 Lavender Purple", brand: "Akko", type: "tactile", family: "mx", pins: 5, force: 36 },
  { name: "Kailh Box Brown", brand: "Kailh", type: "tactile", family: "mx", pins: 3, force: 50 },
  { name: "Outemu Brown", brand: "Outemu", type: "tactile", family: "mx", pins: 3, gauge: "thin", force: 55 },
  // Clicky
  { name: "Cherry MX Blue", brand: "Cherry", type: "clicky", family: "mx", pins: 3, force: 60 },
  { name: "Kailh Box Jade", brand: "Kailh", type: "clicky", family: "mx", pins: 3, force: 50 },
  { name: "Kailh Box White", brand: "Kailh", type: "clicky", family: "mx", pins: 3, force: 45 },
  { name: "Gateron Blue (KS-3)", brand: "Gateron", type: "clicky", family: "mx", pins: 5, force: 60 },
  { name: "Outemu Blue", brand: "Outemu", type: "clicky", family: "mx", pins: 3, gauge: "thin", force: 60 },
  // Low profile
  { name: "Kailh Choc v1 Red", brand: "Kailh", type: "linear", family: "choc1", force: 50 },
  { name: "Kailh Choc v1 Brown", brand: "Kailh", type: "tactile", family: "choc1", force: 60 },
  { name: "Kailh Choc v1 White", brand: "Kailh", type: "clicky", family: "choc1", force: 50 },
  { name: "Kailh Choc v2 Red", brand: "Kailh", type: "linear", family: "choc2", force: 50 },
  { name: "Kailh Choc v2 Brown", brand: "Kailh", type: "tactile", family: "choc2", force: 50 },
  { name: "Gateron LP 2.0 Red", brand: "Gateron", type: "linear", family: "glp2", force: 50 },
  { name: "Gateron LP 2.0 Brown", brand: "Gateron", type: "tactile", family: "glp2", force: 55 },
  { name: "Gateron LP 2.0 Blue", brand: "Gateron", type: "clicky", family: "glp2", force: 55 },
  // Optical / magnetic
  { name: "Gateron Optical Red", brand: "Gateron", type: "linear", family: "opt-gateron", force: 45 },
  { name: "Gateron Optical Brown", brand: "Gateron", type: "tactile", family: "opt-gateron", force: 55 },
  { name: "Lekker L60", brand: "Wooting", type: "linear", family: "he", force: 60 },
  { name: "Gateron KS-20 Magnetic White", brand: "Gateron", type: "linear", family: "he", force: 35 },
];

const KEYBOARDS = [
  { name: "Keychron Q series (Q1/Q2/Q3…)", socket: "mx-5" },
  { name: "Keychron V series (V1/V3…)", socket: "mx-5" },
  { name: "Keychron K8 Max (hot-swappable version)", socket: "mx-5" },
  { name: "Glorious GMMK Pro", socket: "mx-5" },
  { name: "Akko 5075B", socket: "mx-5" },
  { name: "Epomaker TH80", socket: "mx-5" },
  { name: "Logitech G Pro X", socket: "mx-3" },
  { name: "NuPhy Air V2 (Air60/75/96)", socket: "gateron-lp" },
  { name: "Wooting 60HE / 80HE", socket: "magnetic" },
];

const FAMILY_LABEL = {
  mx: "MX-style", choc1: "Kailh Choc v1", choc2: "Kailh Choc v2", glp2: "Gateron LP 2.0",
  "opt-gateron": "Gateron optical", he: "Magnetic",
};
