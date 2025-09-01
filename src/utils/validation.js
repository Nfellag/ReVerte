function isFiniteNumber(x) {
  return typeof x === 'number' && Number.isFinite(x);
}

function requiredString(x) {
  return typeof x === 'string' && x.trim().length > 0;
}

module.exports = { isFiniteNumber, requiredString };
