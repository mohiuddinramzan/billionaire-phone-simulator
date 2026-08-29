/* ==========================================================================
   BILLIONAIRE PHONE SIMULATOR
   Fictional entertainment simulator. No real money, banking, payments,
   investing, crypto or gambling is involved anywhere in this file.
   All balances are virtual and stored only in the browser (localStorage).
   ========================================================================== */
"use strict";

/* ============================== CONSTANTS ============================== */

const STARTING_BALANCE = 100000000000n; // $100,000,000,000 (BigInt — no floats for money)
const STORAGE_KEY = "billionairePhoneSimulator.v1";

/* ------------------------------- APP LIST -------------------------------- */
const APPS = [
  { id: "bank",        icon: "💰", label: "Bank",       dock: true },
  { id: "shopping",     icon: "🛍️", label: "Shop",       dock: true },
  { id: "cars",         icon: "🚗", label: "Cars",       dock: false },
  { id: "realestate",   icon: "🏠", label: "Real Estate",dock: false },
  { id: "jet",          icon: "✈️", label: "Jet",        dock: false },
  { id: "islands",      icon: "🏝️", label: "Islands",    dock: false },
  { id: "news",         icon: "📰", label: "News",       dock: false },
  { id: "messages",     icon: "💬", label: "Messages",   dock: true },
  { id: "wealth",       icon: "📊", label: "Wealth",     dock: true },
  { id: "challenges",   icon: "🎯", label: "Challenges", dock: false },
  { id: "settings",     icon: "⚙️", label: "Settings",   dock: false },
];

/* ------------------------------ ITEM CATALOG ------------------------------ */
// category -> which dedicated app (if any) also lists these items
const CATEGORY_META = {
  food:       { label: "Food",       icon: "🍔", app: null },
  technology: { label: "Technology", icon: "📱", app: null },
  fashion:    { label: "Fashion",    icon: "👕", app: null },
  jewelry:    { label: "Jewelry",    icon: "💎", app: null },
  cars:       { label: "Cars",       icon: "🚗", app: "cars" },
  homes:      { label: "Homes",      icon: "🏠", app: "realestate" },
  aviation:   { label: "Aviation",   icon: "✈️", app: "jet" },
  yachts:     { label: "Yachts",     icon: "🚢", app: null },
  islands:    { label: "Islands",    icon: "🏝️", app: "islands" },
  space:      { label: "Space",      icon: "🚀", app: null },
};

const ITEMS = [
  // food
  { id:"f_pizza",     icon:"🍕", name:"Pizza",                 price:"20",             category:"food" },
  { id:"f_burger",    icon:"🍔", name:"Gourmet Burger",        price:"45",             category:"food" },
  { id:"f_caviar",    icon:"🥄", name:"Caviar Platter",        price:"2500",           category:"food" },
  { id:"f_dinner",    icon:"🍽️", name:"Michelin Tasting Menu", price:"12000",          category:"food" },
  { id:"f_champagne", icon:"🍾", name:"Vintage Champagne",     price:"85000",          category:"food" },
  // technology
  { id:"t_phone",     icon:"📱", name:"Luxury Smartphone",     price:"5000",           category:"technology" },
  { id:"t_laptop",    icon:"💻", name:"Diamond-Encrusted Laptop", price:"250000",      category:"technology" },
  { id:"t_drone",     icon:"🛸", name:"Custom Cinema Drone",   price:"180000",         category:"technology" },
  { id:"t_server",    icon:"🖥️", name:"Private Server Farm",   price:"40000000",       category:"technology" },
  // fashion
  { id:"fa_suit",     icon:"🕴️", name:"Designer Suit",         price:"50000",          category:"fashion" },
  { id:"fa_sneakers", icon:"👟", name:"Rare Sneakers",         price:"75000",          category:"fashion" },
  { id:"fa_bag",      icon:"👜", name:"Exotic Leather Bag",    price:"320000",         category:"fashion" },
  // jewelry
  { id:"j_watch",     icon:"⌚", name:"Luxury Watch",          price:"100000",         category:"jewelry" },
  { id:"j_chain",     icon:"📿", name:"Gold Chain",            price:"500000",         category:"jewelry" },
  { id:"j_diamond",   icon:"💎", name:"Diamond",               price:"10000000",       category:"jewelry" },
  { id:"j_crown",     icon:"👑", name:"Ceremonial Crown Replica", price:"75000000",    category:"jewelry" },
  // cars
  { id:"c_sedan",     icon:"🚗", name:"Luxury Sedan",          price:"150000",         category:"cars" },
  { id:"c_suv",       icon:"🚙", name:"Armored SUV",           price:"2000000",        category:"cars" },
  { id:"c_super",     icon:"🏎️", name:"Supercar",              price:"1000000",        category:"cars" },
  { id:"c_hyper",     icon:"🏎️", name:"Hypercar",              price:"5000000",        category:"cars" },
  { id:"c_race",      icon:"🏁", name:"Race Car",              price:"10000000",       category:"cars" },
  // homes
  { id:"h_mansion",   icon:"🏠", name:"Luxury Mansion",        price:"25000000",       category:"homes" },
  { id:"h_mega",      icon:"🏘️", name:"Mega Mansion",          price:"100000000",      category:"homes" },
  { id:"h_castle",    icon:"🏰", name:"Private Castle",        price:"100000000",      category:"homes" },
  { id:"h_skyscraper",icon:"🏢", name:"Skyscraper",            price:"2000000000",     category:"homes" },
  { id:"h_tower",     icon:"🏙️", name:"Luxury Tower",          price:"10000000000",    category:"homes" },
  // aviation
  { id:"a_small",     icon:"✈️", name:"Small Private Jet",     price:"20000000",       category:"aviation" },
  { id:"a_luxury",    icon:"✈️", name:"Luxury Jet",            price:"80000000",       category:"aviation" },
  { id:"a_mega",      icon:"🛩️", name:"Mega Jet",              price:"300000000",      category:"aviation" },
  { id:"a_space",     icon:"🚀", name:"Fictional Space Jet",   price:"5000000000",     category:"aviation" },
  // yachts
  { id:"y_super",     icon:"🚢", name:"Super Yacht",           price:"500000000",      category:"yachts" },
  { id:"y_mega",      icon:"🛥️", name:"Mega Yacht",            price:"1200000000",     category:"yachts" },
  // islands
  { id:"i_tropical",  icon:"🏝️", name:"Tropical Island",       price:"50000000",       category:"islands" },
  { id:"i_luxury",    icon:"🏝️", name:"Luxury Island",         price:"500000000",      category:"islands" },
  { id:"i_private",   icon:"🏝️", name:"Private Island",        price:"1000000000",     category:"islands" },
  { id:"i_mega",      icon:"🏝️", name:"Mega Island",           price:"5000000000",     category:"islands" },
  { id:"i_fantasy",   icon:"🏝️", name:"Fantasy Island",        price:"20000000000",    category:"islands" },
  // space
  { id:"s_craft",     icon:"🚀", name:"Fictional Spacecraft",  price:"20000000000",    category:"space" },
  { id:"s_station",   icon:"🛰️", name:"Space Station Suite",   price:"50000000000",    category:"space" },
];
const ITEM_BY_ID = Object.fromEntries(ITEMS.map(i => [i.id, i]));

/* ------------------------------ NEWS HEADLINES ------------------------------ */
const STATIC_HEADLINES = [
  "Local billionaire buys another private island because the previous one felt lonely.",
  "Billionaire spends $80 million on a jet and still complains about traffic.",
  "Experts confirm: he has absolutely no idea where to park 47 supercars.",
  "Man spends $1 billion on an island. Immediately asks where the Wi-Fi password is.",
  "Billionaire's accountant seen crying quietly in a $2 billion skyscraper lobby.",
  "Sources confirm the yacht has a smaller yacht inside it, just in case.",
  "Billionaire orders a $20 pizza using a private jet as a delivery vehicle.",
  "New hobby unlocked: billionaire now names supercars after ex-girlfriends.",
  "Billionaire buys a castle, immediately asks where the microwave is.",
  "Reports indicate the garage now qualifies as its own zip code.",
  "Billionaire's private island has better Wi-Fi than most countries.",
  "Local tycoon spends more on watches than some nations spend on roads.",
  "Billionaire's pilot files formal complaint: 'He keeps saying just fly somewhere.'",
  "Economists baffled after billionaire buys a diamond 'just to see what happens.'",
  "Billionaire's mansion now has more bathrooms than actual house guests.",
  "Sources say the space jet purchase was 'mostly an accident.'",
  "Billionaire spotted comparing two identical hypercars for eleven minutes.",
  "New record: fastest a human has ever said 'add it to my collection.'",
  "Billionaire's assistant now fluent in the phrase 'that's already been purchased.'",
  "Local billionaire discovers a seventh island he forgot he owned.",
  "Billionaire buys a skyscraper, uses one floor, rents zero.",
  "Reports confirm the billionaire's watch collection has its own insurance department.",
  "Billionaire's garage manager requests hazard pay for counting the cars.",
  "Analysts stunned as billionaire treats a supercar like a vending machine snack.",
  "Billionaire's island manager asks, gently, to stop buying more islands.",
  "Sources say the billionaire's jet fleet could technically be its own airline.",
  "Billionaire spends $500,000 on jet maintenance, calls it 'basically free.'",
  "Local tycoon's mega yacht spotted towing a slightly smaller yacht for fun.",
  "Billionaire's accountant requests a raise, a vacation, and a new personality.",
  "Breaking: billionaire's private chef has never once cooked a $20 pizza.",
  "Billionaire buys a race car, has never once driven above the speed limit.",
  "Reports confirm the billionaire's closet is larger than most apartments.",
  "Billionaire's driver quietly adds another car to the garage 'as a surprise.'",
  "Local tycoon's private island now technically has its own time zone jokes.",
  "Billionaire spotted asking Google how many islands is 'too many' islands.",
  "Sources confirm the billionaire owns a hypercar he has never started.",
  "Billionaire's real estate portfolio now larger than several small nations.",
  "Breaking: billionaire buys a mansion purely for the shape of the driveway.",
  "Billionaire's news reporter runs out of superlatives, starts repeating 'wow.'",
  "Local tycoon's diamond collection now requires its own security detail.",
  "Billionaire's personal assistant discovers the true meaning of 'no budget.'",
  "Reports confirm billionaire tips $10,000 for a $20 pizza, on principle.",
  "Billionaire's mega mansion has a room whose sole purpose is 'more rooms.'",
  "Sources say the billionaire has started ranking his jets by leg room.",
  "Billionaire's yacht crew now outnumbers most small startups.",
  "Breaking: billionaire buys a spacecraft, still afraid of turbulence.",
  "Billionaire's garage manager spotted labeling cars with sticky notes reading 'again?'",
  "Local tycoon's island count now rounds up to 'a small archipelago.'",
  "Billionaire's accountant sends a memo titled 'Please. Just. Stop.'",
  "Reports confirm the billionaire's watch drawer requires its own elevator.",
  "Billionaire spends a fortune on a crown replica, wears it to breakfast.",
  "Breaking: billionaire's private jet fleet officially has better legroom than economy.",
  "Local tycoon caught explaining to staff that 'it's basically the same as saving.'",
];

const DYNAMIC_HEADLINE_TEMPLATES = [
  "BREAKING: local billionaire just bought a {item} for {price} — experts have thoughts.",
  "FLASH: billionaire spends {price} on a {item}, immediately asks what's next.",
  "BUSINESS: analysts confirm the {item} purchase 'checks out, mathematically, if nothing else.'",
  "Billionaire drops {price} on a {item}. Accountant seen taking a long walk.",
  "Sources confirm the new {item} was purchased 'on a whim, before lunch.'",
  "Billionaire's {item} purchase for {price} trends locally as 'a lot, honestly.'",
];

/* ------------------------------ MESSAGE THREADS ------------------------------ */
const THREADS = [
  { id:"accountant", icon:"👨‍💼", name:"Accountant", role:"Chief Financial Officer", messages:[
    { from:"them", text:"Sir, you spent quite a bit today." },
    { from:"me",   text:"So?" },
    { from:"them", text:"I just wanted to make sure you knew." },
    { from:"them", text:"Also, the spreadsheet has started crying." },
    { from:"me",   text:"Tell it to toughen up." },
  ]},
  { id:"assistant", icon:"👩‍💼", name:"Personal Assistant", role:"Executive Assistant", messages:[
    { from:"them", text:"Your 3pm is with your other 3pm." },
    { from:"me",   text:"Reschedule one of me." },
    { from:"them", text:"On it. Also, another package arrived. It was a car." },
    { from:"me",   text:"Which one?" },
    { from:"them", text:"I genuinely don't know anymore." },
  ]},
  { id:"pilot", icon:"🧑‍✈️", name:"Pilot", role:"Chief Pilot", messages:[
    { from:"them", text:"Your private jet is ready." },
    { from:"me",   text:"Where are we going?" },
    { from:"them", text:"You didn't tell me." },
    { from:"me",   text:"Somewhere expensive." },
    { from:"them", text:"Copy that. Filing a flight plan for 'expensive.'" },
  ]},
  { id:"island", icon:"🏝️", name:"Island Manager", role:"Estate Manager", messages:[
    { from:"them", text:"Which island should I prep for the weekend?" },
    { from:"me",   text:"The new one." },
    { from:"them", text:"You'll need to be more specific." },
    { from:"me",   text:"...the newest new one." },
    { from:"them", text:"Understood. On it." },
  ]},
  { id:"garage", icon:"🚗", name:"Garage Manager", role:"Fleet Manager", messages:[
    { from:"them", text:"We're out of space in the garage again." },
    { from:"me",   text:"Buy a bigger garage." },
    { from:"them", text:"That IS the bigger garage." },
    { from:"me",   text:"Buy an even bigger one." },
    { from:"them", text:"Sir, at this point it's a small city." },
  ]},
  { id:"reporter", icon:"📰", name:"News Reporter", role:"Billionaire Beat Reporter", messages:[
    { from:"them", text:"Any comment on today's purchases for our readers?" },
    { from:"me",   text:"No comment." },
    { from:"them", text:"So that's a yes on the record?" },
    { from:"me",   text:"...fine, quote me as 'thriving.'" },
    { from:"them", text:"Running the headline now." },
  ]},
];

/* ------------------------------ ACHIEVEMENTS ------------------------------ */
const ACHIEVEMENTS = [
  { id:"spend1m",   icon:"🏆", title:"Spend Your First $1M", desc:"Cross $1,000,000 in total spending.", check:s => s.totalSpent >= 1000000n },
  { id:"spend100m", icon:"🏆", title:"Spend $100M",           desc:"Cross $100,000,000 in total spending.", check:s => s.totalSpent >= 100000000n },
  { id:"spend1b",   icon:"🏆", title:"Spend $1B",             desc:"Cross $1,000,000,000 in total spending.", check:s => s.totalSpent >= 1000000000n },
  { id:"spend10b",  icon:"🏆", title:"Spend $10B",            desc:"Cross $10,000,000,000 in total spending.", check:s => s.totalSpent >= 10000000000n },
  { id:"spendhalf", icon:"🏆", title:"Spend Half Your Wealth",desc:"Spend at least 50% of your starting fortune.", check:s => s.totalSpent >= STARTING_BALANCE / 2n },
  { id:"buy10cars", icon:"🏆", title:"Buy 10 Cars",           desc:"Own 10 or more cars.", check:s => countByCategory(s,"cars") >= 10 },
  { id:"buy5homes", icon:"🏆", title:"Buy 5 Mansions",        desc:"Own 5 or more properties.", check:s => countByCategory(s,"homes") >= 5 },
  { id:"buyisland", icon:"🏆", title:"Buy a Private Island",  desc:"Own at least 1 island.", check:s => countByCategory(s,"islands") >= 1 },
  { id:"almostbroke", icon:"🏆", title:"Become Almost Broke", desc:"Drop to 5% of your starting fortune.", check:s => s.balance <= STARTING_BALANCE * 5n / 100n && s.balance > 0n },
  { id:"broke",     icon:"🏆", title:"Go Completely Broke",   desc:"Spend the entire fortune.", check:s => s.balance <= 0n },
];

/* ------------------------------ RANDOM EVENTS ------------------------------ */
// All amounts are purely fictional/virtual — no real transactions occur.
const RANDOM_EVENTS = [
  { icon:"🎉", text:"Your birthday party cost $5,000,000.", delta:-5000000n },
  { icon:"💸", text:"Your accountant accidentally spent $2,000,000.", delta:-2000000n },
  { icon:"✈️", text:"Your pilot says the jet needs $500,000 in maintenance.", delta:-500000n },
  { icon:"🎁", text:"Someone sent you a fictional $10,000,000 gift.", delta:10000000n },
  { icon:"🚢", text:"Yacht docking fees came to $250,000.", delta:-250000n },
  { icon:"📈", text:"A fictional business venture returned $15,000,000.", delta:15000000n },
  { icon:"🏝️", text:"Island upkeep cost $1,000,000 this month.", delta:-1000000n },
  { icon:"🎂", text:"A surprise gala cost you $3,000,000.", delta:-3000000n },
];

/* ============================== STATE ============================== */

let state = null;
let currentAppId = null;
let currentThreadId = null;
let randomEventTimer = null;
let clockTimer = null;

function freshState(){
  return {
    balance: STARTING_BALANCE,
    totalSpent: 0n,
    todaySpending: 0n,
    todayKey: dayKey(new Date()),
    startTime: Date.now(),
    inventory: {},        // itemId -> qty
    transactions: [],      // {icon, name, amount(string, signed), ts}
    unlocked: {},          // achievementId -> true
    settings: { dark:true, sound:true, vibration:true, notifications:true },
    newsLog: [],            // {kicker, headline, ts}
  };
}

function dayKey(d){ return d.toISOString().slice(0,10); }

function serializeState(s){
  return JSON.stringify({
    balance: s.balance.toString(),
    totalSpent: s.totalSpent.toString(),
    todaySpending: s.todaySpending.toString(),
    todayKey: s.todayKey,
    startTime: s.startTime,
    inventory: s.inventory,
    transactions: s.transactions,
    unlocked: s.unlocked,
    settings: s.settings,
    newsLog: s.newsLog,
  });
}

function deserializeState(raw){
  const d = JSON.parse(raw);
  return {
    balance: BigInt(d.balance),
    totalSpent: BigInt(d.totalSpent),
    todaySpending: BigInt(d.todaySpending),
    todayKey: d.todayKey || dayKey(new Date()),
    startTime: d.startTime || Date.now(),
    inventory: d.inventory || {},
    transactions: d.transactions || [],
    unlocked: d.unlocked || {},
    settings: Object.assign({ dark:true, sound:true, vibration:true, notifications:true }, d.settings || {}),
    newsLog: d.newsLog || [],
  };
}

function saveState(){
  try{ localStorage.setItem(STORAGE_KEY, serializeState(state)); }
  catch(e){ console.warn("Could not save game state:", e); }
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return deserializeState(raw);
  }catch(e){ console.warn("Could not load saved state, starting fresh:", e); }
  return freshState();
}

function resetGame(){
  state = freshState();
  saveState();
  applyTheme();
  currentAppId = null; currentThreadId = null;
  document.getElementById("broke-screen").classList.add("hidden");
  document.getElementById("broke-screen").classList.remove("open");
  closeApp(true);
  renderHome();
}

/* ============================== HELPERS ============================== */

function formatMoney(v){
  const big = typeof v === "bigint" ? v : BigInt(v);
  const neg = big < 0n;
  const abs = neg ? -big : big;
  return (neg ? "-$" : "$") + abs.toLocaleString("en-US");
}

function countByCategory(s, category){
  let total = 0;
  for(const item of ITEMS){
    if(item.category === category){
      total += s.inventory[item.id] || 0;
    }
  }
  return total;
}

function valueByCategory(s, category){
  let total = 0n;
  for(const item of ITEMS){
    if(item.category === category){
      const qty = s.inventory[item.id] || 0;
      if(qty) total += BigInt(item.price) * BigInt(qty);
    }
  }
  return total;
}

function totalItemsOwned(s){
  return Object.values(s.inventory).reduce((a,b) => a + b, 0);
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

function timeAgo(ts){
  const s = Math.floor((Date.now() - ts) / 1000);
  if(s < 5) return "just now";
  if(s < 60) return s + "s ago";
  const m = Math.floor(s/60);
  if(m < 60) return m + "m ago";
  const h = Math.floor(m/60);
  if(h < 24) return h + "h ago";
  return Math.floor(h/24) + "d ago";
}

/* ============================== SOUND (WebAudio, no files) ============================== */
let audioCtx = null;
function ensureAudio(){
  if(!audioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    if(AC) audioCtx = new AC();
  }
  return audioCtx;
}
function playTone(freq, duration, type="sine", gainPeak=0.06, delay=0){
  if(!state.settings.sound) return;
  const ctx = ensureAudio();
  if(!ctx) return;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(gainPeak, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}
const SFX = {
  buy: () => { playTone(660,0.09,"triangle",0.07); playTone(880,0.12,"triangle",0.06,0.07); },
  notify: () => { playTone(760,0.08,"sine",0.05); },
  achievement: () => { playTone(523,0.09,"triangle",0.06); playTone(659,0.09,"triangle",0.06,0.09); playTone(784,0.16,"triangle",0.07,0.18); },
  error: () => { playTone(160,0.18,"sawtooth",0.06); },
  tap: () => { playTone(1000,0.03,"square",0.02); },
};
function vibrate(pattern){
  if(state.settings.vibration && navigator.vibrate) navigator.vibrate(pattern);
}

/* ============================== TOASTS ============================== */
function showToast(icon, title, text, sound){
  if(!state.settings.notifications) { if(sound) SFX[sound] && SFX[sound](); return; }
  const layer = document.getElementById("toast-layer");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<div class="toast-icon">${icon}</div><div class="toast-text"><div class="toast-title">${escapeHtml(title)}</div>${escapeHtml(text)}</div>`;
  layer.appendChild(el);
  if(sound && SFX[sound]) SFX[sound]();
  setTimeout(() => {
    el.classList.add("leaving");
    setTimeout(() => el.remove(), 260);
  }, 3400);
}

/* ============================== CONFETTI ============================== */
function fireConfetti(){
  const canvas = document.getElementById("confetti-layer");
  const phone = document.getElementById("phone");
  const rect = phone.getBoundingClientRect();
  canvas.width = rect.width; canvas.height = rect.height;
  const ctx = canvas.getContext("2d");
  const colors = ["#c9a24b","#f0cf7a","#35d07f","#f5f3ee","#e5484d"];
  const particles = Array.from({length:60}, () => ({
    x: canvas.width/2, y: canvas.height*0.32,
    vx: (Math.random()-0.5)*9, vy: Math.random()*-7 - 2,
    size: 4 + Math.random()*4, color: colors[Math.floor(Math.random()*colors.length)],
    rot: Math.random()*Math.PI, vr: (Math.random()-0.5)*0.3, life:0,
  }));
  let frame = 0;
  function tick(){
    frame++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let alive = false;
    for(const p of particles){
      p.vy += 0.22; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
      if(p.y < canvas.height + 20) alive = true;
      ctx.save();
      ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - p.life/90);
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*0.6);
      ctx.restore();
    }
    if(alive && frame < 110) requestAnimationFrame(tick);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  requestAnimationFrame(tick);
}

/* ============================== NAVIGATION ============================== */
function openApp(id){
  currentAppId = id; currentThreadId = null;
  SFX.tap();
  document.getElementById("home-screen").classList.add("dimmed");
  const appDef = APPS.find(a => a.id === id);
  document.getElementById("app-title").textContent = appDef ? appDef.label : "";
  document.getElementById("app-back-label").textContent = "Home";
  renderApp(id);
  document.getElementById("app-screen").classList.add("open");
}

function closeApp(instant){
  currentAppId = null; currentThreadId = null;
  document.getElementById("home-screen").classList.remove("dimmed");
  const scr = document.getElementById("app-screen");
  if(instant){ scr.style.transition = "none"; scr.classList.remove("open"); requestAnimationFrame(()=>{ scr.style.transition=""; }); }
  else scr.classList.remove("open");
}

function handleBack(){
  SFX.tap();
  if(currentAppId === "messages" && currentThreadId){
    currentThreadId = null;
    document.getElementById("app-title").textContent = "Messages";
    document.getElementById("app-back-label").textContent = "Home";
    renderApp("messages");
    return;
  }
  closeApp(false);
}

/* ============================== RENDER: HOME ============================== */
function renderHome(){
  renderClockAndDate();
  document.getElementById("home-balance").textContent = formatMoney(state.balance);
  document.getElementById("home-balance-sub").textContent =
    state.balance <= 0n ? "Billionaire Bank · you are broke" : "Billionaire Bank · fictional funds";

  const grid = document.getElementById("app-grid");
  const dock = document.getElementById("dock");
  grid.innerHTML = "";
  dock.innerHTML = "";
  for(const app of APPS){
    const btn = buildAppIcon(app);
    (app.dock ? dock : grid).appendChild(btn);
  }
}

function buildAppIcon(app){
  const btn = document.createElement("button");
  btn.className = "app-icon-btn";
  btn.setAttribute("aria-label", app.label);
  let badge = "";
  if(app.id === "messages"){
    // simple unread indicator based on unread thread count (all threads always "available")
    badge = `<span class="badge-dot">${THREADS.length}</span>`;
  }
  btn.innerHTML = `<span class="app-icon-glyph app-icon-badge">${app.icon}${badge}</span><span class="app-icon-label">${app.label}</span>`;
  btn.addEventListener("click", () => openApp(app.id));
  return btn;
}

function renderClockAndDate(){
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour:"numeric", minute:"2-digit" });
  const dateStr = now.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
  document.getElementById("clock-time").textContent = timeStr;
  document.getElementById("home-clock").textContent = timeStr;
  document.getElementById("home-date").textContent = dateStr;
}

/* ============================== RENDER: APP ROUTER ============================== */
function renderApp(id){
  const body = document.getElementById("app-body");
  body.scrollTop = 0;
  switch(id){
    case "bank": body.innerHTML = renderBank(); break;
    case "shopping": body.innerHTML = renderShopHost(); attachShopHandlers("shopping"); break;
    case "cars": body.innerHTML = renderCategoryApp("cars","🚗","MY GARAGE","Cars"); attachShopHandlers("cars"); break;
    case "realestate": body.innerHTML = renderCategoryApp("homes","🏠","MY PROPERTIES","Properties"); attachShopHandlers("realestate"); break;
    case "jet": body.innerHTML = renderCategoryApp("aviation","✈️","YOUR FLEET","Private Jets"); attachShopHandlers("jet"); break;
    case "islands": body.innerHTML = renderCategoryApp("islands","🏝️","PRIVATE ISLANDS","Islands"); attachShopHandlers("islands"); break;
    case "news": body.innerHTML = renderNews(); break;
    case "messages": body.innerHTML = currentThreadId ? renderThread(currentThreadId) : renderMessagesInbox(); attachMessageHandlers(); break;
    case "wealth": body.innerHTML = renderWealth(); break;
    case "challenges": body.innerHTML = renderChallenges(); break;
    case "settings": body.innerHTML = renderSettings(); attachSettingsHandlers(); break;
    default: body.innerHTML = "";
  }
}

/* ============================== BANK APP ============================== */
function renderBank(){
  const pctSpent = STARTING_BALANCE > 0n ? Number(state.totalSpent * 10000n / STARTING_BALANCE) / 100 : 0;
  const txs = state.transactions.slice(0,25).map(tx => `
    <div class="tx-row">
      <div class="tx-icon">${tx.icon}</div>
      <div class="tx-main">
        <div class="tx-name">${escapeHtml(tx.name)}</div>
        <div class="tx-time">${timeAgo(tx.ts)}</div>
      </div>
      <div class="tx-amount ${tx.amount.startsWith('+') ? 'positive':''}">${tx.amount}</div>
    </div>`).join("") || `<div class="empty-state"><div class="empty-state-icon">🏦</div><div class="empty-state-text">No transactions yet. Go spend some money.</div></div>`;

  return `
    <div class="card">
      <div class="section-label" style="margin-top:0;">PRIVATE BANK</div>
      <div class="balance-label" style="margin-bottom:2px;">AVAILABLE BALANCE</div>
      <div style="font-family:var(--font-display);font-size:32px;font-weight:600;">${formatMoney(state.balance)}</div>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-box-label">Total Spent</div><div class="stat-box-value danger">${formatMoney(state.totalSpent)}</div></div>
      <div class="stat-box"><div class="stat-box-label">Today's Spending</div><div class="stat-box-value">${formatMoney(state.todaySpending)}</div></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="stat-box-label">SPENDING PROGRESS</div>
      <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,pctSpent)}%"></div></div>
      <div style="font-size:11px;color:var(--text-low);margin-top:6px;">${pctSpent.toFixed(2)}% of starting fortune spent</div>
    </div>
    <div class="section-label">RECENT TRANSACTIONS</div>
    <div class="card">${txs}</div>
    <div class="disclaimer-box">🏦 Billionaire Bank is entirely fictional. This is a virtual entertainment simulator — no real bank account, real currency, or real financial service is involved.</div>
  `;
}

/* ============================== SHOP / CATEGORY APPS ============================== */
let shopState = { search:"", category:"all", sort:"default" };

function renderShopHost(){
  return `
    <div class="search-bar"><span>🔍</span><input id="shop-search" type="text" placeholder="Search products…" value="${escapeHtml(shopState.search)}" /></div>
    <div class="chip-row" id="shop-chips">
      ${["all", ...Object.keys(CATEGORY_META)].map(c => `<div class="chip ${shopState.category===c?'active':''}" data-cat="${c}">${c==="all"?"All":CATEGORY_META[c].icon+" "+CATEGORY_META[c].label}</div>`).join("")}
    </div>
    <select class="sort-select" id="shop-sort">
      <option value="default" ${shopState.sort==='default'?'selected':''}>Sort: Featured</option>
      <option value="price-asc" ${shopState.sort==='price-asc'?'selected':''}>Price: Low → High</option>
      <option value="price-desc" ${shopState.sort==='price-desc'?'selected':''}>Price: High → Low</option>
      <option value="name-asc" ${shopState.sort==='name-asc'?'selected':''}>Name: A → Z</option>
      <option value="most-owned" ${shopState.sort==='most-owned'?'selected':''}>Most Purchased</option>
    </select>
    <div class="shop-grid" id="shop-grid">${renderShopGrid(ITEMS)}</div>
  `;
}

function filterSortItems(items){
  let list = items.filter(i => {
    const matchCat = shopState.category === "all" || i.category === shopState.category;
    const matchSearch = !shopState.search || i.name.toLowerCase().includes(shopState.search.toLowerCase()) || CATEGORY_META[i.category].label.toLowerCase().includes(shopState.search.toLowerCase());
    return matchCat && matchSearch;
  });
  switch(shopState.sort){
    case "price-asc": list = list.slice().sort((a,b) => BigInt(a.price) < BigInt(b.price) ? -1 : 1); break;
    case "price-desc": list = list.slice().sort((a,b) => BigInt(a.price) > BigInt(b.price) ? -1 : 1); break;
    case "name-asc": list = list.slice().sort((a,b) => a.name.localeCompare(b.name)); break;
    case "most-owned": list = list.slice().sort((a,b) => (state.inventory[b.id]||0) - (state.inventory[a.id]||0)); break;
  }
  return list;
}

function renderShopGrid(items){
  const list = filterSortItems(items);
  if(!list.length) return `<div class="empty-state" style="grid-column:1/-1;"><div class="empty-state-icon">🔍</div><div class="empty-state-text">No products match your search.</div></div>`;
  return list.map(item => {
    const owned = state.inventory[item.id] || 0;
    const afford = state.balance >= BigInt(item.price);
    return `
    <div class="shop-card">
      <div class="shop-card-icon">${item.icon}</div>
      <div class="shop-card-name">${escapeHtml(item.name)}</div>
      <div class="shop-card-price">${formatMoney(item.price)}</div>
      <div class="shop-card-owned">Owned: ${owned}</div>
      <button class="buy-btn" data-buy="${item.id}" ${afford?'':'disabled'}>${afford?'BUY':'CAN\'T AFFORD'}</button>
    </div>`;
  }).join("");
}

function attachShopHandlers(appId){
  const grid = document.getElementById("shop-grid");
  if(grid){
    grid.addEventListener("click", e => {
      const btn = e.target.closest("[data-buy]");
      if(!btn) return;
      purchase(ITEM_BY_ID[btn.dataset.buy], 1);
      renderApp(appId);
    });
  }
  const search = document.getElementById("shop-search");
  if(search) search.addEventListener("input", e => { shopState.search = e.target.value; refreshGridOnly(appId); });
  const chips = document.getElementById("shop-chips");
  if(chips) chips.addEventListener("click", e => {
    const chip = e.target.closest("[data-cat]");
    if(!chip) return;
    shopState.category = chip.dataset.cat;
    renderApp(appId);
  });
  const sort = document.getElementById("shop-sort");
  if(sort) sort.addEventListener("change", e => { shopState.sort = e.target.value; refreshGridOnly(appId); });
}

function refreshGridOnly(appId){
  const grid = document.getElementById("shop-grid");
  if(!grid) return;
  const items = appId === "shopping" ? ITEMS : ITEMS.filter(i => i.category === categoryForApp(appId));
  grid.innerHTML = renderShopGrid(items);
}

function categoryForApp(appId){
  return { cars:"cars", realestate:"homes", jet:"aviation", islands:"islands" }[appId];
}

function renderCategoryApp(category, icon, headerTitle, unitLabel){
  const items = ITEMS.filter(i => i.category === category);
  const owned = countByCategory(state, category);
  const value = valueByCategory(state, category);
  const savedCat = shopState.category;
  shopState.category = category === shopState.category ? shopState.category : "all"; // keep search but reset category context implicitly via filter below
  return `
    <div class="card">
      <div class="section-label" style="margin-top:0;">${headerTitle}</div>
      <div class="stat-grid">
        <div class="stat-box"><div class="stat-box-label">${unitLabel}</div><div class="stat-box-value gold">${owned}</div></div>
        <div class="stat-box"><div class="stat-box-label">Total Value</div><div class="stat-box-value">${formatMoney(value)}</div></div>
      </div>
    </div>
    <div class="search-bar"><span>🔍</span><input id="shop-search" type="text" placeholder="Search ${unitLabel.toLowerCase()}…" value="${escapeHtml(shopState.search)}" /></div>
    <select class="sort-select" id="shop-sort">
      <option value="default">Sort: Featured</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="name-asc">Name: A → Z</option>
      <option value="most-owned">Most Purchased</option>
    </select>
    <div class="shop-grid" id="shop-grid">${renderShopGrid(items)}</div>
  `;
}

/* ============================== PURCHASE SYSTEM ============================== */
function purchase(item, qty){
  if(!item) return;
  const cost = BigInt(item.price) * BigInt(qty);
  if(state.balance < cost){
    showToast("🚫","Insufficient Funds", `You can't afford ${item.name} right now.`, "error");
    vibrate(60);
    return;
  }
  // roll over "today" if the date changed
  const tk = dayKey(new Date());
  if(state.todayKey !== tk){ state.todayKey = tk; state.todaySpending = 0n; }

  state.balance -= cost;
  state.totalSpent += cost;
  state.todaySpending += cost;
  state.inventory[item.id] = (state.inventory[item.id] || 0) + qty;
  state.transactions.unshift({ icon:item.icon, name:item.name, amount:"-"+formatMoney(cost).slice(1), ts:Date.now() });
  state.transactions = state.transactions.slice(0,80);

  addNewsForPurchase(item, cost);
  saveState();

  flashBalance("down");
  showToast(item.icon, "Purchase Complete", `${item.name} · -${formatMoney(cost)}`, "buy");
  vibrate([20,30,20]);

  checkAchievements();
  checkBrokeState();
  updateHomeBalanceIfVisible();
}

function grantFunds(amount, reason, icon){
  state.balance += amount;
  state.transactions.unshift({ icon:icon||"🎁", name:reason, amount:"+"+formatMoney(amount).slice(1), ts:Date.now() });
  state.transactions = state.transactions.slice(0,80);
  saveState();
  flashBalance("up");
  updateHomeBalanceIfVisible();
}

function flashBalance(direction){
  const el = document.getElementById("home-balance");
  el.classList.remove("flash-up","flash-down");
  void el.offsetWidth;
  el.classList.add(direction === "up" ? "flash-up" : "flash-down");
  setTimeout(() => el.classList.remove("flash-up","flash-down"), 700);
}

function updateHomeBalanceIfVisible(){
  document.getElementById("home-balance").textContent = formatMoney(state.balance);
  document.getElementById("home-balance-sub").textContent =
    state.balance <= 0n ? "Billionaire Bank · you are broke" : "Billionaire Bank · fictional funds";
  if(currentAppId === "bank") renderApp("bank");
  if(currentAppId === "wealth") renderApp("wealth");
}

/* ============================== NEWS ============================== */
function addNewsForPurchase(item, cost){
  const template = DYNAMIC_HEADLINE_TEMPLATES[Math.floor(Math.random()*DYNAMIC_HEADLINE_TEMPLATES.length)];
  const headline = template.replace("{item}", item.name).replace("{price}", formatMoney(cost));
  state.newsLog.unshift({ kicker:"BREAKING NEWS", headline, ts:Date.now() });
  state.newsLog = state.newsLog.slice(0,60);
}

function renderNews(){
  const dynamic = state.newsLog.map(n => `
    <div class="news-card">
      <div class="news-kicker">📰 ${n.kicker}</div>
      <div class="news-headline">${escapeHtml(n.headline)}</div>
      <div class="news-time">${timeAgo(n.ts)}</div>
    </div>`).join("");
  const staticCards = STATIC_HEADLINES.map((h,i) => `
    <div class="news-card">
      <div class="news-kicker">📰 ${["BREAKING","FLASH","BUSINESS","WORLD","TRENDING"][i%5]}</div>
      <div class="news-headline">${escapeHtml(h)}</div>
    </div>`).join("");
  return `<div class="section-label" style="margin-top:0;">TODAY'S HEADLINES</div>${dynamic || ""}<div class="section-label">EVERGREEN STORIES</div>${staticCards}`;
}

/* ============================== MESSAGES ============================== */
function renderMessagesInbox(){
  return THREADS.map(t => {
    const last = t.messages[t.messages.length-1];
    return `
    <div class="thread-row" data-thread="${t.id}">
      <div class="thread-avatar">${t.icon}</div>
      <div class="thread-main">
        <div class="thread-name">${t.name}</div>
        <div class="thread-preview">${escapeHtml(last.text)}</div>
      </div>
      <div class="thread-time">now</div>
    </div>`;
  }).join("");
}

function renderThread(id){
  const t = THREADS.find(x => x.id === id);
  if(!t) return "";
  return `
    <div class="section-label" style="margin-top:0;">${t.role}</div>
    <div class="chat-view">
      ${t.messages.map(m => `<div class="bubble ${m.from==='me'?'me':'them'}">${escapeHtml(m.text)}</div>`).join("")}
    </div>
  `;
}

function attachMessageHandlers(){
  const list = document.getElementById("app-body");
  list.querySelectorAll("[data-thread]").forEach(row => {
    row.addEventListener("click", () => {
      currentThreadId = row.dataset.thread;
      const t = THREADS.find(x => x.id === currentThreadId);
      document.getElementById("app-title").textContent = t.name;
      document.getElementById("app-back-label").textContent = "Messages";
      SFX.tap();
      renderApp("messages");
    });
  });
}

/* ============================== WEALTH DASHBOARD ============================== */
function renderWealth(){
  const remainingPct = STARTING_BALANCE > 0n ? Number(state.balance * 10000n / STARTING_BALANCE) / 100 : 0;
  const cars = countByCategory(state,"cars");
  const homes = countByCategory(state,"homes");
  const jets = countByCategory(state,"aviation");
  const islands = countByCategory(state,"islands");
  const items = totalItemsOwned(state);
  return `
    <div class="card">
      <div class="section-label" style="margin-top:0;">STARTING WEALTH</div>
      <div style="font-family:var(--font-display);font-size:22px;font-weight:600;">${formatMoney(STARTING_BALANCE)}</div>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-box-label">Current Balance</div><div class="stat-box-value gold">${formatMoney(state.balance)}</div></div>
      <div class="stat-box"><div class="stat-box-label">Total Spent</div><div class="stat-box-value danger">${formatMoney(state.totalSpent)}</div></div>
    </div>
    <div class="card" style="margin-top:12px;">
      <div class="stat-box-label">WEALTH REMAINING</div>
      <div class="progress-track"><div class="progress-fill mint" style="width:${Math.max(0,Math.min(100,remainingPct))}%"></div></div>
      <div style="font-size:11px;color:var(--text-low);margin-top:6px;">${remainingPct.toFixed(2)}%</div>
    </div>
    <div class="section-label">PORTFOLIO</div>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-box-label">Items Owned</div><div class="stat-box-value">${items}</div></div>
      <div class="stat-box"><div class="stat-box-label">Cars</div><div class="stat-box-value">${cars}</div></div>
      <div class="stat-box"><div class="stat-box-label">Properties</div><div class="stat-box-value">${homes}</div></div>
      <div class="stat-box"><div class="stat-box-label">Jets</div><div class="stat-box-value">${jets}</div></div>
      <div class="stat-box"><div class="stat-box-label">Islands</div><div class="stat-box-value">${islands}</div></div>
      <div class="stat-box"><div class="stat-box-label">Days as Billionaire</div><div class="stat-box-value">${Math.max(1, Math.ceil((Date.now()-state.startTime)/86400000))}</div></div>
    </div>
  `;
}

/* ============================== CHALLENGES / ACHIEVEMENTS ============================== */
function checkAchievements(){
  for(const a of ACHIEVEMENTS){
    if(!state.unlocked[a.id] && a.check(state)){
      state.unlocked[a.id] = true;
      saveState();
      showToast("🏆","Achievement Unlocked", a.title, "achievement");
      fireConfetti();
    }
  }
}

function renderChallenges(){
  return ACHIEVEMENTS.map(a => {
    const unlocked = !!state.unlocked[a.id];
    return `
    <div class="ach-row ${unlocked?'unlocked':''}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-main">
        <div class="ach-title">${a.title}</div>
        <div class="ach-desc">${a.desc}</div>
      </div>
      <div class="ach-check">✓</div>
    </div>`;
  }).join("");
}

/* ============================== SETTINGS ============================== */
function renderSettings(){
  const s = state.settings;
  return `
    <div class="section-label" style="margin-top:0;">PREFERENCES</div>
    <div class="card">
      <div class="setting-row"><div class="setting-label">🌙 Dark Mode</div><div class="toggle ${s.dark?'on':''}" data-setting="dark"><div class="toggle-knob"></div></div></div>
      <div class="setting-row"><div class="setting-label">🔊 Sound Effects</div><div class="toggle ${s.sound?'on':''}" data-setting="sound"><div class="toggle-knob"></div></div></div>
      <div class="setting-row"><div class="setting-label">📳 Vibration</div><div class="toggle ${s.vibration?'on':''}" data-setting="vibration"><div class="toggle-knob"></div></div></div>
      <div class="setting-row" style="border-bottom:none;"><div class="setting-label">🔔 Notifications</div><div class="toggle ${s.notifications?'on':''}" data-setting="notifications"><div class="toggle-knob"></div></div></div>
    </div>
    <div class="section-label">GAME</div>
    <button class="danger-btn" id="reset-game-btn">♻️ Reset Game</button>
    <div class="section-label">ABOUT</div>
    <div class="card" style="font-size:13px;color:var(--text-mid);line-height:1.6;">
      ℹ️ Billionaire Phone Simulator is a fictional entertainment experience. Version 1.0.
    </div>
    <div class="disclaimer-box">📜 This is a fictional entertainment simulator using virtual money. It is not a real bank, financial service, payment system, investment platform, or gambling application. No account, login, or personal data is required or collected, and no data ever leaves your device.</div>
  `;
}

function attachSettingsHandlers(){
  document.querySelectorAll("[data-setting]").forEach(el => {
    el.addEventListener("click", () => {
      const key = el.dataset.setting;
      state.settings[key] = !state.settings[key];
      saveState();
      if(key === "dark") applyTheme();
      SFX.tap();
      renderApp("settings");
    });
  });
  const resetBtn = document.getElementById("reset-game-btn");
  if(resetBtn) resetBtn.addEventListener("click", () => {
    if(confirm("Reset your billionaire fortune back to $100,000,000,000? This cannot be undone.")) resetGame();
  });
}

function applyTheme(){
  document.body.style.filter = state.settings.dark ? "" : "invert(1) hue-rotate(180deg)";
}

/* ============================== BROKE MODE ============================== */
const BROKE_QUIPS = [
  "You managed to spend one hundred billion imaginary dollars. Your accountant has resigned.",
  "The garage is full, the islands are empty, and so is the account. Legendary spending.",
  "Somewhere, a fictional accountant is staring at a wall.",
  "You are, once again, exactly as rich as everybody else. Humbling.",
];
function checkBrokeState(){
  if(state.balance <= 0n){
    const screen = document.getElementById("broke-screen");
    document.getElementById("broke-stats").innerHTML = `
      <div class="broke-stat"><span>Starting Wealth</span><b>${formatMoney(STARTING_BALANCE)}</b></div>
      <div class="broke-stat"><span>Total Spent</span><b>${formatMoney(state.totalSpent)}</b></div>
      <div class="broke-stat"><span>Items Purchased</span><b>${totalItemsOwned(state)}</b></div>
      <div class="broke-stat"><span>Time Survived</span><b>${Math.max(1,Math.ceil((Date.now()-state.startTime)/60000))} min</b></div>
    `;
    document.getElementById("broke-quip").textContent = BROKE_QUIPS[Math.floor(Math.random()*BROKE_QUIPS.length)];
    screen.classList.remove("hidden");
    requestAnimationFrame(() => screen.classList.add("open"));
    showToast("🚨","YOU ARE BROKE","Sir, we need to talk.", "error");
  }
}

function shareResult(){
  const cars = countByCategory(state,"cars");
  const homes = countByCategory(state,"homes");
  const jets = countByCategory(state,"aviation");
  const islands = countByCategory(state,"islands");
  const remainingPct = Number(state.balance * 10000n / STARTING_BALANCE) / 100;
  const text =
`💰 BILLIONAIRE PHONE SIMULATOR

Starting Money: ${formatMoney(STARTING_BALANCE)}
Spent: ${formatMoney(state.totalSpent)}
Remaining: ${formatMoney(state.balance)}

Cars: ${cars}
Properties: ${homes}
Private Jets: ${jets}
Islands: ${islands}

Status: ${state.balance <= 0n ? "BROKE 💀" : remainingPct < 25 ? "BARELY HANGING ON 😅" : "STILL RICH 😂"}`;

  if(navigator.share){
    navigator.share({ title:"Billionaire Phone Simulator", text }).catch(()=>{});
  } else if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(() => showToast("📋","Copied", "Result copied to clipboard.", "notify"));
  } else {
    alert(text);
  }
}

/* ============================== RANDOM EVENTS ============================== */
function maybeTriggerRandomEvent(){
  if(!state || state.balance <= 0n) return;
  if(Math.random() > 0.35) return; // not every tick
  const ev = RANDOM_EVENTS[Math.floor(Math.random()*RANDOM_EVENTS.length)];
  if(ev.delta < 0n){
    const cost = -ev.delta;
    if(state.balance < cost) return;
    state.balance -= cost; state.totalSpent += cost;
    state.transactions.unshift({ icon:ev.icon, name:ev.text, amount:"-"+formatMoney(cost).slice(1), ts:Date.now() });
  } else {
    state.balance += ev.delta;
    state.transactions.unshift({ icon:ev.icon, name:ev.text, amount:"+"+formatMoney(ev.delta).slice(1), ts:Date.now() });
  }
  state.transactions = state.transactions.slice(0,80);
  saveState();
  showToast(ev.icon, "Life of a Billionaire", ev.text, "notify");
  updateHomeBalanceIfVisible();
  checkBrokeState();
}

/* ============================== BOOT ============================== */
function boot(){
  state = loadState();
  applyTheme();

  document.getElementById("balance-widget").addEventListener("click", () => openApp("bank"));
  document.getElementById("app-back").addEventListener("click", handleBack);
  document.getElementById("home-indicator-btn").addEventListener("click", () => { if(currentAppId) closeApp(false); });
  document.getElementById("broke-restart").addEventListener("click", resetGame);
  document.getElementById("broke-share").addEventListener("click", shareResult);

  renderHome();
  if(state.balance <= 0n) checkBrokeState();

  clockTimer = setInterval(renderClockAndDate, 15000);
  randomEventTimer = setInterval(maybeTriggerRandomEvent, 60000);

  // unlock audio context on first user gesture (mobile browser requirement)
  document.body.addEventListener("touchend", () => ensureAudio(), { once:true });
  document.body.addEventListener("click", () => ensureAudio(), { once:true });
}

document.addEventListener("DOMContentLoaded", boot);
