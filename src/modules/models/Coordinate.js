
var Coordinate = cc.Class.extend({

    x: 0,
    y: 0,
    ctor: function (x, y) {
        //
        //this._super();

        this.render(x, y);
    },
    render: function (x, y) {
        //
        this.x = x;
        this.y = y;

    },

    getCurrX: function () {
        return this.x;
    },
    getCurrY: function () {
        return this.y;
    },
    setCoordinate: function (x, y) {
        this.x = x;
        this.y = y;
    }

});