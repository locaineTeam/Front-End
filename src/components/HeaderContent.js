import downloade from '../Assets/img/Nicolle Figueroa.jpg';
import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";

export const HeaderContent = () => {

    const history = useHistory();
    const { data, setData } = useData();
    const user = data.user;

    const handleHouse = () => {
        history.push("/home");
    }

    const handleMessage = () => {
        history.push("/messages");
    }

    const handleRequest = () => {
        history.push("/request");
    }

    const handleProfile = () => {
        history.push("/profile/"+user.id);
    }

    const handleSignOut = () => {
        localStorage.setItem("IETItoken", "");
        setData((prev) => ({ ...prev, token: ""}));
    }

    return (
        
        <header className="headerContainer">
            <h1 className="headertitle m-0">FireBox</h1>
            <ul className="nav">
                <li>
                    <button type="button" className="btn shadow-none mr-2" onClick={handleHouse}>
                        <i className="bi-house-door-fill inav"></i>
                    </button>
                </li>
                <li>
                    <button type="button" className="btn shadow-none" onClick={handleMessage}>
                        <i className="bi-chat-dots-fill inav"></i>
                    </button>
                </li>
                <li>
                    <button type="button" className="btn shadow-none" onClick={handleRequest}> 
                        <i className="bi-person-plus-fill inav"></i>
                    </button>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle ddnav" href="#" data-bs-toggle="dropdown">
                        <img className="img-fluid rounded-circle" width="40" height="40" src={downloade}/>
                    </a>
                    <ul className="dropdown-menu p-0">
                        <li>
                            <button type="button" className="btn shadow-none" onClick={handleProfile}> 
                                Perfil
                            </button>
                        </li>
                        <li><hr className="dropdown-divider m-0"/></li>
                        <li>
                            <button type="button" className="btn shadow-none" onClick={handleSignOut}> 
                                Cerrar sesion
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </header>

    );
}