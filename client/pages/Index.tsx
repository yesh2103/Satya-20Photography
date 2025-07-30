import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Camera, Heart, Star, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const categories = [
  'Wedding',
  'Pre-wedding', 
  'New Born Photoshoot',
  'Birthdays',
  'Retirement',
  'Events',
  'Engagement'
];

const testimonials = [
  {
    name: "Priya & Arjun",
    event: "Wedding",
    rating: 5,
    text: "Satya captured our special day beautifully. Every moment was preserved with such artistry and emotion."
  },
  {
    name: "Sneha",
    event: "Pre-wedding",
    rating: 5,
    text: "The pre-wedding shoot exceeded our expectations. Professional, creative, and stunning results."
  },
  {
    name: "Raj Family",
    event: "New Born",
    rating: 5,
    text: "Gentle, patient, and created magical memories of our little one. Highly recommended!"
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Demo images for slideshow - these would be replaced with actual photos
  const heroImages = [
    '/placeholder.svg',
    '/placeholder.svg', 
    '/placeholder.svg'
  ];

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
              <Link to="/about" className="text-foreground hover:text-gold-400 transition-colors">About</Link>
              <Link to="/packages" className="text-foreground hover:text-gold-400 transition-colors">Packages</Link>
              <Link to="/contact" className="text-foreground hover:text-gold-400 transition-colors">Contact</Link>
              <Link to="/login">
                <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-luxury-black">
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 z-10" />
        
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-foreground leading-tight">
            Capturing Life's
            <span className="block text-gold-400">Golden Moments</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Where artistry meets emotion. Professional photography that tells your unique story with elegance and sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery">
              <Button size="lg" className="bg-gold-400 text-luxury-black hover:bg-gold-500 px-8 py-3 text-lg">
                View Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-luxury-black px-8 py-3 text-lg">
                Book Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Slideshow indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-gold-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From intimate moments to grand celebrations, we capture every emotion with artistic excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((category, index) => (
              <Card key={category} className="group cursor-pointer border-luxury-medium-gray bg-card hover:border-gold-400 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-luxury-dark-gray to-luxury-medium-gray rounded-lg mb-4 flex items-center justify-center">
                    <Heart className="h-12 w-12 text-gold-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-serif mb-2 text-foreground">{category}</h3>
                  <p className="text-muted-foreground">Professional {category.toLowerCase()} photography with artistic flair</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">About Satya Photography</h2>
              <p className="text-lg text-muted-foreground mb-6">
                With over a decade of experience in capturing life's most precious moments, Satya Photography 
                brings an artistic vision that transforms ordinary occasions into extraordinary memories.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our passion lies in storytelling through imagery, using a blend of traditional elegance 
                and contemporary artistry to create timeless photographs that you'll treasure forever.
              </p>
              <Link to="/about">
                <Button className="bg-gold-400 text-luxury-black hover:bg-gold-500">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="aspect-square bg-gradient-to-br from-luxury-dark-gray to-luxury-medium-gray rounded-lg flex items-center justify-center">
              <Camera className="h-24 w-24 text-gold-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Trusted by families and couples across the region
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-luxury-medium-gray bg-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-dark-gray py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Camera className="h-8 w-8 text-gold-400" />
                <h3 className="text-2xl font-serif font-bold text-foreground">Satya Photography</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Capturing life's golden moments with artistic excellence and professional expertise.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gold-400 hover:text-gold-500 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gold-400 hover:text-gold-500 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/gallery" className="text-muted-foreground hover:text-gold-400 transition-colors">Gallery</Link></li>
                <li><Link to="/packages" className="text-muted-foreground hover:text-gold-400 transition-colors">Packages</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-gold-400 transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-gold-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">info@satyaphotography.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">Hyderabad, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-luxury-medium-gray mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Satya Photography. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
