import React, { useContext } from "react";
import * as stores from "@/stores";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
);

const useStore = () => useContext(StoreContext);

export { useStore, StoreProvider };
