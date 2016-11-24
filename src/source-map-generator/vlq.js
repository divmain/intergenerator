// This appears to be redundant, but a object lookup call will perform better than
// a character lookup in a string.
const integerToChar = Array.prototype.reduce.call(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  (memo, char, idx) => {
    memo[idx] = char;
    return memo;
  },
  Object.create(null)
);

/* eslint-disable no-bitwise */
function encodeInteger (int, collection) {
  if (int < 0) {
    int = -int << 1 | 1;
  } else {
    int <<= 1;
  }

  let clamped;
  do {
    clamped = int & 31;
    int >>= 5;

    if (int > 0) { clamped |= 32; }
    collection.push(integerToChar[clamped]);
  } while (int > 0);
}

// eslint-disable-next-line max-params
exports.encode = function encode (collection, a, b, c, d, e) {
  encodeInteger(a, collection);
  encodeInteger(b, collection);
  encodeInteger(c, collection);
  encodeInteger(d, collection);
  if (e) { encodeInteger(e, collection); }
};
