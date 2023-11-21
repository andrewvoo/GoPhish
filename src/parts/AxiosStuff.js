import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AxiosStuff.css'

function AxiosStuff({header, apiKeyValue}) {
    const [data, setData] = useState(null)
    const [results, setResults] = useState(null)
    const [harmlessResult, setHarmlessResult] = useState(null);
    const [maliciousResult, setMaliciousResult] = useState(null);
    const [suspiciousResult, setSuspiciousResult] = useState(null);
    const [undetectedResult, setUndetectedResult] = useState(null);
    const [lastFinalUrlResult, setLastFinalUrlResult] = useState(null);
    const [categoryResult, setCategoryResult] = useState(null);
    const [redirectionResult, setRedirectionResult] = useState(null);

    function formatURL(urlInput){
      var newString = btoa(urlInput)
      newString = newString.replace("=", "")
      return newString
    }

    function scanUrl() {
        var userURL = formatURL(header)
        var options = {
            method: 'GET',
            url: 'https://www.virustotal.com/api/v3/urls/' + userURL,
            headers: {
              accept: 'application/json',
              'x-apikey': '' + apiKeyValue
            }
          };
          
          axios
            .request(options)
            .then((response) => {
              let attrs = response.data.data.attributes;
              setResults(JSON.stringify(attrs.last_analysis_stats))
              setHarmlessResult(JSON.stringify(attrs.last_analysis_stats.harmless));
              setSuspiciousResult(JSON.stringify(attrs.last_analysis_stats.suspicious));
              setUndetectedResult(JSON.stringify(attrs.last_analysis_stats.undetected));
              setMaliciousResult(JSON.stringify(attrs.last_analysis_stats.malicious));
              setLastFinalUrlResult(JSON.stringify(attrs.last_final_url));

              let newArray = JSON.stringify(attrs.categories)
              setCategoryResult(newArray);

              newArray = JSON.stringify(attrs.redirection_chain)
              setRedirectionResult(newArray);
            })
            .catch(function (error) {
              console.error(error);
            });
    }

    React.useEffect(() => {
      scanUrl();
    }, [header], [apiKeyValue]);
    
    if(lastFinalUrlResult){
      return (
        <div className='box'>
            <div className='items'>
              <p><b>{harmlessResult ? harmlessResult : 0}</b> vendors view this URL as harmless.</p> 
              <p><b>{maliciousResult ? maliciousResult : 0}</b> vendors view this URL as malicious.</p> 
              <p><b>{suspiciousResult ? suspiciousResult : 0}</b> vendors view this URL as suspicious.</p> 
              <p><b>{undetectedResult ? undetectedResult : 0}</b> vendors did not detect anything.</p> 
              <p><b>{lastFinalUrlResult ? lastFinalUrlResult : "No Data"}</b> is the final URL the submitted URL went to.</p>
              <p><b>{categoryResult ? categoryResult : "No Data"}</b> are the category results for this URL.</p>
              <p><b>{redirectionResult ? redirectionResult : "No Data"}</b> are the redirection results for this URL.</p>
            </div>
        </div>
      )
    }
    else {
      return (
        <div className='box'>
            <div className='items'>
              <p>Invalid Link or API Key is missing. Please check your input data and try again.</p>
            </div>
        </div>
      )
    }
}

export default AxiosStuff
