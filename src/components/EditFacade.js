import download from '../Assets/img/download.jpg';
import { variables } from '../providers/Variables';
import React, { useEffect } from 'react';
import { Col, FloatingLabel, Form, Button } from "react-bootstrap";
export const EditFacade = () => {

    
    const [photo, setPhoto] = React.useState("");
    const [fakeName, setFakeName] = React.useState("");
    
    const getLocalUser = () =>{
       
        fetch(variables.API_URL+'v1/userFacade/'+JSON.parse(localStorage.IETIuser).id)
        .then(response=>response.json())
        .then(data=>{
     
            setPhoto(data.photo);
            setFakeName(data.fakeName);
            
        });

    };

    useEffect(()=>{

        getLocalUser();  
        
        
    }, []);



    return (
        
        
        <><><h1>{fakeName}</h1>
            
            
            
            <h2>{photo}</h2>
            <img src={download} alt="description" /></><div className="DivText">
            <h2></h2>
            </div></>
        
    );
}