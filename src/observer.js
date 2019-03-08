class Dog {
    constructor() {
        this.handles = {};//保存所有观察者方法的引用
    }

    addHandle(type, func) {
        if (!(this.handles[type] instanceof Array)) {
            this.handles[type] = [];
        }
        this.handles[type].push(func);
    }

    fire(type,...args) {
        var typeFunc = this.handles[type];
        var len = typeFunc.length;
        for (var i = 0; i < len; i++) {
            typeFunc[i](...args);
        }
    }

    removeHandle(type, func) {
        var typeFunc = this.handles[type];
        if (!(typeFunc instanceof Array)) {
            return;
        }
        var len = typeFunc.length;
        for (var i = 0; i < len; i++) {
            if (typeFunc[i] == func) {
                typeFunc.splice(i, 1);
            }
        }
    }

    triggerEvent(type,...args){
        setTimeout(() => {
            this.fire(type,...args)
        }, 2000);
    }
}

let dog = new Dog()
dog.addHandle('eat',function(...args){
    console.log(...args)
})
dog.addHandle('seelp',function(args){
    console.log('监听了睡觉事件')
})

dog.triggerEvent('eat','米饭','水果','蔬菜')