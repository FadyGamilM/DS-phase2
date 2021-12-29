const colors = require("colors");

// TODO=> import ErrorResponse class to create our own custom error
const ErrorResponse = require("../helpers/errorResponse");

const errorHandler = (err, req, res, next) => {
	// TODO=> we don't want to send back a response from each case, so we will copy the err
	// // let error = { ...err };
	// // error.message = err.message;

	// // console.log(error.errors);
	// // // console.log(`${error.name}`.inverse.red);

	// TODO [1] : Bad ObjectID, this error occures in GET request by id when id isn't well formatted
	if (err.name === "CastError") {
		// return to client-side that this resource isn't found
		// // const message = `No Resource Is Found With Id Of ${err.value}`;
		// // error = new ErrorResponse(message, 404);
		return res.status(404).json({
			error: `No Resource Is Found With Id Of ${err.value}`,
		});
	}

	// TODO [2] : Duplicate Key, this error occures in POST request when user try to create resource with data already used before, and these data are defined to be unique
	if (err.code === 11000) {
		// // const message = "Duplicate Field value entered";
		// // error = new ErrorResponse(message, 400);
		return res.status(400).json({
			error: `Duplicate Field value entered`,
		});
	}

	// TODO [3] : Validation Error, this error occuers in POST request
	if (err.name === "ValidationError") {
		let ValidationErrorMsgs = [];
		Object.values(err.errors).map((val) =>
			ValidationErrorMsgs.push(val.message)
		);
		return res.status(400).json({
			error: ValidationErrorMsgs,
		});
		// // // const message = Object.values(err.errors).map((val) => val.message);
		// // // console.log(`${message}`.red.inverse);
		// // const message = ValidationErrorMsgs;
		// // error = new ErrorResponse(message, 400);
		// // console.log(error.message);
	}

	return res.status(500).json({
		error: err.message,
	});
	// // res.status(error.status_code || 500).json({
	// // 	success: false,
	// // 	error: error.message || "Server Error",
	// // });
};

module.exports = errorHandler;
