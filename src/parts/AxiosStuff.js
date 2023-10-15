import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AxiosStuff.css'

function AxiosStuff({header}) {
    const [data, setData] = useState(null)
    const [results, setResults] = useState(null)
    const [harmlessResult, setHarmlessResult] = useState(null);
    const [maliciousResult, setMaliciousResult] = useState(null);
    const [suspiciousResult, setSuspiciousResult] = useState(null);
    const [undetectedResult, setUndetectedResult] = useState(null);

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
              'x-apikey': '28d4db81c6b4c9512609abd75ee6722a0fe66da83ece18c53ef6d23694912b8f'
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
              console.log(results);
            })
            .catch(function (error) {
              console.error(error);
            });
    }

    React.useEffect(() => {
      scanUrl();
    }, [header]);
    

    return (
    <div className='box'>
        <div className='items'><b>{harmlessResult ? JSON.stringify(harmlessResult, null, 2) : "0"}</b> vendors view this URL as harmless.</div>
        <div className='items'><b>{maliciousResult ? JSON.stringify(maliciousResult, null, 2) : "0"}</b> vendors view this URL as malicious.</div>
        <div className='items'><b>{suspiciousResult ? JSON.stringify(suspiciousResult, null, 2) : "0"}</b> vendors view this URL as suspicious.</div>
        <div className='items'><b>{undetectedResult ? JSON.stringify(undetectedResult, null, 2) : "0"}</b> vendors did not detect anything.</div>
    </div>
  )
}

export default AxiosStuff
