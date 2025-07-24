import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SideNavbar from "@/components/admin_dashboard/SideNavbar";
import NavbarDashboard from "@/components/admin_dashboard/DashboardNavbar";
import TableEMP from "@/components/employee_dashboard/TableEMP";
import AuthGuard from "@/components/admin_dashboard/AuthGuard";

const DashboardEmployee = () => {
  const [activePage, setActivePage] = useState("employeeDashboard");
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
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      router.push("/login");
    }
  }, [activePage, router]);

  const renderContent = () => {
    switch (activePage) {
      case "dashboardEmployee":
        return <TableEMP />;

      default:
        return <TableEMP />;
    }
  };

  return (
    <AuthGuard allowedRoles={["EMPLOYEE"]}>
      <div>
        <NavbarDashboard username={username} />
        <SideNavbar onNavigate={setActivePage} role="EMPLOYEE" />

        <main className="dashboardMain">{renderContent()}</main>
      </div>
    </AuthGuard>
  );
};
export default DashboardEmployee;
