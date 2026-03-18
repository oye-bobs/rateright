# RateRight 💸
### Freelancer Rate Calculator — by Remote Hustle

A clean, interactive React app that helps freelancers calculate their ideal hourly rate, project quotes, and target income goals.

🔗 **Live URL:** https://rateright.vercel.app/

---

## Features

- **Hourly Rate Calculator** — calculates your minimum and ideal rate based on expenses, tax, skill level and profit margin
- **Project Rate Calculator** — builds a full project quote with complexity buffers and revision rounds
- **Target Income Calculator** — works backwards from your annual income goal to find the rate you need to charge
- **Multi-currency support** — USD, GBP, EUR, NGN
- **Live calculations** — all results update in real time

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React.js (Create React App) |
| Styling | CSS3 (DM Sans + DM Mono fonts) |
| Hosting | Vercel (free tier) |
| Version Control | GitHub |
| Deployment | Git push → Vercel auto-deploy |

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/oye-bobs/rateright.git

# Navigate into the project
cd rateright

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Deployment

This app auto-deploys to Vercel on every push to the `main` branch.
```bash
# Make your changes, then:
git add .
git commit -m "your message"
git push
```

Vercel detects the push and redeploys automatically in ~30 seconds.

---

## Project Structure
```
rateright/
├── public/
├── src/
│   ├── components/
│   │   ├── Calculator.jsx    # Main calculator shell + tab navigation
│   │   ├── HourlyTab.jsx     # Hourly rate calculator
│   │   ├── ProjectTab.jsx    # Project rate calculator
│   │   └── IncomeTab.jsx     # Target income calculator
│   ├── styles/
│   │   ├── App.css           # Global styles + background
│   │   └── Calculator.css    # Component styles
│   ├── App.js
│   └── index.js
└── README.md
```

---

## License

Built for Remote Hustle — Stage 2 DevOps & Infrastructure Practical Setup.