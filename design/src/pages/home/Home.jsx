import { useEffect, useState } from "react";
import "./Home.css";

import { apiFetch } from "../../api";

// Icons
import User from "../../assets/icons/user.png";
import Id from "../../assets/icons/id.png";
import Clock from "../../assets/icons/clock.png";
import Server from "../../assets/icons/server.png";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {

    async function loadProfile() {
      try {
        const sessionId = localStorage.getItem("sessionId");

        const res = await apiFetch("/meu-perfil", {
          method: "GET",
          headers: {
            "x-session-id": sessionId
          }
        });

        const data = await res.json();
        setProfile(data);

      } catch (err) {
        console.log("Erro ao carregar perfil.");
      }
    }

    loadProfile();

    const interval = setInterval(loadProfile, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!profile) return <h2>Carregando...</h2>;

  return (
    <section className="home">
      <main className="main-home">

        <div className="user-infs">
          <img src={User} alt="usuário" />
          <h2>{profile.usuario}</h2>
          <span>@{profile.login}</span>
        </div>

        <div className="date-time">
          <img src={Clock} alt="relógio" />
          <span className="d-t">
            Data e hora de login: {profile.logadoEm}
          </span>
        </div>

        <div className="host-name">
          <img src={Server} alt="servidor" />
          <span>Host name: {profile.servidor}</span>
        </div>

        <div className="id-login">
          <img src={Id} alt="id" />
          <span>Id de login: {profile.sessionId}</span>
        </div>

      </main>
    </section>
  );
}