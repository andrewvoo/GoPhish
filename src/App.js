import React from 'react'
import Navbar from './parts/Navbar'
import FishLogo from './images/fishhook.jpg'
import './index.css'

function App() {
  return (
    <>
    <div className='App'>
    <Navbar />

    <img src={FishLogo} alt="logo" className='logo'/>
    <p>Enter a URL below to check its validity. Must end in a top-level domain (.com, .gov, .co.uk, .de, etc.)</p>
    </div>
    </>
  );
}

export default App;
