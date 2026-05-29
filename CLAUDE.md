# CLAUDE.md — LINKS Student Portal

Standing instructions for every session in this repo.

---

## Ticket-to-PR Workflow

Follow these steps in order for every feature or fix. Do not skip steps or
reorder them.

### 1. Read the ticket first
- Pull the Jira ticket and summarize it before writing any code.
- Your summary must include:
  - The acceptance criteria (what "done" looks like).
  - Which app views / components are affected (e.g. `messages-thread.jsx`,
    calendar week view, left-rail ConvList, etc.).
- Do not proceed until the summary is confirmed or the user says to continue.

### 2. Branch off latest main
- Pull the latest `main` branch.
- Create a feature branch named:
  ```
  feature/PROJ-ID-short-description
  ```
  Example: `feature/LINKS-1901-class-channel-tab-removal`

### 3. Build the view
- Implement only what the ticket describes.
- Match existing component patterns, CSS variable tokens, and styling
  conventions in this codebase (React 18 UMD + Babel Standalone, no bundler,
  `window.*` exports, hash-based routing).
- **Stop and show the diff / affected files to the user before committing.**
  Do not commit on your own.

### 4. Commit only after approval
- Wait for explicit approval ("looks good", "ship it", "approved", etc.).
- Commit message format:
  ```
  [PROJ-ID] Short description of change

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```
  Example: `[LINKS-1901] Remove redundant tab row from class channel thread`

### 5. Push and open a PR — never merge
- Push the branch to origin.
- Open a PR against `main` with:
  - Title referencing the ticket ID and a short description.
  - Body linking to the Jira ticket (URL or issue key).
  - A brief summary of what changed and why.
- **Do not merge the PR.** Leave it open for team review.

---

## Project Context

- **Repo:** `frontend-design` — browser-based JSX prototype, no build step.
- **Jira site:** `https://ceslinks.atlassian.net` — project key `LINKS`.
- **Stack:** React 18 UMD, Babel Standalone, Lucide icons, CSS variables in
  `styles.css`.
- **Token:** stored in `.env` as `JIRA_PAT` — use it for all Jira API calls.
- **Routing:** hash-based (`#/segment/segment`), source of truth in
  `nav-map.jsx`.
- **Component exports:** every component is exported via `window.*` at the
  bottom of its file.
