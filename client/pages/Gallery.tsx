import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Camera, Filter, Play, Heart } from "lucide-react";
import type { Media, ServiceType } from "@shared/types";
import { SERVICE_TYPES } from "@shared/types";

// Demo media data - in real app this would come from API/database
const demoMedia: Media[] = [
  {
    id: "1",
    title: "Beautiful Wedding Ceremony",
    type: "photo",
    service_type: "wedding",
    url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80",
    uploaded_by: "owner-id",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Romantic Pre-wedding Shoot",
    type: "photo",
    service_type: "prewedding",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    uploaded_by: "owner-id",
    created_at: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    title: "Precious Newborn Moments",
    type: "photo",
    service_type: "newborn",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    uploaded_by: "owner-id",
    created_at: "2024-01-13T11:20:00Z",
  },
  {
    id: "4",
    title: "Engagement Celebration",
    type: "video",
    service_type: "engagement",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    uploaded_by: "owner-id",
    created_at: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Birthday Party Fun",
    type: "photo",
    service_type: "birthdays",
    url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    uploaded_by: "owner-id",
    created_at: "2024-01-11T14:15:00Z",
  },
  {
    id: "6",
    title: "Corporate Event",
    type: "photo",
    service_type: "events",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    uploaded_by: "owner-id",
    created_at: "2024-01-10T12:30:00Z",
  },
  {
    id: "7",
    title: "Retirement Celebration",
    type: "video",
    service_type: "retirement",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    uploaded_by: "owner-id",
    created_at: "2024-01-09T17:00:00Z",
  },
  {
    id: "8",
    title: "Wedding Highlights",
    type: "video",
    service_type: "wedding",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    uploaded_by: "owner-id",
    created_at: "2024-01-08T13:45:00Z",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceType | "all">(
    "all",
  );
  const [filteredMedia, setFilteredMedia] = useState<Media[]>(demoMedia);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredMedia(demoMedia);
    } else {
      setFilteredMedia(
        demoMedia.filter((media) => media.service_type === selectedCategory),
      );
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category: ServiceType | "all") => {
    setSelectedCategory(category);
  };

  const openLightbox = (media: Media) => {
    setSelectedMedia(media);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d0d', fontFamily: 'Cinzel, serif' }}>
      <Navigation />

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: 'gold', textShadow: '0 0 15px rgba(255, 215, 0, 0.3)', fontSize: '40px' }}>
              Our Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of beautiful moments captured with artistic
              excellence
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Filter className="h-5 w-5 text-gold-400" />
              <h2 className="text-lg font-semibold text-foreground">
                Filter by Category
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => handleCategoryChange("all")}
                className={
                  selectedCategory === "all"
                    ? "bg-gold-400 text-luxury-black hover:bg-gold-500"
                    : "border-luxury-medium-gray text-foreground hover:bg-gold-400 hover:text-luxury-black"
                }
              >
                All ({demoMedia.length})
              </Button>

              {SERVICE_TYPES.map((service) => {
                const count = demoMedia.filter(
                  (media) => media.service_type === service.value,
                ).length;
                return (
                  <Button
                    key={service.value}
                    variant={
                      selectedCategory === service.value ? "default" : "outline"
                    }
                    onClick={() => handleCategoryChange(service.value)}
                    className={
                      selectedCategory === service.value
                        ? "bg-gold-400 text-luxury-black hover:bg-gold-500"
                        : "border-luxury-medium-gray text-foreground hover:bg-gold-400 hover:text-luxury-black"
                    }
                  >
                    {service.label} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Media Grid */}
          <div className="flex flex-wrap justify-center gap-5">
            {filteredMedia.map((media, index) => (
              <div
                key={media.id}
                className="luxury-gallery-container"
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
                  cursor: 'pointer',
                  animationDelay: `${index * 0.1}s`
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
                onClick={() => openLightbox(media)}
              >
                <img
                  src={media.url.replace('w=800', 'w=1200')}
                  alt={media.title || `${media.service_type} ${media.type}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease-in-out'
                  }}
                />

                {/* Media Type Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '8px',
                  borderRadius: '8px'
                }}>
                  {media.type === "video" ? (
                    <Play className="h-4 w-4 text-white" />
                  ) : (
                    <Camera className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* Service Type Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px'
                }}>
                  <Badge className="bg-gold-400 text-luxury-black hover:bg-gold-500">
                    {
                      SERVICE_TYPES.find(
                        (s) => s.value === media.service_type,
                      )?.label
                    }
                  </Badge>
                </div>

                {/* Bottom Content Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                  padding: '20px',
                  color: 'white'
                }}>
                  <h3 style={{ color: 'gold', fontSize: '16px', marginBottom: '4px', fontFamily: 'Cinzel, serif' }}>
                    {media.title || `${media.service_type} ${media.type}`}
                  </h3>
                  <p style={{ fontSize: '12px', opacity: 0.9 }}>
                    {SERVICE_TYPES.find((s) => s.value === media.service_type)?.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Empty State */}
          {filteredMedia.length === 0 && (
            <div className="text-center py-16">
              <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No media found
              </h3>
              <p className="text-muted-foreground">
                No {selectedCategory === "all" ? "" : selectedCategory} photos
                or videos available yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          style={{ fontFamily: 'Cinzel, serif' }}
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-2xl font-bold transition-all duration-300 p-2 rounded-full"
              style={{
                background: 'rgba(255, 215, 0, 0.2)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
              }}
            >
              ✕
            </button>

            <div style={{
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '15px',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
              background: 'rgba(13, 13, 13, 0.9)',
              overflow: 'hidden'
            }}>
              <div className="aspect-video bg-luxury-dark-gray flex items-center justify-center">
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full object-contain"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <p className="text-foreground text-center">
                      Your browser does not support video playback.
                    </p>
                  </video>
                ) : (
                  <img
                    src={selectedMedia.url.replace('w=800', 'w=1920')}
                    alt={selectedMedia.title || "Media"}
                    className="max-w-full max-h-full object-contain"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
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
                      {
                        SERVICE_TYPES.find(
                          (s) => s.value === selectedMedia.service_type,
                        )?.label
                      }
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
