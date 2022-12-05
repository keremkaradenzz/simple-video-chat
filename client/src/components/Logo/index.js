import React from 'react'
import turkcellLogo from '../../assets/images/turkcell.jpg'
import './style.css';
const Logo = () => {
    return (
        <div className='logo-wrapper'><img  src={turkcellLogo} alt='turkcell-logo' /></div>
    )
}

export default Logo;