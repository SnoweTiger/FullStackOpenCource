
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

console.log(calculateBmi(180, 74))