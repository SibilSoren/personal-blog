import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
        title: "Senior Software Engineer",
        period: "Nov 2024 - Present",
        description: "Leading development of enterprise-scale applications in the Financial and Energy service domains. Architecting robust backend systems using Java Spring Boot and NestJS. Leveraging Kafka for distributed messaging and Splunk for advanced monitoring and observability.",
        tags: ["Java", "Spring Boot", "NestJS", "Kafka", "Splunk", "AWS", "TypeScript"]
      }
    ]
  },
  {
    company: "Team Geek Solutions",
    logo: "/logos/teamgeek.png",
    roles: [
      {
        title: "Software Developer",
        period: "Dec 2023 - Nov 2024",
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
  { category: "Backend", items: ["Java", "Spring Boot", "NestJS", "Node.js", "Express", "PostgreSQL", "Kafka", "Redis"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Zustand"] },
  { category: "Tools & DevOps", items: ["AWS", "Docker", "Splunk", "Git", "CI/CD", "System Design"] },
]

export default function AboutPage() {
  return (
    <div className="py-20 flex flex-col gap-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Container>
        <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start">
          <div className="space-y-8">
            <section>
              <h1 className="text-4xl font-bold mb-6">About Me</h1>
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
                  <Image 
                    src="/avatar.png" 
                    alt="Sibil Sarjam Soren" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                    &ldquo;Most of what I build sits behind an API — caching layers, job
                    queues, notification pipelines, rate limiters.&rdquo;
                  </p>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>
                      I&apos;m a backend engineer in Kolkata, currently a {siteConfig.jobTitle} at{" "}
                      {siteConfig.employer}, working in Node.js and TypeScript on a piped natural
                      gas platform that connects consumers to their regional gas vendors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-lg">
                <p>
                   I came into software from mechanical engineering, so I learned this by
                   building things and breaking them — which is still mostly how I work. I&apos;m
                   most interested in what a system does when something goes wrong, because that
                   is usually where the actual design decisions are.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-8">
                <Briefcase className="h-6 w-6 text-primary-text" />
                <h2 className="text-2xl font-bold">Work Experience</h2>
              </div>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="flex gap-4 md:gap-6">
                    {/* Company Logo Column */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 relative rounded-md overflow-hidden bg-white shadow-sm border shrink-0">
                         <Image src={exp.logo} alt={exp.company} fill className="object-contain p-1" />
                      </div>
                      {/* Vertical line connecting to next company or roles */}
                      {index !== experiences.length - 1 && (
                        <div className="w-px h-full bg-border mt-2" />
                      )}
                    </div>
                
                    {/* Experience Details Column */}
                    <div className="flex-1 pb-10">
                      <h3 className="text-lg font-bold">{exp.company}</h3>
                      
                      <div className="mt-4 space-y-8">
                        {exp.roles.map((role, rIndex) => (
                          <div key={rIndex} className="relative">
                            {/* Connector for multi-role companies similar to LinkedIn */}
                            {exp.roles.length > 1 && rIndex !== exp.roles.length - 1 && (
                                <div className="absolute left-[calc(-1.5rem-1px)] top-[2.5rem] bottom-[-2rem] w-px bg-border md:left-[calc(-2rem-1px)]" />
                            )}
                            {exp.roles.length > 1 && (
                                <div className="absolute left-[calc(-1.5rem-4px)] top-[0.6rem] w-2 h-2 rounded-full bg-muted-foreground/30 md:left-[calc(-2rem-4px)]" />
                            )}
                            
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                              <h4 className="text-base font-semibold leading-tight">{role.title}</h4>
                              <span className="text-sm text-muted-foreground shrink-0">{role.period}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{role.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {role.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded font-medium text-muted-foreground border border-border/50">{tag}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 sticky top-24 self-start">
            <div className="bg-muted/30 p-6 rounded-2xl border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Code className="h-4 w-4 text-primary-text" /> Skills
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-3">{skill.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(item => (
                        <Badge key={item} variant="outline" className="bg-background hover:border-primary hover:text-primary-text transition-colors">{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex flex-col gap-3">
                <Link href="https://www.linkedin.com/in/sibilsarjamsoren/" target="_blank" className="flex items-center gap-3 text-sm hover:text-primary-text transition-colors">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </Link>
                <Link href="https://github.com/SibilSoren" target="_blank" className="flex items-center gap-3 text-sm hover:text-primary-text transition-colors">
                  <Github className="h-4 w-4" /> GitHub
                </Link>
                <Link href="mailto:soren.sibilsarjam@gmail.com" className="flex items-center gap-3 text-sm hover:text-primary-text transition-colors">
                  <Mail className="h-4 w-4" /> Email
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}

function Code({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
