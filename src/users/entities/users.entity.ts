import { UserInterface } from '../interfaces';

export class UserEntity {
  private id: string;
  private name: string;
  private email: string;
  private dateOfBirth: number;
  private description: string;

  private createdAt: number;
  private updatedAt: number;

  constructor(data: UserInterface) {
    this.init(data);
  }

  init(data: UserInterface) {
    const { id, name, email, dateOfBirth, description, createdAt, updatedAt } =
      data;
    this.id = id;
    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  get getDateOfBirth(): number {
    return this.dateOfBirth;
  }

  get getDescription(): string {
    return this.getDescription;
  }

  get getCreatedAt(): number {
    return this.createdAt;
  }

  get getUpfdatedAt(): number {
    return this.updatedAt;
  }
}
