function Combinations(arr, num) {
    let result = []
    if (!Array.isArray(arr)) {
        arr = [...Array(arr).keys()]
    }
    //动态规划
    for (var i = 0; i < arr.length - num + 1; i++) {
        if (num > 1) {
            let newArr = arr.slice(i + 1)
            //从大数组里面选数
            let tmp = Combinations(newArr, num - 1)
            tmp.map((item) => {
                //因为arr[i]对应的数肯定是小于tmp数组中每一个值的
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