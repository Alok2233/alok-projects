import { Button } from "@/components/ui/button";
const CTASection = () => {
    return (<section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="Modern living room" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-foreground/60"/>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-background mb-4 max-w-2xl mx-auto animate-fade-in">
          Learn more about our listing process, as well as our additional staging and design work.
        </h2>
        <Button variant="outline" className="mt-6 bg-background/10 border-background text-background hover:bg-background hover:text-foreground hover:scale-105 transition-all duration-300">
          Learn More
        </Button>
      </div>
    </section>);
};
export default CTASection;
