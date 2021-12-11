import { HeaderContent } from "./HeaderContent";
import { useState,useEffect } from 'react';
import React from 'react';
import { useParams, useHistory } from "react-router";
import { useData } from "../providers/DataProvider";
import SockJsClient from 'react-stomp';
import { variables } from '../providers/Variables';
import { useRef } from "react";
import InputEmoji from "react-input-emoji";

export const University = () => {

    const history = useHistory();
    const { data, setData } = useData();
    const user = data.user;
    const token = data.token;
    const [clientRef, setClienteRef] = useState();
    const { universityId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [fakeName, setFakeName] = useState();
    const [genero, setGenero] = useState();
    
    const messagesEnd = useRef(null);
    

    const userDataDto = {
        id: user.id,
        name: fakeName,
        lastName: genero,
        message: message
    };

    const onMessageReceive = (msg , topic) => {
        if(topic === "/topic/university/chat/"+universityId){
            const arr = [...messages];
            arr.push(msg);
            setMessages(arr);
            scrollToBottom();
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
        
        
        
        history.push("/facade/"+userId);
    }

    const scrollToBottom = () => {
        messagesEnd.current?.scrollIntoView({behavior: 'smooth'});
    }


    const getFacade = (userId) => {
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

        fetch(variables.API_URL+'v1/user/'+userId)
        .then(response=>response.json())
        .then(data=>{
            setGenero(data.genero);
        });
    }

    useEffect(()=>{
        
        

       getFacade(user.id);
        
        
    }, []);

    return (
        <>
            <SockJsClient url={variables.API_URL + "stompendpoint"}
                topics={["/topic/university/chat/"+universityId]}
                onMessage={onMessageReceive} ref={(client) => { setClienteRef(client) }} />

            <HeaderContent />
            <section className="uni-container py-3">
                <div className="uni-subcontainer mx-auto p-2 rounded">

                    <div className="chat">
                        <div className="chat-header p-2" style={{ textTransform: 'uppercase'}}>
                            {universityId}
                        </div>
                        <div className="chat-body p-1 overflow-auto">
                            
                            {messages.map((msg) => { 
                                return(
                                    <div className="chat-text border rounded p-1 mb-1">
                                        
                                        <h6 className="chat-username" onClick={() => handleClickName(msg.id)}>{msg.lastName} : {msg.name}</h6>
                                        <p className="m-0">{msg.message}</p>
                                    </div>
                                );
                            })}
                            <div ref={messagesEnd}/>
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
                    
                    <div className="uni mx-auto p-2 rounded">
                        <h1 style={{ textTransform: 'uppercase'}}>BIENVENIDO AL CHAT DE {universityId}</h1>
                        No olvides dar click sobre el nombre de quien te llame la atención para conectar!
                    </div>
                </div>
            </section>
        </>

    );
}