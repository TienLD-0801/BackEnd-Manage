export class OrderModel {
  id?: number;
  name?: string;
  email?: string;
  phone?: number;
  dateSchedule?: Date;
  constructor({ id, name, phone, email, dateSchedule }) {
    if (id !== null) this.id = id;
    if (name !== null) this.name = name;
    if (email !== null) this.email = email;
    if (phone !== null) this.phone = phone;
    if (dateSchedule !== null) this.dateSchedule = dateSchedule;
  }
}
