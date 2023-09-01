export class Product {
  id?: number;
  categoryId?: number;
  productName?: string;
  price?: number;
  urlImg?: string;

  constructor({ id, categoryId, productName, price, urlImg }) {
    if (id !== null) this.id = id;
    if (categoryId !== null) this.categoryId = categoryId;
    if (productName !== null) this.productName = productName;
    if (price !== null) this.price = price;
    if (urlImg !== null) this.urlImg = urlImg;
  }
}
