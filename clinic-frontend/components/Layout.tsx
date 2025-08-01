'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, logout } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  UserPlus, 
  LogOut, 
  Clock,
  Activity
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
  };

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ClinicDesk
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/queue">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Queue</span>
                </Button>
              </Link>
              
              <Link href="/dashboard/appointments">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Appointments</span>
                </Button>
              </Link>
              
              <Link href="/dashboard/patients">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Patients</span>
                </Button>
              </Link>
              
              <Link href="/dashboard/doctors">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Doctors</span>
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}