interface user {
    name: string;
    age: number
}

const xiaoli: user = {
    name: 'xiaoli',
    age: 21
}

interface func {
    (name: string, age: number): string
}

var test = <func>function(name: string, age: number){
    return name
}