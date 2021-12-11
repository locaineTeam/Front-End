import { HeaderContent } from "./HeaderContent";
import { useEffect, useState } from 'react';
import { useParams,useHistory } from 'react-router';
import { variables } from '../providers/Variables';
import { useData } from "../providers/DataProvider";
import SockJsClient from 'react-stomp';
import fire_box_log from "../Assets/fire_box_logo.png";
import { WithContext as ReactTags } from 'react-tag-input';

export const Facade = () => {
    const history = useHistory();
    const { userId } = useParams();
    const { data, setData } = useData();
    const token = data.token;
    const user = data.user;
    const [clientRef, setClienteRef] = useState();
    const [friends, setFriends] = useState([]);
    const [fakeName, setFakeName] = useState();
    const [genero,setGenero] = useState();

    const KeyCodes = {
        comma: 188,
        enter: [10, 13],
      };
      
      const delimiters = [...KeyCodes.enter, KeyCodes.comma];
    


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
        history.push("/profile/"+userId);
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
        <SockJsClient url={variables.API_URL + "stompendpoint"}
                topics={[]} onMessage={onMessageReceive}
                ref={(client) => { setClienteRef(client) }} />
        <HeaderContent/>
        <section className="profile-container py-3">
            <div className="profile-subcontainer mx-auto p-2 rounded">
                <div className="img-border p-1 mx-auto">
                    <img className="img-fluid rounded-circle" src={fire_box_log}/>
                </div>
                <div className="d-flex justify-content-center mx-auto mb-2">
                    <h3>{fakeName}  </h3>
                </div>
                <div className="d-flex justify-content-center mx-auto mb-2">
                    <h3>Genero: 
                        {genero=="Hombre"?
                            <i className="bi bi-gender-male"></i>
                            :
                            <i class="bi bi-gender-female"></i>
                        }  
                    </h3>
                    
                </div>
                <div className="d-flex justify-content-center mx-auto mb-4">
                    <button type="button" className="btn rounded-pill btn-secondary mr-1"> #ECI</button>
                    <button type="button" className="btn rounded-pill btn-secondary mr-1"> #Comida</button>
                    <button type="button" className="btn rounded-pill btn-secondary mr-1"> #Tecnologia</button>
                    <button type="button" className="btn rounded-pill btn-secondary mr-1"> #Administracion</button>
                    <button type="button" className="btn rounded-pill btn-secondary mr-1"> #Viajes</button>
                    <button type="button" className="btn rounded-pill btn-secondary mr-1"> #MonasChinas</button>                    
                    <button type="button" className="btn rounded-pill btn-secondary mr-1"> #Emprendimiento</button>
                </div>
                <div className="d-flex justify-content-center mx-auto">
                    { iam ?
                        <div></div>
                        :
                        isFriend ?
                            <button className="btn btn-primary mx-auto" onClick={handleProfile}>Ver Perfil</button>
                            
                            :
                            <button className="btn btn-primary mx-auto" onClick={handleMatch}>Match</button>
                    }
                </div>

                
            </div>
        </section>
        </>
    );
}