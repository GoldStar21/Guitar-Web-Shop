import React, { useState } from "react";

const CreateEmployee = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("We are sorry for inconvinience, please login again.");
    return null;
  }

  // State za input polja
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [users, setUsers] = useState([]);

  // Stoping page reload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    //  objekat koji sakuplja podatke iz stanja (state) komponenta u jedan paket koji možeš poslati na backend.
    const userData = {
      username,
      role,
      password,
    };

    // Slanje svega
    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(userData),
      });

      // I ovde također raditi validaciju

      // Ako je sve ok resetuj fromu i daj poruku
      if (res.ok) {
        alert("User created!");
        // reset forme
      } else {
        const errorText = await res.text();
        alert("Greška: " + errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Došlo je do greške pri slanju proizvoda.");
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
                    value="USER"
                    checked={role === "USER"}
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
