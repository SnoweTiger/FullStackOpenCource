import { v1 as uuid } from 'uuid' 
import patientsData from '../data/patients';
import { Patients, NonSensitivePatients } from '../types';

const patients: Patients[] = patientsData;

const getPatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {id, name, dateOfBirth, gender, occupation}
  ));
};

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): NonSensitivePatients => {
  const newPatient: Patients = {
    id: uuid(),
    name: name,
    dateOfBirth: dateOfBirth,
    ssn: ssn,
    gender: gender,
    occupation: occupation
  }

  patients.push(newPatient);
  // return newPatient;
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation
  }
}

export default {
  getPatients,
  addPatient
};