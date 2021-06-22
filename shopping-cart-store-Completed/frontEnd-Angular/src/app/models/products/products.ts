export class Products {
    productCode: number;
    productName: string;
    productLine: string;
    productVender: string;
    productDescription: string;
    quantityInStock: number;
    productPrice: number;
  

    constructor(productCode: number, productName: string, productLine: string, productVender: string, productDescription: string, quantityInStock: number, productPrice: number) {
        this.productCode = productCode;
        this.productName = productName;
        this.productLine = productLine;
        this.productVender = productVender;
        this.productDescription = productDescription;
        this.quantityInStock = quantityInStock;
        this.productPrice = productPrice;
       
    }

}





