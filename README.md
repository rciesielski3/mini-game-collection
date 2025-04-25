# 🎮 Mini Game Collection

A fun, modular React + TypeScript app featuring a growing collection of mini-games — each styled with personality and built using modern best practices.

---

## 🚀 Live Demo

👉 [**https://mini-game-collection.vercel.app/**](https://mini-game-collection.vercel.app/)

---

## 🧠 Features

- 🧩 Multiple interactive games
- 🗂️ Expandable dashboard with:
  - 🎯 Daily Challenge
  - 👤 User Profile Stats (last played, top games)
- 🏆 Score tracking & Firebase integration
- 📱 Responsive layout and polished UI
- 💾 Future-ready for: leaderboard, high scores, authentication

---

## 🕹️ Games Included

- 🐍 Snake – Classic logic game with a twist
- 🦖 Dino Jump – Side-scrolling obstacle jumper
- ❌🔵 Tic-Tac-Toe – Timeless two-player strategy
- 🔨 Whack a Mole – Test your speed with random targets
- ⚡ Reaction Time – Measure your click reflex
- ⏱️ Reaction Sequence – Memory-based repeat game
- 🎨 Color Match – Match the correct color under time
- 🧠 Memory Game – Flip cards and find matching pairs
- 🏎️ Racing Game – Dodge obstacles in fast lanes
- 🧮 Math Quickfire – Solve equations quickly

---

## 📁 Project Structure

```
src/
├── App.tsx                # Main wrapper
├── index.tsx              # App entry point
├── firebase.ts            # Firebase config & analytics
├── global.css             # Base global styles
├── utils/
│   └── firestore.ts       # Firebase Firestore functions
├── components/            # Shared UI components
│   ├── DailyChallenge/
│   ├── DashboardNavigator/
│   ├── UserProfileStats/
│   ├── GameCard/
│   ├── GameModal/
│   └── Footer/
├── games/                 # Game logic & views
│   ├── Snake/
│   ├── Squares/
│   ├── Memory/
│   └── ...
```

---

## 🛠️ Run Locally

```bash
git clone https://github.com/rciesielski3/mini-game-collection
cd react-games
npm install
npm start
```

Runs locally at: [http://localhost:3000](http://localhost:3000)

> Requires Node.js and NPM

---

## 🔐 Firebase Setup

Create a `.env` file in the root directory with the following:

```env
REACT_APP_FIREBASE_API_KEY=yourKey
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_MEASUREMENT_ID=...
```

---

## 📦 Deploy

App is deployed via **Vercel** with continuous integration from `main`.

---

## 🧑‍💻 Author

Built with 💡 by [**Rafał Ciesielski**](https://github.com/rciesielski3)

- [🌐 Portfolio](https://rciesielski3.github.io/portfolio/)
- [🐙 GitHub](https://github.com/rciesielski3)
- [🔗 LinkedIn](https://www.linkedin.com/in/rafa%C5%82-ciesielski-820309100/)

---

## 📄 License

MIT License  
Please credit if you reuse it in your own work 🙌

[☕ buy coffee](https://buycoffee.to/adateo)
