'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import api from '@/utils/api';
import AddDoctorModal from '@/components/AddDoctorModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Doctor } from '@/types';
import { Plus, Search, Stethoscope, Phone, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = async (doctorId: string) => {
    try {
      const response = await api.patch(`/doctors/${doctorId}/availability`);
      setDoctors(doctors.map(doctor =>
        doctor.id === doctorId
          ? response.data
          : doctor
      ));
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

  const addDoctor = async (doctorData: Partial<Doctor>) => {
    try {
      const response = await api.post('/doctors', doctorData);
      setDoctors([...doctors, response.data]);
    } catch (error) {
      console.error('Failed to add doctor:', error);
    }
  };

  const availableDoctors = doctors.filter(d => d.isAvailable).length;
  const unavailableDoctors = doctors.filter(d => !d.isAvailable).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
            <p className="text-gray-600">
              {availableDoctors} available • {unavailableDoctors} unavailable
            </p>
          </div>
          
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Doctor
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search doctors by name, specialization, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{doctors.length}</div>
            <div className="text-sm text-gray-600">Total Doctors</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{availableDoctors}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">{unavailableDoctors}</div>
            <div className="text-sm text-gray-600">Unavailable</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(doctors.map(d => d.specialization)).size}
            </div>
            <div className="text-sm text-gray-600">Specializations</div>
          </div>
        </div>

        {/* Doctors List */}
        <AddDoctorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={addDoctor}
        />
        <div>
          <h2 className="text-xl font-semibold mb-4">All Doctors</h2>
          
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No doctors found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Dr. {doctor.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {doctor.isAvailable ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <Badge 
                          variant={doctor.isAvailable ? "default" : "secondary"}
                          className={doctor.isAvailable ? "bg-green-600" : ""}
                        >
                          {doctor.isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Stethoscope className="h-4 w-4" />
                      <span>{doctor.specialization}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{doctor.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{doctor.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.schedule}</span>
                    </div>
                    
                    <div className="flex space-x-2 pt-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toggleAvailability(doctor.id)}
                        className="flex-1"
                      >
                        {doctor.isAvailable ? 'Set Unavailable' : 'Set Available'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
