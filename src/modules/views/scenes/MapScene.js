/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var MapScene = cc.Scene.extend({
    ctor: function() {
        this._super();
        var layer = new MapLayer();
        this.addChild(layer);
    }
});
