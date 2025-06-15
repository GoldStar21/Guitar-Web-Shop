import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SideNavbar from "@/components/dashboard components/SideNavbar";
import NavbarDashboard from "@/components/dashboard components/NavbarDashboard";
import TableComponent from "@/components/dashboard components/Table";
import CreateProduct from "@/components/dashboard components/CreateProduct";
import ViewProduct from "@/components/dashboard components/ViewProduct";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    if (activePage === "logout") {
      // 1. Obrisi token
      localStorage.removeItem("token");

      // 2. Redirect na login
      router.push("/login");
    }
  }, [activePage, router]);

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
