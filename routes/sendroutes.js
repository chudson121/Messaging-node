const express=require("express");
const router=express.Router();

const controller=require("../handler/sendmessage");

router.post("/send",controller.sendmessage);

module.exports=router;
