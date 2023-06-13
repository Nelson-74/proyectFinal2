import { Router } from "express";
import { get } from "mongoose";

const router = Router ();

router.get ("/" , async(req, res) => {
  try {
        res.render ("chat");
  } catch (error) {
        res.status(500).json({
          status : "error",
          msg: "error",
  })
  }
});

