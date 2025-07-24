import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SideNavbar from "@/components/admin_dashboard/SideNavbar";
import DashboardNavbar from "@/components/admin_dashboard/DashboardNavbar";
import Table from "@/components/admin_dashboard/Table";
import CreateProduct from "@/components/admin_dashboard/CreateProduct";
import CreateEmployee from "@/components/admin_dashboard/CreateEmployee";
import EmployeeTable from "@/components/admin_dashboard/EmployeeTable";
import AuthGuard from "@/components/admin_dashboard/AuthGuard";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Učitaj username iz localStorage kad se komponenta mounta
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (activePage === "logout") {
      // 1. Obrisi token
      localStorage.removeItem("token");
      localStorage.removeItem("username");

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
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div>
        <DashboardNavbar username={username} />

        <SideNavbar onNavigate={setActivePage} role="ADMIN" />

        <main className="dashboardMain">{renderContent()}</main>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
