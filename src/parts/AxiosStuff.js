import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AxiosStuff() {
  
  
    const [data, setData] = useState(null)
    const url = 'https://www.virustotal.com/api/v3/urls/d3d3Lmdvb2dsZS5jb20'

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://www.virustotal.com/api/v3/urls/d3d3Lmdvb2dsZS5jb20',
            headers: {
              accept: 'application/json',
              'x-apikey': '28d4db81c6b4c9512609abd75ee6722a0fe66da83ece18c53ef6d23694912b8f'
            }
          };
          
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
    }, [])

    return (
    <div>AxiosStuff</div>
  )
}

export default AxiosStuff