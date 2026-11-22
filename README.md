# Stories Woven in Beads

A mini-app for the [Cloudinary Creators November Mini-Hack 2026](https://cloudinarycreators.com/hackathons/november-mini-hack-2026). A full-screen Maasai portrait collage opens an experience of beadwork, a spear-at-the-entrance story, song, celebration, a contributor-supplied photo gallery, a five-frame shuka colour story, and downloadable cards. The Festival section includes a four-photo beadwork story about materials, identity, and colour, plus an optional AI virtual try-on.

## Run locally

From this folder, set your Cloudinary API credentials as server environment variables and run:

```powershell
$env:CLOUDINARY_API_KEY = "<your API key>"
$env:CLOUDINARY_API_SECRET = "<your API secret>"
node server.cjs
```

Open `http://127.0.0.1:4173`. The site has no build step. A static host can show the story, festival card, video, and try-on sample, but the live AI try-on requires `server.cjs` on a Node host. On a remote host, set `HOST=0.0.0.0`, configure `PORT` as needed, and set the two secret environment variables there. Never place the API secret in `config.js`, the browser, or the zip.

## Public demo

The root `api/` directory provides Vercel Functions for the optional try-on. For a live demo on Vercel, set `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` as **server-side production environment variables**, then deploy this folder. The static story and Festival in a Box work independently of the try-on server. The generation endpoint has a small per-instance request limit; for a long-running public service, use durable rate limiting and an upload retention policy.

## Hackathon overview

**Problem:** Many visitors first encounter Maasai culture as a single image or performance, without the stories behind beadwork, cloth, language, and celebration.

**Solution:** An interactive, source-linked cultural journey through photographs, short videos, a Maa greeting, a personalized festival card and video, and an optional AI shuka and beadwork visualization. The visualizer is an invitation to learn from the real stories, not a claim that it reproduces a specific maker's work.

**Cloudinary integration:** Media Library assets, responsive image transformations with automatic format and quality, smart crops, text overlays for shareable cards, browser uploads, video delivery and transformations, and image-to-image generation through a server-side endpoint.

## Cloudinary setup

The site is connected to cloud `do52esnhp`. Four credited Wikimedia Commons photos, the contributor-supplied landing collage, spear photo, four beadwork photos, five shuka story frames, and eight gallery photos have been uploaded to its Media Library. Their public IDs are set in [`config.js`](./config.js). If you change clouds or replace the photos:

1. Change the public cloud name in [`config.js`](./config.js). Never put an API key or secret in client code.
2. Use the four photo source links in [`credits.html`](./credits.html) and upload the photos to your Cloudinary Media Library. The photos are CC BY-SA 4.0; keep the author, source, license, and adaptation notices in the site and postcard.
3. Copy each uploaded image's **public ID** from Cloudinary, then set `landing`, `spear`, the four `beadwork*` IDs, `hero`, `hands`, `craft`, and `market` in [`config.js`](./config.js). The `hero` key is the Kajiado image used for festival cards; `landing` is the supplied collage.
4. Reload the page. The landing collage, chapter images, detail views, and postcard photos then use Cloudinary resizing, crop, auto format, and auto quality transformations. Responsive `srcset` lets the browser pick an appropriate size. The detail view requests a separate automatic thumbnail crop.
5. In the postcard section, enter a note and select a chapter. Downloading now fetches a Cloudinary-rendered PNG with text overlays, photographer credit, and the source URL. Visitors can also open or copy the shareable Cloudinary render URL. If the render is unavailable, the app creates a local PNG instead.
6. In Festival in a Box, visitors choose a look, a food tradition, a music video, and a Maa word. The choices update the preview and a Cloudinary-rendered festival card. Visitors can open, download, or copy the card link. Music is embedded from the artists' YouTube channels. Cultural and language references are linked in the section and in `credits.html`.
7. The shuka section displays five full-frame images delivered through Cloudinary with automatic format and quality. Local copies in `assets/` serve as fallbacks. Its colour guide uses cited cultural sources and describes associations rather than fixed meanings.
8. The Voices and Movement gallery shows eight contributor-supplied photographs through Cloudinary, with local fallbacks and full-image links. The accompanying ceremony guide is sourced from the Maasai Association. The photographs are not identified as depicting any named ceremony.
9. The landing image fills the first viewport, with the introduction and navigation layered over it. It is delivered through Cloudinary with a local fallback in `assets/`.
10. The spear story uses the contributor-supplied photograph through Cloudinary with a local fallback. The “do not disturb” interpretation is attributed to the account shared with this project; the linked source also describes spear planting as a gesture of respect and hospitality. Avoid presenting one interpretation as universal.
11. The beadwork story below the Festival choices shows four contributor-supplied photographs from Cloudinary with local fallbacks. Its history, social meanings, and colour associations are linked to sources; captions do not infer personal status from the photos.
12. The Lemayian profile reuses the first Voices and Movement photograph. His name and personal account came from the contributor, while the cited research explains one use of the term `nyangulo`. The text does not present that term as universal or infer the described duties from the photo itself.
13. The Movement Videos chapter embeds Fernando Anuang’a’s jump dance video from his official YouTube channel and plays the contributor-supplied spear throwing clip from Cloudinary. The spear clip uses a Cloudinary-generated poster frame, automatic video quality, and a bundled local fallback. Its original creator has not been identified, so the site does not claim copyright. The jump video's location details are attributed to the artist's description.
14. Festival in a Box can optionally accept one visitor photo through Cloudinary's Upload Widget. The public unsigned preset is `festival_visitor_photos_2026`; it accepts JPG, PNG, and WebP images into `stories-woven-in-beads/visitor-photos` and disallows visitor-chosen public IDs. The widget limits local files to 5 MB and resizes them to at most 1600 pixels per side. Uploaded photos are public and get shareable Cloudinary URLs. “Remove from this card” only removes the photo from the current browser view; it does not delete the uploaded asset.
15. The Festival video is a 12-second silent montage made from three contributor-supplied photos, uploaded as `festival-base-12s`. Cloudinary adds the optional visitor image and text layers for the selected look, food, Maa phrase, and music title, then delivers an optimized MP4. The selected music remains on the artist's YouTube channel and is not included in the video. The montage credits the contributor photos while the original creators retain their rights.
16. Try the Look uses the same public visitor upload, then sends its public ID to the local Node server. The server combines the portrait with a shuka and beadwork reference using Cloudinary image-to-image generation and returns a temporary result URL. The sample image is an AI visualization based on the CC BY-SA 4.0 photograph by Mark Myles Mugambi and two contributor-supplied reference photos; see `credits.html`. Generated details are illustrative and can be inaccurate. Each generation consumes Cloudinary credits. The demo server allows six requests per IP per hour in memory; production use should add durable rate limiting and a review of privacy and upload retention.

The app falls back to the credited Wikimedia preview or bundled contributor-supplied frame if a Cloudinary image fails to load. The downloadable PNG includes the selected Wikimedia image's attribution, source, and license. The postcard's adapted Wikimedia image is shared under CC BY-SA 4.0. The landing collage, spear photo, four beadwork photos, five shuka frames, and eight gallery photos were supplied for this project; they are not offered under a Creative Commons license. Their original creators have not been identified and this site does not claim ownership. Do not upload the embedded YouTube film to Cloudinary unless you have permission from its rights holder.

The source photos are currently delivered through Cloudinary's `image/upload` URLs. Remote fetch returned `401` on this cloud, so these Media Library uploads are the active path. The API credentials used for the one-time uploads are not in this site or its archive; public image delivery does not require them.

## Sources and editorial notes

See [`credits.html`](./credits.html). The current prose is a short contextual introduction based on the linked sources; it does not identify the photographed subjects or claim that the displayed objects were made by a named person. The shuka meanings are presented as associations, which can vary by community and occasion. The YouTube film is embedded from its original channel, not copied into Cloudinary.

Before submission, review wording with a Maasai speaker or community organization if possible, and replace or expand the stories with first-person accounts only with permission.

## Submission checklist

- Replace the photos or prose if you receive first-person contributions, and update their credits.
- Test the live site on mobile and desktop.
- Publish this folder as a public GitHub repository and deploy a live demo.
- Add a brief project description and a screenshot or demo video.
- Submit via the hackathon form by **November 29, 2026, 11:59 PM Anywhere on Earth**.
