import { Router } from "express";
import {
  buscarPostId,
  create,
  getAll,
  getPost,
  updatePost,
} from "../controllers/blogControllers.js";

const routerPosts = Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.get("/status/:id", buscarPostId);

export default routerPosts;
