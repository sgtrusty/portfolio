const cycle = (n: number, a: number, b: number) => (n == b ? a : n);

const lerp = (a: number, b: number, f: number) => a + f * (b - a);

const clamp = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const sleep = (waitTimeInMs: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

export { sleep, clamp, lerp, cycle };
