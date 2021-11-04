import React from 'react';

export const Match = () => {
    const cache = {};

    function importAll(r) {
        r.keys().forEach((key) => (cache[key] = r(key)));
    }

    importAll(require.context("../Assets/university_logo", false, /.(png|jpe?g|svg)$/));

    const images = Object.entries(cache).map(module => module[1].default);

    return (
        <>
        <p>Media Page..</p>

        {Object.entries(cache).map(module => {
            const image = module[1].default;
            const name = module[0].replace("./","");
            return (
                <button className="btn btn-outline-secondary">
                <div style={{float: 'left', padding: 100, margin: 10, border: '2px solid white' }}>
                    <img style={{width: 100, height: 70, margin: 'auto', display: 'block'}} src={image} />
                    <p>{name.replace('.png','')}</p>
                </div>
                </button>
            )
        })}
    </>
    );
}