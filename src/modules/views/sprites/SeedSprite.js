/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var SeedSprite = cc.Sprite.extend({

    data: null,
    seedType: null,

    quantity: null,

    ctor: function(parent, seed_img, seedType) {
        this._super(seed_img);

        //
        this.render(seedType);

        this.addDragEventListener(parent, seedType);

    },
    render: function (seedType) {

        this.seedType = seedType;

        //
        this.quantity = null;
    },


    //
    addDragEventListener: function (parent, seedType) {
        var dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    //
                    target.runAction(new cc.ScaleTo(0.1, 1.5, 1.5));


                    if (target.quantity == null){
                        cc.log("quantity is null");

                        target.removeAllChildrenWithCleanup(true);  //remove all child

                        //target.removeFromParent(true);
                        // parent.disablePopup(seedType);
                        /*
                        INPROGRESS
                        SHOW LEVEL UNLOCK
                         */
                        target.showInfo();

                        return false;
                    }

                    target.removeAllChildrenWithCleanup(true);  //remove all child


                    target.opacity = 180;
                    return true;
                }

                return false;
            },
            onTouchMoved: function (touch, event) {

                var delta = touch.getDelta();

                this.x += delta.x / MapLayer.instance.scale;
                this.y += delta.y / MapLayer.instance.scale;

                ////
                parent.disablePopup(seedType);

                //cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                //Call ctrl
                PlantCtrl.instance.onDragSeed(seedType, this.x, this.y);
                /*
                 INPROGRESS
                 */

            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");

                var target = event.getCurrentTarget();
                target.opacity = 255;
                target.removeFromParent(true);

                // parent.removePopup();
                parent.disablePopup(seedType);

            }
        });
        cc.eventManager.addListener(dragListener, this);
    },
    //
    showInfo: function () {

        // this.disablePopup(null);

        var popupMsg = cc.Sprite.create(res.tooltip);
        popupMsg.setPosition(this.width * 4 / 3, this.height * 6 / 5);
        popupMsg.setScale(0.5);
        this.addChild(popupMsg);


        var msg = new cc.LabelTTF("LevelUnlock: " + getProductObjByType(this.seedType).level, "res/fonts/eff_number.fnt", 32);
        msg.setPosition(cc.p(popupMsg.width / 2, popupMsg.height / 2));
        popupMsg.addChild(msg);

    },

    addQuantityInfo: function () {
        /////
        if (this.quantity != null){

            var quantitySeed = new cc.LabelTTF(this.quantity, "res/fonts/eff_number.fnt", 18);

            var slot = new cc.Sprite(res.slot);
            quantitySeed.setPosition(new cc.p(slot.width / 2, slot.height / 2));
            slot.setPosition(new cc.p(this.width / 4, this.height * 3 / 4));
            slot.addChild(quantitySeed);
            this.addChild(slot);

            var muiten = new cc.Sprite(res.ten);
            muiten.setPosition(new cc.p(this.width * 3 / 4, this.height / 4));
            this.addChild(muiten);

        }

    },

    removeDragEventListener: function () {
        //this.removeAllEventListeners();
        /*
        BUGGG
         */

    }
});