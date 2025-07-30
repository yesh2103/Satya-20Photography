import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireOwner?: boolean;
}

export default function ProtectedRoute({ children, requireOwner = false }: ProtectedRouteProps) {
  const { user, appUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="border-luxury-medium-gray bg-card max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Camera className="h-12 w-12 text-gold-400 mx-auto mb-4" />
            <Loader2 className="h-6 w-6 text-gold-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Loading...</h3>
            <p className="text-muted-foreground">Checking your authentication status</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    // Redirect them to the /login page, but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireOwner && appUser?.role !== 'owner') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="border-luxury-medium-gray bg-card max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Camera className="h-12 w-12 text-gold-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Access Denied</h3>
            <p className="text-muted-foreground">
              This area is restricted to owners only. Please contact us if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
