interface user {
    name: string;
    age: number;
    getAge();
    getName();
}


class baseClass implements user {
    name = 'xiaoli'
    age = 21
    constructor(parameters) {
    }

    getAge() {
        return this.age;
    }
    getName() {
        return this.name
    }
}


class People extends baseClass implements user {
    static jingtai: string = '111'
    constructor(name: string) {
        super(name)
        // this.name = name
    }
}

var xiaohong: People = new People('xiaohong')

console.log(xiaohong.getName())