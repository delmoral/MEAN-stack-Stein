export class Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    shop: string;
    imagePath: string;

    constructor(_id = "", name = "", price = 0, category = "", shop = null, imagePath = null){
        this._id = _id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.shop = shop;
        this.imagePath = imagePath;
    }
}
