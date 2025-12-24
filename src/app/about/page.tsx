import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Github, Linkedin, Twitter, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const experiences = [
  {
    company: "Accenture",
    role: "Senior Software Engineer",
    period: "2021 - Present",
    description: "Leading development of enterprise-scale applications, optimizing performance, and mentoring junior engineers. Specializing in modern React ecosystems and cloud-native solutions.",
    tags: ["React", "TypeScript", "Node.js", "AWS"]
  },
  {
    company: "Previous Tech Co.",
    role: "Software Engineer",
    period: "2018 - 2021",
    description: "Developed and maintained multiple client-facing applications. Focused on building responsive UI components and integrating complex RESTful APIs.",
    tags: ["JavaScript", "React", "Redux", "Express"]
  }
]

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Zustand"] },
  { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Rest API", "GraphQL"] },
  { category: "Tools & DevOps", items: ["Git", "Docker", "AWS", "Vercel", "Netlify", "CI/CD"] },
]

export default function AboutPage() {
  return (
    <div className="py-20 flex flex-col gap-20">
      <Container>
        <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start">
          <div className="space-y-8">
            <section>
              <h1 className="text-4xl font-bold mb-6">About Me</h1>
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
                  <Image 
                    src="/avatar.png" 
                    alt="Sibil Soren" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                  "Senior Software Engineer passionate about building products that are as robust under the hood as they are beautiful on the outside."
                </p>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-lg">
                <p>
                  I'm a Senior Software Engineer at Accenture with a focus on building exceptional digital experiences. My core expertise lies in the JavaScript/TypeScript ecosystem, particularly focusing on React and Next.js for high-performance frontend solutions and Node.js for scalable backend architectures.
                </p>
                <p>
                  I believe in writing clean, maintainable code and building systems that solve real-world problems effectively. Whether it's architecting a new application from scratch or optimizing legacy systems, I enjoy the challenge of finding the most efficient solutions.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-8">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Work Experience</h2>
              </div>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l border-muted-foreground/20 last:border-0 pb-8 last:pb-0">
                    <div className="absolute left-[-5px] top-1 h-[9px] w-[9px] rounded-full bg-primary" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <Badge variant="secondary" className="w-fit">{exp.period}</Badge>
                    </div>
                    <p className="text-primary font-medium mb-4">{exp.company}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-muted px-2 py-1 rounded font-bold text-muted-foreground uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-muted/30 p-6 rounded-2xl border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" /> Skills
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-3">{skill.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(item => (
                        <Badge key={item} variant="outline" className="bg-background">{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex flex-col gap-3">
                <Link href="https://www.linkedin.com/in/sibilsarjamsoren/" target="_blank" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </Link>
                <Link href="https://github.com/SibilSoren" target="_blank" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Github className="h-4 w-4" /> GitHub
                </Link>
                <Link href="mailto:sibil@example.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
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
