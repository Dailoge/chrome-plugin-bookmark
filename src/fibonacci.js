//等于前两项之和
function fib(n) {
    if (n <= 0)
        return n;
    const Memo = []
    Memo[0] = 0;
    Memo[1] = 1;
    for (let i = 2; i <= n; i++) {
        Memo[i] = Memo[i - 1] + Memo[i - 2];
    }
    return Memo[n];
}

function cut(n) {
    //以下标为长度(0-10)，对应的单价
    var p = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30]
    //需要计算长度，最优解数组
    const r = new Array(n+1).fill(0)
    for (let i = 1; i < p.length; i++) {
        let q = -1
        for (let j = 0; j <= i; j++)
            q = Math.max(q, p[j] + r[i - j])
        r[i] = q;
    }
    //超过10以后就得把之前最小问题的最优解进行累加
    for (let i = 11; i <= n; i++) {
        let q = -1
        for (let j = 0; j <= i; j++)
            q = Math.max(q, r[j] + r[i - j])
        r[i] = q;
    }
    console.log(r)
    return r[n];
}

console.log(cut(100))