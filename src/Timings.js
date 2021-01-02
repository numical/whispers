class Timings {
  #start;
  #waitTime;

  constructor() {
    this.#start = Date.now();
    this.#waitTime = 0;
  }

  recordWaitTime = async (fn) => {
    const start = Date.now();
    const result = await fn();
    this.#waitTime += Date.now() - start;
    return result;
  };

  html() {
    const total = Date.now() - this.#start;
    const percentage = Math.floor((100 * this.#waitTime) / total);
    return `<p>[Total time: ${total} ms); wait time: ${
      this.#waitTime
    } (${percentage}%)]</p>`;
  }
}

Timings.DUMMY = {
  recordWaitTime: async (fn) => await fn(),
  html: () => "<p>DUMMY TIMINGS</p>",
};

module.exports = Timings;
