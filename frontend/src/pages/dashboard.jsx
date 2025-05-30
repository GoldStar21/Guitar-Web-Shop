import { useState } from "react";

import SideNavbar from "@/components/dashboard components/SideNavbar";
import NavbarDashboard from "@/components/dashboard components/NavbarDashboard";
import TableComponent from "@/components/dashboard components/TableComponent";
import CreateProduct from "@/components/dashboard components/CreateProduct";
import ViewProduct from "@/components/dashboard components/ViewProduct";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <TableComponent />;
      case "viewProduct":
        return <ViewProduct />;
      case "createProduct":
        return <CreateProduct />;
      case "editProduct":
        return <EditProduct />;
      case "createEmployee":
        return <CreateEmployee />;
      case "logout":
        // mozes dodati logout logiku ili redirect
        return <h2>You have been logged out</h2>;
      default:
        return <h2>Page not found</h2>;
    }
  };

  return (
    <div>
      <NavbarDashboard />
      <SideNavbar onNavigate={setActivePage} />

      <main className="dashboardMain">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
