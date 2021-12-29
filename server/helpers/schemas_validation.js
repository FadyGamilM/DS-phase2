const Joi = require("@hapi/joi");

const authSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required(),
});

// exports object contains all schemas of your app
module.exports = {
	authSchema,
};
