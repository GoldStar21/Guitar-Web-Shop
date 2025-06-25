import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Auth = () => {
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
};
export default Auth;
