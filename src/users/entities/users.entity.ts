import { UserInterface } from '../interfaces';

export class UserEntity {
  private id: string;
  private name: string;
  private birthday: number;

  constructor(data: UserInterface) {
    this.init(data);
  }

  init(data: UserInterface) {
    const { id, name, birthday } = data;
    this.id = id;
    this.name = name;
    this.birthday = birthday;
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getBirthday(): number {
    return this.birthday;
  }
}
