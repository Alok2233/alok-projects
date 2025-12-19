import { Home, Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
const Footer = () => {
    return (<footer className="bg-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-background/60 text-sm">
            All Rights Reserved 2024
          </p>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Home className="w-4 h-4 text-primary-foreground"/>
            </div>
            <span className="text-background font-semibold">
              Real<span className="font-normal text-background/60">Trust</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter className="w-4 h-4 text-background"/>
            </a>
            <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram className="w-4 h-4 text-background"/>
            </a>
            <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="w-4 h-4 text-background"/>
            </a>
            <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Linkedin className="w-4 h-4 text-background"/>
            </a>
          </div>
        </div>
      </div>
    </footer>);
};
export default Footer;
