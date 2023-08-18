import { useContext } from "react";
import InformationContext from "../../context/InformationContext";

const Information = () => {
  const { textObj } = useContext(InformationContext);

  return (
    <>
      <div id="information-container" className="w-full h-[90vh]">
        <div
          id="information-text"
          className="w-full h-full flex flex-col items-center justify-center pb-[10vh]"
        >
          <h1 className="text-[4rem]">{textObj.title}</h1>
          <img src={textObj.image} alt="" />
          <p className="text-[2rem]">{textObj.desc}</p>
        </div>
      </div>
    </>
  );
};

export default Information;
