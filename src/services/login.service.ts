import connection from '../models/connection';
import UserModel from '../models/users.model';
import Login from '../interfaces/login.interface';

class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async findUser(login: Login) {
    const result = await this.model.findUser(login);
    if (result.length === 0) {
      return [];
    }
    return result;
  }
}

export default LoginService;