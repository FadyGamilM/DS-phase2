const JWT = require("jsonwebtoken");
require("dotenv").config();

const createError = require("http-errors");

// TODO=> (EASY WAY) generate token
exports.generateToken = (userID) => {
	return JWT.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30d",
	});
};

// TODO=> create access token
exports.SignAccessToken = (userId) => {
	// return Promise so we can use await with the result of this function inside the controller logic
	return new Promise((resolve, reject) => {
		const payload = {};
		const secret = process.env.ACCESS_TOKEN_SECRET;
		const options = {
			expiresIn: "1h",
			audience: userId,
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message);
				return reject(createError.InternalServerError());
			}
			resolve(token);
		});
	});
};

// TODO=> (middleware) verify the access token so client can use it
exports.VerifyAccessToken = (req, res, next) => {
	// TODO (1) : check if the request contains access token or not
	if (!req.headers["authorization"]) {
		return res.status(403).json({
			error: "Unauthorized user",
		});
	}
	// TODO (2) :  if token exists
	const authHeader = req.headers["authorization"];
	const bearerToken = authHeader.split(" ");
	const accessToken = bearerToken[1];
	JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
		if (err) {
			if (err.name === "JsonWebTokenError") {
				// return res.status(401).json({
				// 	error: "token is expired",
				// });
				return next(createError.Unauthorized());
			} else {
				// return res.status(403).json({
				// 	error: "Unauthorized",
				// });
				return next(createError.Unauthorized(err.message));
			}
			// return res.status(403).json({
			// 	error: "Unauthorized user",
			// });
		} else {
			req.payload = payload;
			next();
		}
	});
};

// TODO=> create refresh token
exports.SignRefreshToken = (userId) => {
	// return Promise so we can use await with the result of this function inside the controller logic
	return new Promise((resolve, reject) => {
		const payload = {};
		const secret = process.env.REFRESH_TOKEN_SECRET;
		const options = {
			expiresIn: "30d",
			audience: userId,
		};
		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err.message);
				return reject(createError.InternalServerError());
			}
			resolve(token);
		});
	});
};

// TODO=> verify the refresh token so client can use it in upcoming requests
exports.VerifyRefreshToken = (refreshToken) => {
	return new Promise((resolve, reject) => {
		JWT.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, payload) => {
				if (err) {
					return reject(createError.Unauthorized());
				}
				// extract the user id from the token's optios
				const userId = payload.aud;
				resolve(userId);
			}
		);
	});
};
