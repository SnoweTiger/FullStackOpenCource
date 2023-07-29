import patientsData from '../data/patients';
import { Patients, NonSensitivePatients } from '../types';

const patients: Patients[] = patientsData;

const getPatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {id, name, dateOfBirth, gender, occupation}
  ));
};

// const addDiary = () => {
//   return null;
// };

export default {
  getPatients,
//   addDiary
};