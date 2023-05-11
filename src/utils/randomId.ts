const radix = 36;
const randomId = (length) =>
  (
    Math.pow(radix, length - 1) +
    Math.floor(Math.random() * Math.pow(radix, length - 1) * (radix - 1))
  ).toString(radix);

export default randomId;
