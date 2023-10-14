import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './parts/Navbar'
import FishLogo from './images/fishhook.jpg'
import AxiosStuff from './parts/AxiosStuff';
import './index.css'

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [newResArray, setNewResArray] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isInvalid, setInvalidity] = useState(null);  //set to null so the styling isnt applied at page load
  const [isValid, setValidity] = useState(null);      //set to null so the styling isnt applied at page load

  function handleSubmit(url) {    
    if(validateOnSubmit(url)){
      setVisible(true)
      setInputUrl(url)
      setTempUrl("")
      setInvalidity(null)
      setValidity(null)
    } else{
      setVisible(false)
      setInvalidity(true)
      setValidity(false)
    }
  };

  function checkValidation(newInput){
    if (newInput === '') {
      // console.log(newInput)
      console.log("debug: str empty, form invalid")
      setInvalidity(true)
      setValidity(false)
    } else{
      // console.log(newInput)
      console.log("debug: form valid")
      setInvalidity(false)
      setValidity(true)
    }
  }

  function validateOnSubmit(url){
    if (url === '') {
      console.log("debug: CHECK ON SUBMIT form invalid")
      return false;
    }else{
      console.log("debug: CHECK ON SUBMIT form valid")
      return true;
    }
  }

  return (
    <>
    <div className='App'>
    <Navbar />
    <img src={FishLogo} alt="logo" className='logo'/>
    <p>Enter a URL below to check its validity. Must end in a top-level domain (.com, .gov, .co.uk, .de, etc.)</p>
    <Form noValidate className='url-form' onSubmit={e => {
        e.preventDefault();  // Prevent the default form submission behavior
        handleSubmit(tempUrl);
      }}>
        <Row className='form-row'>
          <Col xs={5} className='col-mobile'>
            <Form.Group controlId="formInput">
              {/* <Form.Label>URL</Form.Label> */}
              <Form.Control
                required
                isInvalid={isInvalid}
                isValid={isValid}
                placeholder='Enter a URL...'
                type="text"
                name="url"
                value={tempUrl} 
                onChange={e => {setTempUrl(e.target.value); checkValidation(e.target.value)}}
              />
              <Form.Control.Feedback type="invalid">
                URL is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
                  
          <Col className='btn-col'>
            <Button variant='primary' type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
      {isVisible && <AxiosStuff header={inputUrl}/>}
    </div>

    
    </>
  );
}

export default App;
