import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Auth.css';

import { apiFetch } from "../../api";

// Icons
import User from '../../assets/icons/user.png';
import UserInput from '../../assets/icons/user-input.png';
import Padlock from '../../assets/icons/padlock.png';

export default function Auth() {

  return (
    <section className="auth">

      <main className="auth-main">

        <div className="user-icon">
          <img src={User} alt="Imagem de usuário" />
        </div>

        <Login />

      </main>

    </section>
  );
}

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await apiFetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ login, senha })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro no login");
        return;
      }

      localStorage.setItem("sessionId", data.sessionId);
      navigate("/home");

    } catch (err) {
      alert("Erro de conexão com o servidor");
    }
  }

  return (
    <section className="login">
      <h2>Login</h2>

      <form className='auth-form auth-form-login' onSubmit={handleSubmit}>

        <div className="input-container">
          <img src={UserInput} alt="user" />
          <input 
            type="text" 
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <img src={Padlock} alt="password" />
          <input 
            type="password" 
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>

      </form>
    </section>
  );
}
