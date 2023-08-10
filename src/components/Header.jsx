const Header = () => {
  return (
    <>
      <div
        id="Navbar"
        className="flex h-[10vh] w-full items-center justify-between"
      >
        <h1 className="text-[3rem]">CollabCode</h1>
        <div id="navigation" className="flex mr-[5rem]">
          <h1>Home</h1>
          <h1>Teachers</h1>
          <h1>Students</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
