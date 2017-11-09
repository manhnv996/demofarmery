
var ProductTypes = {

    CROP_WHEAT: {
        TYPE: 0,

        TIME_MIN: 2,
        EXP: 1,
        MAX_PRICE: 3,
        LEVEL_UNLOCK: 1,
        RUBI: 1,
        SPEED_UP: 1

    },
    CROP_CORN: {
        TYPE: 1,

        TIME_MIN: 5,
        EXP: 1,
        MAX_PRICE: 7,
        LEVEL_UNLOCK: 3,
        RUBI: 1,
        SPEED_UP: 1

    },
    CROP_CARROT: {
        TYPE: 2,

        TIME_MIN: 10,
        EXP: 2,
        MAX_PRICE: 7,
        LEVEL_UNLOCK: 9,
        RUBI: 2,
        SPEED_UP: 1

    },
    CROP_SOYBEAN: {
        TYPE: 3,

        TIME_MIN: 20,
        EXP: 2,
        MAX_PRICE: 10,
        LEVEL_UNLOCK: 5,
        RUBI: 2,
        SPEED_UP: 1

    },
    CROP_SUGARCANE: {
        TYPE: 4,

        TIME_MIN: 30,
        EXP: 3,
        MAX_PRICE: 14,
        LEVEL_UNLOCK: 7,
        RUBI: 3,
        SPEED_UP: 1

    },


    GOOD_EGG: 10,
    GOOF_MILK: 11,

    PRODUCT_BREAD: 20,
    PRODUCT_CORN_BREAD: 21,
    PRODUCT_COOKIE: 22,
    FOOD_CHICKEN: 23,
    FOOD_COW: 24,
    PRODUCT_CREAM: 25,
    PRODUCT_BUTTER: 26,
    PRODUCT_BROWN_SUGAR: 27,
    PRODUCT_POPCORN: 28,
    PRODUCT_PANCAKE: 29,

    CUT_AXE: 30,
    CUT_SAW: 31,
    CUT_DYNOMITE: 32,
    CUT_BIG_BYNOMITE: 33,
    CUT_SHOVEL: 34

};

function getSeedLevel(level) {

    var jsonString = JSON.stringify(ProductTypes);
    cc.log(jsonString);
    var jsonOject = JSON.parse(jsonString);


    //for (var i in jsonOject){
    //    jsonString = JSON.stringify(i);
    //    cc.log(jsonString);
    //    jsonOject = JSON.parse(jsonString);
    //
    //    break;
    //}
}