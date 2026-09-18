// Fakes network/typing latency for demo interactions so the inbox doesn't
// feel instantaneous/static.
export function randomDelay(maxMs = 900, minMs = 150) {
  const ms = minMs + Math.random() * (maxMs - minMs);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
