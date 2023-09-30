import customError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";
import { ProductService } from "../services/products.service.js";
import { userService } from "../services/users.service.js";
import {startLogger} from "../utils/logger.js";
export class UserController {

  async getAllUsers(req, res,next){
    try{
      const limit = parseInt(req.query.limit) || 10;
      const allUsers = await userService.getAllUsers(limit);
      return res.status(200).json({
        success: true,
        data: allUsers,
        payload: users,
        })
        } catch (error) {
          next(customError.createError({
            name: "DatabaseError",
            cause: error,
            message: "Error getting users",
            code: EErrors.DATABASE_ERROR,
          }));
        };
    }
  

  async createOne(req,res){
    const userToSave = req.body;
    try {
      const savedUser = userService.createOne(userToSave);
      return res.json({
        status: "ok",
        payload: savedUser,
      });      
    } catch (error) {
      next(customError.createError({
        name:"InvalidTypeError",
        cause:generateUserErrorInfo(userToSave),
        message:"Invalid user data",
        code: EErrors.INVALID_TYPES_ERROR,
      }));
    }
  }

  async updateOne(req, res){
    const _id = req.params.id;
    const {firstName, lastName, email} = req.body;
    try {
      let userUptaded = await Service.updateOne(_id,firstName,lastName, email);
      return res.status(200).json({
        status: " ok",
        message:"Successfully updated User!",
        data : userUptaded,
      })
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message :"Internal Server Error",
        data: {}
      });
    }
  }

  async shop (req,res){
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        status: "error",
        msg: "Failed to get shop data",
      });
    }  
  };

  async deleteOne(req, res){
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) throw customError.createError({
        name: "InvalidObjectIdError",
        message: "Invalid ObjectId",
        code: EErrors.INVALID_TYPES_ERROR,
      });
      // delete the user with this ID from DB and send response back to client
      return res.status(200).json({
        status: "ok",
        msg: "user deleted",
        data: {},
      });
    } catch (error) {
      startLogger.error(e.message);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong ",
        data: {},
      });
    }
  };

  async togglePremiumRol(req, res) {
    try {
      const userId = req.params.uid;
      const user = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Cambiar el rol de "user" a "premium" o viceversa
      user.rol = user.rol === "user" ? "premium" : "user";
      await user.save();

      res.status(200).json({
        status: "ok",
        msg: `Rol de usuario actualizado a ${user.rol}`,
        data: user,
      });
    } catch (error) {
      startLogger.error(error.message);
      res.status(500).json({
        status: "error",
        msg: "Error al cambiar el rol del usuario",
      });
    }
  }
}


