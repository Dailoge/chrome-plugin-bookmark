middle1 = (next)=>(action)=>{
    console.log("middle1",action)
    next(action)
    console.log("middle1",action)
}
middle2 = (next)=>(action)=>{
    console.log("middle2",action)
    next(action)
    console.log("middle2",action)
}
middle3 = (next)=>(action)=>{
    console.log("middle3",action)
    next(action)
    console.log("middle3",action)
}
middle4 = (next)=>(action)=>{
    console.log("middle4",action)
    next(action)
    console.log("middle4",action)
}

dispatch = (action)=>{
    console.log(action)
}

dispatch = middle1(middle2(middle3(middle4(dispatch))))

dispatch({
    name:'dailoge'
})

//中间件既可以扩充函数的功能，还可以提供洋葱模型