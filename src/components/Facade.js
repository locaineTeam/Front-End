import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import { variables } from '../providers/Variables';

export const Facade = () => {
    const [Id, setId] = React.useState("");
    const [FakeName, setName] = React.useState("");
    const [Photo,setPhoto]=React.useState("");
    const [Hash,setHash]=React.useState("");
    
    const { userId } = useParams();
    

    const getLocalUser = () =>{
       
        fetch(variables.API_URL+'v1/userFacade/'+userId)
        .then(response=>response.json())
        .then(data=>{
        
            setId(data.realUserId);
            setName(data.fakeName);
            setPhoto(data.photo);
            setHash(data.hashTags)
            
        });
    };

    useEffect(()=>{

        getLocalUser();  
        
        
    }, []);
    


    return (
        
        <><h1>{FakeName}</h1>
            
            
            
        <h2>{Photo}</h2>
        <h2>{Hash}</h2>
        </>
      
        

        

    );
}