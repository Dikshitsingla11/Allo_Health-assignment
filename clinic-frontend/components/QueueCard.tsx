'use client';

import { QueueItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Phone, AlertTriangle } from 'lucide-react';

interface QueueCardProps {
  queueItem: QueueItem;
  onComplete: (id: string) => void;
  onStartTreatment: (id: string) => void;
}

export default function QueueCard({ queueItem, onComplete, onStartTreatment }: QueueCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'urgent' 
      ? 'bg-red-100 text-red-800 border-red-200' 
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {queueItem.queueNumber}
            </span>
            <span>{queueItem.patient.name}</span>
            {queueItem.priority === 'urgent' && (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </CardTitle>
          <div className="flex space-x-2">
            <Badge className={getPriorityColor(queueItem.priority)}>
              {queueItem.priority}
            </Badge>
            <Badge className={getStatusColor(queueItem.status)}>
              {queueItem.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{queueItem.patient.phone}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Arrived: {new Date(queueItem.createdAt).toLocaleTimeString()}</span>
        </div>
        
        {queueItem.notes && (
          <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
            <strong>Notes:</strong> {queueItem.notes}
          </div>
        )}
        
        <div className="flex space-x-2 pt-2">
          {queueItem.status === 'waiting' && (
            <Button 
              onClick={() => onStartTreatment(queueItem.id)}
              className="flex-1"
            >
              Start Treatment
            </Button>
          )}
          
          {queueItem.status === 'in-progress' && (
            <Button 
              onClick={() => onComplete(queueItem.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Mark Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}