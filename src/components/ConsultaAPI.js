import React from 'react';
import axios from 'axios';

//axios.defaults.baseURL = 'https://codigo-facilito-avioncito.herokuapp.com';
axios.defaults.baseURL = 'https://test.api.amadeus.com/v1/security';
axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';

axios.defaults.mode = 'no-cors';

export default function ConsultaAPI() {
    //console.log('consultaAPI');
    const getToken = async () => {
        const ret = await axios.post('/oauth2/token', {
            grant_type: 'client_credentials&client_id={fv5hBJKNkkqlx9rNkZUD4l9hTozoY5vT}&client_secret={4UTo75n3iiMm1Qnv}',
        });
        //console.log('ret', ret);
        return ret;
    }
    //la fecha es xxxx-xx-xx año-mes-dia
    const buscarVuelos = async (_origen,_destino,_fecha,_adultos) => {
        const ret = await axios.get(
            'flight-search?originCode='+_origen+'&destinationCode='+_destino+'&dateOfDeparture='+_fecha+''+'&adults='+_adultos);

        //console.log(ret.data);
    };

    const buscarCiudades = async (_ciudad) => {
        const ret = await axios.get(
            'city-and-airport-search/'+_ciudad);
        //console.log(ret.data);
    }
    //buscarVuelos('SFO', 'JFK', '2022-08-02');
    return { getToken };
 
}