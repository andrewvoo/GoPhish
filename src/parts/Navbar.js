import React, {useState} from 'react'
import './Navbar.css'
import {FaBars, FaTimes} from 'react-icons/fa'

const Navbar = () => {
const [click, setClick] = useState(false)
const handleClick = () => setClick(!click)

    return (
        <div className='header'>
            <div className='container'>
                <h1><span className='primary'>GoPhish</span></h1>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a href='/'> Home</a>
                    </li>
                    <li>
                        <a href='/'> About</a>
                    </li>
                    <li>
                        <a href='/'> Switch Themes</a>
                    </li>
                    </ul>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{color: '#333'}}/>) : (<FaBars size={20} style={{color: '#333'}} />)}
                </div>
            </div>        
        </div>
    )
}

export default Navbar