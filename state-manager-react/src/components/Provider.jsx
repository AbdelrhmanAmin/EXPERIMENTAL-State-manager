import { useReducer } from "react";
import { createContext, useContext, useEffect, useMemo } from "react";

const StoreContext = createContext();

const Provider = ({ children, store }) => {
  const contextValue = useMemo(() => ({ store }), [store]);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext).store

export default Provider;
