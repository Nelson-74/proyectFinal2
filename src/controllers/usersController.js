import customError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";
import { ProductService } from "../services/products.service.js";
import { userService } from "../services/users.service.js";
import { userModel } from "../DAO/models/users.model.js";
import {logger} from "../utils/logger.js";

export class UserController {

  async getAllUsers(req, res,next){
    try{
      const limit = parseInt(req.query.limit) || 10;
      const userServiceInstance = new userService(); 
      const allUsers = await userServiceInstance.getAllUsers(limit);
      return res.status(200).json({
        success: true,
        data: allUsers,
        })
        } catch (error) {
          next(customError.createError({
            name: "DatabaseError",
            cause: error,
            message: "Error getting users from database",
            code: EErrors.DATABASE_ERROR,
          }));
        };
    }
  
  async createOne(req,res,next){
    const userToSave = req.body;
    if (!userToSave.firstName || !userToSave.lastName || !userToSave.email) {
      return res.status(400).render("error",{Error: "Campos de usuario faltantes"});
    }
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
    if (!firstName || !lastName || !email) {
      return res.status(400).render("error",{Error: "Campos de usuario faltantes"});
    }
    try {
      let userUpdated = await userService.updateOne(_id,firstName,lastName, email);
      return res.status(200).json({
        status: " ok",
        message:"Successfully updated User!",
        data : userUpdated,
      })
    } catch (error) {
      return res.status(500).render("error",{Error :"Internal Server Error"});
    }
  }

  async shop (req,res){
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).render("error",{Error: "Failed to get shop data"});
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
      return res.status(500).render("error",{Error: "something went wrong ",});
    }
  };

  async togglePremiumRole(req, res) {
    try {
      const userId = req.params.uid;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).render("error",{ Error: "Usuario no encontrado" });
      }
      if(!req.sessions.isAdmin){
        return res.status(403).send("No tienes permisos para realizar esta acción");
      }
      // Cambiar el rol de "user" a "premium" o viceversa
      user.role = user.role === "user" ? "premium" : "user";
      await user.save();
      res.status(200).json({
        status: "ok",
        msg: `Rol de usuario actualizado a ${user.role}`,
        data: user,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).render( "error",{ Error: "Error al cambiar el rol del usuario",});
    }
  }
  async updateToPremium(req, res) {
  try {
    const uid = req.params.uid;
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).render("error",{ Error: "Usuario no encontrado" });
    }
    if(!req.session.isAdmin){
      return res.status(403).render("error",{ Error: "No tienes permiso para cambiar el rol de usuario"});
    }
    // Verificar si el usuario ha cargado los documentos requeridos
    const requiredDocuments = ["Identificación", "Comprobante de domicilio", "Comprobante de estado de cuenta"];
    const hasRequiredDocuments = requiredDocuments.every((docName) =>
      user.document.some((doc) => doc.name === docName)
    );
    if (!hasRequiredDocuments) {
      return res.status(400).render("error",{ Error: "El usuario no ha cargado todos los documentos requeridos" });
    }
    // Cambiar el rol de "user" a "premium"
    user.role = "premium";
    await user.save();
    res.status(200).json({
      status: "ok",
      msg: `Rol de usuario se ha actualizado a ${user.role}`,
      data: user,
    });
  } catch (error) {
    logger.error(error.message,error);
    res.status(500).render("error",{Error: "Error al cambiar el rol del usuario"});
  }
}
  async uploadDocuments(req, res) {
    try {
      const uid = req.params.uid;
      const user = await userModel.findById(uid);
      if (!user) {
        return res.status(404).render("error",{ Error: "Usuario no encontrado" });       
      }
      if (!isLoggedIn(req)) {
        return res.status(401).render("error",{ Error: "Debes iniciar sesión para cargar documentos" });
      }
      if (!user.isAdmin) {
      return res.status(403).render("error",{ Error: "No tienes permiso para cargar documentos" });
      }
      const uploadedDocuments = req.files; 
      user.document = uploadedDocuments.map((file) => ({
        name: file.originalname,
        reference: file.filename, // Aquí puedes guardar el nombre del archivo o su ruta en tu servidor
      }));
      for(const file of uploadedDocuments){
        if(!isValidDocumentExtension(file.originalname)){
          return  res.status(415).send("Solo archivos con extension .pdf y .png son permitidos");
        }
      }
      // Almacena los documentos en una ubicación segura (por ejemplo, fuera del directorio público)
      for (const file of uploadedDocuments){
        const securePath = `/document/${file.filename}`;// Ruta segura para el servidor
        user.document.push({ name: file.originalname, reference: securePath });
      }
      await user.save();
      res.status(200).json({
        status: "ok",
        msg: "Documentos cargados exitosamente",
        data: user,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).render("error",{Error: "Error al cargar documentos"});
    }
  }
  isValidDocumentExtension(filename) {
    const allowedExtensions = [".pdf", ".doc", ".docx"]; // Ejemplo de extensiones permitidas
    const ext = path.extname(filename).toLowerCase();
    return allowedExtensions.includes(ext);
  }
}



