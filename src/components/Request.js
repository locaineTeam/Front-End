import { HeaderContent } from "./HeaderContent"
import { useData } from "../providers/DataProvider";
import { variables } from '../providers/Variables';
import { useEffect, useState } from 'react';

export const Request = () => {

    const { data, setData } = useData();
    const token = data.token;
    const user = data.user;
    const [requests, setRequests] = useState([]);

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
            .then(json => getUsers(json))
            .catch(err => {
                console.log(err);
            });
    }

    const getUsers = (idUsers) => {
        idUsers.forEach(element => {
            fetch(variables.API_URL+'v1/user/'+element)
                .then(response=>response.json())
                .then(data=>{
                    const arr = [...requests];
                    arr.push(data);
                    setRequests(arr);
                });
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
                    {requests.map((userRequest) => {
                        return (
                            <div className="user-request mb-1 p-1">
                                <h6>{userRequest.name} {userRequest.lastName}</h6>
                                <div>
                                    <button className="btn btn-success">Aceptar</button>
                                    <button className="btn btn-danger">Rechazar</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}