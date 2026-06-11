import { Code2, Smartphone, Globe, Layers, Zap, Database, Shield, Terminal } from "lucide-react"

export interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  architecture: string[]
  github?: string
  demo?: string
  icon: any
  image?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: "Gatekeeper: Express Rate Limiter",
    description: "A production-grade, distributed rate limiting middleware for Express APIs.",
    longDescription: "Engineered a distributed, Redis-backed rate limiting middleware for Express APIs. Supports Fixed Window, Sliding Window, and Token Bucket algorithms with atomic Lua script operations to prevent race conditions.",
    tech: ["TypeScript", "Express", "Redis", "Lua"],
    architecture: [
      "Distributed Architecture",
      "Atomic Lua Scripts",
      "Fail-open Design",
      "Zero-dependency fallback"
    ],
    github: "https://github.com/SibilSoren/gatekeeper",
    demo: "https://sibilsoren.github.io/gatekeeper/",
    icon: Shield,
    image: "/images/gatekeeper-thumb.png",
    featured: true,
  },
  {
    title: "create-api-starterkit",
    description: "A CLI tool to instantly scaffold scalable, production-ready Node.js backends.",
    longDescription: "Architected a reusable backend template from scratch using TypeScript and Express. It reduces initial project setup time by over 50% by pre-configuring enterprise patterns, Swagger docs, and dockerized deployments.",
    tech: ["Node.js", "TypeScript", "Express", "Docker"],
    architecture: [
      "CLI Scaffolding",
      "Structured Logging",
      "Centralized Error Handling",
      "Zod Validation"
    ],
    github: "https://github.com/SibilSoren/create-api-starterkit",
    demo: "https://sibilsoren.github.io/create-api-starterkit/",
    icon: Terminal,
    image: "/images/starterkit-thumb.png",
    featured: true,
  },
  {
    title: "SagaFlow: Distributed Orchestrator",
    description: "A high-performance event-driven engine managing multi-service transactions with eventual consistency.",
    longDescription: "Engineered a distributed transaction coordinator to solve the 'dual-write' problem in microservices. Implemented the Saga pattern using an orchestration-based approach. Designed for local-first development—spin up the entire stack (Services + Kafka) with one command.",
    tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis"],
    architecture: [
      "Event-driven state machine",
      "Saga Orchestration pattern",
      "Docker-compose local-cloud setup",
      "Dead Letter Queue (DLQ) strategy"
    ],
    github: "https://github.com/SibilSoren/sagaflow",
    icon: Zap,
    featured: true,
  },
  {
    title: "EcoStream: Real-time Analytics",
    description: "Low-latency streaming platform processing 10k+ events/sec with sliding window aggregations.",
    longDescription: "Architected a real-time data pipeline for high-throughput event processing. The system uses Redis for sub-second aggregations and is fully containerized to ensure identical behavior between local and production environments.",
    tech: ["NestJS", "Redis Stack", "WebSockets", "ClickHouse"],
    architecture: [
      "Sliding window aggregation",
      "Containerized Redis Stack",
      "High-throughput WebSocket gateway",
      "In-memory stream processing"
    ],
    github: "https://github.com/SibilSoren/ecostream",
    icon: Database,
    featured: true,
  },
  {
    title: "Sentinel: SLO Monitoring Engine",
    description: "SRE-led observability platform for defining and alerting on business-critical SLIs and Error Budgets.",
    longDescription: "Developed an alerting engine that goes beyond CPU/RAM metrics to focus on real business value. Built to be self-contained; the Docker environment includes pre-configured Prometheus and Grafana for instant observability.",
    tech: ["Go", "Prometheus", "Grafana", "TimescaleDB"],
    architecture: [
      "SLO/SLI calculation logic",
      "Error budget alerting",
      "Pre-configured dashboard volumes",
      "Self-healing scraper configs"
    ],
    github: "https://github.com/SibilSoren/sentinel",
    icon: Layers,
    featured: true,
  }
]
