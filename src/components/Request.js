import { HeaderContent } from "./HeaderContent"
import { useData } from "../providers/DataProvider";
import { variables } from '../providers/Variables';
import { useEffect, useState } from 'react';

export const Request = () => {

    const { data, setData } = useData();
    const token = data.token;
    const user = data.user;
    const [requests, setRequests] = useState([]);
    const [fakeName, setFakeName] = useState();


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
                getUsers(json);
            })
            .catch(err => {
                console.log(err);
            });
    }



    const getFacade = (userID) => {
        fetch(variables.API_URL+'v1/userFacade/'+userID,{
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        }})
        .then(response=>response.json())
        .then(data=>{

            setFakeName(data.fakeName);
            
        });
    }

    

    const getUsers = (usersId) => {
        fetch(variables.API_URL+"v1/user/some", {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body: JSON.stringify(usersId)
        })
            .then(response => response.json())
            .then(json => {
                setRequests(json);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleAccept = (userIdToAdd) => {
        fetch(variables.API_URL+"v1/user/"+user.id+"/friends", {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body: userIdToAdd
        })
            .then(response => response.text())
            .then(text => {
                console.log(text);
                handleCancel(userIdToAdd);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleCancel = (userIdToDelete) => {
        fetch(variables.API_URL+"v1/user/"+user.id+"/request/"+userIdToDelete, {
            method: "DELETE",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
            .then(response => response.text())
            .then(text => {
                console.log(text);
                getRequests();
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(()=>{
        getRequests(); 
        
    }, []);

    return (
        <>
            <HeaderContent />
            <section className="request-container py-3">
                <div className="request-subcontainer mx-auto p-2 rounded">
                    <h2>Solicitudes</h2>
                    {requests.map((data) => {
                        getFacade(data.id); 
                        return (
                            <div className="user-request mb-1 p-1">
                                <h6>{fakeName} </h6>
                                <div>
                                    <button className="btn btn-success" onClick={() => handleAccept(data.id)} ref="www.google.com">Aceptar</button>
                                    <button className="btn btn-danger" onClick={() => handleCancel(data.id)}>Rechazar</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}