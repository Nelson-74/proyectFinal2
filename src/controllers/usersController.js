import customError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";
import { ProductService } from "../services/products.service.js";
import { userService } from "../services/users.service.js";
import { userModel } from "../DAO/models/users.model.js";
import {logger} from "../utils/logger.js";
import { ObjectId } from "mongoose";
export class UserController {

  async getAllUsers(req, res,next){
    try{
      const limit = parseInt(req.query.limit) || 10;
      const userServiceInstance = new userService(); 
      const allUsers = await userServiceInstance.getAllUsers(limit);
      return res.status(200).json({
        success: true,
        data: allUsers,
        //payload: users,
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
  

  async createOne(req,res,next){
    const userToSave = req.body;
    try {
      const savedUser = await userService.createOne(userToSave);
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
      let userUpdated = await userService.updateOne(_id,firstName,lastName, email);
      return res.status(200).json({
        status: " ok",
        message:"Successfully updated User!",
        data : userUpdated,
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
      logger.error(error.message,error);
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
      const user = await userModel.findById(userId);
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
      logger.error(error.message,error);
      res.status(500).json({
        status: "error",
        msg: "Error al cambiar el rol del usuario",
      });
    }
  }
  async updateToPremium(req, res) {
  try {
    const uid = req.params.uid;
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Verificar si el usuario ha cargado los documentos requeridos
    const requiredDocuments = ["Identificación", "Comprobante de domicilio", "Comprobante de estado de cuenta"];
    const hasRequiredDocuments = requiredDocuments.every((docName) =>
      user.documents.some((doc) => doc.name === docName)
    );
    if (!hasRequiredDocuments) {
      return res.status(400).json({ message: "El usuario no ha cargado todos los documentos requeridos" });
    }
    // Cambiar el rol de "user" a "premium"
    user.rol = "premium";
    await user.save();
    res.status(200).json({
      status: "ok",
      msg: `Rol de usuario se ha actualizado a ${user.rol}`,
      data: user,
    });
  } catch (error) {
    logger.error(error.message,error);
    res.status(500).json({
      status: "error",
      msg: "Error al cambiar el rol del usuario",
    });
  }
}
  async uploadDocuments(req, res) {
    try {
      const uid = req.params.uid;
      const user = await userModel.findById(uid);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const uploadedDocuments = req.files; // Archivos cargados por Multer
      // Aquí puedes procesar los archivos y actualizar la propiedad "documents" del usuario
      // Puedes usar user.documents para agregar los documentos cargados al usuario
      // Actualiza la propiedad "documents" del usuario
      user.documents = uploadedDocuments.map((file) => ({
        name: file.originalname,
        reference: file.filename, // Aquí puedes guardar el nombre del archivo o su ruta en tu servidor
      }));
      await user.save();
      res.status(200).json({
        status: "ok",
        msg: "Documentos cargados exitosamente",
        data: user,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).json({
        status: "error",
        msg: "Error al cargar documentos",
      });
    }
  }
}




