'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AppointmentCard from '@/components/AppointmentCard';
import ScheduleAppointmentModal from '@/components/ScheduleAppointmentModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Appointment, Patient, Doctor } from '@/types';
import { Calendar, Plus, Search } from 'lucide-react';
import api from '@/utils/api';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
          api.get(`/appointments?date=${selectedDate}`),
          api.get('/patients'),
          api.get('/doctors/available')
        ]);
        setAppointments(appointmentsRes.data);
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const scheduleAppointment = async (appointmentData: any) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      setAppointments([...appointments, response.data]);
    } catch (error) {
      console.error('Failed to schedule appointment:', error);
    }
  };

  const rescheduleAppointment = async (id: string) => {
    console.log('Reschedule appointment:', id);
  };

  const cancelAppointment = async (id: string) => {
    try {
      const response = await api.patch(`/appointments/${id}/cancel`);
      setAppointments(appointments.map(apt =>
        apt.id === id ? response.data : apt
      ));
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };

  const completeAppointment = async (id: string) => {
    try {
      const response = await api.patch(`/appointments/${id}/complete`);
      setAppointments(appointments.map(apt => 
        apt.id === id ? response.data : apt
      ));
    } catch (error) {
      console.error('Failed to complete appointment:', error);
    }
  };

  const viewAppointment = async (id: string) => {
    console.log('View appointment:', id);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = searchTerm === '' || 
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const todayStats = {
    total: filteredAppointments.length,
    scheduled: filteredAppointments.filter(apt => apt.status === 'scheduled').length,
    completed: filteredAppointments.filter(apt => apt.status === 'completed').length,
    cancelled: filteredAppointments.filter(apt => apt.status === 'cancelled').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">
              {todayStats.scheduled} scheduled • {todayStats.completed} completed • {todayStats.cancelled} cancelled
            </p>
          </div>
          
          <Button onClick={() => setIsScheduleModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
          
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by patient or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{todayStats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">{todayStats.scheduled}</div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{todayStats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">{todayStats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>
        </div>

        {/* Appointments List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Appointments for {new Date(selectedDate).toLocaleDateString()}
          </h2>
          
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No appointments found for this date
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onReschedule={rescheduleAppointment}
                  onCancel={cancelAppointment}
                  onComplete={completeAppointment}
                  onView={viewAppointment}
                />
              ))}
            </div>
          )}
        </div>

        {/* Schedule Appointment Modal */}
        <ScheduleAppointmentModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSubmit={scheduleAppointment}
          patients={patients}
          doctors={doctors}
        />
      </div>
    </Layout>
  );
}
