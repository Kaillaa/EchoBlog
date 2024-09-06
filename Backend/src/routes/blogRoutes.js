import { Router } from "express";
import {
  buscarPostId,
  createPost,
  getAll,
  getPost,
  updatePost,
} from "../controllers/blogControllers.js";

const routerPosts = Router();

routerPosts.post("/", createPost);
routerPosts.get("/", getAll);
routerPosts.get("/:id", getPost);
routerPosts.put("/:id", updatePost);
routerPosts.get("/status/:id", buscarPostId);

export default routerPosts;
