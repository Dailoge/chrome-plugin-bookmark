function Combinations(arr, num) {
    let result = []
    if (!Array.isArray(arr)) {
        arr = [...Array(arr).keys()]
    }
    for (var i = 0; i < arr.length - num + 1; i++) {
        if (num > 1) {
            let newArr = arr.slice(i + 1)
            let tmp = Combinations(newArr, num - 1)
            tmp.map((item) => {
                item.unshift(arr[i])
                result.push(item)
            })
        } else {
            result.push([arr[i]])
        }
    }
    return result
}
console.time('combination')
const result = Combinations(48, 4)
console.timeEnd('combination')
console.log(result.length)