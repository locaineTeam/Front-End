import { HeaderContent } from "./HeaderContent";
import { useHistory } from "react-router";
import { variables } from '../providers/Variables';
import React, { useEffect } from 'react';
import { useState } from "react";

export const Home = () => {

    const history = useHistory();
    const [universitys, setUniversitys] = useState([]) ;
    
    const cache = {};

    const images = Object.entries(cache).map(module => module[1].default);

    function importAll(r) {
        r.keys().forEach((key) => (cache[key] = r(key)));
    }   

    const handleUniversity = (name) => {
        
        history.push("/university/"+name);
    }

    const getUniversitys = () =>{
       
        fetch(variables.API_URL+'v1/university')
            .then(response=>response.json())
            .then(data => {
                setUniversitys(data);
            });
    };

    useEffect(()=>{

        getUniversitys(); 
             
    }, []);

    importAll(require.context("../Assets/university_logo", false, /.(png|jpe?g|svg)$/));

    return(
        <>
            <HeaderContent />            
            <section className="homepage py-3">
                <div className="subHomepage mx-auto p-2 rounded">
                    <h2>Universidades</h2>
                    <div className="row">
                        {Object.entries(cache).map(module => {
                            const image = module[1].default;
                            const name = module[0].replace("./", "");
                            const min = 1;
                            const max = 200;
                            const hombres = Math.ceil(min + Math.random() * (max - min));
                            const mujeres = Math.ceil(min + Math.random() * (max - min));
                            return (
                                <div className="col-md-4 mb-2">
                                    <div className="d-flex flex-column justify-content-center">
                                        <h5 className="m-auto" style={{ textTransform: 'uppercase'}}>{name.replace('.png', '')}</h5>
                                        <p className="m-auto">Hombres: {hombres}  Mujeres: {mujeres}</p>
                                        <img className="mb-1" style={{ float: 'left', width: 90, height: 70, margin: 'auto', display: 'block' }} src={image} />
                                        <button className="btn btn-primary" onClick={() => handleUniversity(name.replace('.png', ''))}>Entrar</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                </div>
            </section>
        </>
    );
}