import { useState } from 'react';
import './Auth.css';

/*Importando icons */
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

return (

    <section className="login">

      <h2>Login</h2>

      <form className='auth-form auth-form-login'>

        <div className="input-container">
          <img src={UserInput} alt="Imagem de usuário" />
          <input type="text" placeholder="Usuário" />
        </div>

        <div className="input-container">
          <img src={Padlock} alt="Imagem de cadeado" />
          <input type="password" placeholder="Senha" />
        </div>

        <button type="submit">Entrar</button>

      </form>

    </section>
);

}

function Register() {

  return (

    <section className="register">

      <h2>Cadastro</h2>

      <form className='auth-form'>

        <div className="input-container">
          <img src={IdName} alt="Imagem de usuário" />
          <input type="text" placeholder="Nome e sobrenome" />
        </div>

        <div className="input-container">
          <img src={UserInput} alt="Imagem de usuário" />
          <input type="text" placeholder="@ ID de usuário" />
        </div>

        <div className="input-container">
          <img src={Padlock} alt="Imagem de cadeado" />
          <input type="password" placeholder="Senha" />
        </div>

        <button type="submit">Registrar</button>

      </form>

    </section>

);

}