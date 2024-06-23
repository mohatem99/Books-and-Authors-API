import express from "express";
import {
  crateAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "./author.controller.js";

const router = express.Router();
router.route("/").get(getAuthors).post(crateAuthor);
router.route("/:id").get(getAuthor).patch(updateAuthor).delete(deleteAuthor);
export default router;
