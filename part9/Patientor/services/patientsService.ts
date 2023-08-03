import { v1 as uuid } from 'uuid' 
import patientsData from '../data/patients';
import { NonSensitivePatient, NewPatients, PatientWithEntries } from '../types';

const patients: NonSensitivePatient[] = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {id, name, dateOfBirth, gender, occupation}
  ));
};

const addPatient = (patient: NewPatients): NonSensitivePatient => {
  
  const addedPatient = {
    id: uuid(),
    ...patient
  }
  patients.push(addedPatient);
  return {
    id: addedPatient.id,
    name: addedPatient.name,
    dateOfBirth: addedPatient.dateOfBirth,
    gender: addedPatient.gender,
    occupation: addedPatient.occupation
  }
}

const getById = (id: String): PatientWithEntries | null => {
  const targetPatients = patients.find(p => p.id === id)
  if (targetPatients) {
    return { ...targetPatients, entries: [] }
  } else {
    return null
  }
}

export default {
  getPatients,
  addPatient,
  getById
};