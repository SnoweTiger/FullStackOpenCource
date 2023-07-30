import express from 'express';
import diagnosesService from './services/diagnosesService';
import patientsService from './services/patientsService';

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
  console.log('post add patient');
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientsService.addPatient(name, dateOfBirth, ssn, gender, occupation);
  res.json(newPatient);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
