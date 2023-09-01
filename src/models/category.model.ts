export class Category {
  id?: number;
  productCategory?: string;

  constructor({ id, productCategory }) {
    if (id !== null) this.id = id;
    if (productCategory !== null) this.productCategory = productCategory;
  }
}
