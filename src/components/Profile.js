import downloade from '../Assets/img/Nicolle Figueroa.jpg';
import { HeaderContent } from "./HeaderContent";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { variables } from '../providers/Variables';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import  Modal  from './Modal';

export const Profile = () => {
    
    const { userId } = useParams();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

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

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
        <HeaderContent/>
        <section className="profile-container py-3">
            <div className="profile-subcontainer mx-auto p-2 rounden ">
                <div className="img-border p-1 mx-auto">
                    <img className="img-fluid rounded-circle" src={downloade}/>
                </div>
                <div className="d-flex justify-content-center mx-auto">
                    <h3>{name} {lastName} </h3>
                    <button className="btn btn-primary">Match</button>                    
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
