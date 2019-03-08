const [node, path, ...args] = process.argv
// console.log(args)
const [rate, days, everyDayIncome] = args

function getSum({rate=0.03,days=365,everyDayIncome=10}){
    return everyDayIncome * days / rate
}

let result = getSum({
    rate: rate,
    days: days,
    everyDayIncome: everyDayIncome
})
console.log(result)