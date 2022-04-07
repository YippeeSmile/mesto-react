import React from 'react';
import logo from '../images/mesto-logo.svg';

function Header() {
    return ( <
        div className = "Header" >
        <
        header className = "header" >
        <
        img src = { logo }
        className = "logo"
        alt = "Логотип Mesto" / >
        <
        /header> <
        /div>
    );
}

export default Header;