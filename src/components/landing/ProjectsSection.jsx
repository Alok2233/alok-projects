import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
const ProjectsSection = () => {
    const { data: projects, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            return data;
        },
    });
    const defaultProjects = [
        {
            id: "1",
            name: "Consultation",
            description: "Expert advice for buying and selling properties",
            image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
        },
        {
            id: "2",
            name: "Design",
            description: "Interior design and staging services",
            image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
        },
        {
            id: "3",
            name: "Marketing & Design",
            description: "Comprehensive marketing solutions",
            image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
        },
        {
            id: "4",
            name: "Consultation & Marketing",
            description: "Full-service real estate package",
            image_url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80",
        },
        {
            id: "5",
            name: "Premium Sales",
            description: "Luxury property sales and marketing",
            image_url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
        },
    ];
    const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;
    return (<section id="projects" className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle">
          We know what buyers are looking for and suggest projects that will bring
          clients top dollar for the sale of their homes.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (<div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg"/>
                  <Skeleton className="h-4 w-3/4"/>
                  <Skeleton className="h-3 w-full"/>
                </div>))
            : displayProjects.map((project, index) => (<div key={project.id} className="group opacity-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative overflow-hidden rounded-lg mb-4 shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <img src={project.image_url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80"} alt={project.name} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"/>
                  </div>
                  <h3 className="font-semibold text-accent mb-1 group-hover:text-primary transition-colors duration-300">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-transform duration-200">
                    Read More
                  </Button>
                </div>))}
        </div>

        {/* Decorative dot */}
        <div className="decorative-dot-accent mx-auto mt-12"/>
      </div>
    </section>);
};
export default ProjectsSection;
