import downloade from '../Assets/img/Nicolle Figueroa.jpg';
import { HeaderContent } from "./HeaderContent";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { variables } from '../providers/Variables';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import  Modal  from './Modal';
import { useData } from "../providers/DataProvider";
import SockJsClient from 'react-stomp';

export const Facade = () => {
    const { userId } = useParams();
    const { data, setData } = useData();
    const token = data.token;
    const user = data.user;
    const [clientRef, setClienteRef] = useState();
    const [friends, setFriends] = useState([]);
    const [fakeName, setFakeName] = useState();
    const [genero,setGenero] = useState();


    const iam = userId === user.id;

    //Modal picture enlarged variable
    const [selectedImg, setSelectedImg] = useState(null);

    const getUser = () => {
        fetch(variables.API_URL+'v1/user/'+userId)
        .then(response=>response.json())
        .then(data=>{
            setGenero(data.genero);
        });
    }

    const getFacade = () => {
        fetch(variables.API_URL+'v1/userFacade/'+userId,{
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

    
    const handleProfile = () => {
        window.history.replace("/profile/"+user.id);
    }

    const handleMatch = () => {
        fetch(variables.API_URL+"v1/user/"+userId+"/request", {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body: user.id
        })
            .then(response => response.text())
            .then(text => {
                console.log(text)
                clientRef.sendMessage("/app/notification/"+userId, user.id);
            })
            .catch(err => {
                console.log(err);
            });
    }
    

    const getFriends = () => {
        fetch(variables.API_URL+"v1/user/"+user.id+"/friends", {
            method: "GET",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            }
        })
            .then(response=>response.json())
            .then(data => setFriends(data));
    }
    const isFriendd = friends.includes(userId);


    const chatRedirect = () => {
        //Veo un perfil que no es el mio, además somos amigos
        if (!iam){
            if(isFriendd){
                handleProfile();
            }

        }
        
    }

    const isFriend = friends.includes(userId);

    useEffect(()=>{
        
        getFriends();
        getUser();
        getFacade();
        chatRedirect();
        
    }, []);

    const onMessageReceive = () => {}

    return (
        <>
        
        <HeaderContent/>
        <section className="profile-container py-3">
            <div className="profile-subcontainer mx-auto p-2 rounded">

                <div className="d-flex justify-content-center mx-auto">
                    <h3>{fakeName}  </h3>
                </div>
                <div className="d-flex justify-content-center mx-auto">
                    <h3>Genero: {genero}  </h3>
                </div>
                { iam ?
                        <div></div>
                        :
                        isFriend ?
                            <button className="btn btn-primary" disabled>Ver Perfil</button>
                            :
                            <button className="btn btn-primary" onClick={handleMatch}>Match</button>
                    }

                
            </div>
        </section>
        </>
    );
}