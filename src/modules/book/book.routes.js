import express from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "./book.controller.js";
let router = express.Router();
router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);
export default router;
