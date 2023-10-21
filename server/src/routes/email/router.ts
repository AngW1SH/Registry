import emailController from "@/controllers/email";
import express from "express";

const emailRouter = express();

emailRouter.post("/", emailController.send);

export default emailRouter;
