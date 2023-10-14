import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AxiosStuff({header}) {
    const [data, setData] = useState(null)
    const [results, setResults] = useState(null)

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
    <div>
      <p>{results}</p>
    </div>
  )
}

export default AxiosStuff