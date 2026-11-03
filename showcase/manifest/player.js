// The poster is an ordinary watch link, including when JavaScript is unavailable.
const playLink = document.querySelector("[data-embed-url]");
playLink.addEventListener("click", (event) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  const player = document.createElement("iframe");
  player.title = "manifest — final film";
  player.className = "video";
  player.referrerPolicy = "strict-origin-when-cross-origin";
  player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  player.allowFullscreen = true;
  player.src = playLink.dataset.embedUrl;
  document.getElementById("screen").replaceChildren(player);
  player.focus();
});
