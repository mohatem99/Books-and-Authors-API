import Author from "../../db/models/author.model.js";
export const crateAuthor = async (req, res, next) => {
  try {
    const { name, bio, birthDate, books } = req.body;
    const author = await Author.create({ name, bio, birthDate, books });
    res.status(201).json({
      msg: "success",
      data: author,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getAuthors = async (req, res, next) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    let query = {};
    if (req.query.name) {
      query.name = new RegExp(req.query.name, "i");
    }
    if (req.query.bio) {
      query.bio = new RegExp(req.query.bio, "i");
    }
    console.log(query);
    const authors = await Author.find(query)
      .populate("books")
      .skip(skip)
      .limit(limit);
    const totalAuthors = await Author.countDocuments();
    res.status(200).json({ msg: "success", totalAuthors, page, data: authors });
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) {
      return res
        .status(400)
        .json({ msg: "fail", error: `no author for this id ${id}` });
    }
    res.status(200).json({ msg: "success", data: author });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    const author = await Author.findByIdAndUpdate(
      id,
      { name, bio },
      { new: true }
    );
    if (!author) {
      return res
        .status(400)
        .json({ msg: "fail", error: `no author for this id ${id}` });
    }
    res.status(200).json({ msg: "success", data: author });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return res
        .status(400)
        .json({ msg: "fail", error: `no author for this id ${id}` });
    }
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(400).json(err);
  }
};
