import { useState, useEffect} from 'react';
import {projectStorage, projectFirestore} from '../Firebase/config';
import { variables } from '../providers/Variables';
import { useData } from "../providers/DataProvider";

const useStorage = (file) =>{
    const [progress, setProgress]=useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [currentUserId, setCurrentUserId] = useState("");
    
    const { data, setData } = useData();
    const user = data.user;
    console.log("RE HIJUEPUTA")
    console.log(user)

    useEffect (()=>{    
        console.log("hijueputa")             
        console.log(user)
        const storageRef = projectStorage.ref(user.id+"/"+file.name);
        const collectionRef=projectFirestore.collection(user.id);        
        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
          }, (err) => {
            setError(err);
          }, async () => {
            const url = await storageRef.getDownloadURL();
            await collectionRef.add({url});
            setUrl(url);
        })


    }, [file]);
    return {progress, url, error}
}

export default useStorage;