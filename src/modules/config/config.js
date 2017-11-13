
var config = {

};

var ProductType = null;


function getSeedLevel(level) {

    var productTypeObj = null;
    cc.loader.loadJson(res.cropconfig,function(error, data){
        productTypeObj = data;
        ProductType = data;
        //cc.log("data " + str);// data is the json object
    });

    var seedLevelList = [];
    for (var i = 0; i < productTypeObj.length; i++){

        if (productTypeObj[i].level <= (level + 2)){
            seedLevelList.push(productTypeObj[i].id);
        }
    }

    return seedLevelList;
    // return [ProductTypes.CROP_WHEAT.TYPE, ProductTypes.CROP_CARROT.TYPE, ProductTypes.CROP_CORN.TYPE];

}

function getProductObjByType(productId){
    var productTypeObj = null;
    cc.loader.loadJson(res.cropconfig,function(error, data){
        productTypeObj = data;
        //ProductType = data;
    });

    for (var i = 0; i < productTypeObj.length; i++){

        if (productTypeObj[i].id == productId){
            return productTypeObj[i];
        }
    }

    return null;
}