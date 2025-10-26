import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileOpen, setIMobileOpen] = useState(false);

  const toggleMenu = () => {
    setIMobileOpen((previousCondition) => !previousCondition);
  };

  const navLinks = [
    { href: "#about", label: "About Us", className: "", newTab: false },
    { href: "#shop", label: "Shop", className: "", newTab: false },
    { href: "#faq", label: "FAQ", className: "", newTab: false },
    { href: "#contact", label: "Contact", className: "", newTab: false },
    {
      href: "/login",
      label: "Login",
      className: "navbar__link--login",
      newTab: true,
    },
  ];

  return (
    <nav className="navbar">
      <div className="c-container">
        <div className="navbar__content">
          <div className="navbar__logo">
            <Link href="/">
              <img src="/logo_image.svg" alt="Logo" className="navbar__image" />
            </Link>
            <h1 className="navbar__title">Guitar Heaven</h1>
          </div>
          <div
            className={`navbar__links ${
              isMobileOpen ? "navbar__links--active" : ""
            }`}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`navbar__link ${link.className}`}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <img
              src="/icon-close.svg"
              alt="Hamburger icon"
              className="navbar__icon"
              onClick={toggleMenu}
            />
          </div>
          <img
            src="/icon-hamburger.svg"
            alt="Hamburger icon"
            className="navbar__hamburger"
            onClick={toggleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
