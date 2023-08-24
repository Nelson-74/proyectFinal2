import { userModel } from "../DAO/models/users.model.js";

class userDAO {
  async findAll() {
    const users = await userModel.find({});
    return users;
  }

  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log("validation error: please complete firstName, lastName and email");
      throw new Error("validation error: please complete firstName, lastName and email");
    }
    return { firstName, lastName, email };
  }

  async create(firstName, lastName, email) {
    this.validateUser(firstName, lastName, email);
    const userCreated = await userModel.create({ firstName, lastName, email });
    return userCreated;
  }

  async deleteById(_id) {
    const deleted = await userModel.deleteOne({ _id });
    return deleted;
  }

  async updateById(_id, firstName, lastName, email) {
    if (!_id) throw new Error("invalid _id");
    this.validateUser(firstName, lastName, email);
    const userUpdated = await userModel.updateOne({ _id }, { firstName, lastName, email });
    return userUpdated;
  }
}

export default UserDAO;
