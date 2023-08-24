import Information from './Information';
import RuntimeDemo from './RuntimeDemo';
import Header from '../Header';
import { InformationProvider } from '../../context/InformationContext';

const LandingPage = () => {
  return (
    <>
    <Header/>
      <div
        id="landing-page-container"
        className="w-full flex flex-col items-center justify-center"
      >
        <InformationProvider>
          <Information />
        </InformationProvider>
        <RuntimeDemo />
      </div>
    </>
  );
};

export default LandingPage;
