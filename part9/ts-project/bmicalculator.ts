
const calculateBmi = (height: number, weight: number): string => {
    const heightM : number = height / 100
    const bmi = weight / (heightM * heightM)
    if (bmi <= 25) {
        return 'Normal'
    } else if (bmi >= 30) {
        return 'Obese'
    } else {
        return 'Overweight'
    }
 }

const h: number = Number(process.argv[3])
const w: number = Number(process.argv[4])

console.log(calculateBmi(h, w))

export default calculateBmi