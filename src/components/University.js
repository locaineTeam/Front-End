import { HeaderContent } from "./HeaderContent";
import { useState } from 'react';
import { useParams } from "react-router";
import { useData } from "../providers/DataProvider";
import SockJsClient from 'react-stomp';
import { variables } from '../providers/Variables';

export const University = () => {

    const { data, setData } = useData();
    const user = data.user;
    const [clientRef, setClienteRef] = useState();
    const { universityId } = useParams();
    const [usersOnline, setUsersOnline] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const userDataDto = {
        id: user.id,
        name: user.name,
        lastName: user.lastName
    };


    const onMessageReceive = (msg , topic) => {
        if(topic === "/topic/university/"+universityId){
            console.log(msg);
            setUsersOnline(msg);
        }if(topic === "/topic/university/chat/"+universityId){
            setMessages(msg);
        } else {
            console.log(msg);
        }
    }

    const handleConnect = () => {
        clientRef.sendMessage("/app/university/"+universityId, JSON.stringify(userDataDto));
    }

    const handleDisconnect = () => {
        clientRef.sendMessage("/app/disconnect/"+universityId, JSON.stringify(userDataDto));
    }

    const handleSendMsg = () => {
        setMessage("");
        clientRef.sendMessage("/app/university/chat/"+universityId, message);
    }

    const handleChangeMsg = (e) => {
        const value = e.target.value;
        setMessage(value);
    }

    return (
        <>
            <SockJsClient url={variables.API_URL + "stompendpoint"}
                topics={["/topic/university/" + universityId, "/topic/disconnect/" + universityId, "/topic/university/chat/"+universityId]}
                onMessage={onMessageReceive} ref={(client) => { setClienteRef(client) }}
                onConnect={handleConnect} onDisconnect={handleDisconnect} />

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
                                    <p className="chat-text border rounded p-1">{msg}</p>
                                );
                            })}
                        </div>
                        <div className="chat-footer p-2 d-flex">
                            <input type="text" className="form-control" placeholder="mensaje" value={message} onChange={handleChangeMsg}/>
                            <button onClick={handleSendMsg} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>

                    <div>
                        <h4>Usuarios Conectados</h4>
                        <ul className="p-0">
                            {usersOnline.map((uo) => {
                                return (
                                    <li>{uo.name} {uo.lastName}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>
        </>

    );
}