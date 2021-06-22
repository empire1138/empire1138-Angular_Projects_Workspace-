const db = require('../util/database');

module.exports = class Grocery {
  constructor(productCode, productName) {
    this.productCode = productCode;
    this.productName = productName;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static post(productName) {
    return db.execute('INSERT INTO products (productName) VALUES (?)', [productName]);
  }

  static update(productCode, productName) {
    return db.execute('UPDATE products SET productName = ? WHERE productCode = ?', [productName, productCode]);
  }

  static delete(productCode) {
    return db.execute('DELETE FROM products WHERE productCode = ?', [productCode]);
  }
};
