var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var baseClass = /** @class */ (function () {
    function baseClass(parameters) {
        this.name = 'xiaoli';
        this.age = 21;
    }
    baseClass.prototype.getAge = function () {
        return this.age;
    };
    baseClass.prototype.getName = function () {
        return this.name;
    };
    return baseClass;
}());
var People = /** @class */ (function (_super) {
    __extends(People, _super);
    function People(name) {
        return _super.call(this, name) || this;
        // this.name = name
    }
    People.jingtai = '111';
    return People;
}(baseClass));
var xiaohong = new People('xiaohong');
console.log(xiaohong.getName());
