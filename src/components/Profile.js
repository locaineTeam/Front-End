import { HeaderContent } from "./HeaderContent";
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { variables } from '../providers/Variables';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import  Modal  from './Modal';
import { useData } from "../providers/DataProvider";
import SockJsClient from 'react-stomp';
import fire_box_log from "../Assets/fire_box_logo.png";


var token = "";
var user = "";
var history = null;
var profilePicture="";

export const Profile = () => {
    
    history = useHistory();
    
    const { userId } = useParams();    
    const [name, setName] = useState("");
    const [descripcion, setDescripcion] = useState("")
    const [lastName, setLastName] = useState("");
    const [foto, setPhoto] = useState("")
    const { data, setData } = useData();
    token = data.token;
    user = data.user;
    const [clientRef, setClienteRef] = useState();
    const [friends, setFriends] = useState([]);


    const iam = userId === user.id;

    //Modal picture enlarged variable
    const [selectedImg, setSelectedImg] = useState(null);

    const getUser = () => {
        fetch(variables.API_URL+'v1/user/'+userId)
        .then(response=>response.json())
        .then(data=>{

            setName(data.name);
            setLastName(data.lastName);
            setDescripcion(data.descripcion);
            setPhoto(data.foto);
        });
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

    const isFriend = friends.includes(userId);

    useEffect(()=>{              
        getUser();
        getFriends();
    }, []);



    const onMessageReceive = () => {

    }

    return (
        <>
        <SockJsClient url={variables.API_URL + "stompendpoint"}
                topics={[]} onMessage={onMessageReceive}
                ref={(client) => { setClienteRef(client) }} />
        <HeaderContent/>
        <section className="profile-container py-3">
            <div className="profile-subcontainer mx-auto p-2 rounded">
                <div className="img-border p-1 mx-auto">
                    <img className="img-fluid rounded-circle" src={foto==null?fire_box_log:foto}/>
                </div>
                <div className="d-flex justify-content-center mx-auto">
                    <h3>{name} {lastName} </h3>
                    { iam ?
                        <div></div>
                        :
                        isFriend ?
                            <button className="btn btn-primary" disabled>Amigos</button>
                            :
                            <button className="btn btn-primary" onClick={handleMatch}>Match</button>
                    }
                </div>               
                
                <div className="d-flex justify-content-center mx-auto">
                    <form >
                        <label>
                            <div className="d-flex justify-content-center mx-auto">                                
                                DESCRIPCION
                            </div>
                            <div>                                
                                <textarea value={descripcion} readonly="readonly" />
                            </div>
                        </label>
                    </form>
                </div>
                {
                    iam?
                        <div>                    
                            <UploadForm></UploadForm>
                            <ImageGrid setSelectedImg={setSelectedImg} userId={userId} />
                            
                            {selectedImg && <Modal setSelectedImg={setSelectedImg} selectedImg={selectedImg}></Modal>}
                        </div>: 
                        <div>
                            <ImageGrid setSelectedImg={setSelectedImg} userId={userId} />
                        </div>
                }                
            </div>
        </section>
        </>
    );
    
}

export const changeProfilePicture = (newProfilePicture) =>{

    
    fetch(variables.API_URL+"v1/user/"+user.id+"/photo", {
        method: "PUT",
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body: newProfilePicture
    })
        .then(response => response.text)
        .then(text => {
            console.log(text)
            console.log(user.id)
            window.location.reload();
        })
        .catch(err => {            
            console.log(err);
        });
    

    profilePicture=newProfilePicture;
}

