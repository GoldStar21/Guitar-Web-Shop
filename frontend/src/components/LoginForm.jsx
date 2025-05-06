import { useState } from "react";

const LoginForm = () => {
  // Definiši stanje za username i password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ovdje ćeš kasnije slati podatke backendu
    // OBRATITI PAZNJU NA OVO KADA SE DO OVOGA DOĐE
    console.log("Username:", username);
    console.log("Password:", password);
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
            type="text"
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
