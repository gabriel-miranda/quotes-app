export default function promisify(func) {
  return function promiseFunc() {
    return new Promise((resolve, reject) => {
      func((err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  };
}
