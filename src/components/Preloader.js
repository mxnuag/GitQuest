import React from 'react';
import './Preloader.scss';
import { FaGithub, FaCode, FaSpinner, FaTerminal } from 'react-icons/fa';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="box-container">
                <div className="box"><FaGithub /></div>
                <div className="box"><FaCode /></div>
                <div className="box"><FaSpinner /></div>
                <div className="box"><FaTerminal /></div>
            </div>
            <div className="message">
                <p>Finding someone’s GitHub profile...</p>
                <p>Hang tight, we’re on it!</p>
            </div>
        </div>
    );
}

export default Preloader;
