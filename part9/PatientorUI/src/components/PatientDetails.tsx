import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient, Entry, Diagnosis } from "../types";
// import axios from "axios";
// import { apiBaseUrl } from "../constants";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses"

const PatientDetail = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>();

  useEffect(() => {
    const fetchPatientList = async () => {
      const target_patient = await patientService.getById(id);
      setPatient(target_patient);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const d = await diagnosesService.getAll();
      setDiagnoses(d);
    };
    void fetchDiagnosesList();
  }, []);

  if (!patient) {
    return <h4>Loading</h4>;
  }

  return (
    <div>
      <h4>{patient.name}</h4>
      <p>{patient.ssn}</p>
      <p>{patient.occupation}</p>
      <p>{patient.gender}</p>
      <p>{patient.dateOfBirth}</p>
      <h4>Entries:</h4>
      {patient.entries ? (
        patient.entries.map((entry: Entry) => {
          return (
            <>
              <p>
                {entry.date}-{entry.description}
              </p>
              <ul>
                {(entry.diagnosisCodes && diagnoses) ? (
                  entry.diagnosisCodes.map((code: string) => {
                    const diagnose = diagnoses.find(d => d.code === code)
                    if (diagnose) {
                      return <li>{diagnose.code} - {diagnose.name}</li>;
                    }
                    
                  })
                ) : (
                  <></>
                )}
              </ul>
            </>
          );
        })
      ) : (
        <p>None</p>
      )}

      {/* // <> <ul>{ entry.diagnosisCodes?.map((code: string) => <li>code</li>)})</ul></> :  */}
    </div>
  );
};

export default PatientDetail;
