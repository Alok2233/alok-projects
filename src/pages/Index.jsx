import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import ClientsSection from "@/components/landing/ClientsSection";
import CTASection from "@/components/landing/CTASection";
import NewsletterSection from "@/components/landing/NewsletterSection";
import Footer from "@/components/landing/Footer";
const Index = () => {
    return (<div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ClientsSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
    </div>);
};
export default Index;
