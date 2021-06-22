export class Shipping {
    shippingType: string;
    shippingPrice: number;
    shippingIDCode: number;

    constructor(shippingType: string, shippingPrice: number, shippingIDCode: number){
        this.shippingType = shippingType;
        this.shippingPrice = shippingPrice;
        this.shippingIDCode = shippingIDCode;
    }

}
