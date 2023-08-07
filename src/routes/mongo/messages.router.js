import express from "express";

const messagesRouter = express.Router ();

messagesRouter.get ("/message" , async(req, res) => {
  try {
        res.status(200).render ("chat");
  } catch (error) {
        res.status(500).json({
          status : "error",
          msg: "error",
  })
  }
});
export default messagesRouter;

