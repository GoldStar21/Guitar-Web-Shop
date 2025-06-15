import { useState } from "react";
import {
  FiUserPlus,
  FiHome,
  FiPackage,
  FiPower,
  FiMenu,
  FiX,
} from "react-icons/fi";

const SideNavbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function for opening/closing sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger icon */}
      <div className="sidebar__hamburger" onClick={toggleSidebar}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="c-container">
          <nav className="sidebar__nav">
            <div
              className="sidebar__item"
              onClick={() => {
                onNavigate("createEmployee");
                setIsOpen(false);
              }}
            >
              <FiUserPlus className="sidebar__icon" />
              <span>Create Employee</span>
            </div>
            <div
              className="sidebar__item"
              onClick={() => {
                onNavigate("dashboard");
                setIsOpen(false);
              }}
            >
              <FiHome className="sidebar__icon" />
              <span>Dashboard</span>
            </div>
            <div
              className="sidebar__item"
              onClick={() => {
                onNavigate("createProduct");
                setIsOpen(false);
              }}
            >
              <FiPackage className="sidebar__icon" />
              <span>Create Product</span>
            </div>
            <div
              className="sidebar__logout"
              onClick={() => {
                onNavigate("logout");
                setIsOpen(false);
              }}
            >
              <FiPower className="sidebar__icon" />
              <span>LOG OUT</span>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
