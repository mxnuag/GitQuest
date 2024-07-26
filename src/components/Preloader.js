import React from 'react';
import './Preloader.scss'; // Ensure this path is correct

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="box-container">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
            <div className="message">
                <p>Finding someone’s GitHub profile...</p>
                <p>Hang tight, we’re on it!</p>
            </div>
        </div>
    );
}

export default Preloader;
