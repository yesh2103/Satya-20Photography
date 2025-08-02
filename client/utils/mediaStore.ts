import type { Media, ContactFormSubmission } from '@shared/types';

// Shared media storage using localStorage
class MediaStore {
  private static MEDIA_KEY = 'satya_photography_media';
  private static INQUIRIES_KEY = 'satya_photography_inquiries';

  // Default demo media
  private static defaultMedia: Media[] = [
    {
      id: "1",
      title: "Beautiful Wedding Ceremony",
      type: "photo",
      service_type: "wedding",
      url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=80",
      uploaded_by: "owner-id",
      created_at: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Romantic Pre-wedding Shoot",
      type: "photo",
      service_type: "prewedding",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      uploaded_by: "owner-id",
      created_at: "2024-01-14T15:30:00Z",
    },
    {
      id: "3",
      title: "Precious Newborn Moments",
      type: "photo",
      service_type: "newborn",
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
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
      url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80",
      uploaded_by: "owner-id",
      created_at: "2024-01-11T14:15:00Z",
    },
    {
      id: "6",
      title: "Corporate Event",
      type: "photo",
      service_type: "events",
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
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
    }
  ];

  private static defaultInquiries: ContactFormSubmission[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 8374877776',
      event_type: 'wedding',
      event_date: '2024-06-15',
      message: 'Looking for wedding photography for our destination wedding in Goa.',
      submitted_at: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      name: 'Arjun Patel',
      email: 'arjun@example.com',
      phone: '+91 87654 32109',
      event_type: 'prewedding',
      event_date: '2024-04-20',
      message: 'Pre-wedding shoot in a natural outdoor setting.',
      submitted_at: '2024-01-19T11:15:00Z'
    }
  ];

  // Get all media
  static getAllMedia(): Media[] {
    try {
      const stored = localStorage.getItem(this.MEDIA_KEY);
      console.log('MediaStore: Loading media from localStorage:', stored ? 'Found data' : 'No data');
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('MediaStore: Loaded', parsed.length, 'media items');
        return parsed;
      }
      // Initialize with default data
      console.log('MediaStore: Initializing with default data');
      this.setAllMedia(this.defaultMedia);
      return this.defaultMedia;
    } catch (error) {
      console.error('Error loading media:', error);
      return this.defaultMedia;
    }
  }

  // Set all media
  static setAllMedia(media: Media[]): void {
    try {
      localStorage.setItem(this.MEDIA_KEY, JSON.stringify(media));
    } catch (error) {
      console.error('Error saving media:', error);
    }
  }

  // Add new media
  static addMedia(media: Media): void {
    const currentMedia = this.getAllMedia();
    const updatedMedia = [media, ...currentMedia];
    this.setAllMedia(updatedMedia);
  }

  // Delete media
  static deleteMedia(mediaId: string): void {
    const currentMedia = this.getAllMedia();
    const updatedMedia = currentMedia.filter(m => m.id !== mediaId);
    this.setAllMedia(updatedMedia);
  }

  // Get all inquiries
  static getAllInquiries(): ContactFormSubmission[] {
    try {
      const stored = localStorage.getItem(this.INQUIRIES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with default data
      this.setAllInquiries(this.defaultInquiries);
      return this.defaultInquiries;
    } catch (error) {
      console.error('Error loading inquiries:', error);
      return this.defaultInquiries;
    }
  }

  // Set all inquiries
  static setAllInquiries(inquiries: ContactFormSubmission[]): void {
    try {
      localStorage.setItem(this.INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch (error) {
      console.error('Error saving inquiries:', error);
    }
  }

  // Add new inquiry
  static addInquiry(inquiry: ContactFormSubmission): void {
    const currentInquiries = this.getAllInquiries();
    const updatedInquiries = [inquiry, ...currentInquiries];
    this.setAllInquiries(updatedInquiries);
  }

  // Convert file to base64 URL for storage
  static async fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Simulate upload with file conversion
  static async uploadFile(file: File, title: string, type: 'photo' | 'video', serviceType: string, uploadedBy: string): Promise<Media> {
    // Convert file to data URL for demo purposes
    const dataUrl = await this.fileToDataUrl(file);
    
    const newMedia: Media = {
      id: Date.now().toString(),
      title: title || file.name,
      type,
      service_type: serviceType as any,
      url: dataUrl, // Use the actual file data
      uploaded_by: uploadedBy,
      created_at: new Date().toISOString()
    };

    this.addMedia(newMedia);
    return newMedia;
  }
}

export default MediaStore;
