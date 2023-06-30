export function isUser(req,res,next){
  if(req.session?.user?.mail){
    return next();
  }
  return res.status(401).render("error", { error: "Authentication Error"});
};

export function isAdmin(req,res,next){
  if( req.session?.user?.isAdmin){
    return next();
  }
  return res.status(403).render("error", {error: "authorization error"})
};

/* export function auth(req, res, next){
  if( req.session?.user === "nelson" && req.session?.admin){
    return next()
  }
  return res.status(401).send("error de autorización")
}; */