import connection from '../models/connection';
import UserModel from '../models/users.model';
import User from '../interfaces/users.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<User> {
    return this.model.create(user);
  }

  public async findUserById(id: number) {
    return this.model.findUserById(id);
  }
}

export default UserService;