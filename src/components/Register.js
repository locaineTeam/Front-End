import { useState } from "react";
import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";
import {variables} from "../providers/Variables";

export const Register = () => {
	
    const { data, setData } = useData();

    const history = useHistory();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msj, setMsj] = useState("");
    const [gender, setGender] = useState("");

    const genderData = [
        {
            option: "Hombre"
        },
        {
            option: "Mujer"
        },
        {
            option: "Otro"
        }
    ];
	
	const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            name: name,
            lastName: lastName,
            genero: gender,
            email: email,
            password: password
        };

        fetch(variables.LOCAL_URL+"v1/user", {
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
        if(status === 201){
            response.json().then(json => register(json));
        } else {
            setMsj("Ha ocurrido un error");
        }
    };

    const register = (json) => {
        const newToken = json.token;
        setData((prev) => ({ ...prev, token: newToken }));
        localStorage.setItem("IETItoken", newToken);
        history.push("/home");
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
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="name" value={name} onChange={handleNameChange}></input>
            <input type="text" placeholder="last name" value={lastName} onChange={handleLastNameChange}></input>
            <select name="gender" onChange={handleGenderChange}>
                {genderData.map((g) =>{
                    return (
                        <option value={g.option}>{g.option}</option>
                    );
                })}
            </select>
            <input type="text" placeholder="email" value={email} onChange={handleEmailChange}></input>
            <input type="password" placeholder="password" value={password} onChange={handlePwdChange}></input>
            <button>Registrarse</button>
            <label>{msj}</label>
        </form>
        </>
    );
}