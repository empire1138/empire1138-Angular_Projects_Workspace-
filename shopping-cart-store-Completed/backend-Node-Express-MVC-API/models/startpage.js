const db = require('../util/datebase');

module.exports = class StartPage {
    constructor(productCode, productName, productLine,
        productVendor, productDescription, quantityInStock,
        productPrice) {
        this.productCode = productCode;
        this.productName = productName;
        this.productLine = productLine;
        this.productVendor = productVendor;
        this.productDescription = productDescription;
        this.quantityInStock = quantityInStock;
        this.productPrice = productPrice;
    }

    static loadStartPage() {
        return db.execute(`SELECT * FROM products `);
    }


}

