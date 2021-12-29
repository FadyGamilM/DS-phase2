// TODO=> import bcrypt to hash the passwords before saving to database
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	image: {
		type: String,
	},
	email: {
		type: String,
		required: [true, "Email Is Required"],
		lowercase: true, // fady@gmail is same as FADY@gmail
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password Is Required"],
	},
	cach: {
		type: Number,
		default: Number(0),
	},
	income: {
		type: Number,
		default: 0,
	},
	region: {
		type: String,
		required: [true, "Region Is Required"],
	},
	offeredProducts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: [],
		},
	],
	purchasedProducts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: [],
		},
	],
	soldProducts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: [],
		},
	],
	follow: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: [],
		},
	],
	followedBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: [],
		},
	],
	cart: [],
});

// TODO => middleware to perform some action before saving a new User instance
userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			next();
		}
		// step 1 : create a salt
		const salt = await bcrypt.genSalt(10);
		// step 2 : hash the password using this salt
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

// TODO => function (not a middleware) to compare between the saved hashed password and the password which entered at login process
userSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		// its not a middleware so we can't say next(error)
		throw error;
	}
};
module.exports = userSchema;
