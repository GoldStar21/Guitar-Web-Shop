import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthGuard = ({ children, allowedRoles = [] }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (!allowedRoles.includes(payload.role)) {
        router.push("/unauthorized");
        return;
      }

      setAuthorized(true);
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [allowedRoles, router]);

  if (!authorized) return null; // ili možeš staviti loading spinner

  return <>{children}</>;
};

export default AuthGuard;
