'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AddPatientModal from '@/components/AddPatientModal';
import { Button } from '@/components/ui/button';
import api from '@/utils/api';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types';
import { Plus, Search, User, Phone, Mail, Calendar } from 'lucide-react';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPatientToQueue = async (patientData: Partial<Patient>) => {
    try {
      const response = await api.post('/queue/add-walk-in', patientData);
      // Assuming the queue response returns the new patient
      setPatients([...patients, response.data.patient]);
    } catch (error) {
      console.error('Failed to add patient to queue:', error);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600">
              {patients.length} total patients
            </p>
          </div>
          
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search patients by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => new Date(p.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length}
            </div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(patients.reduce((acc, p) => acc + calculateAge(p.dateOfBirth), 0) / patients.length)}
            </div>
            <div className="text-sm text-gray-600">Average Age</div>
          </div>
        </div>

        {/* Patients List */}
        <AddPatientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddToQueue={addPatientToQueue}
        />
        <div>
          <h2 className="text-xl font-semibold mb-4">All Patients</h2>
          
          {filteredPatients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No patients found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <Badge variant="secondary">
                        {calculateAge(patient.dateOfBirth)} years
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{patient.phone}</span>
                    </div>
                    
                    {patient.email && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{patient.email}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    
                    {patient.address && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="truncate">{patient.address}</span>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 pt-2">
                      Registered: {new Date(patient.createdAt).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        History
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
