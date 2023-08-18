/* eslint-disable react/prop-types */
import { useRef, createContext } from "react";

const infoObj = {
  title: "Welcome to Collab Code!",
  desc: "An online collaborative experience to conduct structured interview amongst developers of all levels",
  image: "https://blogs.perficient.com/files/iStock-1363276581-600x400.jpg",
};

const InformationContext = createContext();

export const InformationProvider = ({ children }) => {
  //STATES
  let textObj = useRef(infoObj);
  textObj = textObj.current;
  //FUNCTIONS

  //RETURNED PROPERTIES
  return (
    <InformationContext.Provider value={{ textObj }}>
      {children}
    </InformationContext.Provider>
  );
};

//Export Context
export default InformationContext;
