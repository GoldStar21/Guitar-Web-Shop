import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMobileOpen, setIMobileOpen] = useState(false);

  const toggleMenu = () => {
    setIMobileOpen((previousCondition) => !previousCondition);
  };

  const navLinks = [
    { href: "/faq", label: "FAQ", className: "", newTab: false },
    { href: "/about-us", label: "About Us", className: "", newTab: false },
    { href: "/shop", label: "Shop", className: "", newTab: false },
    { href: "/contact", label: "Contact", className: "", newTab: false },
    {
      href: "/login",
      label: "Login",
      className: "navbar__content__links__link--login",
      newTab: true,
    },
  ];

  return (
    <nav className="navbar">
      <div className="c-container">
        <div className="navbar__content">
          <div className="navbar__content__logo">
            <img
              src="/logo_image.svg"
              alt="Logo"
              className="navbar__content__logo__image"
            />
            <h1 className="navbar__content__logo__title">Guitar Heaven</h1>
          </div>
          <div
            className={`navbar__content__links ${
              isMobileOpen ? "navbar__content__links--active" : ""
            }`}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`navbar__content__links__link ${link.className}`}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <img
              src="/icon-close.svg"
              alt="Hamburger icon"
              className="navbar__content__links__icon"
              onClick={toggleMenu}
            />
          </div>
          <img
            src="/icon-hamburger.svg"
            alt="Hamburger icon"
            className="navbar__content__hamburger"
            onClick={toggleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
