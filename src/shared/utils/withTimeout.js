export class TimeoutError extends Error {}

export function withTimeout(promise, ms, message = "Request timed out") {
    let timer;

    const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new TimeoutError(message)), ms);
    });

    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
