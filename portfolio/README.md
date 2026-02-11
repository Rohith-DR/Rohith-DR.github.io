# Rohith DR — Portfolio Website

Personal portfolio and resume site built with HTML/CSS/JS, deployed on GitHub Pages with a custom Hostinger domain.

---

## 🚀 Quick Start (Local Development)

1. Clone or open the `portfolio/` folder in VS Code.
2. Install the **Live Server** extension (or any local HTTP server).
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500`.

---

## 📦 Deploy to GitHub Pages

### Step 1 — Create Repository
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/Rohith-DR/Rohith-DR.github.io.git
git push -u origin main
```

> **Tip**: Name the repo `Rohith-DR.github.io` for a user site (served at `https://rohith-dr.github.io`), or any other name for a project site.

### Step 2 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**.
2. Under **Source**, select `main` branch, `/root` folder.
3. Click **Save**.
4. Wait 1–2 minutes, then visit `https://rohith-dr.github.io`.

### Step 3 — Add Custom Domain
1. In **Settings → Pages → Custom domain**, type your Hostinger domain (e.g., `rohithdr.com`).
2. Click **Save**. GitHub will create/update the `CNAME` file automatically.
3. Check **Enforce HTTPS** once the certificate is provisioned (usually 15–30 min).

---

## 🌐 Hostinger DNS Configuration

Log in to [Hostinger](https://www.hostinger.com) → **Domains** → Select your domain → **DNS / Nameservers**.

### A Records (point root domain to GitHub Pages)
| Type | Name | Value |
|------|------|-------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

### CNAME Record (point www to GitHub)
| Type | Name | Value |
|------|------|-------|
| CNAME | www | `rohith-dr.github.io` |

### Verification

1. **Propagation**: DNS changes can take up to **48 hours**. Usually 15–60 min.
2. **Check propagation**: Visit [dnschecker.org](https://dnschecker.org) and search your domain.
3. **HTTPS**: Once DNS propagates, go back to GitHub Pages settings and check **Enforce HTTPS**.
4. **Test**: Visit `https://yourdomain.com` and `https://www.yourdomain.com`.

---

## 📝 Resume Files

Place your PDF resumes in the `resume/` folder:
- `Rohith_DR_Electronics_Resume.pdf` — Electronics & Embedded variant
- `Rohith_DR_VLSI_Resume.pdf` — VLSI & Design variant

---

## 🔧 Customization

| What | Where |
|------|-------|
| Personal info, content | `index.html` |
| Colors, fonts, spacing | `styles.css` (CSS custom properties at top) |
| Theme toggle, animations | `script.js` |
| Custom domain | `CNAME` file |

### Upgrade Paths
- **Google Analytics**: Add GA4 `<script>` tag to `<head>` in `index.html`
- **SEO Sitemap**: Create `sitemap.xml` in root
- **Animations Library**: Add [AOS](https://michalsnik.github.io/aos/) or [GSAP](https://greensock.com/gsap/)
- **Blog**: Add a `/blog` folder with markdown-based posts
- **CI/CD**: Use GitHub Actions for automated builds

---

## 📄 License

© 2025 Rohith DR. All rights reserved.
