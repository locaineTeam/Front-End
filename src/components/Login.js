import { useState } from "react";
import { Col, FloatingLabel, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";
import {variables} from "../providers/Variables";

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

        fetch(variables.API_URL+"v1/auth", {
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
        fetch(variables.API_URL + "v1/user/email/" + email)
            .then(response => response.json())
            .then(json => getUser(json))
            .catch(err =>{
                console.log(err);
            })
    };

    const getUser = (json) => {
        setData((prev) => ({ ...prev, user: json}));
        localStorage.setItem("IETIuser",json);
        history.push("/home");
    };

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
    };

    return (
        <>
        <style>
            {`
                .btn-login {
                    background-color: #280b4e;
                    color: #ffffff;
                }

                .btn-login:hover {
                    background-color: #1c0836;
                    color: #ffffff;
                }
            `}
        </style>
        <div className="LoginContainer d-flex align-items-center justify-content-center">
            <div className="LoginSubContainer rounded">
                <Col>
                    <Form.Label>{msj}</Form.Label>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Correo Electronico">
                                <Form.Control type="email" placeholder="Email Address" value={email} onChange={handleEmailChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Contraseña">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePwdChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <div className="d-grid gap-2 mb-3">
                            <Button variant="login" size="lg" type="submit">
                                Iniciar Sesion
                            </Button>
                        </div>
                    </Form>
                    <div className="DivText">
                        <Form.Label onClick={handleRegisterClick}>
                            Registrarse
                        </Form.Label>
                    </div>
                </Col>
            </div>
        </div>
        </>
        
    );
}