import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  features: string[];
  isActive?: boolean;
}

export default function PlaceholderPage({ title, description, features, isActive = false }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-luxury-medium-gray">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Camera className="h-8 w-8 text-gold-400" />
              <h1 className="text-2xl font-serif font-bold text-foreground">Satya Photography</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-gold-400 transition-colors">Home</Link>
              <Link to="/gallery" className="text-foreground hover:text-gold-400 transition-colors">Gallery</Link>
              <Link to="/about" className={`transition-colors ${title === 'About' ? 'text-gold-400' : 'text-foreground hover:text-gold-400'}`}>About</Link>
              <Link to="/packages" className={`transition-colors ${title === 'Packages' ? 'text-gold-400' : 'text-foreground hover:text-gold-400'}`}>Packages</Link>
              <Link to="/contact" className={`transition-colors ${title === 'Contact' ? 'text-gold-400' : 'text-foreground hover:text-gold-400'}`}>Contact</Link>
              <Link to="/login">
                <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-luxury-black">
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <Camera className="h-16 w-16 text-gold-400 mx-auto mb-6" />
            <h1 className="text-4xl font-serif mb-4 text-foreground">{title}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {description}
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Continue prompting to add:
              </p>
              <ul className="list-disc list-inside text-left max-w-md mx-auto text-muted-foreground space-y-2">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Link to="/">
                <Button className="bg-gold-400 text-luxury-black hover:bg-gold-500">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
