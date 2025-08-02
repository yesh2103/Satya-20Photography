import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import {
  ArrowRight,
  Camera,
  Heart,
  Star,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import MediaStore from "@/utils/mediaStore";
import type { Media, ServiceType } from "@shared/types";
import { SERVICE_TYPES } from "@shared/types";

// Map service type values to display names
const categoryMapping: { [key: string]: ServiceType } = {
  "Wedding": "wedding",
  "Pre-wedding": "prewedding",
  "New Born Photoshoot": "newborn",
  "Birthdays": "birthdays",
  "Retirement": "retirement",
  "Events": "events",
  "Engagement": "engagement",
};

const categories = [
  "Wedding",
  "Pre-wedding",
  "New Born Photoshoot",
  "Birthdays",
  "Retirement",
  "Events",
  "Engagement",
];

// Fallback images for services without uploaded content
const getServiceFallbackImage = (index: number) => {
  const serviceImages = [
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80', // Wedding
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', // Pre-wedding
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', // Newborn
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80', // Birthdays
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', // Retirement
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80', // Events
  ];
  return serviceImages[index] || serviceImages[0];
};

const testimonials = [
  {
    name: "Priya & Arjun",
    event: "Wedding",
    rating: 5,
    text: "Satya captured our special day beautifully. Every moment was preserved with such artistry and emotion.",
  },
  {
    name: "Sneha",
    event: "Pre-wedding",
    rating: 5,
    text: "The pre-wedding shoot exceeded our expectations. Professional, creative, and stunning results.",
  },
  {
    name: "Raj Family",
    event: "New Born",
    rating: 5,
    text: "Gentle, patient, and created magical memories of our little one. Highly recommended!",
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [allMedia, setAllMedia] = useState<Media[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  // Load media from MediaStore
  useEffect(() => {
    const loadMedia = () => {
      const media = MediaStore.getAllMedia();
      console.log('Home page loaded media:', media.length, 'items');
      setAllMedia(media);

      // Get photos for hero slideshow (prefer photos over videos)
      const photos = media.filter(m => m.type === 'photo');
      if (photos.length > 0) {
        // Use first 3 photos, cycle through if more than 3
        const images = photos.slice(0, 3).map(p => p.url);
        setHeroImages(images);
        console.log('Hero images set:', images.length, 'images');
      } else {
        // Fallback to demo images if no uploads
        setHeroImages([
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1920&q=80",
        ]);
        console.log('Using fallback hero images');
      }
    };

    loadMedia();
    // Refresh every 3 seconds to get new uploads faster
    const interval = setInterval(loadMedia, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40 z-10" />

        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
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
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
              style={{
                fontFamily: 'Cinzel, serif',
                letterSpacing: '0.02em'
              }}>
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              Capturing Life's
            </span>
            <span className="block bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 bg-clip-text text-transparent"
                  style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
              Golden Moments
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Where artistry meets emotion. Professional photography that tells
            your unique story with elegance and sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery">
              <Button
                size="lg"
                className="bg-gold-400 text-luxury-black hover:bg-gold-500 px-8 py-3 text-lg"
              >
                View Gallery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-luxury-black px-8 py-3 text-lg"
              >
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
                index === currentSlide ? "bg-gold-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-6" style={{ backgroundColor: '#0d0d0d', fontFamily: 'Cinzel, serif' }}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 bg-clip-text text-transparent"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '48px',
                  letterSpacing: '0.05em',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}>
              OUR SERVICES
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From intimate moments to grand celebrations, we capture every
              emotion with artistic excellence
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {categories.slice(0, 6).map((category, index) => (
              <div
                key={category}
                className="luxury-service-container"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: '280px',
                  height: '400px',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '15px',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  animation: 'fadeIn 0.8s ease forwards',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(255, 215, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'gold';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={(() => {
                    const serviceType = categoryMapping[category];
                    const categoryMedia = allMedia.filter(m => m.service_type === serviceType && m.type === 'photo');
                    return categoryMedia.length > 0 ? categoryMedia[0].url : getServiceFallbackImage(index);
                  })()
                  }
                  alt={category}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease-in-out'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                  padding: '20px',
                  color: 'white'
                }}>
                  <h3 style={{ color: 'gold', fontSize: '18px', marginBottom: '8px', fontFamily: 'Cinzel, serif' }}>
                    {category}
                  </h3>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>
                    Professional {category.toLowerCase()} photography with artistic flair
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
                About Satya Photography
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                With over a decade of experience in capturing life's most
                precious moments, Satya Photography brings an artistic vision
                that transforms ordinary occasions into extraordinary memories.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our passion lies in storytelling through imagery, using a blend
                of traditional elegance and contemporary artistry to create
                timeless photographs that you'll treasure forever.
              </p>
              <Link to="/about">
                <Button className="bg-gold-400 text-luxury-black hover:bg-gold-500">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="aspect-square bg-gradient-to-br from-luxury-dark-gray to-luxury-medium-gray rounded-lg overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fec2c2ce815f146f392d6151dbdcd7a6d%2F914c1b82cf3645caa7fade56db47a9f8?format=webp&width=800"
                alt="CEO - Raj Karthikeya"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by families and couples across the region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-luxury-medium-gray bg-card"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-gold-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.event}
                    </p>
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
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Satya Photography
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Capturing life's golden moments with artistic excellence and
                professional expertise.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gold-400 hover:text-gold-500 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gold-400 hover:text-gold-500 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/gallery"
                    className="text-muted-foreground hover:text-gold-400 transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages"
                    className="text-muted-foreground hover:text-gold-400 transition-colors"
                  >
                    Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-gold-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-gold-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Contact Info
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">
                    Rajkarthikeya10@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">
                    +91 8374877776
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">
                    Hanamkonda, Warangal, Telangana
                  </span>
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
      {/* Footer */}
      <footer className="bg-luxury-black border-t border-luxury-medium-gray py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fec2c2ce815f146f392d6151dbdcd7a6d%2F2627d12ed9764db4b3d41d0ffb56fd4a?format=webp&width=800"
                  alt="Satya Photography Logo"
                  className="h-16 w-16 object-contain drop-shadow-lg"
                />
                <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 bg-clip-text text-transparent"
                    style={{
                      fontFamily: 'Cinzel, serif',
                      letterSpacing: '0.05em',
                      textShadow: '0 0 15px rgba(255, 215, 0, 0.3)'
                    }}>
                  SATYA<span className="text-gold-300 font-light"> PHOTOGRAPHY</span>
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Capturing life's most precious moments with artistic excellence and professional dedication.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">Rajkarthikeya10@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">+91 8374877776</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  <span className="text-muted-foreground">Hanamkonda, Warangal, Telangana</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/_satyaphotography_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-400/20 p-3 rounded-lg hover:bg-gold-400/30 transition-colors group"
                >
                  <Instagram className="h-6 w-6 text-gold-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.youtube.com/@rajkarthikeya2892"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-400/20 p-3 rounded-lg hover:bg-gold-400/30 transition-colors group"
                >
                  <svg className="h-6 w-6 text-gold-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-luxury-medium-gray mt-8 pt-6 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Satya Photography. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
