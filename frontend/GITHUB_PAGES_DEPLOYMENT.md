# GOSEC - GitHub Pages Deployment Guide

## Quick Start

### 1. Build for GitHub Pages
```bash
cd frontend
yarn build:gh-pages
```

### 2. Deploy to GitHub Pages
```bash
yarn deploy
```

This will automatically:
- Build the app with HashRouter enabled
- Push the `build` folder to the `gh-pages` branch

---

## Manual Deployment Steps

### Step 1: Update package.json homepage
Edit `frontend/package.json` and set the `homepage` field:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
}
```

For example:
- `"homepage": "https://gosec-org.github.io/gosec-website"`

### Step 2: Create Production Environment File
Create `frontend/.env.production`:

```env
REACT_APP_USE_HASH_ROUTER=true
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Step 3: Build and Deploy
```bash
cd frontend
yarn build:gh-pages
yarn deploy
```

---

## URL Structure

### With HashRouter (GitHub Pages)
URLs will look like:
- Home: `https://yoursite.github.io/#/`
- About: `https://yoursite.github.io/#/about`
- Programs: `https://yoursite.github.io/#/programs`
- Admin: `https://yoursite.github.io/#/admin`

### With BrowserRouter (Regular hosting)
URLs will look like:
- Home: `https://yoursite.com/`
- About: `https://yoursite.com/about`
- Programs: `https://yoursite.com/programs`
- Admin: `https://yoursite.com/admin`

---

## Important Notes

### Static vs Dynamic Content

**GitHub Pages is static hosting only.** This means:

✅ **Works on GitHub Pages:**
- All public pages (Home, About, Programs, Gallery, Events, FAQs, Contact page display)
- Navigation between pages
- Language toggle (EN/FR)
- Responsive design

❌ **Requires Backend Hosting:**
- Admin panel functionality
- Form submissions (Contact, Join, Donate)
- Dynamic content from database
- Image uploads

### Backend Hosting Options

If you need full functionality, host the backend on:
- **Render** (free tier available): https://render.com
- **Railway**: https://railway.app
- **Heroku**: https://heroku.com
- **DigitalOcean**: https://digitalocean.com
- **AWS/GCP/Azure**: Cloud providers

Then update `REACT_APP_BACKEND_URL` to point to your hosted backend.

---

## GitHub Repository Setup

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

4. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## Custom Domain (Optional)

1. In repository Settings > Pages > Custom domain
2. Add your domain (e.g., `www.gosec.ca`)
3. Create a `CNAME` file in `frontend/public/`:
```
www.gosec.ca
```
4. Update DNS records at your domain registrar

---

## Troubleshooting

### Blank page after deployment
- Check that `homepage` in package.json is correct
- Ensure you used `yarn build:gh-pages` (not regular `yarn build`)
- Check browser console for errors

### 404 on page refresh
- This is expected with HashRouter - the `#` in URLs prevents this
- If using BrowserRouter, you need a custom 404.html redirect

### API calls not working
- Update `REACT_APP_BACKEND_URL` to your hosted backend URL
- Check CORS settings on your backend
- Verify the backend is running and accessible

---

## File Structure After Build

```
build/
├── index.html          # Main HTML file
├── static/
│   ├── css/           # Compiled CSS
│   ├── js/            # Compiled JavaScript
│   └── media/         # Images and fonts
├── favicon.ico
└── manifest.json
```

The `build/` folder contents are what gets deployed to GitHub Pages.
