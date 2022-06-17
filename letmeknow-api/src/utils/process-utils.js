export default class ProcessUtils {
	static terminate(server, options = { coredump: false, timeout: 500 }) {
		const exit = (code) => {
			options.coredump ? process.abort() : process.exit(code);
		};

		return (code, reason) => (err, promise) => {
			if (err && err instanceof Error) {
				// Log error information, use a proper logging library here :)
				console.log(err.message, err.stack);
			}

			// Attempt a graceful shutdown
			server.close(exit);
			setTimeout(exit, options.timeout).unref();
		};
	}
}