import type { LucideIcon } from "lucide-react"
import { Shield, Terminal, AudioLines, Loader, Zap } from "lucide-react"

export interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  architecture: string[]
  github?: string
  demo?: string
  npm?: string
  icon: LucideIcon
  image?: string
  featured: boolean
  /**
   * "shipped" renders links. "designed" renders the write-up only, with no
   * View Code button - design work is legitimate portfolio material, but only
   * when it is labelled as design work rather than as a finished repository.
   */
  status: "shipped" | "designed"
}

export const projects: Project[] = [
  {
    title: "Gatekeeper: Express Rate Limiter",
    description: "A production-grade, distributed rate limiting middleware for Express APIs.",
    longDescription:
      "Most rate limiters keep their counters in process memory, which quietly multiplies your limit by the number of servers you run. Gatekeeper keeps the counter in Redis and does the check-and-increment inside a Lua script, so it stays atomic when several requests land at once. Three algorithms — fixed window, sliding window, token bucket. If Redis becomes unreachable it falls back to in-memory counting rather than rejecting traffic, on the argument that a rate limiter taking your API down is worse than a briefly imprecise limit.",
    tech: ["TypeScript", "Express", "Redis", "Lua"],
    architecture: [
      "Atomic Lua scripts",
      "Three algorithms",
      "Fail-open design",
      "Zero runtime dependencies",
    ],
    github: "https://github.com/SibilSoren/gatekeeper",
    demo: "https://sibilsoren.github.io/gatekeeper/",
    npm: "https://www.npmjs.com/package/@sibilsoren/gatekeeper",
    icon: Shield,
    image: "/images/gatekeeper-thumb.png",
    featured: true,
    status: "shipped",
  },
  {
    title: "create-api-starterkit",
    description: "A CLI that scaffolds a production-ready Node.js and TypeScript API in one command.",
    longDescription:
      "Scaffolds a Node and TypeScript API with the tedious parts already wired: structured logging, centralised error handling, Zod validation, Swagger docs and a Dockerfile. Came out of setting the same things up one too many times. The CI does a real end-to-end run — it scaffolds a project, installs it, boots it and curls the health endpoint.",
    tech: ["Node.js", "TypeScript", "Express", "Docker"],
    architecture: [
      "Interactive CLI scaffolding",
      "Structured logging",
      "Centralised error handling",
      "Zod validation",
    ],
    github: "https://github.com/SibilSoren/create-api-starterkit",
    demo: "https://sibilsoren.github.io/create-api-starterkit/",
    npm: "https://www.npmjs.com/package/create-api-starterkit",
    icon: Terminal,
    image: "/images/starterkit-thumb.png",
    featured: true,
    status: "shipped",
  },
  {
    title: "AudioPad",
    description: "A multi-track audio editor that runs entirely in the browser.",
    longDescription:
      "The Web Audio API is imperative and React is declarative, so the real problem here was keeping them apart. The audio engine lives entirely outside React and is driven by a Redux middleware that translates actions into engine calls. Waveforms render to canvas rather than the DOM, because drawing a few thousand peaks as elements does not go well.",
    tech: ["React", "TypeScript", "Web Audio API", "Redux"],
    architecture: [
      "Engine isolated from React",
      "Redux middleware bridge",
      "Canvas waveform rendering",
      "Per-track gain routing",
    ],
    github: "https://github.com/SibilSoren/audiopad",
    demo: "https://audio-pad.netlify.app/",
    icon: AudioLines,
    featured: true,
    status: "shipped",
  },
  {
    title: "Spinner-Zilla",
    description: "Twelve loading spinners for React, with no runtime dependencies.",
    longDescription:
      "TypeScript and Tailwind, documented in Storybook. Built so I would stop rewriting the same loading state in every project.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    architecture: ["No runtime dependencies", "Storybook documentation", "Tree-shakeable exports"],
    github: "https://github.com/SibilSoren/spinner-zilla",
    demo: "https://sibilsoren.github.io/spinner-zilla/",
    npm: "https://www.npmjs.com/package/spinner-zilla",
    icon: Loader,
    featured: false,
    status: "shipped",
  },
  {
    title: "SagaFlow: Distributed Orchestrator",
    description: "A design for an orchestration-based Saga coordinator across microservices.",
    longDescription:
      "A written architecture for solving the dual-write problem with an orchestration-based Saga rather than choreography: a central coordinator owns the state machine, drives each step over Kafka, and issues compensating commands when a step fails. The design covers the hexagonal split between domain logic and adapters, the dead-letter strategy, and a local-first Docker setup. This is a design document, not a shipped service — the write-up is the artefact.",
    tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL"],
    architecture: [
      "Saga orchestration pattern",
      "Event-driven state machine",
      "Hexagonal architecture",
      "Dead letter queue strategy",
    ],
    icon: Zap,
    featured: false,
    status: "designed",
  },
]
