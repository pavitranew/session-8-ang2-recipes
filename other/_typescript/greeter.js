var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MovieCollection = (function (_super) {
    __extends(MovieCollection, _super);
    function MovieCollection(name) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        return _super.apply(this, items) || this;
        // this.name = name;
    }
    return MovieCollection;
}(Array));
var movies = new MovieCollection('My Favorite Movies', { name: 'Sausage Party', stars: 10 }, { name: 'Star Wars Trek', stars: 1 }, { name: 'Virgin Suicides', stars: 7 }, { name: 'Alice in the Cities', stars: 8 });
// movies.add({ name: 'Titanic', stars: 5 });
document.body.innerHTML = "movies.topRated()";
