import React, { useEffect } from 'react';
import useStorage from '../hooks/UseStorage'

const ProgressBar = ({file, setFile}) => {
    const {url, progress} = useStorage(file)
    console.log(progress, url)
    return(
        <div className="progress-bar">
            cosa
        </div>

    )
}

export default ProgressBar;