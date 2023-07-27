
const calculateBmi = (height: number, weight: number) : string => {
    const bmi = weight / (height * height)
    if (bmi <= 25) {
        return 'Normal'
    } else if (bmi >= 30) {
        return 'Overweight'
    } else {
        return 'Obese'
    }
 }

const h: number = Number(process.argv[3])
const w: number = Number(process.argv[4])
console.log(calculateBmi(h, w))