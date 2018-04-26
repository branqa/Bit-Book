import React from 'react';
import Logo from './logo.png'

const Footer = () => {
    return <div className="footer">
        <img id='footer-image' align="middle" src={Logo} width="10%" alt='bit'/>
        <span>Copyright &copy;  BIT2018</span>
      </div>;
}

export default Footer;