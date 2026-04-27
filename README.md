# Calgary Barbell 16-Week Training Log

A mobile-friendly React app for tracking the Calgary Barbell 16-week powerlifting program.

## Features

- Full 16-week Calgary Barbell program pre-loaded (all 4 days/week)
- Training maxes → auto-calculates target weights for every % -based set
- Per-exercise weight logging with on-target feedback
- Perceived RPE selector (5–10 in 0.5 increments) per lift
- Rest timer that auto-starts on set completion
- Notes field per exercise
- Day & week completion tracking with visual checkmarks
- RPE calculator (estimate 1RM or find weight for target RPE)
- All data persisted to localStorage

## Getting Started

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
```

The `build/` folder can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`
