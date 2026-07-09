# The Conductor Barbershop — website guide

A fast, static website. No WordPress, no plugins, no logins to maintain. Just plain files
you can host almost anywhere for free and edit by asking Claude in plain English.

---

## What's in this folder

```
conductor-site/
├── index.html          ← Home
├── services.html       ← Services & pricing
├── about.html          ← About / the team
├── gallery.html        ← Gallery & merch
├── locations.html      ← Locations & booking
├── 404.html            ← "page not found"
├── assets/
│   ├── styles.css       ← all the styling (colours, spacing, fonts)
│   ├── script.js        ← menu, booking pop-up, booking links
│   └── images/          ← all photos (currently placeholders)
├── netlify.toml         ← hosting settings
├── robots.txt
└── README-EDITING.md    ← this file
```

---

## Editing with Claude (the easy way)

Open this folder in Claude (Cowork), then just describe the change. Claude edits the file(s)
for you. Some examples you can copy:

- **Text:** "On the home page, change the headline to '…'."
- **Prices:** "On the services page, change the Fade price to $65."
- **Hours:** "Set Highett's hours to Mon–Fri 9–6, Sat 9–5, Sun closed — on the home and locations pages."
- **Add a service:** "Add 'Buzz Cut, 15 min, $30' under Cuts on the services page."
- **Reorder sections:** "On the home page, move the reviews section above the pricing section."
- **Swap an image:** see below.
- **Change a phone number:** "Update the Carnegie phone number to (03) 1234 5678 everywhere it appears."

> Tip: the header and footer are repeated on every page (that's normal for a static site).
> If you change a nav link or phone number, say "on every page" so Claude updates all five.

---

## Swapping in real photos

1. Put your photo into `assets/images/` (e.g. `hero.jpg`). JPG or WebP is best for photos.
2. Tell Claude: **"Use `hero.jpg` for the hero image on the home page"** — it updates the page
   (and the alt text for SEO).

The image slots and their current placeholder files:

| Slot | File | Used on |
|---|---|---|
| Hero (shop sign) | `hero.svg` | Home |
| Barber at work | `barber-at-work.svg` | Home, Services, Gallery |
| Shop interior | `interior.svg` | Home, About, Gallery |
| Shopfront | `shopfront.svg` | Home, About, Gallery |
| Merch tee | `merch.svg` | Gallery |
| Founder / barbers | `barber-matt.svg`, `barber-1..3.svg` | About |
| Cuts / feed | `gallery-01.svg … gallery-09.svg` | Home, Services, About, Gallery |

You can keep the same filenames (just add `.jpg` versions and ask Claude to point at them),
or use any names you like and tell Claude which slot they belong to.

---

## Changing the booking links

All three Fresha links live in ONE place: the top of `assets/script.js`, in the `BOOKING` list.
Ask Claude "update the Highett Fresha link to …" and it changes there — every "Book" button,
the pop-up, and the footer all use it.

---

## Changing brand colours

Open `assets/styles.css` — the colours are at the very top under `:root` (e.g. `--navy`).
Change one value and it updates across the whole site.

---

## Publishing the site (deploy)

The simplest path — **Netlify drag-and-drop** (free):

1. Go to **app.netlify.com/drop**
2. Drag this whole `conductor-site` folder onto the page.
3. It's live in ~20 seconds on a temporary URL. Add the real domain under
   **Site settings → Domain management**.

To publish future edits, drag the folder on again (or set up Git — below).

### Best setup for ongoing edits (recommended)

1. Put this folder in a **GitHub repo**.
2. In Netlify, **"Add new site → Import from Git"** and pick the repo. No build command;
   publish directory `.`.
3. From now on: edit with Claude → Claude commits & pushes → Netlify auto-publishes in ~30s.

This is what lets the client edit from *their* Claude: connect this folder, ask for a change,
and it goes live automatically. **Cloudflare Pages** works the same way if you prefer it.

---

## Before you go live — content to confirm with the client

These are placeholders in the build, flagged so nothing ships as a guess:

- **Opening hours** — every shop currently says "hours TBC".
- **Real reviews** — the two testimonials on the home page are placeholders.
- **Barber names, photos & bios** — only Matt (founder) is real; the other three are blanks.
- **Photos** — all images are placeholders (see the swap guide above).
- **"#1 rated" and "Est. Carnegie" (year)** — confirm both claims.
- **Facebook link** — footer social link is a placeholder (`#`).
- **Domain** — update `robots.txt` (and add a sitemap) once the real domain is set.

---

*Built as a static site so it's fast, cheap to host, secure (nothing to hack or update),
and editable in plain English through Claude.*
