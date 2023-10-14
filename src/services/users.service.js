import { userModel } from "../DAO/models/users.model.js";
import {logger} from "../utils/logger.js";
export class userService {
  
  async getAllUsers(limit) {
    const users = await userModel.find({}).limit(limit); 
    return users;
  }
  
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      const error = new Error("Validation error: please complete firstName, lastName, and email");
      logger.error(error.message);
      throw error;
    }
    return ({firstName, lastName,email})
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

  async addUser( newUser){
  try {
    const users = await this.getUser();
    const userExisting = users.some((user) => user.email == newUser.email);
    if (userExisting){
      throw ("This user already exists")
    };
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const cartId = await cartService.addCart()
    const userCreated = {
      email: newUser.email && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(newUser.email) ?
      newUser.email : (() => {
        throw ("Invalid Email")
      })(),
      firstName: newUser.firstName ? newUser.firstName : (() => {
        throw("Insert your first Name")
      })(),
      lastName: newUser.lastName? newUser.lastName :( ()=> {
        throw("Insert your last Name")})(),
      age: newUser.age ? newUser.age : "100",
      isAdmin: false,
      role: "user",
      password : hashedPassword,
      idCart: cartId._id
    };
    let createdUser = await userModel.create(userCreated);
    return createdUser;
  } catch (error) {
    logger.error(error.message);
    return {error: "Error al crear el usuario"};
  }
}
};