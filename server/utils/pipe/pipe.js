const pipe = (...fns) => obj => fns.reduce((acc, curr) => curr(acc), obj);
const asyncPipe = (...fns) => x => fns.reduce(async (y, f) => f(await y), x);

module.exports = { pipe, asyncPipe };
