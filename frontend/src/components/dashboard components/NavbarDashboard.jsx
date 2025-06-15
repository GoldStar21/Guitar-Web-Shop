const NavbarDashboard = () => {
  return (
    <nav className="navbarDashboard">
      <div className="c-container">
        <div className="navbarDashboard__content">
          <div className="navbarDashboard__logo">
            <img
              src="/logo_image.svg"
              alt="Logo"
              className="navbarDashboard__logo__image"
            />
            <h1 className="navbarDashboard__title">Guitar Heaven</h1>
          </div>

          <div className="navbarDashboard__adminImg">
            <img
              src="/admin.png"
              alt="Logo"
              className="navbarDashboard__adminImg__image"
            />
            <h2 className="navbarDashboard__adminImg__title">ADMIN</h2>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
