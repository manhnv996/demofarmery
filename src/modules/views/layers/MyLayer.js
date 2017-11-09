var Dinosaur = cc.Sprite.extend({
	ctor: function(parent) {
		this._super(res.dinosaur_png);
		var listener1 = cc.EventListener.create({
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
                //parent.x += delta.x;
                //parent.y += delta.y;

				cc.log("onTouchMoved: " + parent.x + ", " + parent.y);
				this.runAction(new cc.moveBy(0.1, new cc.p(delta.x, delta.y)));
            }.bind(this),

            onTouchEnded: function (touch, event) {
                cc.log("sprite onTouchesEnded.. ");
            }
        });
		cc.eventManager.addListener(listener1, this);
	}
})

var MyLayer = cc.Layer.extend({
	currentScale: 1.0,

	ctor: function() {
		this._super();
		// this.setPosition(100, 100);
		var sprite = new Dinosaur(this);
		//var sprite2 = new Dinosaur(this);
		var sprite2 = new SeedSprite(this, res.lua_nep);

		var bg = new cc.Sprite(res.background_jpg);
		this.addChild(bg);
		bg.setPosition(cc.p(cc.winSize.width / 2 , cc.winSize.height / 2));
		sprite.setPosition(cc.p(cc.winSize.width / 2 , cc.winSize.height / 2));
		sprite2.setPosition(cc.p(cc.winSize.width / 2 - 100, cc.winSize.height / 2 - 100));
		this.addChild(sprite);
		this.addChild(sprite2);
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
		var lstScale = this.currentScale;
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
	}
});


var MyScene = cc.Scene.extend({
	ctor: function() {
		this._super();
		var layer = new MyLayer();
		this.addChild(layer);
	}
});
