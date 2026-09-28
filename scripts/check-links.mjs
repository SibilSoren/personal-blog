/**
 * Verifies that every external URL the site advertises actually resolves.
 *
 * The projects page once shipped three GitHub links to repositories that did
 * not exist. A reviewer clicking "View Code" got a 404, which is worse than the
 * project not being listed. This makes that failure mode a red build.
 */
import { readFileSync } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const files = [
  "src/content/projects.ts",
  "src/config/site.ts",
]

const BLOCKLIST = [
  // npmjs.com returns 403 to non-browser clients; the registry is the real check.
  { match: /^https:\/\/www\.npmjs\.com\/package\/(.+)$/, rewrite: (m) => `https://registry.npmjs.org/${m[1].replace("/", "%2F")}` },
]

function collectUrls() {
  const urls = new Set()
  for (const file of files) {
    const text = readFileSync(path.join(ROOT, file), "utf8")
    for (const match of text.matchAll(/https:\/\/[^\s"'`)]+/g)) {
      urls.add(match[0].replace(/[.,]$/, ""))
    }
  }
  return [...urls]
}

// LinkedIn, X and friends refuse non-browser clients. These codes mean "the
// host is up and does not want to talk to a script", not "this link is dead",
// so they must not fail the build - a 404 is what we are actually hunting.
const BOT_BLOCKED = new Set([401, 403, 429, 999])

async function check(url) {
  let target = url
  for (const rule of BLOCKLIST) {
    const m = url.match(rule.match)
    if (m) target = rule.rewrite(m)
  }

  try {
    const res = await fetch(target, {
      redirect: "follow",
      headers: { "user-agent": "sibilsarjamsoren.in link-check" },
      signal: AbortSignal.timeout(20000),
    })
    if (BOT_BLOCKED.has(res.status)) {
      return { url, status: res.status, ok: true, blocked: true }
    }
    return { url, status: res.status, ok: res.ok }
  } catch (error) {
    return { url, status: String(error.message ?? error), ok: false }
  }
}

const urls = collectUrls()
console.log(`Checking ${urls.length} outbound links...\n`)

const results = await Promise.all(urls.map(check))
const broken = results.filter((r) => !r.ok)

for (const r of results.sort((a, b) => a.url.localeCompare(b.url))) {
  const label = r.blocked ? "bot?" : r.ok ? "ok  " : "FAIL"
  console.log(`${label}  ${String(r.status).padEnd(6)} ${r.url}`)
}

if (broken.length > 0) {
  console.error(`\n${broken.length} link(s) did not resolve.`)
  process.exit(1)
}

console.log(`\nAll ${urls.length} links resolve.`)
