import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { directAuth } from '@/utils/directAuth';

// Simple component to check for admin session and redirect
export default function AdminBypass() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const adminSession = directAuth.getAdminSession();
    
    if (adminSession) {
      console.log('✅ Admin session found, redirecting to dashboard');
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  return null; // This component doesn't render anything
}
