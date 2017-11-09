/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var SeedSprite = cc.Sprite.extend({

    data: null,
    seedType: null,

    ctor: function(parent, seed_img, seedType) {
        this._super(seed_img);

        //
        this.init(seedType);

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
                    target.opacity = 180;
                    return true;
                }



                return false;
            },
            onTouchMoved: function (touch, event) {

                var delta = touch.getDelta();

                this.x += delta.x / lstScale;
                this.y += delta.y / lstScale;
                //this.x = x / lstScale;
                //this.y = y / lstScale;

                cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                //Call ctrl
                var fieldSelected = PlantCtrl.onDragSeed(seedType, this.x, this.y);
                /*
                 INPROGRESS
                 */



                //var seedBoundingBox = this.getBoundingBox();
                //if (cc.rectIntersectsRect(seedBoundingBox, runnerBoundingBox)){
                //    cc.log("va chạm");
                //}


            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");
            }
        });
        cc.eventManager.addListener(dragListener, this);
    },
    init: function (seedType) {

        this.seedType = seedType;
    }
});