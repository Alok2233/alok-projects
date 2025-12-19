import { useQuery } from "@tanstack/react-query";
import { clientsApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ClientsSection = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["public-clients"],
    queryFn: clientsApi.getAll,
  });

  const defaultClients = [
    {
      _id: "1",
      name: "Norman Smith",
      designation: "CEO, Real Estate",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.",
      image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
    {
      _id: "2",
      name: "Shara Kayak",
      designation: "Architect",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.",
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      _id: "3",
      name: "John Lepore",
      designation: "Developer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.",
      image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      _id: "4",
      name: "Harry Freeman",
      designation: "Marketing Manager",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.",
      image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
    {
      _id: "5",
      name: "Lucy",
      designation: "Interior Designer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.",
      image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
  ];

  const displayClients = clients && clients.length > 0 ? clients : defaultClients;

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${API_URL}${url}`;
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="decorative-circle w-24 h-24 top-20 left-20 opacity-30 animate-float" />
      <div
        className="decorative-circle w-16 h-16 top-40 right-32 opacity-20 animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">Happy Clients</h2>
        <div className="decorative-dot mx-auto mt-4" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="card-elevated text-center">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
                  <Skeleton className="h-3 w-1/2 mx-auto" />
                </div>
              ))
            : displayClients.map((client, index) => (
                <div
                  key={client._id}
                  className="card-elevated text-center opacity-0 animate-fade-in hover:shadow-elevated hover:-translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={getImageUrl(client.image_url) || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"}
                    alt={client.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary/10 hover:border-primary/30 transition-colors duration-300"
                  />
                  <p className="text-muted-foreground text-sm mb-4 italic line-clamp-4">
                    "{client.description}"
                  </p>
                  <h4 className="font-semibold text-primary">{client.name}</h4>
                  <p className="text-muted-foreground text-xs">
                    {client.designation}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;