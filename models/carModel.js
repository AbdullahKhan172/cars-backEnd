const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, "A car must have a model"],
  },
  price: {
    type: String,
    required: [true, "A car must have a price"],
  },
  phone: {
    type: String,
    required: [true, "You must include a phone number"],
  },
  city: {
    type: String,
    required: [true, "You must belong to a city"],
    enum: {
      values: ["Lahore", "Karachi"],
      message: "The city must be one of Lahore or Karachi",
    },
  },
  photosNo: {
    type: Number,
    required: [true, "Please enter number of photos"],
  },
  photos: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length === this.photosNo;
      },
      message: `The number of photos should be equal to the photosNo`,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: ["A form submit must belong to a user"],
  },
});

const Cars = mongoose.model("Cars", carSchema);

module.exports = Cars;
