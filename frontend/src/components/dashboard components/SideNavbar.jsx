import {
  FiUserPlus,
  FiHome,
  FiBox,
  FiEdit,
  FiPackage,
  FiPower,
} from "react-icons/fi";

const SideNavbar = ({ onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="c-container">
        <nav className="sidebar__nav">
          <div
            className="sidebar__item"
            onClick={() => onNavigate("createEmployee")}
          >
            <FiUserPlus className="sidebar__icon" />
            <span>Create Employee</span>
          </div>
          <div
            className="sidebar__item"
            onClick={() => onNavigate("dashboard")}
          >
            <FiHome className="sidebar__icon" />
            <span>Dashboard</span>
          </div>
          <div
            className="sidebar__item"
            onClick={() => onNavigate("createProduct")}
          >
            <FiPackage className="sidebar__icon" />
            <span>Create Product</span>
          </div>
          <div
            className="sidebar__item"
            onClick={() => onNavigate("viewProduct")}
          >
            <FiBox className="sidebar__icon" />
            <span>View Product</span>
          </div>
          <div
            className="sidebar__item"
            onClick={() => onNavigate("editProduct")}
          >
            <FiEdit className="sidebar__icon" />
            <span>Edit Product</span>
          </div>
          <div className="sidebar__logout" onClick={() => onNavigate("logout")}>
            <FiPower className="sidebar__icon" />
            <span>LOG OUT</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideNavbar;
