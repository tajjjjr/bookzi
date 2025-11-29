/*
* AuthService acts as a bridge between the application and the authentication adapter.
* It provides methods to interact with user authentication processes.
*/
export class AuthService {
  constructor({ auth }) {
    this.auth = auth; // adapter
  }

  async getUserFromRequest(req) {
    return this.auth.getUser(req);
  }
}
