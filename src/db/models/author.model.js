import mongoose, { mongo } from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: { type: String },
    birthDate: {
      type: Date,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);
const Author = mongoose.model("Author", authorSchema);
export default Author;
