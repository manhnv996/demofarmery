
var StorageItem = cc.Class.extend({

    typeItem: ProductTypes,
    quantity: Infinity,

    ctor: function (typeProduct, quantity) {
        //
        //this._super();

        this.init(typeProduct, quantity);

    },
    init: function (typeProduct, quantity) {

        this.typeItem = typeProduct;
        this.quantity = quantity;
    },

    addQuantity: function (number) {
        this.quantity += number;

    },
    reduceQuantity: function (number) {
        this.quantity -= number;
    },

    getTypeItem: function () {
        return this.typeItem;
    },
    getQuantityItem: function () {
        return this.quantity;
    }

});