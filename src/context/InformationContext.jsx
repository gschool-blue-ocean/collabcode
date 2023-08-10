/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, createContext } from 'react';

const test = 'This is the information for the information component';

//Create Context
const InformationContext = createContext();

//Create The Provider
export const InformationProvider = ({ children }) => {
  //States and reference go here
  const text = useRef(test);
  //Functions that need to be run
  //Return the provider with children and properties to be passed down
  return (
    <InformationContext.Provider value={{ text }}>
      {children}
    </InformationContext.Provider>
  );
};

//Export Context
export default InformationContext;
