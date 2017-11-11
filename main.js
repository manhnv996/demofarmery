/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
var gv = gv || {};

var user;

cc.game.onStart = function () {
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    cc.loader.resPath = "res";
    cc.LoaderScene.preload(g_resources, function () {
        //hide fps
        cc.director.setDisplayStats(true);
        fr.clientConfig.init();
        // Setup the resolution policy and design resolution size
        cc.view.setDesignResolutionSize(fr.clientConfig.getDesignResolutionSize().width, fr.clientConfig.getDesignResolutionSize().height, cc.ResolutionPolicy.SHOW_ALL);
        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);
        //update config resource
        fr.clientConfig.detectResourceFromScreenSize();
        if(cc.sys.isNative) {
            cc.view.setContentScaleFactor(fr.clientConfig.getResourceScale());
        }
        fr.clientConfig.updateResourceSearchPath();
        gv.gameClient = new GameClient();
        gv.poolObjects = new PoolObject();
        testnetwork.connector = new testnetwork.Connector(gv.gameClient);

        //fr.view(ScreenMenu);
        //fr.view(MyScene);
        fr.view(MapScene);

        //cc.log(ProductTypes.length);
        // cc.log(JSON.stringify(getSeedLevel(1)));

        var array = [ProductTypes];
        cc.log(JSON.stringify(array));

        // find_value(array, 'EXP');

        var matches = array.filter(function(val, index, array) {
            return val.EXP === 1;
        });

        cc.log(JSON.stringify(matches));



        var filteredObj = array.find(function(item, i){
            if(item.EXP === 1){
                index = i;
                return i;
            }
        });

        cc.log(JSON.stringify(filteredObj));



        //var currentdate = new Date();
        //currentdate.setHours(3, 50, 40);
        //
        //var field1 = new Field(new Coordinate(12, 12), 'field01');
        //field1.setPlantType(ProductTypes.CROP_CARROT);
        //field1.setPlantedTime(currentdate);
        //field1.getCropTime();
        //
        //cc.log(field1.checkStatus());


        ////    TEST//
        ////     var field = new Field();
        var foodStorage = new Storages(new Coordinate(10, 10), initt.foodStorage.storageId, initt.foodStorage.capacity);
        //var warehouse = new Storages(new Coordinate(15, 10), initt.warehouse.storageId, initt.warehouse.capacity);

        foodStorage.addItem(ProductTypes.CROP_CARROT, 10);
        foodStorage.addItem(ProductTypes.CROP_WHEAT, 10);

        var asset = new Asset(foodStorage, null, null, null, null, null, null);
        user = new User(asset);

        var currentdate = new Date();
        currentdate.setHours(3, 50, 40);
        for (var i = 0; i < 6; i++){
            var field = new Field(new Coordinate(300 - i * 20, 300 - i * 20), i);
            if (i % 2 == 0){
                //field.setPlantType(ProductTypes.CROP_CARROT.TYPE);

                //field.setPlantedTime(currentdate);
            }
            asset.addField(field);
        }
///////////////
        var item = user.getAsset().getFoodStorage().getItemList();
        var str = "FoodStorage: " + user.getAsset().getFoodStorage().getCurrentQuantity() + "/ " + user.getAsset().getFoodStorage().getCapacity() + "\n";
        for (var _i = 0; _i < item.length; _i++){
            cc.log(item[_i].getTypeItem().TYPE);
            cc.log(item[_i].getQuantityItem());
            str += "TYPE: " + item[_i].getTypeItem().TYPE + ", quantity: " + item[_i].getQuantityItem() + "\n";
        }
        MapLayer.instance.label1.setString(str);
/////////////////



        cc.log(JSON.stringify(user.getAsset().getFoodStorage().getItemList()));
        cc.log(user.getAsset().getFoodStorage().getCurrentQuantity());
        cc.log(user.getAsset().getFoodStorage().getCapacity());
        //cc.log(user.getAsset().getFieldList()[0].crop());




        //
        //
        //cc.log(ProductTypes.CROP_CORN);
        //cc.log(user.getAsset().getFoodStorage().getQuantity(ProductTypes.CROP_CORN));
        //cc.log(user.getAsset().getFoodStorage().getCapacity());
        //cc.log(user.getAsset().getFoodStorage().getCurrentQuantity());
        //
        //

        //var currentdate = new Date();
        //var comparedate = currentdate;
        //comparedate.setHours(3, 50, 40);
        //var intt = comparedate.getTime();
        //comparedate.setTime(intt + 8100 * 1000);
        //cc.log(comparedate);

        // currentdate.setMonth(5, 15);
        // cc.log(currentdate);
        // cc.log(currentdate.getHours() + ": "
        //     + currentdate.getMinutes() + ": "
        //     + currentdate.getSeconds());

        //var field1 = new Field(new Coordinate(12, 12), 'field01');
        //asset.addField(field1);
        //
        //// cc.log(user.getAsset().getFieldList()[0].checkStatus());
        //
        //cc.log(user.getAsset().getFieldList()[0].crop());
        //
        //// cc.log(user.getAsset().getFoodStorage().takeItem(ProductTypes.CROP_CORN.TYPE, 3));
        //cc.log(user.getAsset().getFoodStorage().getCurrentQuantity());
        //
        //// user.addExp(this.plantType.EXP);
        //cc.log("X: " + user.getAsset().getFieldList()[0].getCoordinate().getCurrX());
        //
        //cc.log(user._test = 55);
        //cc.log("get " + user._test);
        ////cc.log(user.addExp(4));
        ////cc.log("get " + user._test);


    }, this);
};
cc.game.run();



//cc.game.onStart = function () {
//    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
//        document.body.removeChild(document.getElementById("cocosLoading"));
//
//    // Pass true to enable retina display, disabled by default to improve performance
//    cc.view.enableRetina(false);
//    // Adjust viewport meta
//    cc.view.adjustViewPort(true);
//    cc.loader.resPath = "ress";
//    cc.LoaderScene.preload(game_resources, function () {
//        //hide fps
//        cc.director.setDisplayStats(true);
//        fr.clientConfig.init();
//        // Setup the resolution policy and design resolution size
//        cc.view.setDesignResolutionSize(fr.clientConfig.getDesignResolutionSize().width, fr.clientConfig.getDesignResolutionSize().height, cc.ResolutionPolicy.SHOW_ALL);
//        // The game will be resized when browser size change
//        cc.view.resizeWithBrowserSize(true);
//        //update config resource
//        fr.clientConfig.detectResourceFromScreenSize();
//        if(cc.sys.isNative) {
//            cc.view.setContentScaleFactor(fr.clientConfig.getResourceScale());
//        }
//        fr.clientConfig.updateResourceSearchPath();
//        gv.gameClient = new GameClient();
//        gv.poolObjects = new PoolObject();
//        testnetwork.connector = new testnetwork.Connector(gv.gameClient);
//
//        //fr.view(ScreenMenu);
//        fr.view(gameScene);
//    }, this);
//};
//cc.game.run();