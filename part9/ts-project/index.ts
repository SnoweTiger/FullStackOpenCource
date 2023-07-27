import express from 'express';
import calculateBmi from "./bmicalculator";

const app = express();

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



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});