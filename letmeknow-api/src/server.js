import ProcessUtil from "./utils/process-utils.js";
import Application from "./application.js";
import logger from "./logger.js";
import config from "./config.js";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const app = express();
const application = new Application();

app.use(compression());

app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: "true",
	})
);

app.use(
	bodyParser.json({
		limit: "50mb",
		type: "application/json",
	})
);

if (config.server.bypassCORS) {
	logger.info("Adding 'Access-Control-Allow-Origin: *' header to every path.");
	app.use(cors());
}

if (config.server.useHelmet) {
	logger.info("Adding Helmet related headers.");
	app.use(helmet());
}

try {
	await application.init(app);

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
		logger.error(err);
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: {},
		});
	});

	const serverPort = config.server.port;
	const server = http.createServer(app);

	server.listen(serverPort, function () {
		logger.info(
			"Server is listening on port %d (http://localhost:%d)",
			serverPort,
			serverPort
		);
	});

	const exitHandler = ProcessUtil.terminate(server, {
		coredump: false,
		timeout: 500,
	});
	
	process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
	process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
	process.on("SIGTERM", exitHandler(0, "SIGTERM"));
	process.on("SIGINT", exitHandler(0, "SIGINT"));
} catch (err) {
	logger.error(`Application is shutting down ${err}`);
}
