import express from 'express';
import diagnosesService from './services/diagnosesService';
import patientsService from './services/patientsService';
import toNewPatients from './utils';

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('someone pinged here');
  res.send(diagnosesService.getDiagnoses());
});

app.get('/api/patients', (_req, res) => {
  console.log('someone pinged here');
  res.send(patientsService.getPatients());
});

app.post('/api/patients', (req, res) => {
  try {
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = toNewPatients(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
