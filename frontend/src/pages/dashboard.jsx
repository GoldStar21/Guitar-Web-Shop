import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SideNavbar from "@/components/dashboardComponents/SideNavbar";
import NavbarDashboard from "@/components/dashboardComponents/DashboardNavbar";
import Table from "@/components/dashboardComponents/Table";
import CreateProduct from "@/components/dashboardComponents/CreateProduct";
import CreateEmployee from "@/components/dashboardComponents/CreateEmployee";
import EmployeeTable from "@/components/dashboardComponents/EmployeeTable";

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
        return <Table />;

      case "createProduct":
        return <CreateProduct />;

      case "createEmployee":
        return <CreateEmployee />;

      case "employeeTable":
        return <EmployeeTable />;

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
