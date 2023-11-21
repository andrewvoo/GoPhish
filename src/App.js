import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './parts/Navbar'
import FishLogo from './images/fishhook.jpg'
import AxiosStuff from './parts/AxiosStuff';
import About from './parts/About'
import './index.css'

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [newResArray, setNewResArray] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isInvalid, setInvalidity] = useState(null);  //set to null so the styling isnt applied at page load
  const [isValid, setValidity] = useState(null);      //set to null so the styling isnt applied at page load
  const [apiKey, setApiKey] = useState("test");

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
      console.log("Check if the submission is invalid")
      return false;
    }else{
      console.log("Check if the submission is valid")
      return true;
    }
  }

  return (
    <>
    <div className='App'>
    <Navbar />
    <About />
    <img src={FishLogo} alt="logo" className='logo'/>
    <h5>Please enter a URL below for further analysis. This includes top-level domains.</h5>
    <Form noValidate className='url-form' onSubmit={e => {
        e.preventDefault();  // Prevent the default form submission behavior
        handleSubmit(tempUrl);
      }}>
        <Row className='form-row'>
          <Col xs={5} className='col-mobile'>
            <Form.Group className='groupStuff' controlId="formInput">
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
                className='apiLabel'
              />
            </Form.Group>
          </Col>
          <h5 className='apiLabelTop'>Please enter a valid VirusTotal API Key, always be aware of your rate limit and do not spam queries.</h5>
          <Col className='btn-col'>
            <Form.Group type="text" controlId="formInput">
              <Form.Control
              required
              placeholder='Enter your API Key...'
              className='apiLabel'
              onChange={e => {setApiKey(e.target.value)}}
              />
              
            </Form.Group>
          </Col>
                  
          <Col className='btn-col'>
            <Button variant='primary' type="submit" className='submitButton'>Search</Button>
          </Col>
        </Row>
      </Form>
      {isVisible && <AxiosStuff header={inputUrl} apiKeyValue={apiKey}/>}
    </div>

    
    </>
  );
}

export default App;
