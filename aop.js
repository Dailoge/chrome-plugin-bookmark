'use strict'
//第一种实现
function Person() {
    this.say = (...args) => {
        console.log(args)
    }
}

function Aspects() {
    this.addSuffix = (target, method, device) => {
        const original = target[method]
        target[method] = (...args) => {
            const tmp = args.map((item, index) => {
                return device(item)
            })
            original(...tmp)
        }
        return target
    }
}

const person = new Person()
const aspect = new Aspects()

aspect.addSuffix(person, 'say', (item) => {
    return item + '后缀'
})

person.say('这是第一个参数', '第二个参数')

//第二种实现，高阶组件，用到了装饰器，需要es7的支持
function filterContent(Component) {
    const tmp = (...args) => {
        const arr = args.map((item) => {
            return item.replace(/\s/g, '')
        })
        new Component(...arr)
    }
    return tmp
}

function addSuffixByDeco(suffix) {
    return function(Component){
        const tmp = (...args) => {
            const arr = args.map((item) => {
                return item + suffix
            })
            new Component(...arr)
        }
        return tmp
    }
}

@filterContent
@addSuffixByDeco('Dailoge')
class Submit {
    constructor(...args) {
        console.log(...args)
    }
}

new Submit('1 2 3 4', '中文 英文')
