import { useEffect, useState } from "react";
import "./Home.css";

// Importando ícones
import User from "../../assets/icons/user.png";
import Id from "../../assets/icons/id.png";
import Clock from "../../assets/icons/clock.png";
import Server from "../../assets/icons/server.png";

import { API_URL } from "../../api";

export default function Home() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadProfile() {
      const sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/meu-perfil`, {
          headers: {
            "x-session-id": sessionId
          }
        });

        const data = await res.json();

        if (res.ok) {
          setProfile({
            name: data.usuario,
            loginTime: data.logadoEm,
            hostname: data.servidor,
            sessionId: data.sessionId
          });
        } else {
          alert("Sessão expirada ou inválida");
        }

      } catch (err) {
        alert("Erro ao conectar ao servidor");
      }

      setLoading(false);
    }

    loadProfile();

  }, []);

  if (loading) return <h2>Carregando...</h2>;
  if (!profile) return <h2>Não foi possível carregar o perfil</h2>;

  return (
    <section className="home">

      <main className="main-home">

        {/* Nome do usuário */}
        <div className="user-infs">
          <img src={User} alt="usuário" />
          <h2>{profile.name}</h2>
          <span className="user-id">@{profile.name}</span>
        </div>

        {/* Data e hora do login */}
        <div className="date-time">
          <img src={Clock} alt="relógio" />
          <span className="d-t">
            Data e hora do login: {profile.loginTime}
          </span>
        </div>

        {/* Hostname do servidor */}
        <div className="host-name">
          <img src={Server} alt="servidor" />
          <span>Host name: {profile.hostname}</span>
        </div>

        {/* ID da sessão */}
        <div className="id-login">
          <img src={Id} alt="id" />
          <span>Id de login: {profile.sessionId}</span>
        </div>

      </main>

    </section>
  );
}
