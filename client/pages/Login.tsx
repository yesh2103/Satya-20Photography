import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminBypass from '@/components/AdminBypass';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/admin';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (formData.email.toLowerCase() !== 'rajkarthikeya10@gmail.com') {
      newErrors.email = 'Only admin access is permitted';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    console.log('🔄 Starting login process for:', formData.email);

    try {
      // Validate admin credentials - check both possible password cases
      const validEmail = formData.email.toLowerCase() === 'rajkarthikeya10@gmail.com';
      const validPassword = formData.password === 'SatyaANil@0804' || formData.password === 'SatyaAnil@0804';

      console.log('Login validation:', {
        email: formData.email,
        emailLower: formData.email.toLowerCase(),
        password: formData.password,
        validEmail,
        validPassword
      });

      if (validEmail && validPassword) {
        // Valid credentials - create admin session
        const { directAuth } = await import('@/utils/directAuth');
        const adminUser = directAuth.createAdminSession();

        setSuccessMessage('Login successful! Redirecting to admin dashboard...');

        // Navigate to admin dashboard
        setTimeout(() => {
          navigate('/admin', { replace: true });
        }, 800);
        return;
      }

      // Invalid credentials
      setErrors({ general: 'Invalid email or password. Please check your credentials.' });
    } catch (error) {
      console.error('❌ Unexpected login error:', error);
      setErrors({
        general: `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      console.log('🔄 Login process completed, setting loading to false');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminBypass />
      {/* Header */}
      <header className="border-b border-luxury-medium-gray">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Camera className="h-8 w-8 text-gold-400" />
              <h1 className="text-2xl font-serif font-bold text-foreground">Satya Photography</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-gold-400 transition-colors">Home</Link>
              <Link to="/gallery" className="text-foreground hover:text-gold-400 transition-colors">Gallery</Link>
              <Link to="/about" className="text-foreground hover:text-gold-400 transition-colors">About</Link>
              <Link to="/packages" className="text-foreground hover:text-gold-400 transition-colors">Packages</Link>
              <Link to="/contact" className="text-foreground hover:text-gold-400 transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-12 px-6">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-gold-400" />
            </div>
            <h1 className="text-3xl font-serif mb-2 text-foreground">Admin Access Only</h1>
            <p className="text-muted-foreground">
              Restricted access for website administration
            </p>
          </div>

          <Card className="border-luxury-medium-gray bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-foreground">Administrator Login</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your admin credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* General Error Message */}
              {errors.general && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <p className="text-red-400 text-sm font-medium">❌ Authentication Error</p>
                  <p className="text-red-300 text-sm mt-1">{errors.general}</p>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">✅ Success!</p>
                  <p className="text-green-300 text-sm mt-1">{successMessage}</p>
                </div>
              )}

              {/* Loading Status */}
              {isLoading && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium">🔄 Authenticating...</p>
                  <p className="text-blue-300 text-sm mt-1">Please wait while we verify your credentials</p>
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-foreground">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Rajkarthikeya10@gmail.com"
                      className={cn(
                        "pl-10 bg-input border-luxury-medium-gray text-foreground",
                        errors.email && "border-red-500"
                      )}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-foreground">Admin Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter admin password"
                      className={cn(
                        "pl-10 pr-10 bg-input border-luxury-medium-gray text-foreground",
                        errors.password && "border-red-500"
                      )}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gold-400 text-luxury-black hover:bg-gold-500"
                >
                  {isLoading ? 'Signing in...' : 'Sign In as Admin'}
                </Button>
              </form>



              {/* Authentication Setup Instructions */}
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-2">🔧 Admin Setup Required</h3>
                <p className="text-blue-300 text-sm mb-2">
                  If login fails, the admin user needs to be created in Supabase:
                </p>
                <ol className="text-blue-300 text-sm list-decimal list-inside space-y-1">
                  <li>Go to your Supabase Dashboard</li>
                  <li>Navigate to <strong>Authentication → Users</strong></li>
                  <li>Click <strong>"Create User"</strong></li>
                  <li>Email: <code className="bg-blue-800 px-1 rounded">Rajkarthikeya10@gmail.com</code></li>
                  <li>Password: <code className="bg-blue-800 px-1 rounded">SatyaANil@0804</code></li>
                  <li>Check <strong>"Auto Confirm User"</strong></li>
                  <li>Click <strong>"Create User"</strong></li>
                  <li>Try logging in again</li>
                </ol>
              </div>

              {/* Email Confirmation Instructions */}
              <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                <h3 className="text-yellow-400 font-semibold mb-2">📧 Email Not Confirmed?</h3>
                <p className="text-yellow-300 text-sm mb-2">
                  If you see "Email not confirmed" error:
                </p>
                <ol className="text-yellow-300 text-sm list-decimal list-inside space-y-1">
                  <li>Go to Authentication → Users</li>
                  <li>Find: Rajkarthikeya10@gmail.com</li>
                  <li>Click the three dots (⋯) → "Confirm User"</li>
                  <li>Try logging in again</li>
                </ol>
              </div>

              {/* Alternative Solution */}
              <div className="mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">⚡ Quick Fix</h3>
                <p className="text-green-300 text-sm">
                  <strong>Disable email confirmation:</strong> Authentication → Settings →
                  Email Auth → Uncheck "Enable email confirmations"
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Link to="/" className="text-gold-400 hover:text-gold-500 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
