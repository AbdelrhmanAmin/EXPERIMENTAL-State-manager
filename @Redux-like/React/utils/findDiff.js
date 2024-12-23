const findDiff = (prev, next) => {
  if (Array.isArray(prev) && Array.isArray(next)) {
    return findDiffBetweenArrays(prev, next);
  } else if (typeof prev === "object" && typeof next === "object") {
    return findDiffBetweenObjects(prev, next);
  }
  return next !== prev;
};

const findDiffBetweenArrays = (prev, next) => {
  return next.filter((item, index) => {
    return prev[index] !== item;
  });
};

const findDiffBetweenObjects = (prev, next) => {
  let keys = Object.keys(prev);
  if (keys.length === 0) {
    keys = Object.keys(next);
  }
  const diff = {};
  keys.forEach((key) => {
    if (prev[key] !== next[key]) {
      diff[key] = next[key];
    }
  });
  return diff;
};

export default findDiff;
