import{UsersDTO} from "../DAO/DTO/users.dto.js";
class SessionsController {

  currentSession(req, res){
    const user = new UsersDTO(req.session.user)
    return res.send(JSON.stringify(user));
  }

  shop(req,res){
    if(req.session ||req.session.user ){
      return res.render("/shop");
  }
};

  async registerGithub(req, res) {
    req.session.user = req.user;
    /* res.status(200).json({ status: "ok", msg: "User authenticated via GitHub" }); */
    res.render("/products");
  }

  showSession(req, res) {
    return res.send(JSON.stringify(req.session.user.firstName));
    /* res.status(200).json({ status: "ok", user: req.user }); */
  }
}

export default SessionsController;
