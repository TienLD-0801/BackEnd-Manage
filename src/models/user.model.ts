export class User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  role?: number;

  constructor({ id, name, email, password, role }) {
    if (id !== null) this.id = id;
    if (name !== null) this.name = name;
    if (email !== null) this.email = email;
    if (password !== null) this.password = password;
    if (role !== null) this.role = role;
  }
}
