/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var FieldSprite = cc.Sprite.extend({

    fieldId: null,
    animFrames: [],
    animation: null,

    ctor: function(parent, fieldId, seed_plist_img) {
        //this._super();
        this._super(seed_plist_img);


        ////////////
        //cc.spriteFrameCache.addSpriteFrames(res.caroot_plist, res.caroot_png); // sprite cache
        cc.spriteFrameCache.addSpriteFrames(res.caroot_plist); // sprite cache

        this.animation = new cc.Animation([cc.spriteFrameCache.getSpriteFrame("field.png")], 0.1);
        this.runAction(cc.animate(this.animation).repeat(1));  //repeat one time
        ///////////



        ////////
        //this.initWithFile(seed_plist_img);


        //
        this.render(fieldId);

        var dragListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }



                return false;
            },
            onTouchMoved: function (touch, event) {

                var delta = touch.getDelta();

                //this.x += delta.x / lstScale;
                //this.y += delta.y / lstScale;
                //this.x = x / lstScale;
                //this.y = y / lstScale;

                //cc.log("onTouchMoved: " + delta.x + ", " + delta.y);

                //Call ctrl
                //var fieldSelected = PlantCtrl.instance.onDragCropTool(this.x, this.y);
                /*
                 INPROGRESS
                 *
                 */




                //var seedBoundingBox = this.getBoundingBox();
                //if (cc.rectIntersectsRect(seedBoundingBox, runnerBoundingBox)){
                //    cc.log("va chạm");
                //}

            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");

                //
                PlantCtrl.instance.onFieldSelected(fieldId);
                //parent.showPopup();

                //this.loadAnimFrames(4, "caroot", 0.2);
                //this.runAnimationForever();

            }
        });
        cc.eventManager.addListener(dragListener, this);

    },

    render: function(fieldId){
        this.fieldId = fieldId;
    },


    loadAnimFrames: function(num, str_seed_key, speed){
        //cc.spriteFrameCache.addSpriteFrames(seed_plist); // sprite cache

        this.animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < num; i++) {
            var str = str_seed_key + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.animFrames.push(frame);

        }

        this.animation = new cc.Animation(this.animFrames, speed);
    },
    runAnimationForever: function(){
        this.runAction(cc.animate(this.animation).repeatForever());  //repeatForever
    },
    runAnimationRepeat: function(num){
        this.runAction(cc.animate(this.animation).repeat(num));  //repeat num time
    }

});