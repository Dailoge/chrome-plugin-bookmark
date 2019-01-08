const [node, path, ...args] = process.argv
console.log(args)

function getSum({rate=0.03,days=365,everyDayIncome=10}){
    return everyDayIncome * days / rate
}

let result = getSum({})
console.log(result)