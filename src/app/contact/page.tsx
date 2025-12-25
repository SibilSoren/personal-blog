import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Twitter, Github, MapPin, ExternalLink, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4 items-start group">
                <div className="mt-1 bg-primary/10 p-3 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground mb-2">The best way to reach me.</p>
                  <a href="mailto:soren.sibilsarjam@gmail.com" className="text-primary font-medium hover:underline flex items-center gap-1">
                    soren.sibilsarjam@gmail.com <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="mt-1 bg-primary/10 p-3 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">LinkedIn</h3>
                  <p className="text-muted-foreground mb-2">For professional networking.</p>
                  <Link href="https://www.linkedin.com/in/sibilsarjamsoren/" target="_blank" className="text-primary font-medium hover:underline flex items-center gap-1">
                    Connect on LinkedIn <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="mt-1 bg-primary/10 p-3 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">Based in Kolkata, India, working globally.</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-muted/30 p-8 rounded-2xl border border-muted-foreground/10 flex flex-col justify-center items-center text-center">
              {/* Decorative Background Gradient */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
                 <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20" />
                 <MessageSquare className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Let's create something great.</h3>
              <p className="text-muted-foreground mb-8 relative z-10">
                Currently taking on new projects and looking for interesting collaborations.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/SibilSoren" target="_blank">
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:bg-primary/10">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://x.com/sibil_soren_dev" target="_blank">
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:bg-primary/10">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
