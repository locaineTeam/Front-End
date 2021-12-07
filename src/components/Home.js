import { HeaderContent } from "./HeaderContent";
import { useHistory } from "react-router";
import { variables } from '../providers/Variables';
import React, { useEffect } from 'react';
import { useState } from "react";

export const Home = () => {

    const history = useHistory();
    const [universitys, setUniversitys] = useState([]) ;
    
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

    return(
        <>
            <HeaderContent />
            <section className="homepage py-3">
                <div className="subHomepage mx-auto p-2 rounded">
                    <h2>Universidades</h2>
                    <table className="table table-hover table-borderless table-striped" id="statTable">
                        <tbody>
                            {universitys.map((uni) => {
                                return(
                                    <tr>
                                        <td>
                                            <h5>{uni.name}</h5>                
                                            <button className="btn btn-primary" onClick={() => handleUniversity(uni.name)}>Entrar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}