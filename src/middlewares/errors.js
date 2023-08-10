import Errors from "../services/errors.service.js";

export default (error, req,res,next) =>{
  console.log(error,cause);
  switch (error.code) {
    case Errors.INVALID_TYPES_ERROR:
      res
      .status(409)
      .send({
        status:"error", 
        error: error.name,
        cause: error.cause
        });
      break;  
    default:
      res.send({
        status: "error",
        error: "Unhandled error"
      })
      break;
  }
    
}