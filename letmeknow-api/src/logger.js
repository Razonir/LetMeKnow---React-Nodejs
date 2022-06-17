import winston from "winston";
import config from "./config.js";

const format = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
	let msg = `${timestamp} [${level}] : ${message} `;

	if (metadata) {
		msg += JSON.stringify(metadata);
	}

	return msg;
});

var customLevels = {
	error: 7,
	warning: 8,
	custom: 9,
	info: 12,
	debug: 13,
};

let logger = winston.createLogger({
	levels: customLevels.levels,
	transports: [
		new winston.transports.File({
			createTree: false,
			level: config.log.level,
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.splat(),
				winston.format.timestamp(),
				format
			),
			filename: config.log.file,
			handleExceptions: true,
			json: false,
			tailable: true,
			maxsize: config.log.maxSize,
			maxFiles: config.log.maxFiles,
		}),
		new winston.transports.Console({
			level: config.log.level,
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.splat(),
				winston.format.timestamp(),
				format
			),
			handleExceptions: true,
			json: false
		})
	],
	exitOnError: false,
});

export default logger;