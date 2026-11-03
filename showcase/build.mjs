import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const source = new URL("./manifest/", import.meta.url);
const publishRoot = fileURLToPath(new URL("./dist/", import.meta.url));

export function youtubeVideoId(value) {
  if (typeof value !== "string") throw new Error("youtubeVideoUrl must be a string.");
  if (!value.trim()) return null;

  const url = URL.canParse(value) ? new URL(value) : null;
  let id;
  if (url?.protocol === "https:" && !url.username && !url.password && !url.port) {
    if (url.hostname === "youtu.be") {
      id = url.pathname.slice(1);
    } else if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname) && url.pathname === "/watch") {
      id = url.searchParams.get("v");
    }
  }
  if (!id || !/^[\w-]{11}$/u.test(id)) {
    throw new Error("Set youtubeVideoUrl to an HTTPS YouTube watch/share URL or leave it empty.");
  }
  return id;
}

const comingSoon = `<div class="screenMessage">
              <strong>Video coming soon</strong>
              <p>Until the screening opens, explore how the film came together below.</p>
            </div>`;

export function renderFilm(template, id) {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const screenControl = id
    ? `<a class="playButton" href="${watchUrl}" data-embed-url="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" aria-label="Play manifest — final film">
              <span aria-hidden="true">▶</span><strong>Play film</strong>
            </a>`
    : comingSoon;
  return template
    .replace("{{screenControl}}", screenControl)
    .replace("{{watchLink}}", id ? `<a class="directLink" href="${watchUrl}">Watch on YouTube <span aria-hidden="true">↗</span></a>` : "")
    .replace("{{playerScript}}", id ? '<script src="./player.js" defer></script>' : "");
}

const home = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0; url=./manifest/">
  <title>manifest — Incompris</title>
</head>
<body><p><a href="./manifest/">Open the manifest showcase</a></p></body>
</html>
`;

// This map is the publication boundary. Never walk the checkout for public inputs.
async function build() {
  const config = JSON.parse(await readFile(new URL("config.json", source), "utf8"));
  const id = youtubeVideoId(config.youtubeVideoUrl);
  const template = await readFile(new URL("index.html", source), "utf8");
  const artwork = await readFile(new URL("manifest.webp", source));
  const sha256 = (content) => createHash("sha256").update(content).digest("hex");
  if (sha256(artwork) !== "2b57385bd203bb99274b43c4255e204e4d30835d6d13b3b41fbfdf7de78954e4") {
    throw new Error("Artwork differs from the reviewed portfolio WebP.");
  }
  const files = {
    "index.html": home,
    "manifest/index.html": renderFilm(template, id),
    "manifest/manifest.webp": artwork,
    "manifest/showcase.css": await readFile(new URL("showcase.css", source)),
  };
  if (id) files["manifest/player.js"] = await readFile(new URL("player.js", source));

  await rm(publishRoot, { recursive: true, force: true });
  const inventory = [];
  for (const path of Object.keys(files).sort()) {
    const destination = join(publishRoot, path);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, files[path]);
    inventory.push(`${sha256(files[path])}  ${path}\n`);
  }
  return sha256(inventory.join(""));
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  // Print a reproducible digest of the files that will be published.
  console.log(await build());
}
