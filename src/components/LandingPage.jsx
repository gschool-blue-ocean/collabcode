import Header from './Header';
import Information from './Information';
import Runtime from './Runtime';

const LandingPage = () => {
  return (
    <>
      <div
        id="landing-page-container"
        className="w-full h-[100vh] flex flex-col items-center justify-center"
      >
        <Header />
        <Information />
        <Runtime />
      </div>
    </>
  );
};

export default LandingPage;
