# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Push your code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/bidit.git
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Set branch to **main** and folder to **/(root)**
5. Click **Save**

### 3. Configure GitHub Actions
The workflow file is already set up at `.github/workflows/deploy.yml`. It will:
- Run automatically on every push to `main` or `master`
- Build the React client with Vite
- Deploy the built files to GitHub Pages

### 4. Access your site
Your site will be available at:
- `https://YOUR_USERNAME.github.io/bidit/` (if repo is named "bidit")
- Or use your own custom domain (see Custom Domain section below)

---

## Configuration Options

### Environment Variables
You can set environment variables in GitHub Actions by adding them to the workflow file:
- `VITE_BASE_URL`: Base path for the app (default: `/birthday/`)

To change the base path, update the workflow or set it in vite.config.ts:
```typescript
base: process.env.VITE_BASE_URL || '/birthday/',
```

---

## Using a Custom Domain

### 1. Register/Configure Domain
- Register a domain with a registrar (Namecheap, GoDaddy, etc.)
- Or use a subdomain if you have a domain already

### 2. Add DNS Records
Point your domain to GitHub Pages:

**For subdomain (e.g., app.yourdomain.com):**
- Type: CNAME
- Value: `YOUR_USERNAME.github.io`

**For root domain (e.g., yourdomain.com):**
- Type: A
- Values:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

### 3. Configure in GitHub
1. Go to Settings → Pages
2. Under "Custom domain", enter your domain name
3. Click **Save**
4. Check "Enforce HTTPS" once DNS is verified

---

## Static Site Limitations

⚠️ **Important**: GitHub Pages hosts static sites only. This app currently uses:
- ❌ Express server
- ❌ Database (PostgreSQL)
- ❌ WebSockets
- ❌ Server-side authentication

**Solutions:**
1. **Backend as a Service**: Use services like:
   - Firebase (auth, database, hosting)
   - Supabase (PostgreSQL with auto-API)
   - AWS Amplify (full-stack hosting)
   - Vercel (full-stack with serverless)

2. **Keep GitHub Pages for frontend only**:
   - Deploy the React app to GitHub Pages
   - Deploy backend separately (Heroku, Railway, etc.)

---

## Troubleshooting

### Site not showing up
- Wait 2-3 minutes after first push
- Check the "Actions" tab to see if workflow completed
- Verify branch is set to `main` in Pages settings

### CSS/JS not loading
- Check the base path in vite.config.ts matches your repo name
- Look at browser console for 404 errors

### Assets returning 404
- Ensure asset paths use the base URL correctly
- Use `import` for assets instead of hardcoded paths

---

## Making it Truly Global

### 1. Performance
- GitHub Pages uses CDN (fast worldwide)
- Add a service worker for offline access:
```bash
npm install workbox-window workbox-precaching
```

### 2. SEO
- Update `client/index.html` with:
  - Meta tags
  - OpenGraph tags for social sharing
  - Sitemap (optional)

### 3. Analytics
- Add Google Analytics/Vercel Analytics
- Track deployment metrics

### 4. Scalability
For higher traffic, consider:
- Cloudflare (free CDN, caching, security)
- Vercel (alternative to GitHub Pages)
- Netlify (alternative with serverless functions)

---

## Next Steps

1. Push code: `git push origin main`
2. Check GitHub Actions: Watch the workflow run
3. Visit your GitHub Pages URL
4. Set up custom domain (optional)
5. Monitor with analytics
