import { useState } from "react";

export const Register = () => {
	
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msj, setMsj] = useState("");
	
	const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password
        };

    };
	
	const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePwdChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    };
	
    return (
		<>
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="email" value={email} onChange={handleEmailChange}></input>
            <input type="password" placeholder="password" value={password} onChange={handlePwdChange}></input>
            <button>Registrarse</button>
            <label>{msj}</label>
        </form>
        </>
    );
}