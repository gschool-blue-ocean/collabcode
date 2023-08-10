import { useContext } from 'react';
import InformationContext from '../context/InformationContext';

const Information = () => {
  const data = useContext(InformationContext);
  console.log(data.text.current);
  return (
    <>
      <div id="information-container" className="w-full h-[80vh]">
        <div
          id="information-text"
          className="w-full h-full flex items-center justify-center"
        >
          <h1>{data.text.current}</h1>
        </div>
      </div>
    </>
  );
};

export default Information;
