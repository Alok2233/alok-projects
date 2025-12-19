import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Services", href: "#services" },
        { name: "Projects", href: "#projects" },
        { name: "Testimonials", href: "#testimonials" },
    ];
    return (<nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground"/>
            </div>
            <span className="text-xl font-bold text-foreground">
              Real<span className="text-muted-foreground font-normal">Trust</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (<a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                {link.name}
              </a>))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                Admin
              </Button>
            </Link>
            <a href="#contact">
              <Button size="sm">Contact</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (<X className="w-6 h-6 text-foreground"/>) : (<Menu className="w-6 h-6 text-foreground"/>)}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (<div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (<a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                  {link.name}
                </a>))}
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Admin
                </Button>
              </Link>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full">
                  Contact
                </Button>
              </a>
            </div>
          </div>)}
      </div>
    </nav>);
};
export default Navbar;
