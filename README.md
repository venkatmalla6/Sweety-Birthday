# For Sweety Thalli ♥ — Birthday Website

A cinematic, dark-romantic birthday experience built with React, TypeScript, Vite, Framer Motion, and CSS. Designed for 27 December 2026. Its emotional direction is a sincere birthday wish: love and care without trying to persuade, ask for reconciliation, or expect a response.

## 1. Requirements
- Node.js 20.19+ or 22.12+
- npm

## 2. Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## 3. Personalize before sharing

### Add your photographs
Copy your own images into `public/photos/` using these exact names:
- `memory-1.jpg`
- `memory-2.jpg`
- `memory-3.jpg`
- `memory-4.jpg`

You can use `.png` or `.webp` too, but update the corresponding `src` paths in `src/App.tsx`.

Edit the `memories` array near the top of `src/App.tsx` to change the captions, dates, and notes.

### Add romantic instrumental music
Add an audio file named `romantic-instrumental.mp3` to `public/audio/`.
The browser will only play it after the visitor taps a music control. This is intentional because browsers commonly block autoplay. Use music you have permission to use.

### Personalize the message and memories
The letter already includes the message you requested: you are not trying to convince her; you still love and care for her; and she can reach out if she needs someone to listen or help, without pressure or expectations.

In `src/App.tsx`, you can still edit:
- The `memories` array for your own photographs, dates, and captions.
- The `story` array for moments you feel comfortable remembering.
- The `reasons` array for qualities you appreciate about her.
- The gift reveal and final birthday wish.

### Change the secret word
Find `SECRET_ANSWER` near the top of `src/App.tsx`. It currently uses `thalli`. Change it to a private word meaningful to both of you.

**Privacy note:** This is a front-end-only surprise lock, not real security. Anyone inspecting the website source can discover the answer. Do not put private or sensitive information behind it.

## 4. Build and verify
```bash
npm run build
npm run preview
```
The production output is written to `dist/`.

## 5. Deploy to Vercel
### Git-based deployment
1. Create a GitHub repository and push this project.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the repository.
4. Vercel should detect Vite. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy.

### CLI deployment
```bash
npm install -g vercel
vercel
vercel --prod
```

The included `vercel.json` adds an SPA rewrite so direct routes resolve to `index.html`.

## Project structure
```text
sweety-thalli-birthday/
├── public/
│   ├── audio/
│   └── photos/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── tsconfig*.json
├── vite.config.ts
├── vercel.json
└── README.md
```

## Notes
- No database or API keys are required.
- The countdown uses the visitor's browser local time.
- Music requires a user gesture.
- Photo placeholders are intentional until you add personal photos.
- The secret unlock is playful, not an authentication system.
