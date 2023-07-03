import { userModel } from "../DAO/models/usersModel.js";

export class userService {
  async getAll() {
    const users = await userModel.find({});
    return users;
  }
  
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log("validation error: please complete firstName, lastName and email");
      throw new Error("validation error: please complete firstName, lastName and email");
    }
  }

  async createOne(firstName, lastName, email) {
    this.validateUser(firstName, lastName, email);
    const userCreated = await userModel.create({ firstName, lastName, email });
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await userModel.deleteOne({ _id: _id }); 
    return deleted;
  }

  async updateOne(_id, firstName, lastName, email) {
    if (!_id) throw new Error("invalid _id");
    this.validateUser(firstName, lastName, email);
    const userUptaded = await userModel.updateOne({ _id: id }, { firstName, lastName, email });
    return userUptaded;
  }
};