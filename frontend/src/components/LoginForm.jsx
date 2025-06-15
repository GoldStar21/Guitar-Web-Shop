import { useState } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  // Declaring variables and hook's
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Function that is being called when user/admin click "Login". It prevent's page reload
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending login data to the backend
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      const token = data.token;
      localStorage.setItem("token", token);

      // Token decode and role check
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const userRole = decodedPayload.role;

      // Redirect depending on the role
      if (userRole === "ADMIN") {
        router.push("/dashboard");
      } else if (userRole === "EMPLOYEE") {
        router.push("/dashboardEmployee");
      } else {
        router.push("/");
      }
    } else {
      alert("Neispravni podaci");
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__image">
          <img
            src="/login_image.svg"
            alt="Hero image"
            className="hero__content__image"
          />
        </div>
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__title">ACCOUNT LOGIN</h1>
          <label htmlFor="username" className="login__label">
            User name
          </label>
          <input
            type="text"
            id="username"
            className="login__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autocomplete="off"
            required
          />
          <label htmlFor="username" className="login__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="off"
            required
          />

          <button type="submit" className="login__button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
