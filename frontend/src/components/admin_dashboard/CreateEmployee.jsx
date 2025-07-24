import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CreateEmployee = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      alert("Please login first.");
      router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // Stoping page reload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      username,
      role,
      password,
    };

    // Send
    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(userData),
      });

      if (res.ok) {
        alert("User created!");

        setUsername("");
        setRole("");
        setPassword("");
        setRepeatPassword("");
      } else {
        const errorText = await res.text();
        alert("Error: " + errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error while sending data.");
    }
  };

  return (
    <div className="createEmployee">
      <div className="c-container">
        <div className="createEmployee__content">
          <form className="createEmployee__form" onSubmit={handleSubmit}>
            <h1 className="createEmployee__title">
              CREATE NEW ADMIN/EMPLOYEE:
            </h1>
            <div className="createEmployee__fields">
              <label className="createEmployee__label">USERNAME:</label>
              <input
                className="createEmployee__input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="createEmployee__fields">
              <label className="createEmployee__label">ROLE:</label>

              <div className="createEmployee__radio-group">
                <label className="createEmployee__label__radio">
                  <input
                    className="createEmployee__input"
                    type="radio"
                    name="role"
                    value="ADMIN"
                    checked={role === "ADMIN"}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                  ADMIN
                </label>

                <label className="createEmployee__label__radio">
                  <input
                    className="createEmployee__input"
                    type="radio"
                    name="role"
                    value="EMPLOYEE"
                    checked={role === "EMPLOYEE"}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                  EMPLOYEE
                </label>
              </div>
            </div>

            <div className="createEmployee__fields">
              <label className="createEmployee__label">PASSWORD:</label>
              <input
                className="createEmployee__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="createEmployee__fields">
              <label className="createEmployee__label">REPEAT PASSWORD:</label>
              <input
                className="createEmployee__input"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
            <div className="createEmployee__buttons">
              <button className="createEmployee__buttons__create" type="submit">
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
