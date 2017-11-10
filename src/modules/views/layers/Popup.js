/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var Popup = cc.Layer.extend({

    ctor:function() {
        this._super();
        cc.associateWithNative(this, cc.Layer);
    },

    init:function (cb, cb_parent) {

        //////////////////////////////
        // 1. super init first
        this._super();

        //navi enabling touch
        if( 'touches' in sys.capabilities ) {
            this.setTouchEnabled(true);
        }
        if( 'mouse' in sys.capabilities ) {
            this.setMouseEnabled(true);
        }


        /////////////////////////////
        var size = cc.Director.getInstance().getWinSize();

        var centerPos = cc.p( size.width/2, size.height/2 );

        var spriteBackground = cc.Sprite.create(res.popup);


        spriteBackground.setPosition(size.width/2, size.height/2);
        this.addChild(spriteBackground, 0);

        var label1 = cc.LabelTTF.create("Some text", "Arial", 32);
        label1.setColor(cc.c3b(255, 255, 255));
        label1.setPosition(size.width/2, size.height/2);
        this.addChild(label1);

        this.addMainMenu(cb, cb_parent);


        return true;
    },

    addMainMenu: function(cb, cb_parent) {

        var size = cc.Director.getInstance().getWinSize();

        // add start button
        var okItem = cc.MenuItemImage.create(
            "res/buttons/ok.png",
            "res/buttons/ok.png",
            cb,
            cb_parent);
        okItem.setAnchorPoint(cc.p(0.5, 0.5));
        okItem.setPosition(size.width/2, size.height * 1/4);


        var menu = cc.Menu.create(okItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);

    }

});