import React from "react";
import { useStore } from "../components/Provider";
import didStateChange from "../utils/didStateChange";

const useSelector = (selector) => {
  const componentName = React.useRef();
  if (!componentName.current) {
    const error = new Error();
    const stack = error.stack.split("\n");
    const callerLine = stack[2];
    const match = callerLine.match(/at (\w+)/);

    if (match) {
      componentName.current = match[1];
    } else {
      componentName.current = "Unknown";
    }
  }
  if (!selector || typeof selector !== "function") {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Selector is required at", componentName.current);
    }
    return;
  }
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const store = useStore();
  let prevState = React.useMemo(() => selector(store.getState()), []);
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Logic to detect if the selected slots have changed, if so then update the component
      const shouldUpdate = didStateChange(prevState, selector, store);
      console.log({[componentName.current]: {
        prevState,
        nextState: selector(store.getState()),
        shouldUpdate
      }})
      if (shouldUpdate) {
        prevState = selector(store.getState());
        forceUpdate();
      }
    });
    return () => unsubscribe();
  }, []);
  return selector(store.getState());
};

export default useSelector;
