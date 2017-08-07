module.exports = function Cart(initItems) {
    this.items = initItems;

    this.totalPrice = 0;
    this.membershipId = '';

    if (this.items) {
        for (var key in this.items) {
            var price_eighth_oz = this.items[key].price_eighth_oz * this.items[key].quantity_eighth_oz;
            var price_quarter_oz = this.items[key].price_quarter_oz * this.items[key].quantity_quarter_oz;
            var price_half_oz = this.items[key].price_half_oz * this.items[key].quantity_half_oz;
            var price_one_oz = this.items[key].price_one_oz * this.items[key].quantity_one_oz;
            this.totalPrice += price_eighth_oz + price_quarter_oz + price_half_oz + price_one_oz;
        }
    }

    this.add = function (item, id, quantity_eighth_oz, quantity_quarter_oz, quantity_half_oz, quantity_one_oz) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                quantity_eighth_oz: 0, price_eighth_oz: 0,
                quantity_quarter_oz: 0, price_quarter_oz: 0,
                quantity_half_oz: 0, price_half_oz: 0,
                quantity_one_oz: 0, price_one_oz:0
            };
        }
        storedItem.quantity_eighth_oz += quantity_eighth_oz;
        storedItem.quantity_quarter_oz += quantity_quarter_oz;
        storedItem.quantity_half_oz += quantity_half_oz;
        storedItem.quantity_one_oz += quantity_one_oz;
        storedItem.price_eighth_oz = storedItem.item.price_eighth_oz * storedItem.quantity_eighth_oz;
        storedItem.price_quarter_oz = storedItem.item.price_quarter_oz * storedItem.quantity_quarter_oz;
        storedItem.price_half_oz = storedItem.item.price_half_oz * storedItem.quantity_half_oz;
        storedItem.price_one_oz = storedItem.item.price_one_oz * storedItem.quantity_one_oz;
        this.totalPrice += storedItem.price_eighth_oz + storedItem.price_quarter_oz +
            storedItem.price_half_oz + storedItem.price_one_oz;
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};