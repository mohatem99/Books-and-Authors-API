import express from "express";
import connectiondb from "./src/db/connectionDb.js";
import bookRoutes from "./src/modules/book/book.routes.js";
import authorRoutes from "./src/modules/author/author.routes.js";

const app = express();
connectiondb();
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.listen(8000, () => {
  console.log("server up and running ");
});
