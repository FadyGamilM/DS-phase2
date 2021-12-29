//! -------------------------------------------------------------------------- */
//! -------------------------------------------------------------------------- */
//! ----------------------- IMPORT ESSENTIAL LIBRARIES ----------------------*/
//! -------------------------------------------------------------------------- */
//! -------------------------------------------------------------------------- */
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
require("dotenv").config();
//! -------------------------------------------------------------------------- */

// TODO=> import the error-Handler middleware
const errorHandler = require("./middleware/errorHandler");

//!-------------------------------------------------------------------------- */
//!-------------------------------------------------------------------------- */
//!----------------------- IMPORT ESSENTIAL LIBRARIES ----------------------*/
//!-------------------------------------------------------------------------- */
//!-------------------------------------------------------------------------- */
const routesHandlers = require("./controllers/routesHandler");
//! -------------------------------------------------------------------------- */
// TODO=> Fire express server
const app = express();

// TODO=> use middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO=> use routes handlers
app.use(routesHandlers);

// TODO=> when all routes don't match ..
app.use((req, res, next) => {
	//NOTE => use http-erros library instead
	next(createError.NotFound());
});

// TODO=> Erro0r handler middleware
app.use(errorHandler);

// TODO=> Listen to the port
//* Listen to PORT 5000 in development
//* Listen to fetched PORT in production
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`express server is running up on port ${PORT}..`.inverse.magenta);
});
