// Tiny static file server for the birthday site.
// Run with:  node server.js
// Then open: http://localhost:3000

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, "messages.json");

app.use(express.json());
app.use(express.static(path.join(__dirname)));

function readMessages(){
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
  } catch (err) {
    return []; // file doesn't exist yet, or is empty/invalid
  }
}

function writeMessages(messages){
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// The reply form on the secret page POSTs here.
app.post("/api/messages", (req, res) => {
  const message = (req.body && req.body.message || "").trim();
  if (!message){
    return res.status(400).json({ error: "Message text is required." });
  }
  const messages = readMessages();
  messages.push({
    message,
    timestamp: req.body.timestamp || new Date().toISOString(),
  });
  writeMessages(messages);
  res.status(201).json({ ok: true });
});

// Plain JSON, if you'd rather read it programmatically.
app.get("/api/messages", (req, res) => {
  res.json(readMessages());
});

// A simple human-readable inbox — visit http://localhost:3000/messages
app.get("/messages", (req, res) => {
  const messages = readMessages().slice().reverse();
  const rows = messages.length
    ? messages.map(m => `
        <li>
          <p>${escapeHtml(m.message)}</p>
          <time>${new Date(m.timestamp).toLocaleString()}</time>
        </li>`).join("")
    : "<p>No messages yet.</p>";

  res.send(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Messages</title>
<style>
  body{ font-family: system-ui, sans-serif; background:#1b1035; color:#fff8f0; max-width:640px; margin:40px auto; padding:0 20px; }
  h1{ font-size:1.4rem; }
  ul{ list-style:none; padding:0; }
  li{ background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.14); border-radius:10px; padding:16px 18px; margin-bottom:14px; }
  time{ display:block; margin-top:8px; font-size:0.8rem; color:#e8b75a; }
</style></head>
<body>
  <h1>Messages received 💌</h1>
  <ul>${rows}</ul>
</body></html>`);
});

function escapeHtml(str){
  return str.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

app.listen(PORT, () => {
  console.log(`🎉 Tithi's birthday site is running at http://localhost:${PORT}`);
  console.log(`   Read her messages any time at http://localhost:${PORT}/messages`);
});
