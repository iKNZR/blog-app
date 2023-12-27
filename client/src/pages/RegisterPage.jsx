import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        // Si el código de estado HTTP es 400 o superior, se considera un error.
        alert("Register Failed");
      } else {
        alert("Register Success");
      }
    } catch (error) {
      // Este bloque se ejecutará si hubo un error de red, o si algo impidió que se realizara la petición.
      alert("Register Failed");
    }
  };

  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="Password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterPage;
