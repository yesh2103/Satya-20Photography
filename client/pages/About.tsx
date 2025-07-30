import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Users, Award, Star, Heart, Target } from 'lucide-react';

const stats = [
  {
    number: '1020+',
    label: 'Weddings Captured',
    icon: Heart
  },
  {
    number: '780+',
    label: 'Saree Ceremonies',
    icon: Star
  },
  {
    number: '1500+',
    label: 'Birthdays & Baby Photoshoots',
    icon: Camera
  }
];

const teamMembers = [
  {
    name: 'Anil Kumar',
    position: 'Founder & Lead Photographer',
    image: '/placeholder.svg',
    description: 'With over a decade of experience, Anil founded Satya Photography with a vision to create timeless memories.'
  },
  {
    name: 'Raj Karthikeya',
    position: 'Studio Manager',
    image: '/placeholder.svg',
    description: 'Ensuring seamless operations and exceptional client experiences across all our photography sessions.'
  },
  {
    name: 'Deepika Rao',
    position: 'Creative Director',
    image: '/placeholder.svg',
    description: 'Leading our creative vision and artistic direction to capture unique and stunning imagery.'
  },
  {
    name: 'Ravi Teja',
    position: 'Post Production Head',
    image: '/placeholder.svg',
    description: 'Transforming raw captures into masterpieces through expert editing and post-production work.'
  },
  {
    name: 'Sindhu Mehta',
    position: 'Client Experience Manager',
    image: '/placeholder.svg',
    description: 'Dedicated to ensuring every client feels valued and receives personalized service throughout their journey.'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <section className="text-center mb-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif mb-6 text-foreground">
                About Satya Photography
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Welcome to Satya Photography, where we capture the essence of every moment with passion and precision.
                Our founder, Anil Kumar, started this journey with a vision to create timeless memories for families and
                couples across the region. With over a decade of experience, our team is dedicated to providing exceptional
                photography services that reflect the beauty and emotion of each occasion.
              </p>
              <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg p-6 inline-block">
                <p className="text-gold-400 font-medium">
                  Freezing time through the lens of creativity and passion
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Mission Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-foreground">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At Satya Photography, we believe in freezing time through the lens of creativity and passion.
                  Our state-of-the-art studios and outdoor shooting environments are designed to bring out the
                  best in every occasion.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  With luxury-grade equipment and a highly skilled team, we ensure that every shot reflects
                  elegance and timelessness. Our commitment to excellence has made us the preferred choice
                  for capturing life's most precious moments.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-gold-400 text-luxury-black px-4 py-2 text-sm">
                    <Award className="h-4 w-4 mr-2" />
                    Award Winning
                  </Badge>
                  <Badge className="bg-gold-400 text-luxury-black px-4 py-2 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Expert Team
                  </Badge>
                  <Badge className="bg-gold-400 text-luxury-black px-4 py-2 text-sm">
                    <Target className="h-4 w-4 mr-2" />
                    Premium Quality
                  </Badge>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-luxury-dark-gray to-luxury-medium-gray rounded-lg flex items-center justify-center">
                <Camera className="h-32 w-32 text-gold-400" />
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">Our Achievements</h2>
              <p className="text-xl text-muted-foreground">
                Numbers that reflect our dedication and expertise
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="border-luxury-medium-gray bg-card text-center hover:border-gold-400 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="bg-gold-400/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-gold-400" />
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.number}</h3>
                      <p className="text-lg text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The talented individuals behind every perfect shot, dedicated to bringing your vision to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-luxury-medium-gray bg-card hover:border-gold-400 transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-luxury-dark-gray to-luxury-medium-gray flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">{member.name}</h3>
                    <Badge className="bg-gold-400 text-luxury-black mb-4">
                      {member.position}
                    </Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="mb-20">
            <Card className="border-luxury-medium-gray bg-card">
              <CardContent className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif mb-6 text-foreground">Our Philosophy</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      We believe that every moment has a story to tell. Our approach combines technical expertise
                      with artistic vision to create photographs that are not just images, but memories that will
                      be cherished for generations.
                    </p>
                    <p className="text-lg text-muted-foreground mb-6">
                      From the laughter shared during a pre-wedding shoot to the tears of joy at a wedding ceremony,
                      we capture the raw emotions that make each moment unique and irreplaceable.
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gold-400 p-3 rounded-full">
                        <Heart className="h-6 w-6 text-luxury-black" />
                      </div>
                      <p className="text-gold-400 font-medium text-lg">
                        "Every photograph tells a story, every story deserves to be beautiful"
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gold-400/20 p-3 rounded-lg">
                        <Camera className="h-6 w-6 text-gold-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Professional Equipment</h4>
                        <p className="text-muted-foreground">
                          State-of-the-art cameras and lighting equipment to ensure the highest quality results.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-gold-400/20 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-gold-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Experienced Team</h4>
                        <p className="text-muted-foreground">
                          A team of passionate professionals with years of experience in various photography styles.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-gold-400/20 p-3 rounded-lg">
                        <Star className="h-6 w-6 text-gold-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Personalized Service</h4>
                        <p className="text-muted-foreground">
                          Tailored photography packages to meet your specific needs and vision.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Location & Studio Info */}
          <section className="text-center">
            <Card className="border-luxury-medium-gray bg-card max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif mb-4 text-foreground">Visit Our Studio</h2>
                <p className="text-muted-foreground mb-6">
                  Located in the heart of Hanamkonda, Warangal, our modern studio is equipped with the latest
                  technology and designed to provide the perfect environment for your photography sessions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Address</h4>
                    <p className="text-muted-foreground">Hanamkonda, Warangal, Telangana</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Contact</h4>
                    <p className="text-muted-foreground">+91 8374877776</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Email</h4>
                    <p className="text-muted-foreground">Rajkarthikeya10@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
