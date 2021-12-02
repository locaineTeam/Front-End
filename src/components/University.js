import { HeaderContent } from "./HeaderContent";
import { useState } from 'react';
import { useParams, useHistory } from "react-router";
import { useData } from "../providers/DataProvider";
import SockJsClient from 'react-stomp';
import { variables } from '../providers/Variables';

export const University = () => {

    const history = useHistory();
    const { data, setData } = useData();
    const user = data.user;
    const [clientRef, setClienteRef] = useState();
    const { universityId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const userDataDto = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        message: message
    };

    const onMessageReceive = (msg , topic) => {
        if(topic === "/topic/university/chat/"+universityId){
            const arr = [...messages];
            arr.push(msg);
            setMessages(arr);
        } else {
            console.log(msg);
        }
    }

    const handleSendMsg = () => {
        clientRef.sendMessage("/app/university/chat/"+universityId, JSON.stringify(userDataDto));
        setMessage("");
    }

    const handleChangeMsg = (e) => {
        const value = e.target.value;
        setMessage(value);
    }

    const handleClickName = (userId) => {
        history.push("/profile/"+userId);
    }

    return (
        <>
            <SockJsClient url={variables.API_URL + "stompendpoint"}
                topics={["/topic/university/chat/"+universityId]}
                onMessage={onMessageReceive} ref={(client) => { setClienteRef(client) }} />

            <HeaderContent />
            <section className="uni-container py-3">
                <div className="uni-subcontainer mx-auto p-2 rounded">

                    <div className="chat">
                        <div className="chat-header p-2">
                            Chat
                        </div>
                        <div className="chat-body p-1 overflow-auto">
                            
                            {messages.map((msg) => {
                                return(
                                    <div className="chat-text border rounded p-1 mb-1">
                                        <h6 className="chat-username" onClick={() => handleClickName(msg.id)}>{msg.name} {msg.lastName}</h6>
                                        <p className="m-0">{msg.message}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="chat-footer p-2 d-flex">
                            <input type="text" className="form-control" placeholder="mensaje" value={message} onChange={handleChangeMsg}/>
                            <button onClick={handleSendMsg} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}