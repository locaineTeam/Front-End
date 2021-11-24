import { HeaderContent } from "./HeaderContent";
import { useHistory } from "react-router";
import { variables } from '../providers/Variables';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { UniDiv } from "./UniversityDiv";

export const Home = () => {
    
    

    const getUniversitys = () =>{
       
        fetch(variables.LOCAL_URL+'v1/university')
        .then(response=>response.json())
        .then(resp=>{
            $("#statTable tbody").empty();
            //console.log(resp);
            var contact = resp;
            
            console.log(contact);
            if(contact !== undefined){
                var data = contact.map((info) => {
                    return {
                        id: info.id,
                        name: info.name
                    }
                })
        

                
                data.map((info) => {
                    var x = 0;
                    $("#statTable > tbody:last").append($("<tr><td>" +  <UniDiv title={info.name}/>+
                         
                        "</td></tr>"))
                })
            } else {
                
            }})
        ;

    };




    const history = useHistory();

    const handleUniversity = () => {
        history.push("/university/eci");
    }


    useEffect(()=>{

        getUniversitys();  
        
        
    }, []);

    return(
        <>
        
        <HeaderContent/>
        
        <section className="homepage py-3">
            <div className="subHomepage mx-auto p-2 rounded">
                <h2>Universidades</h2>
                <ul className="p-0">
                <table class="table table-hover table-borderless table-striped" id="statTable">
                    <tbody>
                                            
                        <li className="border rounded p-3 mb-2 li-uni">
                            <div>
                                <h5>Escuela Colombiana de Ingenieria</h5>
                                <p>eci</p>
                                <button className="btn btn-primary" onClick={handleUniversity}>Entrar</button>
                            </div>
                        </li>
                        <li className="border rounded p-3 li-uni">
                            <div>
                                <h5>Escuela Colombiana de Ingenieria</h5>
                                <p>eci</p>
                                <button className="btn btn-primary">Entrar</button>
                            </div>
                        </li>
                    </tbody>
                    </table>
                </ul>

            </div>
        </section>
        </>
    );
}