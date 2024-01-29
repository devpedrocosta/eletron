


// Login.tsx
import api from "@renderer/services/api";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface LoginProps {
    onLogin: () => void;
}

const SignUp: React.FC<LoginProps> = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [error, setError] = useState<string>("");
    const history = useNavigate();
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        // Elimina CPFs invalidos conhecidos
        if (cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999")
            return false;
        // Valida 1o digito
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(10)))
            return false;
        return true;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {



            if (validarCPF(cpf)) {
                setError("CPF invalido");
            }

            if (!username || !cpf || !password) {
                setError("Preencha todos os dados para se cadastrar");
            } else {
                try {

                    await api.post("/usuarios", { nome: username, cpf, senha: password });

                    alert("Conta criada faça o login");
                    history('/login');

                } catch (err) {
                    console.log(err);
                    setError("Ocorreu um erro ao registrar sua conta. T.T");
                }
            }

        } catch (error) {

        }

    };

    return (
        <div className="container">

            <form className="form" onSubmit={handleSubmit}>
                <h2>Criar conta</h2>
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="Nome"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Digite CPF apenas numeros"
                    onChange={e => setCpf(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Cadastrar grátis</button>
                <hr />
                <Link to="/login">Fazer login</Link>
            </form>
        </div>
    );
};

export default SignUp;
