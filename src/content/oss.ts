/**
 * Merged pull requests to other people's projects. Add one when it merges,
 * the same day it goes into the GitHub profile README.
 *
 * Every URL is written out in full rather than built from repo + number:
 * scripts/check-links.mjs reads this file and checks each URL, and it can only
 * find literal strings.
 */

export interface UpstreamProject {
  /** owner/name, as GitHub shows it. */
  repo: string
  url: string
  /** One line on what the project is, for readers who haven't heard of it. */
  about: string
}

export interface Contribution {
  repo: string
  number: number
  url: string
  /** What changed, in plain words rather than the commit prefix. */
  title: string
  /** The bug or gap it closed, and where it shipped if it has. */
  detail: string
  /** YYYY-MM-DD, from GitHub's mergedAt. */
  mergedAt: string
}

/** GitHub's own list of every merged PR outside my repos, older ones included. */
export const allMergedUrl =
  "https://github.com/search?q=author%3ASibilSoren+is%3Apr+is%3Amerged+-user%3ASibilSoren&type=pullrequests"

export const upstreamProjects: UpstreamProject[] = [
  {
    repo: "redis/node-redis",
    url: "https://github.com/redis/node-redis",
    about: "The official Redis client for Node.js.",
  },
  {
    repo: "oblien/openship",
    url: "https://github.com/oblien/openship",
    about: "A self-hosted deployment platform.",
  },
  {
    repo: "animir/node-rate-limiter-flexible",
    url: "https://github.com/animir/node-rate-limiter-flexible",
    about: "Rate limiting for Node.js over Redis, Valkey, Memcache, databases and memory.",
  },
  {
    repo: "devkitshq/notifkit",
    url: "https://github.com/devkitshq/notifkit",
    about: "Self-hosted notification infrastructure: email, SMS and push behind one call.",
  },
]

export const contributions: Contribution[] = [
  {
    repo: "animir/node-rate-limiter-flexible",
    number: 380,
    url: "https://github.com/animir/node-rate-limiter-flexible/pull/380",
    title: "Recover cluster limiters when the master starts late or restarts",
    detail:
      "In PM2 cluster mode a worker's limiter was lost if the master wasn't up yet, or restarted. Open since 2023 (#242).",
    mergedAt: "2026-11-24",
  },
  {
    repo: "devkitshq/notifkit",
    number: 43,
    url: "https://github.com/devkitshq/notifkit/pull/43",
    title: "Read SES bounces and complaints from SNS",
    detail:
      "Verifies each SNS message's signature and suppresses addresses that bounce or complain. Closed #16.",
    mergedAt: "2026-11-21",
  },
  {
    repo: "devkitshq/notifkit",
    number: 31,
    url: "https://github.com/devkitshq/notifkit/pull/31",
    title: "AWS SES email provider",
    detail:
      "Sends through SESv2 with a required rate limit, so bursts stay under the account's sending quota. Published as @notifkit/provider-ses.",
    mergedAt: "2026-11-20",
  },
  {
    repo: "oblien/openship",
    number: 1808,
    url: "https://github.com/oblien/openship/pull/1808",
    title: "Keep the service running when `openship up` runs again on macOS",
    detail: "A launchd restart race left the service stopped while the CLI reported success.",
    mergedAt: "2026-11-18",
  },
  {
    repo: "devkitshq/notifkit",
    number: 29,
    url: "https://github.com/devkitshq/notifkit/pull/29",
    title: "SMTP email provider",
    detail: "Built on nodemailer. Published as @notifkit/provider-smtp.",
    mergedAt: "2026-11-18",
  },
  {
    repo: "oblien/openship",
    number: 1809,
    url: "https://github.com/oblien/openship/pull/1809",
    title: "Stop the API when the supervisor is signalled during startup",
    detail: "Stopping the CLI while it was still starting left the API running as an orphan.",
    mergedAt: "2026-11-17",
  },
  {
    repo: "oblien/openship",
    number: 1815,
    url: "https://github.com/oblien/openship/pull/1815",
    title: "Run the API tests in UTC",
    detail: "Four tests failed in time zones with a half-hour offset, such as IST.",
    mergedAt: "2026-11-17",
  },
  {
    repo: "redis/node-redis",
    number: 3622,
    url: "https://github.com/redis/node-redis/pull/3622",
    title: "Keep writing on drain before the socket is ready",
    detail:
      "After a reconnect, a client with many sharded subscriptions never became ready. Backported the fix to 5.12; shipped in redis@5.12.3.",
    mergedAt: "2026-11-16",
  },
  {
    repo: "animir/node-rate-limiter-flexible",
    number: 379,
    url: "https://github.com/animir/node-rate-limiter-flexible/pull/379",
    title: "Round durations under 1 second up to 1 second",
    detail:
      "Redis, Valkey and Memcache stored a sub-second duration as 0 seconds, so those keys never expired. Released in v11.5.0.",
    mergedAt: "2026-11-15",
  },
  {
    repo: "oblien/openship",
    number: 1743,
    url: "https://github.com/oblien/openship/pull/1743",
    title: "Keep the service's ports when `openship up` runs again",
    detail:
      "Running it again moved the service to new ports, after waiting about 12 seconds for the old ones to free up.",
    mergedAt: "2026-11-13",
  },
]

/** Newest first, whatever order they were added in. */
export function getContributions(): Contribution[] {
  return [...contributions].sort((a, b) => b.mergedAt.localeCompare(a.mergedAt) || b.number - a.number)
}

export function contributionSummary() {
  const repos = new Set(contributions.map((c) => c.repo))
  const first = contributions.map((c) => c.mergedAt).sort()[0]
  return { merged: contributions.length, projects: repos.size, since: first }
}
