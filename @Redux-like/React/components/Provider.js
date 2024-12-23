import React from "react";

const StoreContext = React.createContext();

const Provider = ({ children, store }) => {
  const contextValue = { store };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  if(!context.store) {
    throw new Error("Store is required");
  }
  return context.store;
};

export { Provider, useStore };
