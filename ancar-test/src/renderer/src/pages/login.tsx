// Login.tsx
import api from "@renderer/services/api";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const history = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await api.post("/usuarios/login", { cpf: username, password });
            console.log(data)
            if (data) {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("loggedInToken", data.data.access_token);
                localStorage.setItem("loggedInNme", data.data.nome);
                
                onLogin();
                const { from } = location.state || { from: { pathname: "/" } };
                history(from);
            } else {


                alert("Dados invalidos");
                setError("Invalid username or password");
            }
        } catch (error) {
            
        }

    };

    return (
        <div className="container">
 
            <form className="form" onSubmit={handleSubmit}>
                <h2>Entrar</h2>
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="CPF apenas numeros"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <hr />
                <Link to="/signup">Criar conta</Link>
            </form>
        </div>
    );
};

export default Login;
