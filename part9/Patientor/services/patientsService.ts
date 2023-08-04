import { v1 as uuid } from 'uuid' 
// import patientsData from '../data/patients';
import patientsData from '../data/patients-full';
import { NonSensitivePatient, NewPatient, Patient, PatientWithEntries } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {id, name, dateOfBirth, gender, occupation}
  ));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  
  const addedPatient: Patient = {
    id: uuid(),
    entries: [],
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

const getById = (id: String): Patient | null => {
  const targetPatients = patients.find(p => p.id === id)
  if (targetPatients) {
    return targetPatients
  } else {
    return null
  }
}

export default {
  getPatients,
  addPatient,
  getById
};