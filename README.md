# BAUM

One page site for BAUM (DJ / Producer, San Francisco & Tucson). Plain HTML and CSS, no build step.

- `index.html` holds all the text, live sets, press links, and the booking emails
- `styles.css` holds the look (layout matches jaxkemper.com, colors pulled from his photos)
- `images/` holds the photos and logo, all taken from the BAUM EPK

## Where it's live

- Base44: https://baummusic.base44.app (app "BAUM" in Jax's Base44 account)
- GitHub Pages: https://jaxkemper.github.io/dj-website/ (updates about a minute after a push to `main`)

## Publishing a change

1. Edit the files and push to `main` (this updates GitHub Pages).
2. Redeploy to Base44 from the repo root:

```bash
BASE44_APP_ID=6ad0296161c4a86200cd142c npx base44 site deploy --build -y
```

The Base44 "build" just copies the site files into `dist/` (see `base44/config.jsonc`).
