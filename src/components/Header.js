import { MoonIcon, SunIcon } from "@primer/octicons-react";
import React from 'react';
//import { Link } from 'react-router-dom';


const Header = (props) => {

    const getOtherTheme = () => props.theme === "light" ? "dark" : "light";

    const toggleTheme = () => {
        props.setTheme(getOtherTheme);
    }

    return (

        <div className="header">
            <h2 className="logo">Github Finder</h2>
            <div className="theme-toggler" onClick={toggleTheme}>
                <span className="theme-name">{getOtherTheme().toUpperCase()}</span>
                {
                    props.theme === "light" ?
                        <MoonIcon size={16} /> :
                        <SunIcon size={16} />
                }
            </div>
        </div>

    );
}

export default Header;