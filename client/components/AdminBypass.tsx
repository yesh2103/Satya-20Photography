import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SimpleAuthContext';

// Simple component to check for admin session and redirect
export default function AdminBypass() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    // If user is authenticated, redirect to admin
    if (user) {
      console.log('✅ User authenticated, redirecting to dashboard');
      navigate('/admin', { replace: true });
    }
  }, [user, loading, navigate]);

  return null; // This component doesn't render anything
}
