import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
// Skloniti ovaj dio logike u poseban fajl
const Dashboardtable = () => {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username);
      setRole(payload.role);
    } catch (error) {
      console.error("Neispravan token", error);
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      {username && role ? (
        <>
          <p>
            Dobrodošao, <strong>{username}</strong>! Tvoja uloga je:{" "}
            <strong>{role}</strong>.
          </p>
          <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
            Logout
          </button>
        </>
      ) : (
        <p>Učitavanje...</p>
      )}
    </div>
  );
};
export default Dashboardtable;
