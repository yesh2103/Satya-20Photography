import type { Media, ContactFormSubmission } from '@shared/types';

// Shared media storage using localStorage
class MediaStore {
  private static MEDIA_KEY = 'satya_photography_media';
  private static INQUIRIES_KEY = 'satya_photography_inquiries';

  // No default demo media - start with empty array
  private static defaultMedia: Media[] = [];

  // No default demo inquiries - start with empty array
  private static defaultInquiries: ContactFormSubmission[] = [];

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
      // Return empty array - no demo data
      console.log('MediaStore: No media found, returning empty array');
      return [];
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
      // Return empty array - no demo inquiries
      return [];
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
