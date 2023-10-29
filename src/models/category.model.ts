export class Category {
  id?: number;
  productCategoryName?: string;

  constructor({ id, productCategoryName }) {
    if (id !== null) this.id = id;
    if (productCategoryName !== null)
      this.productCategoryName = productCategoryName;
  }
}
