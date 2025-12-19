import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { newslettersApi } from "@/lib/api";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await newslettersApi.subscribe(email);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      if (error.message.includes("already subscribed")) {
        toast.info("You're already subscribed!");
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-primary py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
            <a
              href="#home"
              className="text-sm hover:text-primary-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-sm hover:text-primary-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#projects"
              className="text-sm hover:text-primary-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#testimonials"
              className="text-sm hover:text-primary-foreground transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-sm hover:text-primary-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <span className="text-primary-foreground text-sm font-medium whitespace-nowrap hidden sm:block">
              Subscribe to
            </span>
            <Input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-48 bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/60 text-sm"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="outline"
              size="sm"
              className="bg-background text-primary hover:bg-background/90 border-none"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;