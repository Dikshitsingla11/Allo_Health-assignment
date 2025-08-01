'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import QueueCard from '@/components/QueueCard';
import AddPatientModal from '@/components/AddPatientModal';
import { Button } from '@/components/ui/button';
import { QueueItem, Patient } from '@/types';
import { Plus, RefreshCw } from 'lucide-react';
import api from '@/utils/api';

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/queue');
      setQueue(response.data);
    } catch (error) {
      console.error('Failed to fetch queue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPatientToQueue = async (patientData: any) => {
    try {
      const response = await api.post('/queue/add-walk-in', patientData);
      setQueue([...queue, response.data]);
    } catch (error) {
      console.error('Failed to add patient to queue:', error);
    }
  };

  const startTreatment = async (id: string) => {
    try {
      await api.patch(`/queue/${id}/start`);
      setQueue(queue.map(item => 
        item.id === id ? { ...item, status: 'in-progress' as const } : item
      ));
    } catch (error) {
      console.error('Failed to start treatment:', error);
    }
  };

  const completePatient = async (id: string) => {
    try {
      await api.patch(`/queue/${id}/complete`);
      setQueue(queue.map(item => 
        item.id === id ? { 
          ...item, 
          status: 'completed' as const, 
          completedAt: new Date().toISOString() 
        } : item
      ));
    } catch (error) {
      console.error('Failed to complete patient:', error);
    }
  };

  const activeQueue = queue.filter(item => item.status !== 'completed');
  const completedToday = queue.filter(item => item.status === 'completed');

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Walk-in Queue</h1>
            <p className="text-gray-600">
              {activeQueue.length} patients waiting • {completedToday.length} completed today
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={fetchQueue}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Queue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {queue.filter(item => item.status === 'waiting').length}
            </div>
            <div className="text-sm text-gray-600">Waiting</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {queue.filter(item => item.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {completedToday.length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">
              {queue.filter(item => item.priority === 'urgent' && item.status !== 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Urgent</div>
          </div>
        </div>

        {/* Active Queue */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Queue</h2>
          {activeQueue.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No patients in queue
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeQueue.map((item) => (
                <QueueCard
                  key={item.id}
                  queueItem={item}
                  onComplete={completePatient}
                  onStartTreatment={startTreatment}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Patient Modal */}
        <AddPatientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddToQueue={addPatientToQueue}
        />
      </div>
    </Layout>
  );
}
