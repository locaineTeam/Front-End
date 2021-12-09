import { useData } from "../providers/DataProvider";
import { HeaderContent } from "./HeaderContent";
import { useEffect, useState } from 'react';
import { variables } from '../providers/Variables';
import InputEmoji from "react-input-emoji";

export const Messages = () => {

    const { data, setData } = useData();
    const token = data.token;
    const user = data.user;
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState("");
    const [currentFriend, setCurrentFriend] = useState({});

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
            .then(data => getDataFriends(data));
    }

    const getDataFriends = (friendsId) => {
        fetch(variables.API_URL+"v1/user/some", {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body: JSON.stringify(friendsId)
        })
            .then(response => response.json())
            .then(json => {
                setFriends(json);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleSendMsg = () => {
        setMessage("");
    }

    useEffect(()=>{
        getFriends();
    }, []);

    return (
        <>
            <HeaderContent/>
            <div className="messages-container py-3">
                <div className="messages-subcontainer mx-auto p-2 rounded">
                    <div className="inbox d-flex justify-content-start">
                        <div className="friends-list p-1 overflow-auto">
                            {friends.map((friend) => {
                                    return(
                                        <div className="friend border rounded p-1 mb-1" onClick={() => setCurrentFriend(friend)}>
                                            <h6>{friend.name} {friend.lastName}</h6>
                                        </div>
                                    );
                            })}
                        </div>
                        <div className="chat">
                            <div className="chat-header p-2">
                                {currentFriend.name} {currentFriend.lastName}
                            </div>
                            <div className="chat-body p-1 overflow-auto">


                            </div>
                            <div className="chat-footer p-2 d-flex">
                                <InputEmoji
                                    value={message}
                                    onChange={setMessage}
                                    cleanOnEnter
                                    onEnter={handleSendMsg}
                                    placeholder="mensaje"
                                />
                                <button onClick={handleSendMsg} className="btn btn-primary">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}