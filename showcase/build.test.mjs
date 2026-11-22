import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { renderFilm, youtubeVideoId } from "./build.mjs";

const template = await readFile(new URL("./manifest/index.html", import.meta.url), "utf8");
const id = "QAonly_0-01";

test("an empty setting renders the artwork and coming-soon state without loading a player", () => {
  const html = renderFilm(template, youtubeVideoId("  "));
  assert.match(html, /Video coming soon/);
  assert.match(html, /src="\.\/manifest\.webp"/);
  assert.doesNotMatch(html, /<iframe|<video|<script|youtube|{{/i);
});

test("watch and share URLs yield the same embed and direct fallback", () => {
  for (const url of [
    `https://www.youtube.com/watch?v=${id}&list=ignored`,
    `https://m.youtube.com/watch?v=${id}`,
    `https://youtu.be/${id}?si=discarded`,
  ]) {
    const html = renderFilm(template, youtubeVideoId(url));
    assert.ok(html.includes(`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`));
    assert.ok(html.includes(`href="https://www.youtube.com/watch?v=${id}">Watch on YouTube`));
    assert.match(html, /src="\.\/player\.js"/);
    assert.doesNotMatch(html, /Video coming soon|ignored|discarded|{{/);
  }
});

test("a malformed or untrusted source fails the build", () => {
  for (const url of [
    null, "invalid", "https://www.youtube.com/watch?v=short",
    `https://youtube.com.example/watch?v=${id}`, `https://other@youtu.be/${id}`,
    `http://youtu.be/${id}`, `https://youtu.be:444/${id}`, `https://youtu.be/${id}/extra`,
  ]) {
    assert.throws(() => youtubeVideoId(url), /youtubeVideoUrl/);
  }
});

test("the build publishes the workflow, static fallback, and only allowlisted assets", async () => {
  execFileSync(process.execPath, [new URL("./build.mjs", import.meta.url).pathname]);
  const dist = new URL("./dist/", import.meta.url);
  const config = JSON.parse(await readFile(new URL("./manifest/config.json", import.meta.url), "utf8"));
  const hasPlayer = Boolean(youtubeVideoId(config.youtubeVideoUrl));
  const piecesConfig = JSON.parse(await readFile(new URL("./pieces/config.json", import.meta.url), "utf8"));
  const piecesId = youtubeVideoId(piecesConfig.youtubeVideoUrl);
  const expected = [
    "index.html", "assets", "assets/incompris-favicon.ico", "manifest", "manifest/index.html", "manifest/manifest.webp",
    "manifest/showcase.css", "manifest/workflow.svg", "manifest/workflow-animated.svg",
    ...(hasPlayer ? ["manifest/player.js"] : []),
    "pieces", "pieces/index.html", "pieces/pieces.webp", "pieces/pieces.css",
    ...(piecesId ? ["pieces/player.js"] : []),
  ];
  assert.deepEqual((await readdir(dist, { recursive: true })).sort(), expected.sort());
  const html = await readFile(new URL("manifest/index.html", dist), "utf8");
  assert.match(html, /<details class="workflowMap" open>/);
  assert.match(html, /href="\.\/workflow\.svg"/);
  assert.match(html, /src="\.\/workflow-animated\.svg"/);
  assert.match(html, /prefers-reduced-motion: reduce/);
  assert.match(html, /id="pause-workflow"/);
  assert.match(html, /for="pause-workflow"/);
  const pieces = await readFile(new URL("pieces/index.html", dist), "utf8");
  for (const film of [html, pieces]) {
    assert.match(film, /rel="icon" href="\.\.\/assets\/incompris-favicon\.ico"/);
  }
  assert.match(pieces, /src="\.\/pieces\.webp"/);
  assert.match(pieces, /href="\.\.\/manifest\/showcase\.css"/);
  assert.match(pieces, /src="\.\.\/manifest\/workflow-animated\.svg"/);
  if (piecesId) {
    assert.ok(pieces.includes(`https://www.youtube-nocookie.com/embed/${piecesId}?autoplay=1`));
    assert.match(pieces, /data-film-title="pieces — final film"/);
  }
  for (const name of ["workflow.svg", "workflow-animated.svg"]) {
    const source = await readFile(new URL("./manifest/" + name, import.meta.url), "utf8");
    assert.equal(await readFile(new URL("manifest/" + name, dist), "utf8"), source);
    assert.doesNotMatch(source, /<script\b|<foreignObject\b|\son[a-z]+\s*=|(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)|@import/i);
  }
  const empty = renderFilm(template, null);
  assert.match(empty, /src="\.\/workflow-animated\.svg"/);
  assert.doesNotMatch(empty, /<script|<iframe/i);
});
