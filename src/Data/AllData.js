import React, { createContext } from "react";
import products from "../products/Products";

const apivalue = createContext();

function AllData({ children }) {
  return (
    <apivalue.Provider value={products}>
      {children}
    </apivalue.Provider>
  );
}

export { AllData, apivalue };