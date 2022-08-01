import { createContext, useContext, useEffect, useMemo } from "react";

const StoreContext = createContext();

const Provider = ({ children, store }) => {
  const token = useMemo(
    () => store.subscribe("stateChanged", () => store.getState()),
    [store]
  );
  const contextValue = useMemo(() => {
    return {
      store,
    };
  }, [store]);
  useEffect(() => {
    return () => {
      store.unsubscribe(token);
    };
  }, []);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a Provider");
  }
  return context.store;
};

export default Provider;
