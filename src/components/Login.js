import { useState } from "react";
import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";

export const Login = () => {
    const { data, setData } = useData();
    const token = data.token;

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msj, setMsj] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password
        };

        fetch("https://locaine.herokuapp.com/v1/auth", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => checkStatus(response))
            .catch(err => {
                console.log(err);
            });
    };

    const checkStatus = (response) => {
        const status = response.status;
        if(status === 200){
            response.json().then(json => logIn(json));
        } else {
            setMsj("El email o contraseña no son validos");
        }
    };

    const logIn = (json) => {
        console.log(json);
        const newToken = json.token;
        setData((prev) => ({ ...prev, token: newToken }));
        localStorage.setItem("IETItoken", newToken);
        history.push("/home");
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePwdChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleRegisterClick = () => {
        const url = "/register";
        history.push(url);
    }

    const test = () => {
        console.log("TOKEN: "+token);
    }

    return (
        <>
        <h1>Iniciar Sesion</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="email" value={email} onChange={handleEmailChange}></input>
            <input type="password" placeholder="password" value={password} onChange={handlePwdChange}></input>
            <button>Iniciar Sesion</button>
            <label>{msj}</label>
        </form>
        <button onClick={handleRegisterClick}>Registrarse</button>
        <button onClick={test}>Test</button>
        </>
    );
}