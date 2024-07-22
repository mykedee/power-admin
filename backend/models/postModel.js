const mongoose = require("mongoose");
const slugify = require("slugify");
const { nanoid } = require("nanoid");
let postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },

  body: {
    type: String,
    required: [true, "Body is required"],
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },

  photos: [{ img: { type: String } }],
  slug: {
    type: String,
    slug: "title",
  },
  productCode: {
    type: String,
    // default: shortid.generate(),
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre("save", function () {
  productCode = nanoid(10);
  this.slug = slugify(
    // this.title.split(" ").join("-") + "-" + this.productCode,
    this.title.split(" ").join("-") + "-" + this.productCode,
    { lower: true }
  );
});

module.exports = mongoose.model("Post", postSchema);
