import downloade from '../Assets/img/Nicolle Figueroa.jpg';
import { HeaderContent } from "./HeaderContent";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { variables } from '../providers/Variables';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import  Modal  from './Modal';
import { useData } from "../providers/DataProvider";

export const Profile = () => {
    
    const { userId } = useParams();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const { data, setData } = useData();
    const token = data.token;
    const user = data.user;
    const friends = user.userFriends;

    const iam = userId === user.id;

    //Modal picture enlarged variable
    const [selectedImg, setSelectedImg] = useState(null);

    const getUser = () => {
        fetch(variables.API_URL+'v1/user/'+userId)
        .then(response=>response.json())
        .then(data=>{

            setName(data.name);
            setLastName(data.lastName);
        });
    }

    const handleMatch = () => {
        fetch(variables.API_URL+"v1/user/"+userId+"/request", {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
            },
            body: user.id
        })
            .then(response => response.text())
            .then(text => console.log(text))
            .catch(err => {
                console.log(err);
            });
    }

    const isFriend = () => {
        if(!iam){
            friends.forEach(element => {
                if (element === userId) return <button className="btn btn-primary" disabled>Amigos</button>;
            });
            return <button className="btn btn-primary" onClick={handleMatch}>Match</button>;
        }
    }

    return (
        <>
        {getUser()}
        <HeaderContent/>
        <section className="profile-container py-3">
            <div className="profile-subcontainer mx-auto p-2 rounded">
                <div className="img-border p-1 mx-auto">
                    <img className="img-fluid rounded-circle" src={downloade}/>
                </div>
                <div className="d-flex justify-content-center mx-auto">
                    <h3>{name} {lastName} </h3>
                    {isFriend()}
                </div>

                <div>
                    <UploadForm></UploadForm>
                    <ImageGrid setSelectedImg={setSelectedImg} />
                    {selectedImg && <Modal setSelectedImg={setSelectedImg} selectedImg={selectedImg}></Modal>}
                </div>
            </div>
        </section>
        </>
    );
}
