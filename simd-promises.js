export default function simd(instruction) {
	return function (...data) {
		const executions = data.map(
			datum =>
				new Promise((resolve, reject) => {
					try {
						resolve(instruction(datum));
					} catch (error) {
						reject(error);
					}
				})
		);
		return Promise.allSettled(executions);
	};
}
