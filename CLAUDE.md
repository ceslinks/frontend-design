# CLAUDE.md — LINKS Student Portal

Standing instructions for every session in this repo.

## Ticket-to-PR Workflow

Follow these steps in order for every feature or fix. Do not skip steps or reorder them.

### 1. Read the ticket first

Pull the Jira ticket and summarize it before writing any code.

Your summary must include:

- The acceptance criteria (what "done" looks like).
- Which app views / components are affected (e.g. `messages-thread.jsx`, calendar week view, left-rail `ConvList`, etc.).

Do not proceed until the summary is confirmed or the user says to continue.

### 2. Decide the base branch — stacked vs. independent

Before branching, determine whether this ticket depends on other in-flight work. LINKS stories are often **additive** (a feature builds on top of one not yet merged), so this decision matters every time.

- Check: does this ticket build on a feature that is **not yet merged into `main`** — e.g. it extends a component, view, or route introduced by another open branch?
- **Independent** (nothing unmerged it depends on) → base branch is `main`.
- **Stacked** (it depends on an open, unmerged branch) → base branch is the **tip of that parent feature branch**, NOT `main`. This is the staircase model: each branch is cut from the one below it so it already contains that work.

State explicitly which base branch you are cutting from, and why, before creating the branch. Do not proceed until confirmed.

### 3. Create the branch

- Pull the latest version of the **base branch** chosen in step 2 (either `main` or the parent feature branch).
- Create a feature branch named:

  `feature/PROJ-ID-short-description`

  Example: `feature/LINKS-1901-class-channel-tab-removal`

### 4. Build the view

- Implement only what the ticket describes.
- Match existing component patterns, CSS variable tokens, and styling conventions in this codebase (React 18 UMD + Babel Standalone, no bundler, `window.*` exports, hash-based routing).
- Stop and show the diff / affected files to the user before committing. Do not commit on your own.

### 5. Post the HTML file for preview

- Before asking for approval, open `LINKS Student Portal.html` in the browser using the preview tools so the user can see the rendered result.
- Take a screenshot and share it alongside the diff summary.
- Do not proceed to the commit step until the preview is posted.

### 6. Commit only after approval

- Wait for explicit approval ("looks good", "ship it", "approved", etc.).
- Commit message format:

  ```
  [PROJ-ID] Short description of change

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```

  Example: `[LINKS-1901] Remove redundant tab row from class channel thread`

### 7. Push and open a PR — target the branch below, never merge

- Push the branch to `origin`.
- Open a PR against the **base branch this work was cut from** (from step 2):
  - **Independent work** → PR targets `main`.
  - **Stacked work** → PR targets the **parent feature branch**, NOT `main`.
- The PR must include:
  - Title referencing the ticket ID and a short description.
  - Body linking to the Jira ticket (URL or issue key).
  - A brief summary of what changed and why.
  - For stacked PRs: a note naming the parent branch (e.g. "Stacked on `feature/LINKS-1900-...`").
- Do not merge the PR. Leave it open for team review.

## Stacked Branch Rules (the staircase)

When stories are additive, follow these rules so PRs don't collide:

- **Each stacked branch is cut from the tip of the branch below it**, so it already contains that work. A→main, B→off A, C→off B.
- **PRs merge bottom-up.** The base of the stack merges into `main` first; then each branch above merges into its parent, in order. Never merge an upper branch before the one below it has landed.
- **Each PR's diff should show only its own changes.** If a stacked PR's diff includes the parent's changes, the wrong base was used — recut the branch from the parent's tip.
- **Keep branches current — rebase frequently.** If a branch lower in the stack changes (review edits) or merges into `main`, rebase this branch onto the updated parent and resolve conflicts before continuing. Daily rebasing keeps conflicts small instead of letting them pile up.
- **Rebasing up the stack:** when asked to "rebase onto the latest parent" (or after the parent merges to `main`), perform the rebase, resolve any conflicts following existing component/styling patterns, and show the result before pushing. Push rebased branches with `--force-with-lease`, never plain `--force`.

## Project Context

- **Repo:** `frontend-design` — browser-based JSX prototype, no build step.
- **Jira site:** https://ceslinks.atlassian.net — project key `LINKS`.
- **Stack:** React 18 UMD, Babel Standalone, Lucide icons, CSS variables in `styles.css`.
- **Token:** stored in `.env` as `JIRA_PAT` — use it for all Jira API calls. Never print or echo the token value in output.
- **Routing:** hash-based (`#/segment/segment`), source of truth in `nav-map.jsx`.
- **Component exports:** every component is exported via `window.*` at the bottom of its file.
