/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var lstScale = 1.0;
var runnerBoundingBox = null;

var MapLayer = cc.Layer.extend({
    currentScale: 1.0,

    ctor: function() {
        this._super();



        var crops = new SeedSprite(this, res.crops, ProductTypes.CROP_WHEAT.TYPE);
        var caroot = new SeedSprite(this, res.caroot, ProductTypes.CROP_CARROT.TYPE);

        crops.setPosition(cc.p(cc.winSize.width / 2 , cc.winSize.height / 2));
        caroot.setPosition(cc.p(cc.winSize.width / 2 - 100, cc.winSize.height / 2 - 100));

        this.addChild(crops);
        this.addChild(caroot);


        this.initFieldPlant(4, res.caroot_plist, res.caroot_png, "caroot", 2);

////////////
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist, res.runner_png); // sprite cache

        var sprite = new cc.Sprite("#runner0.png"); // create sprite
        sprite.setPosition(cc.p(cc.winSize.width / 2 , cc.winSize.height / 2 + 200));

        var spriteBatch = new cc.SpriteBatchNode(res.runner_png);
        spriteBatch.addChild(sprite);
        this.addChild(spriteBatch);

        //
        runnerBoundingBox = sprite.getBoundingBox();



        var animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);

        }

        var animation = new cc.Animation(animFrames, 0.1);
        // var runningAction = new cc.RepeatForever(new cc.Animate(animation));
        // sprite.runAction(runningAction);
        // this.runningAction.retain();
        sprite.runAction(cc.animate(animation).repeatForever());
        ///////////




        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                cc.log('Touch began');
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            }.bind(this),
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);

            }
        });
        cc.eventManager.addListener(listener1, this);


        var listener2 = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseScroll: this.handleMouse.bind(this)
        });
        cc.eventManager.addListener(listener2, this);


        cc.log(this.getContentSize().width + " :: " + this.getContentSize().height);
        this.centerPoint = cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2);
    },

    handleMouse: function(e) {
        lstScale = this.currentScale;
        var winSize = cc.winSize;
        var cex = this.centerPoint.x + this.getPosition().x;
        var cey = this.centerPoint.y + this.getPosition().y;
        var cursorX = e.getLocation().x;
        var cursorY = e.getLocation().y;

        var cx = - cursorX + cex;
        var cy = - cursorY + cey;
        cc.log("cex : " + cex + "; cey = " + cey);
        cc.log("cursorX : " + cursorX + "; cursorY = " + cursorY);
        cc.log("cx : " + cx + "; cy = " + cy);
        if (e.getScrollY() === 1) {
            if (this.currentScale > 0.5) {
                this.currentScale = this.currentScale - 0.1;
                this.setScale(this.currentScale);
                this.x -= cx * 0.1 / lstScale;
                this.y -= cy * 0.1 / lstScale;
                // this.x -= 10;
                // this.y -= 10;
            }
        } else {
            if (this.currentScale < 2) {
                this.currentScale = this.currentScale + 0.1;
                this.setScale(this.currentScale);
                this.x += cx * 0.1 / lstScale;
                this.y += cy * 0.1 / lstScale;
                // this.x += 100 * 0.1;
                // this.y += 100 * 0.1;
            }
        }
    },

    _getScale: function() {
        return this.currentScale;
    },

    //
    initFieldPlant: function (num, seed_plist, seed_png, str_first_seed, speed) {

        ////////////
        cc.spriteFrameCache.addSpriteFrames(seed_plist, seed_png); // sprite cache

        //var sprite = new cc.Sprite("#runner0.png"); // create sprite
        var sprite = new cc.Sprite("#" + str_first_seed + "0" + ".png"); // create sprite
        //var sprite = new FieldSprite("#" + str_first_seed + "0" + ".png"); // create sprite
        sprite.setPosition(cc.p(cc.winSize.width / 2 + 200, cc.winSize.height / 2 + 200));

        var spriteBatch = new cc.SpriteBatchNode(seed_png);
        spriteBatch.addChild(sprite);
        this.addChild(spriteBatch);

        //
        runnerBoundingBox = sprite.getBoundingBox();



        var animFrames = [];
        // num equal to spriteSheet
        for (var i = 0; i < num; i++) {
            //var str = "runner" + i + ".png";
            var str = str_first_seed + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);

        }

        //var animation = new cc.Animation(animFrames, 0.2);
        var animation = new cc.Animation(animFrames, speed);
        // var runningAction = new cc.RepeatForever(new cc.Animate(animation));
        // sprite.runAction(runningAction);
        // this.runningAction.retain();
        //sprite.runAction(cc.animate(animation).repeatForever());
        sprite.runAction(cc.animate(animation).repeat(1));  //repeat one time
        ///////////

    }
});
