import './Home.css'

/*Importando icons */
import User from "../../assets/icons/user.png";
import Id from "../../assets/icons/id.png";
import Clock from "../../assets/icons/clock.png";
import Server from "../../assets/icons/server.png";

export default function Home() {

    const profile = {
        name: "Pedro",
        username: "hnrsous",
        loginTime: "20/11/2025 14:30",
        hostname: "meu-servidor",
        sessionId: "ABC123XYZ"
    };

return (

    <section className="home">

        <main className="main-home">

            <div className="user-infs">
                <img src={User} alt="usuário" />
                <h2>{profile.name}</h2>
                <span className="user-id">@{profile.username}</span>
            </div>
            <div className="date-time">
                <img src={Clock} alt="relógio" />
                <span className="d-t">
                    Data e hora de login: {profile.loginTime}
                </span>
            </div>
            <div className="host-name">
                <img src={Server} alt="servidor" />
                <span>Host name: {profile.hostname}</span>
            </div>
            <div className="id-login">
                <img src={Id} alt="id" />
                <span>Id de login: {profile.sessionId}</span>
            </div>

        </main>

    </section>

);

}