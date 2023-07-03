export function isUser(req,res,next){
  if(req.session?.user?.email){
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

export function auth(req, res, next){
  if( req.session?.user === "nelson" && req.session?.isAdmin){
    return next()
  }
  return res.status(403).render("error", {error: "authorization error"})
}; 