import downloade from '../Assets/img/Nicolle Figueroa.jpg';
import React,{useState} from 'react';
import { useEffect } from 'react';
import { variables } from '../providers/Variables';
export const EditProfile = () => {
    const [photo, setPhoto] = React.useState("");
    const [Name, setName] = React.useState("");
    const [Desc, setDesc] = React.useState("");
    const [Pref, setPref] = React.useState("");
    const [genders, setGenders] = useState([]);
    const [preferences, setPreferences] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const getLocalUser = () =>{
       
        fetch(variables.API_URL+'v1/user/'+JSON.parse(localStorage.IETIuser).id)
        .then(response=>response.json())
        .then(data=>{

            console.log(data);
            setDesc(data.descripcion);
            setPhoto(data.foto);
            setName(data.name);
            setPref(data.preferences);
            console.log(data.descripcion);
            
        });

    };
    const editPreferences = () => {
        setModalTitle("Edit Preferences");
        setPreferences("");
        refreshList();
    };
    const otherClick = () =>{
        alert("HOLO");

    };
    const refreshList = () =>{
        fetch(variables.API_URL+'v1/user/preferences')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setGenders(data);
        });

    };
    const changePreference =(e)=>{
        this.setState({preferences:e.value});
    };
    useEffect(()=>{

        getLocalUser();  
        
        
    }, []);
    return ( 
    <div class="container container-small" >
        <><h1>Edit Profile</h1>
        <h1>{Name}</h1>
        <h2>{photo}</h2>
        <img 
            width={500}
            src={downloade} alt="description" />
            <form>
            
                <h2>Descripcion</h2>
                {Desc}
                <textarea   class="form-control"  name="comment" rows="4">
                    {Desc}
                </textarea>
            
            <input type="submit" value="Actualizar" />

            </form>
            

            <button type="button"
                className="btn rounded-pill btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={editPreferences}>
                <span>Preferencias</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Editar Caracteristicas</span>
                                    <select className="form-select"
                                    onChange={changePreference}
                                    value={preferences}>
                                        {genders.map(gen=><option key={gen.toString()}>
                                            {gen}
                                        </option>)}
                                    </select>
                                </div>
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={otherClick}>
                                        Update
                                </button>
                            </div>

                        </div>
                    </div> 
                </div>
                

            
            </>
            <h2>{Pref}</h2>
            </div>
    );
    
}