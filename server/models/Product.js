const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "product name is required"],
	},
	price: {
		type: Number,
		required: [true, "product price is required"],
	},
	category: {
		type: String,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	follower: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: undefined,
	},
	image: {
		type: String,
	},
});

// exports.Product = mongoose.model("Product", productSchema);
module.exports = productSchema;
