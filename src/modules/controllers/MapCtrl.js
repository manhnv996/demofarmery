/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var MapCtrl = cc.Class.extend({
    showMe: function() {
        cc.log("I am here");
    },
    getField: function(x, y) {
        /*
         INPROGRESS
         */
        //return new Field(new Coordinate(300, 300), 1);
        return user.getAsset().getFieldById(0);
    }
});
MapCtrl.instance = new MapCtrl();

//MapCtrl.instance.showMe();