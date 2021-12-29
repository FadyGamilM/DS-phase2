// HERE WE NEED TO EXTEND THE ORIGINAL ERROR CLASS
class ErrorResponse extends Error {
	constructor(error_message, status_code) {
		super(error_message);
		this.status_code = status_code;
	}
}

module.exports = ErrorResponse;
