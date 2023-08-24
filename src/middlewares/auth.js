export function isLoggedIn(req,res,next){
  if(req.session?.user?.email){
    return next();
  }
  return res.status(401).render("error", { error: "Error logging in"});
};

export function isAdmin(req,res,next){
  if( req.session?.user?.role == "admin"){
    return next();
  }
  return res.status(403).render("error", {error: "authorization error"})
};

export function isUser(req,res,next){
  if(req.session?.user?.role == "user"){
    return next();
  }
  return res.status(401).render
  ("error", {error: "Authentication Error"})
};




