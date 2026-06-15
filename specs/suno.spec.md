# Suno Specification

## Incompris Creative Orchestration Framework v1.0

Status: Living Document

---

# Purpose

This specification defines the Incompris workflow for creating music with Suno.

The goal is not simply to generate songs.

The goal is to create emotionally resonant musical experiences through structured creative orchestration.

Suno is treated as a creative engine rather than a one-shot generator.

Every song is iteratively sculpted through prompt engineering, lyric engineering, evaluation, transformation, and refinement.

---

# Core Principles

## 1. Prompts Sculpt Probability

Prompts do not retrieve songs.

Prompts shape probability distributions.

The objective is not finding a song.

The objective is navigating toward one.

---

## 2. Lyrics Are Prompts

Lyrics are not final output.

Lyrics act as:

* emotional anchors
* melodic guidance
* cadence guidance
* vocal performance guidance

Lyrics should be treated as generative constraints.

---

## 3. Section Headers Are Orchestration

Section descriptors contain a large portion of the production intent.

Example:

```text
[DROP,future zen rage swamp bass,heavy 808s,glitch frog vox]
```

Section descriptors act as local orchestration prompts.

---

## 4. Iteration Beats Perfection

Songs are discovered through iteration.

Generation is expected to be non-deterministic.

The workflow embraces exploration before refinement.

---

## 5. Soup → Serum

Start broad.

Explore possibilities.

Discover signal.

Compress into high-signal prompts.

The goal is not prompt length.

The goal is prompt density.

---

# Workflow

## Phase 1: Initialization

Purpose:

Create initial creative coordinates.

### Inputs

Optional:

* Theme
* Title
* Brain Dump
* Emotional Intent
* Story
* Genre
* Style
* References
* Existing Songs
* Visual Concepts

Required:

At least one strong creative direction.

### Outputs

* Initial song.prompt
* Initial lyrics.prompt
* Initial artwork direction

---

## Phase 2: Structure Formation

Purpose:

Generate song architecture.

### Process

Generate:

* section structure
* hooks
* mantras
* recurring phrases
* lyrical scaffolding

Lyrics are often treated as madlibs during this phase.

The goal is structure, not perfection.

### Outputs

* structured lyrics.prompt
* structured song.prompt

---

## Phase 3: Iterative Sculpting

Purpose:

Explore possibility space.

### Loop

Generate
↓
Listen
↓
Evaluate
↓
Transform
↓
Generate

### Common Transformations

* Genre Injection
* Energy Injection
* Future Bass Injection
* Cloud Trap Injection
* Mainstream Polish
* Festival Polish
* Future Zen Rage Injection
* Frogworld Injection
* Identity Injection
* Prompt Compression
* Prompt Expansion

### Outputs

* candidate generations
* transformed prompts
* refined lyrics

---

## Phase 4: Finalization

Purpose:

Transform a strong generation into a release candidate.

### Areas

* emotional intensity
* immersion
* vocal quality
* energy flow
* mainstream accessibility
* production density
* release readiness

### Typical Enhancements

* festival mix
* emotional amplification
* immersive audio descriptors
* hard-cut euphoria syncopation
* vocal stack refinement
* orchestral enhancement
* spatial enhancement

### Outputs

* release candidate

---

## Phase 5: Release

Purpose:

Package and distribute.

### Deliverables

* final audio
* artwork
* metadata
* description
* hashtags
* distribution assets

### Optional

* mastering
* DAW refinement
* stem processing
* video assets

---

# Prompt Layers

## vision.prompt

High-level creative intent.

Contains:

* theme
* emotion
* story
* purpose
* references

Example:

```text
frequency

a song about resonance and tuning into meaning.
```

---

## song.prompt

Global probability-field prompt.

Contains:

* genre fusion
* production style
* sound design
* vocal style
* spatial design
* emotional intent

Purpose:

Shape overall generation.

---

## lyrics.prompt

Structural and lyrical prompt.

Contains:

* sections
* mantras
* hooks
* vocal cues
* sound effects
* section descriptors

Purpose:

Guide melody, delivery, and structure.

---

## artwork.prompt

Visual translation of the song.

Contains:

* subject
* atmosphere
* color palette
* symbolism
* typography

Purpose:

Create visual identity.

---

# Evaluation Framework

Every generation should be evaluated.

## Signal

Does it stand out?

---

## Identity

Does it feel like the artist?

---

## Emotion

Does it create emotional movement?

---

## Immersion

Does it create flow state?

---

## Memorability

Can the listener remember it?

---

## Repeatability

Does it survive repeated listens?

---

## Release Readiness

Would you confidently publish it?

---

# Common Design Patterns

## Minimal Mantra

Example:

```text
be here now...
```

Short phrases repeated intentionally.

---

## Emotional Anchors

Example:

```text
cry to heal...
```

Simple phrases carrying emotional weight.

---

## Sound Design Through Sections

Example:

```text
[DROP,future bass,euphoria syncopation]
```

Production intent is embedded into section headers.

---

## Probability Field Sculpting

Prompts are treated as coordinates.

Iterations navigate possibility space.

---

# File Structure

```text
specs/
  suno.spec.md

templates/
  vision.prompt
  song.prompt
  lyrics.prompt
  artwork.prompt

transforms/
  genre-injection.prompt
  energy-injection.prompt
  festival-polish.prompt
  mainstream-polish.prompt
  future-zen-rage.prompt
```

---

# Final Principle

The artist is not a prompt writer.

The artist is a navigator.

Suno generates possibilities.

The artist discovers signal.

The artist creates meaning.
