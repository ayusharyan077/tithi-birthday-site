# Tithi's Birthday Site 🎂

A scrollable, 4-page interactive birthday site with confetti, floating
hearts, and a secret message section. Built with plain HTML/CSS/JS so it
runs anywhere — no build step needed — plus an optional tiny Node.js
server if you'd rather run it locally than just double-click the file.

## Quick start

**Easiest:** just open `index.html` in any browser (double-click it).

**With the Node server** (nicer for videos/local links, avoids some
browser file-loading restrictions):
```
npm install
npm start
```
Then visit `http://localhost:3000`.

## The 4 pages

1. **Welcome** — Tithi's name and a tap-for-a-heart button.
2. **Memories** — a polaroid-style photo grid.
3. **Wishes** — buttons that reveal quotes with confetti + hearts.
4. **Secret** — a sealed envelope that opens into a private message,
   a video, and any links you want to include.

Swipe or scroll down on mobile to move between pages; the dots on the
right (or the "scroll" hint on page 1) also jump between them.

## How to edit everything

Almost all of the editable content lives in **one place**:
`script.js`, at the very top, in an object called `CONFIG`. You don't
need to touch the HTML at all for normal edits.

### Change the name or hero text
```js
name: "Tithi",
hero: {
  kicker: "a little something for",
  subtitle: "Another year of you — loved, celebrated, adored.",
},
```

### Add or change photos
Drop your image files into the `images/` folder, then list them:
```js
photos: [
  { src: "images/photo-1.jpg", caption: "That laugh, though" },
  { src: "images/my-new-pic.jpg", caption: "Add your own caption" },
],
```
Add as many entries as you like — the grid adjusts automatically.
Until you add real files, placeholder images show up automatically so
nothing looks broken.

### Add or change wishes/quotes
```js
quotes: [
  { label: "Today", text: "The full quote text shown when this button is tapped." },
],
```
`label` is the short button text; `text` is the full message that
appears in the card above the buttons. Add/remove/reorder freely.

### Add a video clip
Put your video file in the `video/` folder (e.g. `video/message.mp4`)
and point to it:
```js
video: {
  src: "video/message.mp4",
  poster: "images/video-poster.jpg", // optional preview image
},
```
You can also use a full link (e.g. a hosted `.mp4` URL) instead of a
local file.

### Add links (playlist, photo album, anything)
```js
links: [
  { label: "Our playlist", url: "https://open.spotify.com/..." },
  { label: "Full photo album", url: "https://photos.google.com/..." },
],
```

### Write the secret message
```js
secretMessage: `Tithi,

Write anything here — line breaks are kept exactly as you type them.`,
```

## The "send a message back" feature

Inside the secret section, under the message, video, and links, there's
a small form where **she** can type something and send it back to you.

- It only actually delivers the message if you're running the site
  through the Node server (`npm start`), not just double-clicking
  `index.html`. That's a browser security limitation, not a bug — a
  plain file opened directly can't talk to a server.
- Once the server is running, every message she sends gets appended to
  a file called `messages.json` in the project folder.
- To read what she's written, either open `messages.json` directly, or
  — nicer — visit **http://localhost:3000/messages** in a browser while
  the server is running. It shows each message with a timestamp,
  newest first.
- As a safety net, every message is also saved to that browser's
  `localStorage` under the key `tithi-messages`, even if the server
  isn't reachable — so nothing is lost if she sends one before you've
  started the server.

If you end up hosting this site somewhere public (not just on your own
computer), keep in mind `/messages` and `messages.json` would be
readable by anyone who finds the URL — fine for a private link you only
share with her, but worth knowing.

## Colors, fonts, and layout

If you want to go beyond content and tweak the look, open `style.css`.
The top of the file has a `:root { ... }` block with all the named
colors (`--gold`, `--blush`, `--midnight`, etc.) and fonts — change a
value there and it updates everywhere it's used.

## A few notes

- Everything works offline once the files are on your device — the
  confetti and hearts are custom-built, not loaded from anywhere else.
- Only the two Google Fonts (`Cormorant Garamond`, `Quicksand`) load
  from the internet; if you're fully offline they'll fall back to a
  similar system font automatically.
- If a photo or video path is wrong, the page won't break — photos
  fall back to a placeholder, and the video area just won't play
  anything until the file is present.
