/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, createContext } from 'react';

const AppLevelContext = createContext();

export const AppLevelProvider = ({ children }) => {
  //STATES TO BE USED THROUGHOUT
  //FUNCTIONS TO BE USED THROUGHOUT
  return (
    <AppLevelContext.Provider value={{}}>{children}</AppLevelContext.Provider>
  );
};

export default AppLevelContext;
