import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
