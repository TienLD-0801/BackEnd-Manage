export class User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  card_id?: string;
  phone?: string;
  role?: number;

  constructor({ id, name, email, password, age, card_id, phone, role }) {
    if (id !== null) this.id = id;
    if (name !== null) this.name = name;
    if (email !== null) this.email = email;
    if (password !== null) this.password = password;
    if (age !== null) this.age = age;
    if (card_id !== null) this.card_id = card_id;
    if (phone !== null) this.phone = phone;
    if (role !== null) this.role = role;
  }
}
