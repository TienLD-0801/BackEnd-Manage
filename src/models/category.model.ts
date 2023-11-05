export class Category {
  id?: number;
  categoryName?: string;

  constructor({ id, categoryName }) {
    if (id !== null) this.id = id;
    if (categoryName !== null) this.categoryName = categoryName;
  }
}
