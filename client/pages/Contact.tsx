import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Mail, Phone, MapPin, CalendarIcon, Send, Instagram, Facebook } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { ContactFormData, ServiceType } from '@shared/types';
import { SERVICE_TYPES } from '@shared/types';

export default function Contact() {
  const { appUser } = useAuth();
  const [formData, setFormData] = useState<ContactFormData>({
    name: appUser?.name || '',
    email: appUser?.email || '',
    phone: appUser?.phone || '',
    event_type: 'wedding',
    event_date: '',
    message: ''
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setFormData(prev => ({ ...prev, event_date: format(date, 'yyyy-MM-dd') }));
    }
  };

  const validateForm = (): boolean => {
    return !!(
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.event_type &&
      formData.event_date
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contact_form_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          event_type: formData.event_type,
          event_date: formData.event_date,
          message: formData.message || null,
        });

      if (error) {
        console.error('Supabase error:', error);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({
          name: appUser?.name || '',
          email: appUser?.email || '',
          phone: appUser?.phone || '',
          event_type: 'wedding',
          event_date: '',
          message: ''
        });
        setSelectedDate(undefined);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Get In Touch</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to capture your special moments? Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="border-luxury-medium-gray bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-foreground">Send us a message</CardTitle>
                    <p className="text-muted-foreground">Share your event details and we'll create something beautiful together</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="bg-input border-luxury-medium-gray text-foreground"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="bg-input border-luxury-medium-gray text-foreground"
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          required
                          className="bg-input border-luxury-medium-gray text-foreground"
                        />
                      </div>

                      {/* Event Type Dropdown */}
                      <div className="space-y-2">
                        <Label htmlFor="event_type" className="text-foreground">Event Type *</Label>
                        <Select
                          value={formData.event_type}
                          onValueChange={(value: ServiceType) => handleInputChange('event_type', value)}
                          required
                        >
                          <SelectTrigger className="bg-input border-luxury-medium-gray text-foreground">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-luxury-medium-gray">
                            {SERVICE_TYPES.map((service) => (
                              <SelectItem key={service.value} value={service.value} className="text-foreground hover:bg-accent">
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Event Date Picker */}
                      <div className="space-y-2">
                        <Label htmlFor="event_date" className="text-foreground">Date of Event *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-input border-luxury-medium-gray text-foreground",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-popover border-luxury-medium-gray">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              initialFocus
                              disabled={(date) => date < new Date()}
                              className="text-foreground"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us more about your event, special requirements, or any questions you have..."
                          rows={4}
                          className="bg-input border-luxury-medium-gray text-foreground resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting || !validateForm()}
                        className="w-full bg-gold-400 text-luxury-black hover:bg-gold-500 py-3 text-lg"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      {/* Status Messages */}
                      {submitStatus === 'success' && (
                        <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
                          <p className="text-green-400 text-center">
                            Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                          </p>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                          <p className="text-red-400 text-center">
                            Sorry, there was an error sending your message. Please try again or contact us directly.
                          </p>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card className="border-luxury-medium-gray bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-foreground">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gold-400/20 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <p className="text-muted-foreground">info@satyaphotography.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-gold-400/20 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Phone</h3>
                        <p className="text-muted-foreground">+91 98765 43210</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-gold-400/20 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Location</h3>
                        <p className="text-muted-foreground">Hyderabad, India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className="border-luxury-medium-gray bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-foreground">Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span className="text-foreground">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="text-foreground">10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="text-foreground">By Appointment</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-luxury-medium-gray bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-foreground">Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="bg-gold-400/20 p-3 rounded-lg hover:bg-gold-400/30 transition-colors"
                      >
                        <Instagram className="h-6 w-6 text-gold-400" />
                      </a>
                      <a
                        href="#"
                        className="bg-gold-400/20 p-3 rounded-lg hover:bg-gold-400/30 transition-colors"
                      >
                        <Facebook className="h-6 w-6 text-gold-400" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
