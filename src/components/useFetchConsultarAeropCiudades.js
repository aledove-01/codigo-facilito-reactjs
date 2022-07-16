import { useState } from "react";
import useConfFecthAmadeus from './useConfFetchAmadeus';

const useFetchConsultarAeropCiudades = () => {
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getToken, urlPpal } = useConfFecthAmadeus();

    const consultarAeropuertos = async (txtBusqueda) => {
        var myHeaders = new Headers();
        const idToken = await getToken();
        myHeaders.append("Authorization", "Bearer " + idToken);

        setLoading(true);
      
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }; 

        try {
            const response = await fetch(urlPpal+"/v1/reference-data/locations?subType=CITY,AIRPORT&"+
            "keyword="+txtBusqueda, requestOptions);
            const data = await response.json();
            if (!data.errors) {
                //console.log('ok',data.data);
                setDatos(data.data);
            }
            else {
                setError(data.errors.detail);
            }

        } catch (error) {
            console.log('error',error);
            setError(error);
        }
        setLoading(false);
    }

    return { consultarAeropuertos, datos, loading, error };
}
export default useFetchConsultarAeropCiudades;