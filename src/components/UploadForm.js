import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () =>{
    const [file, setFile]=useState(null);
    const [error, setError] = useState(null);

    const allowedPictureTypes=['image/png', 'image/jpeg']
    const changeHandler =(e)=>{
        let selected = e.target.files[0];
        if(selected && allowedPictureTypes.includes(selected.type)){
            setFile(selected);
            setError('');
        }
        else{
            setFile(null);
            setError('The picture format is not allowed, use png or jpeg instead')
        }
    }

    return(
        <form>
            <input type="file" onChange={changeHandler}/>
            <div className="output">
                { error && <div className="error">{error}</div>}
                {file && <div>{file.name}
                {file && <ProgressBar file={file} setFile={setFile}/>}
                </div>}
            </div>
        </form>
        

    )
}

export default UploadForm;