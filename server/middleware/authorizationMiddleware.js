const JWT = require("jsonwebtoken");
const { User } = require("../models/User");
require("dotenv").config();

exports.protect = async (req, res, next) => {
	try {
		let token;
		//! get the token
		let authorization_headers = req.headers.authorization;
		authorization_headers = authorization_headers.split(" ");
		if (authorization_headers[0] === "Bearer") {
			if (authorization_headers[1]) {
				token = authorization_headers[1];
			} else {
				return res.status(401).json("not authorized, no token is sent");
			}
		} else {
			return res.status(401).json("not authorized, no token is sent");
		}
		//! decode the token
		const decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

		//! attach the whole user document into request to be availiable into next middleware handler
		req.user = await User.findById(decoded.userID);

		next();
	} catch (error) {
		return res.status(403).json("not authorized, token is failed");
	}
};
