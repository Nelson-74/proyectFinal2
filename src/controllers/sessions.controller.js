

class SessionsController {

  async registerGithub(req, res) {
    req.session.user = req.user;
    /* res.status(200).json({ status: "ok", msg: "User authenticated via GitHub" }); */
    res.redirect("/products");
  }

  showSession(req, res) {
    return res.send(JSON.stringify(req.session.user.firstName));
    /* res.status(200).json({ status: "ok", user: req.user }); */
  }
}

export default SessionsController;
