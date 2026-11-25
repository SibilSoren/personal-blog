import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/drafting/section-heading"
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld"
import { absoluteUrl, siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Sibil Sarjam Soren — backend engineer in Kolkata, currently Senior Analyst at Accenture. Node.js, TypeScript, PostgreSQL and Redis, with a focus on what systems do when something goes wrong.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    type: "profile",
    url: absoluteUrl("/about"),
    title: "About | Sibil Sarjam Soren",
    description: "Backend engineer in Kolkata. Node.js, TypeScript, PostgreSQL and Redis.",
  },
}

const experiences = [
  {
    company: "Accenture",
    logo: "/logos/accenture.png",
    roles: [
      {
        title: "Backend Engineer (Senior Analyst)",
        period: "Nov 2024 - Present",
        description: "Backend work on a piped natural gas platform that connects consumers to their regional gas vendors. Node.js and TypeScript services, Redis caching for frequently read configuration data, and Jest test suites wired into the deployment pipeline, with some Next.js and React on the frontend. Runs on Azure.",
        tags: ["Node.js", "TypeScript", "Redis", "Azure", "Next.js", "React", "Jest"]
      }
    ]
  },
  {
    company: "Team Geek Solutions",
    logo: "/logos/teamgeek.png",
    roles: [
      {
        title: "Software Developer",
        period: "Dec 2023 - Sep 2024",
        description: "Built robust web applications using MongoDB, Express.js, React, and Node.js. Optimized cloud infrastructure on AWS for scalability and cost-efficiency. Spearheaded the development of EvalTech.AI, significantly reducing load times and enhancing user experience through reusable component architecture.",
        tags: ["Node.js", "AWS", "MongoDB", "Express.js", "System Design"]
      }
    ]
  },
  {
    company: "Newgen Software",
    logo: "/logos/newgen.png",
    roles: [
      {
        title: "Senior Software Design Engineer - 2",
        period: "Jan 2023 - Dec 2023",
        description: "Implemented complex state management solutions using Redux API. Focused on optimizing React components to minimize re-renders and improve overall application performance. Mentored junior developers and conducted rigorous code reviews to maintain high quality standards.",
        tags: ["React.js", "Redux", "Performance Optimization", "Micro-frontends"]
      },
      {
        title: "Software Design Engineer - 1",
        period: "Jan 2022 - Jan 2023",
        description: "Collaborated with designers to translate high-fidelity mockups into responsive, interactive UI components. Built modular and reusable libraries to streamline development across multiple projects. Integrated complex backend APIs with frontend services.",
        tags: ["React.js", "UI/UX", "JavaScript", "API Integration"]
      }
    ]
  },
  {
    company: "eClerx",
    logo: "/logos/eclerx.png",
    roles: [
      {
        title: "Full Stack Developer Intern",
        period: "Sep 2021 - Jan 2022",
        description: "Developed a full-stack web application using React, Node.js, Koa.js, and MongoDB. Implemented data visualization dashboards using Chart.js to provide actionable customer insights. Gained hands-on experience with agile development methodologies.",
        tags: ["Koa.js", "MongoDB", "Chart.js", "Full Stack"]
      }
    ]
  }
]

const skills = [
  { category: "Backend", items: ["Node.js", "Express", "NestJS", "PostgreSQL", "Redis", "MongoDB", "GraphQL"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Zustand"] },
  { category: "Tools & DevOps", items: ["Azure", "Docker", "Jest", "Git", "CI/CD", "System Design"] },
]

export default function AboutPage() {
  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section aria-labelledby="about-title" className="border-b border-ink-line bg-grid">
        <Container className="grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_13rem] md:items-start md:py-20">
          <div className="min-w-0">
            <p className="font-mono text-xs text-muted-foreground md:text-sm">About</p>
            <h1
              id="about-title"
              className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.01em] text-primary-text md:text-6xl"
            >
              {siteConfig.name}
            </h1>
            <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-foreground">
              Most of what I build sits behind an API — caching layers, job queues, notification
              pipelines, rate limiters.
            </p>
            <div className="mt-5 grid max-w-[65ch] gap-4 text-lg leading-relaxed text-body">
              <p>
                I&apos;m a backend engineer in Kolkata, currently a {siteConfig.jobTitle} at{" "}
                {siteConfig.employer}, working in Node.js and TypeScript on a piped natural gas
                platform that connects consumers to their regional gas vendors.
              </p>
              <p>
                I came into software from mechanical engineering, so I learned this by building
                things and breaking them — which is still mostly how I work. I&apos;m most
                interested in what a system does when something goes wrong, because that is usually
                where the actual design decisions are.
              </p>
              <p>
                Outside work I contribute fixes and features to open source projects such as
                node-redis and openship. They&apos;re listed on the{" "}
                <Link
                  href="/open-source"
                  className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
                >
                  open source
                </Link>{" "}
                page.
              </p>
            </div>
          </div>

          {/* The photo as a figure on the sheet, with a caption cell under it. */}
          <figure className="w-40 border border-ink-line bg-card md:w-full">
            <div className="relative aspect-square">
              <Image
                src="/avatar.jpg"
                alt={siteConfig.name}
                fill
                sizes="(max-width: 768px) 160px, 208px"
                priority
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-ink-line px-3 py-2 font-mono text-xs text-muted-foreground">
              {siteConfig.location}
            </figcaption>
          </figure>
        </Container>
      </section>

      <Container className="mt-16 grid gap-20">
        <section aria-labelledby="experience-heading" className="grid gap-2">
          <SectionHeading id="experience-heading" title="Experience" caption="Most recent first" />
          <ol>
            {experiences.map((exp) => (
              <li
                key={exp.company}
                className="grid gap-4 border-b border-border py-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8"
              >
                <div className="flex items-center gap-3 md:items-start">
                  {/* Logos are drawn for a white ground, so they keep one in both themes. */}
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden border border-ink-line bg-white">
                    <Image src={exp.logo} alt="" fill sizes="44px" className="object-contain p-1" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary-text">{exp.company}</h3>
                </div>

                <div className="grid gap-6">
                  {exp.roles.map((role) => (
                    <div key={role.title} className="min-w-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <h4 className="font-semibold text-foreground">{role.title}</h4>
                        <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                          {role.period}
                        </span>
                      </div>
                      <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-body">
                        {role.description}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                        {role.tags.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="skills-heading" className="grid gap-4">
          <SectionHeading id="skills-heading" title="Skills" caption="What I work with" />
          <dl className="border-l border-t border-ink-line">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="grid border-b border-r border-ink-line bg-card sm:grid-cols-[12rem_minmax(0,1fr)]"
              >
                <dt className="border-ink-line px-3 py-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-primary-text sm:border-r">
                  {skill.category}
                </dt>
                <dd className="px-3 pb-2.5 font-mono text-xs leading-6 text-foreground sm:py-2.5">
                  {skill.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="border-t border-ink-line pt-6 text-sm text-muted-foreground">
          Email, LinkedIn and the rest are on the{" "}
          <Link
            href="/contact"
            className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
          >
            contact
          </Link>{" "}
          page, or download the{" "}
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noreferrer"
            className="text-primary-text underline decoration-border underline-offset-4 hover:decoration-primary-text"
          >
            resume (PDF)
          </a>
          .
        </p>
      </Container>
    </div>
  )
}
