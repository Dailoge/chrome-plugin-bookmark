function Combinations(arr, num) {
    let result = []
    if (!Array.isArray(arr)) {
        let tmpArr = new Array(arr)
        for (var i = 0; i < tmpArr.length; i++) {
            tmpArr[i] = i
        }
        arr = tmpArr
    }
    for (var i = 0; i < arr.length - num + 1; i++) {
        if (num > 1) {
            let newArr = arr.slice(i)
            let tmp = Combinations(newArr, num - 1)
            result = tmp.map((item) => {
                item.push(arr[i])
                console.log(22,item)
                return item
            })
        } else {
            result.push([arr[i]])
        }
    }
    console.log(arr,result)
    return result
}

const result = Combinations(7, 2)
console.log(result)