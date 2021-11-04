import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";
import { variables } from "../providers/Variables";
import { Col, FloatingLabel, Form, Button } from "react-bootstrap";

export const Register = () => {

    const { data, setData } = useData();

    const history = useHistory();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msj, setMsj] = useState("");
    const [gender, setGender] = useState("");
    const [genderData, setGenders] = useState([]);

    useEffect(() => {
        fetch(variables.LOCAL_URL + 'v1/user/genders')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setGenders(data);
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            name: name,
            lastName: lastName,
            genero: gender,
            email: email,
            password: password
        };

        console.log(user);

        fetch(variables.LOCAL_URL + "v1/user", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => checkStatus(response))
            .catch(err => {
                console.log(err);
            });

    };

    const checkStatus = (response) => {
        const status = response.status;
        if (status === 201) {
            response.json().then(json => register(json));
        } else {
            setMsj("Ha ocurrido un error");
        }
    };

    const register = (json) => {
        history.push("/");
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePwdChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleGenderChange = (e) => {
        const value = e.target.value;
        setGender(value);
    }

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
                            <FloatingLabel label="Nombres">
                                <Form.Control type="text" placeholder="Nombres" value={name} onChange={handleNameChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Apellidos">
                                <Form.Control type="text" placeholder="Apellidos" value={lastName} onChange={handleLastNameChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Genero">
                                <Form.Select onChange={handleGenderChange}>
                                    <option value="">Seleccionar</option>
                                    {genderData.map((g) => {
                                        return (
                                            <option value={g}>{g}</option>
                                        );
                                    })}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
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
                                Registrarse
                            </Button>
                        </div>
                    </Form>
                </Col>
            </div>
        </div>
        </>
    );
}