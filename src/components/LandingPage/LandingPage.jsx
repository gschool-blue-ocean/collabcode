import Header from '../Header';
import Information from './Information';
import Runtime from '../Runtime';

import { InformationProvider } from '../../context/InformationContext';

const LandingPage = () => {
  return (
    <>
      <div
        id="landing-page-container"
        className="w-full flex flex-col items-center justify-center"
      >
        <Header />
        <InformationProvider>
          <Information />
        </InformationProvider>
        <Runtime />
      </div>
    </>
  );
};

export default LandingPage;
