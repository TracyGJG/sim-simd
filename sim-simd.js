import simd from './simd-promises.js';

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function is42({ title, args, func }) {
	const result = func(args);
	await sleep(5000);
	if (result === 42) {
		return title;
	} else {
		throw Error(`${title} did not yield 42 but ${result}`);
	}
}

const is42Simd = simd(is42);

const results = await is42Simd(
	{ title: 'identity true', args: 42, func: _ => _ },
	{ title: 'identity false', args: 7, func: _ => _ }
);

console.table(results);
