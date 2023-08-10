/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, createContext } from 'react';

const infoObj = {
  title: 'Welcome to Collab Code!',
  desc: 'An online collaborative experience to conduct structured interview amongst developers of all levels',
};

//Create Context
const InformationContext = createContext();

//Create The Provider
export const InformationProvider = ({ children }) => {
  //States and reference go here
  let textObj = useRef(infoObj);
  textObj = textObj.current;
  //Functions that need to be run
  //Return the provider with children and properties to be passed down
  return (
    <InformationContext.Provider value={{ textObj }}>
      {children}
    </InformationContext.Provider>
  );
};

//Export Context
export default InformationContext;
