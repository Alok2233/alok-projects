import { Button } from "@/components/ui/button";
const AboutSection = () => {
    return (<section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative circles */}
      <div className="decorative-circle w-64 h-64 -top-32 -left-32 opacity-30 animate-float"/>
      <div className="decorative-circle w-48 h-48 top-1/2 -right-24 opacity-20 animate-float" style={{ animationDelay: "1s" }}/>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-left">
            <h3 className="text-xl font-bold text-foreground">
              Not Your Average Realtor
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Real Trust is an eye for gorgeous properties, standout
              content selling design, and effective marketing to get
              buyers into your driveway within weeks.
            </p>
          </div>

          {/* Right Images */}
          <div className="relative animate-fade-in-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80" alt="Real estate professional" className="rounded-full w-48 h-48 object-cover mx-auto shadow-card hover:scale-105 transition-transform duration-300"/>
              </div>
              <div className="space-y-4 mt-12">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" alt="Real estate team" className="rounded-full w-40 h-40 object-cover mx-auto shadow-card hover:scale-105 transition-transform duration-300"/>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Happy client" className="rounded-full w-36 h-36 object-cover mx-auto shadow-card hover:scale-105 transition-transform duration-300"/>
              </div>
            </div>
            <div className="decorative-dot top-1/4 left-1/2"/>
            <div className="decorative-dot-accent bottom-1/4 left-1/3"/>
          </div>
        </div>

        {/* About Us Section */}
        <div className="mt-24 text-center">
          <h2 className="section-title">About Us</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"/>
          <p className="section-subtitle mt-6">
            Fifteen years of experience in real estate, excellent customer service and a
            commitment to work hard, listen and follow through. We provide quality service to
            build relationships with clients and, more importantly, maintain those relationships
            by communicating effectively.
          </p>
          <Button variant="outline" className="mt-8">
            Learn More
          </Button>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="decorative-dot mx-auto mt-4"/>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
            {
                icon: "🏠",
                title: "Potential ROI",
                description: "Looking for a safe investment to buy a new home? Let us walk you through potential value appreciation.",
            },
            {
                icon: "📐",
                title: "Design",
                description: "No matter, architecture from 1970's or a fresh contemporary build. We bring creative ideas and outstanding craftsmanship to the table.",
            },
            {
                icon: "📈",
                title: "Marketing",
                description: "Staging your home, professional photography and a comprehensive digital marketing plan. Everything to reach more buyers.",
            },
        ].map((item, index) => (<div key={index} className="text-center p-6 hover:bg-secondary/50 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>))}
          </div>
        </div>
      </div>
    </section>);
};
export default AboutSection;
