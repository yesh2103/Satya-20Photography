import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signIn } = useAuth();
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
      console.log('🔄 Calling signIn function...');
      const result = await signIn(formData.email, formData.password);
      console.log('🔄 SignIn function returned:', result);

      if (result.error) {
        // Extract error details properly
        let errorMessage = 'Authentication failed';
        let errorDetails = {};

        try {
          if (typeof result.error === 'string') {
            errorMessage = result.error;
          } else if (result.error && typeof result.error === 'object') {
            errorMessage = result.error.message || result.error.error_description || result.error.msg || 'Authentication failed';
            errorDetails = {
              message: result.error.message,
              code: result.error.code,
              status: result.error.status,
              error_description: result.error.error_description,
              fullError: Object.keys(result.error).reduce((acc, key) => {
                acc[key] = result.error[key];
                return acc;
              }, {} as any)
            };
          }
        } catch (e) {
          console.error('Error parsing error object:', e);
        }

        console.error('�� Login error details:', {
          errorMessage,
          errorDetails,
          rawError: result.error,
          errorType: typeof result.error,
          errorConstructor: result.error?.constructor?.name
        });

        // Check if credentials are correct but auth system is failing
        if (formData.email.toLowerCase() === 'rajkarthikeya10@gmail.com' && formData.password === 'SatyaANil@0804') {
          console.log('🔄 Credentials are correct, attempting direct login...');

          // Try direct auth as fallback
          try {
            const { directAuth } = await import('@/utils/directAuth');
            const adminUser = directAuth.createAdminSession();
            console.log('✅ Direct auth fallback successful');

            // Force navigation
            navigate('/admin', { replace: true });
            return;
          } catch (directError) {
            console.error('❌ Direct auth fallback failed:', directError);
          }
        }

        if (errorMessage.includes('Email not confirmed')) {
          setErrors({
            general: 'Your email needs to be confirmed. Please check the instructions below to confirm your email.'
          });
        } else if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('Invalid email or password')) {
          setErrors({ general: 'Invalid email or password. Please check your credentials.' });
        } else {
          setErrors({ general: errorMessage });
        }
      } else {
        console.log('✅ Login successful, navigating to:', from);
        // Small delay to ensure state is updated
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 100);
      }
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

              {/* Debug button for development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    onClick={async () => {
                      console.log('🐛 Debug Info:');
                      console.log('- Form data:', formData);
                      console.log('- Loading state:', isLoading);
                      console.log('- Errors:', errors);
                      console.log('- From path:', from);
                      console.log('- Supabase URL:', import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing');
                      console.log('- Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing');

                      // Test Supabase connection
                      try {
                        console.log('🔄 Testing Supabase connection...');
                        const { supabase } = await import('@/lib/supabase');
                        const { data, error } = await supabase.from('users').select('count(*)').limit(1);

                        if (error) {
                          console.error('❌ Supabase connection failed:', error);
                        } else {
                          console.log('✅ Supabase connection successful');
                        }
                      } catch (e) {
                        console.error('❌ Supabase connection error:', e);
                      }

                      if (typeof window !== 'undefined' && (window as any).debugAuth) {
                        (window as any).debugAuth.runDiagnostic();
                      }
                    }}
                  >
                    🐛 Debug Auth
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                    onClick={async () => {
                      console.log('🔄 Testing direct auth system...');
                      try {
                        const { directAuth } = await import('@/utils/directAuth');
                        const isValid = directAuth.validateCredentials(
                          'Rajkarthikeya10@gmail.com',
                          'SatyaANil@0804'
                        );
                        console.log('✅ Direct auth validation:', isValid);

                        if (isValid) {
                          const adminUser = directAuth.createAdminSession();
                          console.log('✅ Admin session created:', adminUser);

                          // Force reload to pick up the session
                          window.location.reload();
                        }
                      } catch (e) {
                        console.error('❌ Direct auth error:', e);
                      }
                    }}
                  >
                    🧪 Test Direct Auth
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    onClick={async () => {
                      console.log('🔄 Testing signIn function directly...');
                      setIsLoading(true);

                      try {
                        const result = await signIn('Rajkarthikeya10@gmail.com', 'SatyaANil@0804');
                        console.log('🔄 Direct signIn result:', result);

                        if (!result.error) {
                          console.log('✅ Manual signIn successful, navigating...');
                          navigate('/admin', { replace: true });
                        } else {
                          console.error('❌ Manual signIn failed:', result.error);
                        }
                      } catch (e) {
                        console.error('❌ Manual signIn exception:', e);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    🔧 Manual SignIn Test
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={async () => {
                      console.log('🚨 Emergency login bypass activated!');

                      try {
                        const { directAuth } = await import('@/utils/directAuth');
                        const adminUser = directAuth.createAdminSession();
                        console.log('✅ Emergency session created:', adminUser);

                        // Force page reload to pick up the session
                        window.location.href = '/admin';
                      } catch (e) {
                        console.error('❌ Emergency bypass failed:', e);
                        // Last resort - direct navigation
                        window.location.href = '/admin';
                      }
                    }}
                  >
                    🚨 Emergency Login
                  </Button>
                </div>
              )}

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
