import { v1 as uuid } from 'uuid' 
import patientsData from '../data/patients';
import { Patients, NonSensitivePatients, NewPatients } from '../types';

const patients: Patients[] = patientsData;

const getPatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {id, name, dateOfBirth, gender, occupation}
  ));
};

const addPatient = (patient: NewPatients): NonSensitivePatients => {
  
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

export default {
  getPatients,
  addPatient
};