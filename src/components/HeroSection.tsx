import { Button } from "@/components/ui/button";
import { Upload, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-manuscript.jpg";

const HeroSection = () => {
  const scrollToTranslator = () => {
    document.getElementById('translator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-secondary w-8 h-8 mr-3 animate-float" />
            <span className="font-modern text-secondary font-medium">Ancient Script • Modern Technology</span>
          </div>
          
          <h1 className="font-manuscript text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
            Translate Ancient{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Brahmi Script
            </span>
            {" "}into Modern Languages
          </h1>
          
          <p className="font-modern text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Unlock the secrets of ancient manuscripts with our AI-powered translator. 
            Convert Brahmi script images to Sanskrit and English instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToTranslator}
              className="btn-hero group"
            >
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Upload Image to Translate
            </Button>
            
            <Button 
              variant="outline"
              className="font-modern px-6 py-3 border-secondary text-secondary hover:bg-secondary/10"
            >
              Try Sample Image
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
            
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;