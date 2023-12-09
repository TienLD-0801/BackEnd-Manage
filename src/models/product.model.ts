export class Product {
  id?: number;
  categoryId?: number;
  productName?: string;
  url_id?: string;
  url?: string;
  price?: number;

  constructor({ id, categoryId, productName, url, price }) {
    if (id !== null) this.id = id;
    if (categoryId !== null) this.categoryId = categoryId;
    if (productName !== null) this.productName = productName;
    if (this.url_id !== null) this.url_id = this.url_id;
    if (url !== null) this.url = url;
    if (price !== null) this.price = price;
  }
}
