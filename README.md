# Yuxia Yu — Personal Portfolio

A bilingual, responsive interactive portfolio built from `Yuxia_Yu_简历.pdf`. The opening screen uses a circular 0–100% loading sequence and ENTER transition. The main screen is a full-viewport editorial portfolio stage with four switchable 3D data-project panels. A textured teal Profile scene combines the portrait, concise background, contact details and education inside a floating vertical card; internship experience, detailed capabilities and contact remain distinct scenes.

## Preview locally

Open `index.html` directly, or run a small static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a GitHub repository and upload all files in this folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. GitHub will provide the public website URL after deployment.

## Before publishing

- Replace the WeChat `TODO` in `index.html` with the correct WeChat ID.
- Add selected photography images and replace the photography placeholder.
- Confirm whether the Chinese PDF résumé should remain the download file for international applications; an English PDF can replace it without changing the code if the filename remains the same.
- Review whether you want your phone number publicly visible.

## Files

- `index.html` — semantic page structure and résumé content
- `style.css` — responsive layout, visual system and animation
- `script.js` — loading/enter transition, synthesized ambient sound, bilingual content, 3D project carousel, auto-rotate and parallax
- `Yuxia_Yu_简历.pdf` — downloadable résumé
- `证件照2.jpg` — portrait image

No build step, dependencies, analytics or external font requests are used. Motion is reduced automatically when the visitor enables the operating system's reduced-motion preference.
