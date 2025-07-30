import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Filter, Play, Heart } from 'lucide-react';
import type { Media, ServiceType } from '@shared/types';
import { SERVICE_TYPES } from '@shared/types';

// Demo media data - in real app this would come from API/database
const demoMedia: Media[] = [
  {
    id: '1',
    title: 'Beautiful Wedding Ceremony',
    type: 'photo',
    service_type: 'wedding',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Romantic Pre-wedding Shoot',
    type: 'photo',
    service_type: 'prewedding',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Precious Newborn Moments',
    type: 'photo',
    service_type: 'newborn',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-13T11:20:00Z'
  },
  {
    id: '4',
    title: 'Engagement Celebration',
    type: 'video',
    service_type: 'engagement',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    title: 'Birthday Party Fun',
    type: 'photo',
    service_type: 'birthdays',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-11T14:15:00Z'
  },
  {
    id: '6',
    title: 'Corporate Event',
    type: 'photo',
    service_type: 'events',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-10T12:30:00Z'
  },
  {
    id: '7',
    title: 'Retirement Celebration',
    type: 'video',
    service_type: 'retirement',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-09T17:00:00Z'
  },
  {
    id: '8',
    title: 'Wedding Highlights',
    type: 'video',
    service_type: 'wedding',
    url: '/placeholder.svg',
    uploaded_by: 'owner-id',
    created_at: '2024-01-08T13:45:00Z'
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceType | 'all'>('all');
  const [filteredMedia, setFilteredMedia] = useState<Media[]>(demoMedia);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredMedia(demoMedia);
    } else {
      setFilteredMedia(demoMedia.filter(media => media.service_type === selectedCategory));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category: ServiceType | 'all') => {
    setSelectedCategory(category);
  };

  const openLightbox = (media: Media) => {
    setSelectedMedia(media);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

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
              <Link to="/gallery" className="text-gold-400">Gallery</Link>
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

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Our Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of beautiful moments captured with artistic excellence
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Filter className="h-5 w-5 text-gold-400" />
              <h2 className="text-lg font-semibold text-foreground">Filter by Category</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => handleCategoryChange('all')}
                className={selectedCategory === 'all' 
                  ? 'bg-gold-400 text-luxury-black hover:bg-gold-500' 
                  : 'border-luxury-medium-gray text-foreground hover:bg-gold-400 hover:text-luxury-black'
                }
              >
                All ({demoMedia.length})
              </Button>
              
              {SERVICE_TYPES.map((service) => {
                const count = demoMedia.filter(media => media.service_type === service.value).length;
                return (
                  <Button
                    key={service.value}
                    variant={selectedCategory === service.value ? 'default' : 'outline'}
                    onClick={() => handleCategoryChange(service.value)}
                    className={selectedCategory === service.value 
                      ? 'bg-gold-400 text-luxury-black hover:bg-gold-500' 
                      : 'border-luxury-medium-gray text-foreground hover:bg-gold-400 hover:text-luxury-black'
                    }
                  >
                    {service.label} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((media) => (
              <Card
                key={media.id}
                className="group cursor-pointer border-luxury-medium-gray bg-card hover:border-gold-400 transition-all duration-300 overflow-hidden"
                onClick={() => openLightbox(media)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-gradient-to-br from-luxury-dark-gray to-luxury-medium-gray">
                    <img
                      src={media.url}
                      alt={media.title || `${media.service_type} ${media.type}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Media Type Indicator */}
                    <div className="absolute top-3 right-3">
                      {media.type === 'video' ? (
                        <div className="bg-black/80 p-2 rounded-lg">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="bg-black/80 p-2 rounded-lg">
                          <Camera className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Service Type Badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-gold-400 text-luxury-black hover:bg-gold-500">
                        {SERVICE_TYPES.find(s => s.value === media.service_type)?.label}
                      </Badge>
                    </div>

                    {/* Hover Heart Icon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-gold-400/90 p-4 rounded-full">
                        <Heart className="h-8 w-8 text-luxury-black" />
                      </div>
                    </div>
                  </div>

                  {/* Media Info */}
                  {media.title && (
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm truncate">
                        {media.title}
                      </h3>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredMedia.length === 0 && (
            <div className="text-center py-16">
              <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No media found</h3>
              <p className="text-muted-foreground">
                No {selectedCategory === 'all' ? '' : selectedCategory} photos or videos available yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gold-400 text-2xl font-bold"
            >
              ✕
            </button>
            
            <div className="bg-card border border-luxury-medium-gray rounded-lg overflow-hidden">
              <div className="aspect-video bg-luxury-dark-gray flex items-center justify-center">
                {selectedMedia.type === 'video' ? (
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                    <p className="text-foreground">Video preview would appear here</p>
                  </div>
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title || 'Media'}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
              
              {selectedMedia.title && (
                <div className="p-6">
                  <h3 className="text-xl font-serif text-foreground mb-2">
                    {selectedMedia.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>
                      {SERVICE_TYPES.find(s => s.value === selectedMedia.service_type)?.label}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{selectedMedia.type}</span>
                    <span>•</span>
                    <span>
                      {new Date(selectedMedia.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
