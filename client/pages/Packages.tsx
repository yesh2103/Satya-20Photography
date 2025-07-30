import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Camera, Heart, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Package, ServiceType } from '@shared/types';
import { SERVICE_TYPES } from '@shared/types';

export default function Packages() {
  const { appUser } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ServiceType | 'all'>('all');

  // Demo packages data
  const demoPackages: Package[] = [
    {
      id: '1',
      title: 'Premium Wedding Package',
      description: 'Complete wedding coverage with premium service',
      price_range: '₹75,000 – ₹1,50,000',
      service_type: 'wedding',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Classic Wedding Package',
      description: 'Essential wedding photography with professional quality',
      price_range: '₹45,000 – ₹80,000',
      service_type: 'wedding',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      title: 'Pre-Wedding Shoot',
      description: 'Romantic outdoor session capturing your love story',
      price_range: '₹15,000 – ₹30,000',
      service_type: 'prewedding',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      title: 'Newborn Photography',
      description: 'Gentle session capturing precious early moments',
      price_range: '₹8,000 – ₹20,000',
      service_type: 'newborn',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '5',
      title: 'Birthday Celebration',
      description: 'Fun and vibrant birthday party photography',
      price_range: '₹5,000 – ₹15,000',
      service_type: 'birthdays',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '6',
      title: 'Corporate Events',
      description: 'Professional event coverage for corporate functions',
      price_range: '₹10,000 – ₹25,000',
      service_type: 'events',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '7',
      title: 'Engagement Ceremony',
      description: 'Capturing the joy of your engagement celebration',
      price_range: '₹12,000 – ₹25,000',
      service_type: 'engagement',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '8',
      title: 'Retirement Celebration',
      description: 'Commemorating life achievements and new beginnings',
      price_range: '₹8,000 – ₹18,000',
      service_type: 'retirement',
      created_by: 'owner-id',
      created_at: '2024-01-01T00:00:00Z'
    }
  ];

  const packageFeatures = {
    premium: [
      'Full day coverage (12+ hours)',
      '2 professional photographers',
      '800+ edited high-resolution photos',
      'Highlight video (3-5 minutes)',
      'Online gallery with download',
      'Premium photo album (100 pages)',
      'Engagement shoot included',
      'Same-day preview (50 photos)',
      'USB drive with all photos',
      'Copyright release'
    ],
    classic: [
      'Full day coverage (8 hours)',
      '1 professional photographer',
      '500+ edited high-resolution photos',
      'Online gallery with download',
      'Standard photo album (60 pages)',
      'USB drive with all photos',
      'Copyright release'
    ],
    standard: [
      'Session coverage (2-3 hours)',
      '1 professional photographer',
      '50+ edited high-resolution photos',
      'Online gallery with download',
      'Copyright release'
    ]
  };

  useEffect(() => {
    setPackages(demoPackages);
  }, []);

  const filteredPackages = selectedCategory === 'all' 
    ? packages 
    : packages.filter(p => p.service_type === selectedCategory);

  const getPackageFeatures = (packageTitle: string) => {
    if (packageTitle.toLowerCase().includes('premium')) return packageFeatures.premium;
    if (packageTitle.toLowerCase().includes('classic')) return packageFeatures.classic;
    return packageFeatures.standard;
  };

  const isPopular = (packageTitle: string) => {
    return packageTitle.toLowerCase().includes('premium') || packageTitle.toLowerCase().includes('pre-wedding');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="pt-24 pb-12 px-6">
          <div className="container mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Our Packages</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional photography packages designed to capture your special moments with artistic excellence
              </p>
              <div className="mt-6 p-4 bg-gold-400/10 border border-gold-400/20 rounded-lg inline-block">
                <p className="text-gold-400 font-medium">
                  ✨ Welcome, {appUser?.name}! These exclusive packages are available to our registered users.
                </p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' 
                    ? 'bg-gold-400 text-luxury-black hover:bg-gold-500' 
                    : 'border-luxury-medium-gray text-foreground hover:bg-gold-400 hover:text-luxury-black'
                  }
                >
                  All Packages ({packages.length})
                </Button>
                
                {SERVICE_TYPES.map((service) => {
                  const count = packages.filter(p => p.service_type === service.value).length;
                  return count > 0 ? (
                    <Button
                      key={service.value}
                      variant={selectedCategory === service.value ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(service.value)}
                      className={selectedCategory === service.value 
                        ? 'bg-gold-400 text-luxury-black hover:bg-gold-500' 
                        : 'border-luxury-medium-gray text-foreground hover:bg-gold-400 hover:text-luxury-black'
                      }
                    >
                      {service.label} ({count})
                    </Button>
                  ) : null;
                })}
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <Card 
                  key={pkg.id} 
                  className={`border-luxury-medium-gray bg-card hover:border-gold-400 transition-all duration-300 relative ${
                    isPopular(pkg.title) ? 'ring-2 ring-gold-400/50' : ''
                  }`}
                >
                  {isPopular(pkg.title) && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gold-400 text-luxury-black px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="mb-4">
                      <div className="bg-gold-400/20 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        {pkg.service_type === 'wedding' ? <Heart className="h-8 w-8 text-gold-400" /> :
                         pkg.service_type === 'newborn' ? <Camera className="h-8 w-8 text-gold-400" /> :
                         <Camera className="h-8 w-8 text-gold-400" />}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-serif text-foreground mb-2">{pkg.title}</CardTitle>
                    <div className="mb-4">
                      <Badge className="bg-gold-400/20 text-gold-400">
                        {SERVICE_TYPES.find(s => s.value === pkg.service_type)?.label}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">{pkg.price_range}</div>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">What's included:</h4>
                      <ul className="space-y-2">
                        {getPackageFeatures(pkg.title).map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3 text-sm">
                            <Check className="h-4 w-4 text-gold-400 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-luxury-medium-gray">
                      <Link to="/contact">
                        <Button className="w-full bg-gold-400 text-luxury-black hover:bg-gold-500">
                          Get Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full border-luxury-medium-gray text-foreground hover:bg-gold-400 hover:text-luxury-black">
                        View Portfolio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Information */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-luxury-medium-gray bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">Custom Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Don't see exactly what you're looking for? We offer custom packages tailored to your specific needs and budget.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Multi-day event coverage</li>
                    <li>• Destination photography</li>
                    <li>• Extended hour packages</li>
                    <li>• Additional photographers</li>
                    <li>• Special requests and add-ons</li>
                  </ul>
                  <Link to="/contact" className="mt-4 inline-block">
                    <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-luxury-black">
                      Discuss Custom Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-luxury-medium-gray bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-foreground">Booking Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gold-400 text-luxury-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-foreground">Initial Consultation</h4>
                        <p className="text-sm text-muted-foreground">Contact us to discuss your event details and requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-gold-400 text-luxury-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-foreground">Package Selection</h4>
                        <p className="text-sm text-muted-foreground">Choose the package that best fits your needs and budget</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-gold-400 text-luxury-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-foreground">Booking Confirmation</h4>
                        <p className="text-sm text-muted-foreground">Secure your date with a 30% advance payment</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
