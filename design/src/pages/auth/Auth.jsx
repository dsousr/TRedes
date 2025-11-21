import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Auth.css';

import { API_URL } from "../../api";

// Icons
import User from '../../assets/icons/user.png';
import IdName from '../../assets/icons/id.png';
import UserInput from '../../assets/icons/user-input.png';
import Padlock from '../../assets/icons/padlock.png';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="auth">

      <main className="auth-main">

        <div className="user-icon">
          <img src={User} alt="Imagem de usuário" />
        </div>

        {isLogin ? <Login /> : <Register />}

      </main>

      <button className="nav-btn" onClick={toggleForm}>
        {isLogin ? 'Não possui cadastro?' : 'Já possui cadastro?'}
      </button>

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
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro no login");
        return;
      }

      // salva sessão
      localStorage.setItem("sessionId", data.sessionId);

      // vai pra home
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

function Register() {

  // (Opcional — não usado na apresentação)
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Cadastro é opcional no trabalho — backend não implementado.");
  }

  return (
    <section className="register">

      <h2>Cadastro</h2>

      <form className='auth-form' onSubmit={handleSubmit}>

        <div className="input-container">
          <img src={IdName} alt="nome" />
          <input 
            type="text" 
            placeholder="Nome e sobrenome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <img src={UserInput} alt="id" />
          <input 
            type="text" 
            placeholder="@ ID de usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <img src={Padlock} alt="senha" />
          <input 
            type="password" 
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Registrar</button>

      </form>

    </section>
  );
}
