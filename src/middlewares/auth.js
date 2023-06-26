export function isUser(req,res,next){
  if(req.session?.user?.mail){
    return next();
  }
  return res.status(401).render("error", {error: "error de autenticación"})
}

export function isAdmin(req,res,next){
  if( req.session?.user?.isAdmin){
    return next();
  }
  return res.status(403).render("error", {error: "error de autorización"})
}