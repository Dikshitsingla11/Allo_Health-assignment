'use client';

import { Appointment } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Stethoscope, Calendar } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onView: (id: string) => void;
}

export default function AppointmentCard({ 
  appointment, 
  onReschedule, 
  onCancel, 
  onComplete,
  onView
}: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {appointment.patient.name}
          </CardTitle>
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Stethoscope className="h-4 w-4" />
          <span>Dr. {appointment.doctor.name}</span>
          <span className="text-gray-400">•</span>
          <span>{appointment.doctor.specialization}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{appointment.appointmentTime}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{appointment.patient.phone}</span>
        </div>
        
        {appointment.notes && (
          <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
            <strong>Notes:</strong> {appointment.notes}
          </div>
        )}
        
        {appointment.status === 'scheduled' && (
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              onClick={() => onReschedule(appointment.id)}
              className="flex-1"
            >
              Reschedule
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onCancel(appointment.id)}
              className="flex-1 text-red-600 hover:text-red-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => onComplete(appointment.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Complete
            </Button>
          </div>
        )}
        {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              onClick={() => onView(appointment.id)}
              className="flex-1"
            >
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
