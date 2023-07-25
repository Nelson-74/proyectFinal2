import { userService } from "../services/users.service.js";

class UsersController {

  async getAllUsers(req, res){
    try{
      const limit = parseInt(req.query.limit) || 10;
      const allUsers = await userService.getAllUsers(limit);
      return res.status(200).json({
        success: true,
        data: allUsers,
        })
        } catch (error) {
          return res.status(500).json({
            error: "Error getting users "
          });
    }
  }

  async createOne(req,res){
    const userToSave = req.body;
    const savedUser = userService.createOne(userToSave);
    return res.json({
      status: "ok",
      payload: savedUser,
    })
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

  async deleteOne(req, res){
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");
      // delete the user with this ID from DB and send response back to client
      return res.status(200).json({
        status: "ok",
        msg: "user deleted",
        data: {},
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong ",
        data: {},
      });
    }
  }

}
export const usersController = new UsersController();