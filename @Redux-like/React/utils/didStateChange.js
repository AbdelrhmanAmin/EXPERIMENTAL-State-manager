

const didStateChange = (prevState, selector, store) => {
  const newState = selector(store.getState());
  let shouldUpdate = false;
  if (Array.isArray(prevState) && Array.isArray(newState)) {
    shouldUpdate = prevState.length !== newState.length;
  } else if (typeof prevState === "object" && typeof newState === "object") {
    shouldUpdate = Object.keys(prevState).length !== Object.keys(newState).length;
  } else {
    shouldUpdate = prevState !== newState;
  }
  return shouldUpdate;  
};

export default didStateChange;
