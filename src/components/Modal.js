import React from 'react';
import {changeProfilePicture} from './Profile';
import { useData } from "../providers/DataProvider";

const Modal = ({setSelectedImg, selectedImg}) => {
    const { data, setData } = useData();
    const user = data.user;  
    

    const handleClick = (e) =>{
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
        
        
    }

    const setAsProfilePicture = ()=>{        
        changeProfilePicture(selectedImg);
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <img src={selectedImg} alt="enlarged pic"/>
            
            <div className="modal-container">                
                <button className="btn btn-primary" onClick={setAsProfilePicture}>Imagen de perfil</button>
            </div>
        </div>
        
    );
}

export default Modal;