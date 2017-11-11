/**
 * Created by CPU60133_LOCAL on 11/8/2017.
 */

var lstScale = 1.0;
var runnerBoundingBox = null;

var MapLayer = cc.Layer.extend({
    currentScale: 1.0,
    popupBackground: null,
    popupItemList: [],

    fieldList: [],

    ctor: function() {
        this._super();



        this.fieldList = [];

        var field1 = new FieldSprite(this, 0 , res.caroot_png, res.caroot_plist);
        var field2 = new FieldSprite(this, 1,  res.field, null);

        this.fieldList.push(field1);
        this.fieldList.push(field2);


        field1.setPosition(cc.p(cc.winSize.width / 2 + 200, cc.winSize.height / 2));
        field2.setPosition(cc.p(cc.winSize.width / 2 + 200 - field2.width / 2, cc.winSize.height / 2 - field2.height / 2));

        this.addChild(field1);
        this.addChild(field2);


        runnerBoundingBox = this.fieldList[0].getBoundingBox();
        //this.initFieldPlant(4, res.caroot_plist, res.caroot_png, "caroot", 2);



        /////////////////////////////////////////////
        this.label1 = new cc.LabelTTF("FoodStorage:\n", "res/fonts/eff_number.fnt", 18);
        this.addChild(this.label1);
        // label1.x = cc.winSize - 100;
        // label1.y = cc.winSize - 100;
        this.label1.setPosition(new cc.p(100, cc.winSize.height - 100));
////////////////////////////




////////////
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist, res.runner_png); // sprite cache

        var sprite = new cc.Sprite("#runner0.png"); // create sprite
        sprite.setPosition(cc.p(cc.winSize.width / 2 , cc.winSize.height / 2 + 200));

        var spriteBatch = new cc.SpriteBatchNode(res.runner_png);
        spriteBatch.addChild(sprite);
        this.addChild(spriteBatch);



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

                //
                target.disVisiblePopup();

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
        //sprite.setPosition(cc.p(cc.winSize.width / 2 + 200, cc.winSize.height / 2 + 200));
        sprite.setPosition(cc.p(this.fieldList[0].getPosition().x, this.fieldList[0].getPosition().y));

        var spriteBatch = new cc.SpriteBatchNode(seed_png);
        //spriteBatch.addChild(sprite);
        spriteBatch.addChild(this.fieldList[0]);
        this.addChild(spriteBatch);

        //
        //runnerBoundingBox = sprite.getBoundingBox();



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
        //sprite.runAction(cc.animate(animation).repeat(1));  //repeat one time
        this.fieldList[0].runAction(cc.animate(animation).repeat(1));  //repeat one time
        ///////////

    },

    showSeedPopup: function(fieldId){

        //cc.log("showPopup");

        this.disVisiblePopup();

        this.popupBackground = cc.Sprite.create(res.popup2);
        this.popupBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.popupBackground, 10);

        //
        var index = this.getIndexOfFieldList(fieldId);
        cc.log("index = " + index);
        if (index != null) {
            this.popupBackground.setPosition(this.fieldList[index].x - this.fieldList[index].width / 1.5, this.fieldList[index].y + this.fieldList[index].height / 1.5);
        }


        // if (seedList != null){
        //     for (var i = 0; i < seedList.length; i++){
        //
        //     }
        // }



        var crops = new SeedSprite(this, res.crops, ProductTypes.CROP_WHEAT);
        var caroot = new SeedSprite(this, res.caroot, ProductTypes.CROP_CARROT);

        crops.setPosition(cc.p(this.popupBackground.x - crops.width / 2, this.popupBackground.y));
        caroot.setPosition(cc.p(this.popupBackground.x + caroot.width / 2, this.popupBackground.y));


        this.popupItemList = [];
        this.popupItemList.push(crops);
        this.popupItemList.push(caroot);

        this.addChild(crops);
        this.addChild(caroot);

    },

    showToolPopup: function(fieldId){

        //cc.log("showPopup");

        this.disVisiblePopup();


        this.popupBackground = cc.Sprite.create(res.popup1);
        this.popupBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.popupBackground, 10);

        //
        var index = this.getIndexOfFieldList(fieldId);
        cc.log("index = " + index);
        if (index != null) {
            this.popupBackground.setPosition(this.fieldList[index].x - this.fieldList[index].width / 1.5, this.fieldList[index].y + this.fieldList[index].height / 1.5);
        }


        var tool = new CropToolSprite(this, res.liem);

        tool.setPosition(cc.p(this.popupBackground.x, this.popupBackground.y));

        // this.popupBackground.addChild(tool);
        this.popupItemList = [];
        this.popupItemList.push(tool);
        this.addChild(tool);

    },
    disVisiblePopup: function(){
        //cc.log("disvisible");
        //this.removeChild(this.popupBackground);
        if (this.popupBackground != null) {
            if (this.popupBackground.isVisible()) {
                this.popupBackground.setVisible(false);
            }

        }
//
        this.disVisibleItemOfPopup(ProductTypes.CROP_WHEAT);

    },
    removePopup: function(){
        //cc.log("remove popup");

        if (this.popupBackground != null){
            this.popupBackground.removeFromParent(true);

        }
        // if (this.getChildByTag(10)){
        //     this.removeChild(this.popupBackground);
        // }
    },

    runAnimationPlantting: function(num, str_seed_key, speed, fieldId){
        var index = this.getIndexOfFieldList(fieldId);
        if (index != null){
            this.fieldList[index].loadAnimFrames(num, str_seed_key, speed);

            this.fieldList[index].runAnimationRepeat(1);
        }

    },
    runAnimationCrop: function (num, str_seed_key, speed, fieldId) {
        var index = this.getIndexOfFieldList(fieldId);
        if (index != null){
            this.fieldList[index].loadAnimFrames(num, str_seed_key, speed);

            this.fieldList[index].runAnimationRepeat(1);
        }

    },


    //
    getIndexOfFieldList: function (fieldId) {
        if (fieldId == null){
            return null;
        }
        for (var i = 0; i < this.fieldList.length; i++){
            if (this.fieldList[i].fieldId == fieldId){
                return i;
            }
        }
        return null;
    },
    getIndexSeedOfPopupItemList: function (seedId) {
        if (seedId == null){    //tool
            return null;
        }
        for (var i = 0; i < this.popupItemList.length; i++){    //seed list
            if (this.popupItemList[i].seedType == seedId){
                return i;
            }
        }
        return null;
    },
    //
    disVisibleItemOfPopup: function(seedId){
        var index = this.getIndexSeedOfPopupItemList(seedId);
        if (index == null){
            for (var i = 0; i < this.popupItemList.length; i++){
                if (this.popupItemList[i] != null){
                    if (this.popupItemList[i].isVisible()){
                        this.popupItemList[i].setVisible(false);
                    }

                }
            }
            this.popupItemList = []
        } else {
            for (var i = 0; i < this.popupItemList.length; i++){
                if (index != i){
                    if (this.popupItemList[i] != null){
                        if (this.popupItemList[i].isVisible()){
                            this.popupItemList[i].setVisible(false);
                        }

                    }

                }
            }

        }

    },
    removeItemOfPopup: function () {

    }

});
//MapLayer.instance = new MapLayer();