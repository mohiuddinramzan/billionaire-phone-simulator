# 📱 Billionaire Phone Simulator

A fictional, entertainment-only smartphone simulator. You start with a virtual
**$100,000,000,000** and can spend it on hypercars, mansions, private jets,
super yachts, and private islands — all fake, all for fun.

> ⚠️ **This is not a real financial product.** There is no real money, no
> banking, no payments, no investing, no cryptocurrency, and no gambling
> anywhere in this app. All balances are fictional numbers stored only in
> your browser.

---

## ✨ Features

- 💰 Starts you off with a virtual $100,000,000,000 balance (BigInt-based math — no floating-point rounding errors)
- 🏦 **Bank** app with balance, total spent, today's spending, and transaction history
- 🛍️ **Shopping** marketplace with 10 categories, live search, category filters, and 4 sort modes
- 🚗 **Cars**, 🏠 **Real Estate**, ✈️ **Private Jet**, and 🏝️ **Islands** apps with dedicated inventories and portfolio values
- 📰 **Billionaire News** — 50+ static funny headlines plus dynamically generated headlines based on your purchases
- 💬 **Messages** — funny scripted conversations with your Accountant, Assistant, Pilot, Island Manager, Garage Manager, and a Reporter
- 📊 **Wealth** dashboard with progress bars and portfolio breakdown
- 🎯 **Challenges** — 10 unlockable achievements, saved locally
- 🎲 Random billionaire events (birthday parties, jet maintenance, surprise gifts…)
- 💀 **Broke Mode** when your balance hits $0, with a shareable result card
- 🌙 Dark premium glassmorphism UI, gold accents, smooth animations, confetti, and lightweight WebAudio sound effects (no external audio files)
- 📴 Fully offline — no backend, no API, no account, no tracking, no analytics
- 📱 Mobile-first responsive design (360px–768px+ and desktop)

---

## 🛠️ Technologies

- HTML5, CSS3, vanilla JavaScript (no frameworks, no build step)
- `localStorage` for persistence
- `BigInt` for all money math
- WebAudio API for sound effects
- Optional: [Apache Cordova](https://cordova.apache.org/) (only used in CI to produce an Android APK)

---

## ▶️ Run locally

No build step is required — it's a static site.

```bash
git clone https://github.com/<your-username>/billionaire-phone-simulator.git
cd billionaire-phone-simulator
# any static file server works, for example:
python3 -m http.server 8000
# then open http://localhost:8000
```

You can also just double-click `index.html` in most browsers, though a local
server is recommended so `localStorage` behaves consistently.

---

## 🌐 Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then **Save**.
5. Wait a minute, then visit `https://<your-username>.github.io/<repo-name>/`.

---

## 📦 Build an Android APK (free, no paid services)

This repo includes `.github/workflows/build-apk.yml`, a GitHub Actions
workflow that wraps the site with [Apache Cordova](https://cordova.apache.org/)
(a free, open-source WebView wrapper) and produces a debug APK.

1. Push the repository to GitHub.
2. Open the **Actions** tab.
3. Select **Build Android APK** in the left sidebar.
4. Click **Run workflow** (or push a change to `index.html`, `style.css`,
   `script.js`, or `assets/`, which triggers it automatically).
5. When the run finishes, open it and download the
   **billionaire-phone-simulator-debug-apk** artifact.
6. Unzip the artifact and install the `.apk` on an Android device
   (you'll need to allow "install from unknown sources" since it's an
   unsigned debug build).

No API keys, secrets, or paid services are required.

---

## 🎛️ Customize

### Change the starting balance
Edit the constant near the top of `script.js`:

```js
const STARTING_BALANCE = 100000000000n; // $100,000,000,000
```

Keep the trailing `n` — it must stay a `BigInt` literal.

### Add or edit products
All purchasable items live in the `ITEMS` array in `script.js`. Each item
looks like:

```js
{ id:"c_hyper", icon:"🏎️", name:"Hypercar", price:"5000000", category:"cars" }
```

- `id` must be unique.
- `price` is a string of digits (converted to `BigInt` internally — no decimals).
- `category` must match one of the keys in `CATEGORY_META`.

### Add news headlines or messages
- Static headlines: `STATIC_HEADLINES` array in `script.js`.
- Dynamic post-purchase headline templates: `DYNAMIC_HEADLINE_TEMPLATES`.
- Message conversations: `THREADS` array.

### Add achievements
Add an entry to the `ACHIEVEMENTS` array with an `id`, `title`, `desc`, and a
`check(state)` function that returns `true`/`false`.

---

## 💾 How localStorage works

The entire game state (balance, inventory, transactions, achievements,
settings, news log) is serialized to JSON and saved under a single key,
`billionairePhoneSimulator.v1`, in the browser's `localStorage`. `BigInt`
values are converted to strings before saving and parsed back into `BigInt`
on load, since `JSON` cannot represent `BigInt` natively. Nothing is ever
sent to a server — closing or reopening the app (or the generated APK)
restores exactly where you left off. Use **Settings → Reset Game** to clear
your saved progress and start over from $100,000,000,000.

---

## 🧩 Project structure

```
billionaire-phone-simulator/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
├── assets/
│   ├── icons/
│   └── images/
└── .github/
    └── workflows/
        └── build-apk.yml
```

---

## 📜 Disclaimer

This is a fictional entertainment simulator using virtual money. It is **not**
a real bank, financial service, payment system, investment platform, or
gambling application. "Billionaire Bank" is a fictional name used only for
flavor and does not represent any real institution. The app requires no
account or login, collects no personal information, and uses no analytics
or tracking — all game data stays on your device in `localStorage`.

---

## 📄 License

MIT — see [LICENSE](LICENSE).
