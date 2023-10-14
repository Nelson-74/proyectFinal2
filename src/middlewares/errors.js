import EErrors from "../services/errors/enums.js";

export default(error, req,res,next) =>{
  console.log(error, error.cause);
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res
      .status(409)
      .render("error",{
        error: error.name,
        cause: error.cause
        });
      break; 
    case EErrors.DATABASE_ERROR:
      res
      .status(500)
      .render("error", {
        error: error.name,
        cause: error.cause,
      });
      break;
      default:
        res.status(500).render("error",{
          error: "Unhandled error",
        });
        break;
  }
    
};
