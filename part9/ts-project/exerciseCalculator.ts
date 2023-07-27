interface exercisesMetrics {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exercises: number[], target: number): exercisesMetrics => {

    const ratings = [
        'bad',
        'not too bad but could be better',
        'good'
    ]
    
    const totalHours: number = exercises.reduce((partialSum, a) => partialSum + a, 0);
    const average: number = totalHours / exercises.length

    let rate: number
    if (average > target) {
        rate = 3
    } else if (average === target) {
        rate = 2
    } else {
        rate = 1
    }

    const res = {
        periodLength: exercises.length,
        trainingDays: exercises.filter(a => a > 0).length,
        success: (average >= target) ? true : false,
        rating: rate,
        ratingDescription: ratings[rate],
        target: target,
        average: average
    }
    
    return res
}

const test : number[] = [3, 0, 2, 4.5, 0, 3, 1]
console.log(calculateExercises(test, 2))