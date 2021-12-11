import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { useData } from "../providers/DataProvider";

const ImageGrid = ({setSelectedImg, userId}) => {
    //Variables storing current user
    const { data, setData } = useData();
    const user = data.user;
    const { docs } = useFirestore(userId);
    
    return (
        <div className="img-grid">
            {docs && docs.map(doc =>(
                <div className = "img-wrap" key={doc.id}
                    onClick={()=> setSelectedImg(doc.url)}    
                >
                    <img src={doc.url} alt="uploaded pic"/>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid;