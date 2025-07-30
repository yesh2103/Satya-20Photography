import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Camera, 
  Image, 
  Video, 
  Trash2, 
  Edit, 
  Eye, 
  Plus,
  Filter,
  BarChart3,
  Users,
  MessageSquare,
  Crown
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Media, ServiceType, ContactFormSubmission } from '@shared/types';
import { SERVICE_TYPES, MEDIA_TYPES } from '@shared/types';

export default function Admin() {
  const { appUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [submissions, setSubmissions] = useState<ContactFormSubmission[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceType | 'all'>('all');
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    type: 'photo' as 'photo' | 'video',
    service_type: 'wedding' as ServiceType,
    file: null as File | null
  });

  // Demo data - in real app this would come from Supabase
  const demoMediaList: Media[] = [
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
    }
  ];

  const demoSubmissions: ContactFormSubmission[] = [
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

  useEffect(() => {
    // Load media and submissions
    setMediaList(demoMediaList);
    setSubmissions(demoSubmissions);
  }, []);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file) return;

    setIsUploading(true);
    
    try {
      // In real implementation, upload to Supabase Storage
      // const { data, error } = await supabase.storage
      //   .from('media')
      //   .upload(`${uploadForm.service_type}/${uploadForm.file.name}`, uploadForm.file);

      // Simulate upload
      setTimeout(() => {
        const newMedia: Media = {
          id: Date.now().toString(),
          title: uploadForm.title,
          type: uploadForm.type,
          service_type: uploadForm.service_type,
          url: '/placeholder.svg',
          uploaded_by: appUser?.id || 'owner-id',
          created_at: new Date().toISOString()
        };
        
        setMediaList(prev => [newMedia, ...prev]);
        setUploadForm({ title: '', type: 'photo', service_type: 'wedding', file: null });
        setIsUploading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (confirm('Are you sure you want to delete this media?')) {
      setMediaList(prev => prev.filter(m => m.id !== mediaId));
    }
  };

  const filteredMedia = selectedCategory === 'all' 
    ? mediaList 
    : mediaList.filter(m => m.service_type === selectedCategory);

  const stats = {
    totalMedia: mediaList.length,
    totalSubmissions: submissions.length,
    thisMonth: mediaList.filter(m => 
      new Date(m.created_at).getMonth() === new Date().getMonth()
    ).length,
    pendingSubmissions: submissions.length
  };

  return (
    <ProtectedRoute requireOwner>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="pt-24 pb-12 px-6">
          <div className="container mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="h-8 w-8 text-gold-400" />
                <h1 className="text-4xl font-serif text-foreground">Admin Dashboard</h1>
              </div>
              <p className="text-muted-foreground">
                Welcome back, {appUser?.name}! Manage your photography portfolio and client inquiries.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="dashboard">Overview</TabsTrigger>
                <TabsTrigger value="media">Media Library</TabsTrigger>
                <TabsTrigger value="upload">Upload Media</TabsTrigger>
                <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              </TabsList>

              {/* Dashboard Overview */}
              <TabsContent value="dashboard" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-luxury-medium-gray bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gold-400/20 p-3 rounded-lg">
                          <Image className="h-6 w-6 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Media</p>
                          <p className="text-2xl font-bold text-foreground">{stats.totalMedia}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-luxury-medium-gray bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gold-400/20 p-3 rounded-lg">
                          <MessageSquare className="h-6 w-6 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Inquiries</p>
                          <p className="text-2xl font-bold text-foreground">{stats.totalSubmissions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-luxury-medium-gray bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gold-400/20 p-3 rounded-lg">
                          <BarChart3 className="h-6 w-6 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">This Month</p>
                          <p className="text-2xl font-bold text-foreground">{stats.thisMonth}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-luxury-medium-gray bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gold-400/20 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-2xl font-bold text-foreground">{stats.pendingSubmissions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-luxury-medium-gray bg-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif text-foreground">Recent Uploads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mediaList.slice(0, 5).map((media) => (
                          <div key={media.id} className="flex items-center space-x-4">
                            <div className="bg-gold-400/20 p-2 rounded">
                              {media.type === 'video' ? 
                                <Video className="h-4 w-4 text-gold-400" /> : 
                                <Image className="h-4 w-4 text-gold-400" />
                              }
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{media.title || 'Untitled'}</p>
                              <p className="text-sm text-muted-foreground">
                                {SERVICE_TYPES.find(s => s.value === media.service_type)?.label}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(media.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-luxury-medium-gray bg-card">
                    <CardHeader>
                      <CardTitle className="text-xl font-serif text-foreground">Recent Inquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {submissions.slice(0, 5).map((submission) => (
                          <div key={submission.id} className="flex items-center space-x-4">
                            <div className="bg-gold-400/20 p-2 rounded">
                              <MessageSquare className="h-4 w-4 text-gold-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{submission.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {SERVICE_TYPES.find(s => s.value === submission.event_type)?.label}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(submission.submitted_at).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Media Library */}
              <TabsContent value="media" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif text-foreground">Media Library</h2>
                  <div className="flex items-center space-x-4">
                    <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ServiceType | 'all')}>
                      <SelectTrigger className="w-48 bg-input border-luxury-medium-gray">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-luxury-medium-gray">
                        <SelectItem value="all">All Categories</SelectItem>
                        {SERVICE_TYPES.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMedia.map((media) => (
                    <Card key={media.id} className="border-luxury-medium-gray bg-card overflow-hidden">
                      <div className="relative aspect-square bg-luxury-dark-gray">
                        <img
                          src={media.url}
                          alt={media.title || 'Media'}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          {media.type === 'video' ? 
                            <Video className="h-5 w-5 text-white" /> : 
                            <Image className="h-5 w-5 text-white" />
                          }
                        </div>
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors group">
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="bg-white text-black hover:bg-gray-200">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="bg-white text-black hover:bg-gray-200">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteMedia(media.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{media.title || 'Untitled'}</h3>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-gold-400 text-luxury-black">
                            {SERVICE_TYPES.find(s => s.value === media.service_type)?.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(media.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Upload Media */}
              <TabsContent value="upload" className="space-y-6">
                <Card className="border-luxury-medium-gray bg-card max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-foreground">Upload New Media</CardTitle>
                    <p className="text-muted-foreground">Add photos and videos to your portfolio</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFileUpload} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="file" className="text-foreground">Select File *</Label>
                        <div className="border-2 border-dashed border-luxury-medium-gray rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                          <Input
                            id="file"
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                            className="bg-input border-luxury-medium-gray"
                            required
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Drag and drop or click to select photos and videos
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-foreground">Title</Label>
                        <Input
                          id="title"
                          value={uploadForm.title}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter a title for this media"
                          className="bg-input border-luxury-medium-gray text-foreground"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type" className="text-foreground">Media Type *</Label>
                          <Select
                            value={uploadForm.type}
                            onValueChange={(value: 'photo' | 'video') => setUploadForm(prev => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger className="bg-input border-luxury-medium-gray">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-luxury-medium-gray">
                              {MEDIA_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service_type" className="text-foreground">Category *</Label>
                          <Select
                            value={uploadForm.service_type}
                            onValueChange={(value: ServiceType) => setUploadForm(prev => ({ ...prev, service_type: value }))}
                          >
                            <SelectTrigger className="bg-input border-luxury-medium-gray">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-luxury-medium-gray">
                              {SERVICE_TYPES.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  {service.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isUploading || !uploadForm.file}
                        className="w-full bg-gold-400 text-luxury-black hover:bg-gold-500"
                      >
                        {isUploading ? (
                          <>
                            <Upload className="mr-2 h-4 w-4 animate-pulse" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Media
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Inquiries */}
              <TabsContent value="inquiries" className="space-y-6">
                <h2 className="text-2xl font-serif text-foreground">Client Inquiries</h2>
                
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="border-luxury-medium-gray bg-card">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">{submission.name}</h3>
                                <p className="text-muted-foreground">{submission.email} • {submission.phone}</p>
                              </div>
                              <Badge className="bg-gold-400 text-luxury-black">
                                {SERVICE_TYPES.find(s => s.value === submission.event_type)?.label}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">
                                <strong>Event Date:</strong> {new Date(submission.event_date).toLocaleDateString()}
                              </p>
                              {submission.message && (
                                <div>
                                  <p className="text-sm text-muted-foreground font-medium mb-1">Message:</p>
                                  <p className="text-foreground">{submission.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col justify-between">
                            <p className="text-xs text-muted-foreground mb-4">
                              Submitted: {new Date(submission.submitted_at).toLocaleString()}
                            </p>
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-gold-400 text-luxury-black hover:bg-gold-500">
                                Reply
                              </Button>
                              <Button size="sm" variant="outline" className="border-luxury-medium-gray">
                                Mark Read
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
