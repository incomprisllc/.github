# manifest

A small application showcase adapted from the [portfolio’s Descript page](https://github.com/szmyty/portfolio/tree/187ccf19f2dae817f1c0b2b440355379310915ab/src/features/descript). The Pages root forwards to `./manifest/`. The organization profile lives separately in `profile/README.md`.

Set `youtubeVideoUrl` in [manifest/config.json](manifest/config.json) to an HTTPS YouTube watch or share URL. An empty string shows the artwork and **Video coming soon**. A configured URL enables the privacy-enhanced player on click and an ordinary **Watch on YouTube** link. Anyone who can read the public repository or page can follow the unlisted video link.

## Local preview

From the repository root, with Node 20+ and Python 3:

```bash
node --test showcase/build.test.mjs
node showcase/build.mjs
python3 -m http.server 8000 --bind 127.0.0.1 --directory showcase/dist
```

Open <http://127.0.0.1:8000/manifest/>. The build uses relative URLs so the same files work beneath the repository’s Pages prefix.

## Deployment

Pages uses the **GitHub Actions** source. Changes to this showcase or its workflow on `main` publish the allowlisted files in `showcase/dist/`. The workflow uses standard Ubuntu runners only when the repository is public. The video streams from YouTube. The original WebP is the same 1254 × 1254 public derivative used in the portfolio.

## Workflow diagram

The expanded-by-default “How manifest came together” section connects the film to its music, visual, editing, and delivery workflow. The map describes a manual, evolving process; optional tools, proposed export variants, and unfinished Aniflow steps are labeled.

[manifest/workflow.svg](manifest/workflow.svg) is the static source and full-size view. [manifest/workflow-animated.svg](manifest/workflow-animated.svg) adds CSS data pulses to the existing solid connections. Keep the two maps in sync when editing their content. Both are self-contained SVGs with embedded brand shapes and no remote resources or scripts. The page provides a pause control and selects the static version for reduced-motion preferences. Both assets are explicitly included in the build’s publication allowlist.
