import Book from "../../db/models/book.model.js";

export const createBook = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    const book = await Book.create({ title, content, author });
    res.status(201).json({
      msg: "success",
      data: book,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    let query = {};

    if (req.query.title) {
      query.title = new RegExp(req.query.title, "i");
    }
    if (req.query.author) {
      query.author = new RegExp(req.query.author, "i");
    }

    const books = await Book.find(query)
      .populate("author")
      .skip(skip)
      .limit(limit);
    const totalBooks = await Book.countDocuments();
    res.status(200).json({
      msg: "success",
      totalBooks,
      page,
      data: books,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(400)
        .json({ msg: "fail", error: `no book for this id ${id}` });
    }
    res.status(200).json({ msg: "success", data: book });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const book = await Book.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!book) {
      return res
        .status(400)
        .json({ msg: "fail", error: `no book for this id ${id}` });
    }
    res.status(200).json({ msg: "success", data: book });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(400)
        .json({ msg: "fail", error: `no book for this id ${id}` });
    }
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(400).json(err);
  }
};
