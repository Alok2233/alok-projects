import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
const HeroSection = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        mobile: "",
        city: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from("contacts").insert([formData]);
            if (error)
                throw error;
            toast.success("Thank you! We'll contact you soon.");
            setFormData({ full_name: "", email: "", mobile: "", city: "" });
        }
        catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<section id="home" className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80" alt="Real estate consultation" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40"/>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-background">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-left">
              Consultation,
              <br />
              Design,
              <br />
              & Marketing
            </h1>
            <p className="text-lg text-background/80 max-w-md animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
              We provide expert real estate services with a commitment to excellence and customer satisfaction.
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="bg-primary p-8 rounded-xl shadow-elevated max-w-md ml-auto hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                Get a Free
              </h3>
              <h2 className="text-2xl font-bold text-primary-foreground mb-6">
                Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Full Name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} required className="bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/60"/>
                <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/60"/>
                <Input placeholder="Mobile Number" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required className="bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/60"/>
                <Input placeholder="Your City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required className="bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/60"/>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  {isSubmitting ? "Submitting..." : "Get Quote Now"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-circle w-32 h-32 top-32 left-10 opacity-20 hidden lg:block animate-float"/>
      <div className="decorative-dot top-40 right-20 hidden lg:block animate-pulse-soft"/>
    </section>);
};
export default HeroSection;
