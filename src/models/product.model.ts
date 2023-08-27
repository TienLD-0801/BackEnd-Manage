export class Product {
  id?: number;
  categoryId?: number;
  productName?: string;
  price?: number;
  urlImg?: string;
  nameImg?: string;

  constructor({ id, categoryId, productName, price, urlImg, nameImg }) {
    if (id !== null) this.id = id;
    if (categoryId !== null) this.categoryId = categoryId;
    if (productName !== null) this.productName = productName;
    if (price !== null) this.price = price;
    if (urlImg !== null) this.urlImg = urlImg;
    if (nameImg !== null) this.nameImg = nameImg;
  }
}
