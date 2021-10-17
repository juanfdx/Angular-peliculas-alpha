import {environment} from "../../environments/environment";


export class User {


  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public image?: string,
    public password?: string,
    public role?: number,
  ) {}

  get imagenUrl() {
    if (this.image) {
      return `${environment.base_url}/upload/users/${this.image}`;
    } else {
      return `${environment.base_url}/upload/users/no-image`;
    }
  }


}
