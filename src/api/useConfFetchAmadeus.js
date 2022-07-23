
//uso servidor nodejs propio para realizar la consulta a la API de Amadeus
//const useConfFecthAmadeus = () => {
    //axios.defaults.baseURL = 'https://codigo-facilito-avioncito.herokuapp.com';
    //axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded';
    //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    //axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    //axios.defaults.mode = 'no-cors';

    //return {axios};
//}

const useConfFecthAmadeus = () => {
    const urlPpal = 'https://test.api.amadeus.com';
    const urlencoded = new URLSearchParams();
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "fv5hBJKNkkqlx9rNkZUD4l9hTozoY5vT");
    urlencoded.append("client_secret", "4UTo75n3iiMm1Qnv");

    const getToken = async () => {
       
        let tokenId = '';
        

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        try {
           
            const resp = await fetch(urlPpal + "/v1/security/oauth2/token", requestOptions)
            const data = await resp.json();
            //console.log('token',data.access_token)
            tokenId = (data).access_token;
            //.then(response => response.text())
            //.then(result => console.log('res',JSON.parse(result).access_token))
            //.catch(error => console.log('error', error));
            
        } catch (error) {
            console.log('error', error);
        }
        
        return tokenId;
     }
     return {urlPpal, getToken, urlencoded,myHeaders};
}
export default useConfFecthAmadeus;