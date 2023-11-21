import React, {useState} from 'react'
import './About.css'
import {FaBars, FaTimes} from 'react-icons/fa'

const About = () => {
const [click, setClick] = useState(false)
const handleClick = () => setClick(!click)

    return (
        <div className='neato'>
            Welcome to Go Phish! This application is an OSINT tool and integrates with the VirusTotal API. Please be aware only URLs are currently supported. Happy hunting!
        </div>
    )
}

export default About