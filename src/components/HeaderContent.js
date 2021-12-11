import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";
import { Toast, ToastContainer } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import { variables } from '../providers/Variables';
import fireBoxLogo from '../Assets/fire_box_logo.png';

export const HeaderContent = () => {

    const history = useHistory();
    const { data, setData } = useData();
    const [photo, setPhoto] = useState("");
    const user = data.user;
    const token = data.token;
    const [show, setShow] = useState(false);
    const [clientRef, setClienteRef] = useState();
    const [dataToast, setDataToast] = useState({});
    const [totalRequest, setTotalRequest] = useState(0);

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
    const handleFacade = () => {
        history.push("/facade/"+user.id);
    }

    const handleSignOut = () => {
        localStorage.setItem("IETItoken", "");
        setData((prev) => ({ ...prev, token: ""}));
    }

    const onMessageReceive = (msg , topic) => {
        if(topic === "/topic/notification/"+user.id){
            setNotification(msg);
        } else {
            console.log(msg);
        }
    }

    const setNotification = (userId) => {
        fetch(variables.API_URL+'v1/user/'+userId)
        .then(response=>response.json())
        .then(data=>{
            setShow(false);     
            setDataToast(data);
            setShow(true);
            getRequests();
        });
    }

    const getRequests = () => {
        fetch(variables.API_URL+"v1/user/"+user.id+"/request", {
            method: "GET",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
            .then(response => response.json())
            .then(json => {
                setTotalRequest(json.length);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getPhoto = () => {
        fetch(variables.API_URL+"v1/user/"+user.id)
        .then(response => response.json())
        .then(json => {
            setPhoto(json.foto);
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(()=>{
        getRequests(); 
        getPhoto(); 
    }, []);

    return (
        <>
            <SockJsClient url={variables.API_URL + "stompendpoint"}
                topics={["/topic/notification/"+user.id]}
                onMessage={onMessageReceive} ref={(client) => { setClienteRef(client) }} />

        <header className="headerContainer">
            <div className='d-flex'>
                <img style={{ float: 'left', width: 50, height: 50, margin: 'auto', display: 'block' }} src={fireBoxLogo} />     
                <h1 className="headertitle m-0">FireBox</h1>
            
            </div>
            <ul className="d-flex p-0 m-0">
                <li className="mx-2 d-flex align-items-center">
                    <button type="button" className="btn p-0 shadow-none" onClick={handleHouse}>
                        <i className="bi-house-door-fill inav"></i>
                    </button>
                </li>
                <li className="mx-2 d-flex align-items-center">
                    <button type="button" className="btn p-0 shadow-none" onClick={handleMessage}>
                        <i className="bi-chat-dots-fill inav"></i>
                    </button>
                </li>
                <li className="mx-2 d-flex align-items-center">
                    <button type="button" className="btn p-0 shadow-none position-relative" onClick={handleRequest}> 
                        <i className="bi-person-plus-fill inav">
                        </i>
                        {(totalRequest > 0) ?
                            <span className="position-absolute start-100 translate-middle span-badge rounded-pill bg-danger">
                                {totalRequest}
                            </span>
                            :
                            <span></span>}
                            
                    </button>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle ddnav" href="#" data-bs-toggle="dropdown">
                        <img className="img-fluid rounded-circle" width="40" height="40" src={photo}/>
                    </a>
                    <ul className="dropdown-menu p-0">
                        <li>
                            <button type="button" className="btn shadow-none" onClick={handleProfile}> 
                                Perfil
                            </button>
                        </li>
                        <li>
                            <button type="button" className="btn shadow-none" onClick={ handleFacade}> 
                                Fachada
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
            <ToastContainer className="position-fixed bottom-0 end-0 p-3">
                <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Notificacion</strong>
                        <small>Ahora</small>
                    </Toast.Header>
                    <Toast.Body>{dataToast.name} {dataToast.lastName} te ha enviado una solicitud</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}