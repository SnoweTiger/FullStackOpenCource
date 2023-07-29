import express from 'express';
import calculateBmi from "./bmicalculator";
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const height: number = Number(req.query.height)
    const weight: number = Number(req.query.weight)
    
    if (height && weight) {
        res.send(
            {
                height: height,
                weight: weight,
                bmi: calculateBmi(height, weight)
            }
        );
    } else {
        res.send(
            {
                error: "malformatted parameters"
            })
    }    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).send({ error: "parameters missing" });
    }
    
    if (!daily_exercises || !target) {
        return res.status(400).send({ error: "parameters missing" });
    }

    if (!Array.isArray(daily_exercises) || daily_exercises.some((value) => typeof value !== 'number')) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    if (typeof target !== 'number' ) {
        return res.status(400).send({ error: "malformatted parameters" });
    }

    // Array.isArray(test) && test.every((value) => typeof value === 'string')

    return res.send(calculateExercises(daily_exercises, target))
    
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});