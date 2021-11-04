import React,{useState} from 'react';
import { useHistory } from "react-router";
import { variables } from '../providers/Variables';
import { useData } from "../providers/DataProvider";

export const Home = () => {

    const history = useHistory();

    const [genders, setGenders] = useState([]);
    const [preferences, setPreferences] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const { data, setData } = useData();
    const user = data.user;
    const token=data.token;

    const editProfile = () =>{
        let path = `editProfile`;
        history.push(path);
    }

    const editFacade = () =>{
        let path = `editFacade`;
        history.push(path);
    };

    

    const messages = () => {
        let path = `messages`;
        history.push(path);
    };

    const request = () => {
        let path = `request`;
        history.push(path);
    }

    const match = () => {
        let path = `match`;
        history.push(path);
    };

    const editPreferences = () => {
        setModalTitle("Edit Preferences");
        setPreferences("");
        refreshList();
    };
    
    const refreshList = () =>{
        fetch(variables.API_URL+'v1/user/preferences')
        .then(response=>response.json())
        .then(data=>{
            setGenders(data);
        });

    };

    const otherClick = () =>{
        fetch(variables.LOCAL_URL+'v1/user/'+user.id,
        {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body:JSON.stringify({
                name: user.name,
                email: user.email,
                lastName: user.lastName,
                birthDay:user.birthDay,
                foto: user.foto,
                descripcion: user.descripcion,            
                password: "",
                preferences: preferences,
                genero:user.genero,            
                universidad:user.universidad
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert("Actualización exitosa");

        },(error)=>{
            alert('Failed');

        });

    };

    const closeSesion = () =>{
        alert("Cerrar");

    };

    const changePreference =(e)=>{
        console.log(e.target.value);
        setPreferences(e.target.value);
    };


    return(
        <div className="HomeContainer">                
            <nav className="navbar navbar-expand-lg navbar-dark NavBarHome" aria-label="Eighth navbar example">
                <div className="container">                        
                    <a className="navbar-brand" href="#">
                        <h1 className="text-light">PAGINA INICIAL</h1> 
                    </a>                
                </div>
                
                <div className="navbar" id="navbarsHome">
                    
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="Opciones" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                                Opciones
                            </a>
                            <ul className="dropdown-menu text-ligth" aria-labelledby="Opciones">
                                <li>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={editProfile}>
                                        <span>Editar Perfil</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={editFacade}>
                                        <span>Editar Fachada</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={closeSesion}>
                                        <span>Cerrar Sesión</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                                        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav> 
            <div className="container rounded">
                <div className="row">
                    <div className="col-sm">              
                        <div className="row">
                            <div className="col-sm">                                
                                <button type="button"
                                    className="btn rounded-pill btn-light mr-1"
                                    onClick={messages}>
                                    <span>Mensajes</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-messenger" viewBox="0 0 16 16">
                                    <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="col-sm">
                                <button type="button"
                                    className="btn rounded-pill btn-light mr-1"
                                    onClick={request}>
                                    <span>Solicitudes</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button> 
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="row">
                            <div className="col-sm">
                                <button type="button"
                                    className="btn rounded-pill btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={editPreferences}>
                                    <span>Preferencias</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>
                                <button type="button"
                                    className="btn rounded btn-light d-grid gap-2" 
                                    onClick={match}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                        </svg>
                                    </div>                                
                                    <span className="badge bg-secondary">¡Dale al Match!</span>                                
                                </button>
                            </div>                            
                        </div>                        
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Editar Caracteristicas</span>
                                    <select className="form-select"
                                    onChange={changePreference}
                                    value={preferences}>
                                        {genders.map(gen=><option value={gen} key={gen}>
                                            {gen}
                                        </option>)}
                                    </select>
                                </div>
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={otherClick}>
                                        Update
                                </button>
                            </div>

                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}