const Header = () => {
  return (
    <>
      <div
        id="Navbar"
        className="flex h-[10vh] w-full items-center justify-between mt-[1rem]"
      >
        <h1 className="text-[3rem] ml-[5rem]">CollabCode</h1>
        <div id="navigation-container" className="mr-[5rem]">
          <div className="w-[10rem] flex justify-between">
            <h1>Home</h1>
            <h1>Login/SignUp</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
