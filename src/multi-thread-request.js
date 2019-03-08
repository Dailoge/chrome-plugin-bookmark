let data = []
let connectNum = 10
//模拟指定数量的异步请求
for (var i = 1; i < 101; i++) {
    data.push(i)
}

async function demo() {
    console.log('开始访问网络:')
    for (var i = 0; i < data.length / connectNum; i++) {
        console.log('第' + (i + 1) + '组')
        let urls = data.slice(i * connectNum, (i + 1) * connectNum)
        let res = await test(urls)
        console.log(res)
        res.map((item) => {
            if (!/^\d+$/.test(item)) {
                console.log(item)//输出错误的值
            }
        })
    }
}

async function test(urls) {
    let connects = urls.map((item, index) => {
        return new Promise((resolve, reject) => {
            let timeout = Math.random() * 1000 * 3 //模拟延迟时间
            setTimeout(() => {
                if (timeout > 2550) {
                    resolve('error:' + item)
                    //先一起传过去，因为Promise.all的数组中如果出现reject，
                    //那么Promise.all的返回值就是第一个reject，正确的值获取不到
                    //所以这里即使报错了，也是用resolve返回值的，最后在数组中统一做判断
                } else {
                    console.log(item) //获取到的正确数据，并输出
                    resolve(item)
                }
            }, timeout)
        })
    })
    return await Promise.all(connects) //利用await等待promise特性，且是所有的promise都改变了状态才行
}

demo()