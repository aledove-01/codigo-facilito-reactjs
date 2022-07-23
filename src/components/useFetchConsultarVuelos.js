import { useState } from "react";
import useConfFecthAmadeus from '../api/useConfFetchAmadeus';
import { useDispatch } from 'react-redux';
import {fetchVuelosStart, fetchVuelosComplete} from '../redux/slices/resultsVuelos';

const useFetchConsultarVuelos = () => {
    const dispatch = useDispatch();

    const [vuelos, setVuelos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getToken, urlPpal } = useConfFecthAmadeus();

    //fechas en formato yyyy-mm-dd
    //fecha regreso es opcional
    const consultarVuelos = async (params) => {
        const {origen, destino, fecha, fechaRegreso, adultos,ninios,bebes} = params;
        if (origen === '' || destino === '' || fecha === '' || adultos === '' || adultos == 0) {
            setError('Faltan datos para realizar la busqueda');
            return false;
        }
        var myHeaders = new Headers();
        var idToken = await getToken()
        myHeaders.append("Authorization", "Bearer " + idToken);
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        setLoading(true);
        
        dispatch(fetchVuelosStart());
        
        try {
            const idaYVuelta = (fechaRegreso && fechaRegreso !== undefined? "&returnDate=" + fechaRegreso:"");
            const response = await fetch(urlPpal +  "/v2/shopping/flight-offers?originLocationCode="+origen+
                             "&destinationLocationCode="+destino+
                             "&departureDate="+fecha+
                             idaYVuelta+
                             "&adults="+adultos+
                             "&children="+ninios+
                             "&infants="+bebes+
                             "&max=20", requestOptions)
    
            const data = await response.json();
            //console.log('response',await data)
           
            if (!data.errors) {
                console.log('ok',data);
                setVuelos(data);
                dispatch(fetchVuelosComplete(data));
                return data;
            }
            else {
                setError(data.errors.detail);
            }

        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    

    const consultarDetaCompania = async (codCompania) => {
        if (codCompania === '') {
            setError('Faltan datos para realizar la busqueda');
            return false;
        }
        var myHeaders = new Headers();
        var idToken = await getToken()
        myHeaders.append("Authorization", "Bearer " + idToken);
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        setLoading(true);
        
        try {
            const response = await fetch(urlPpal +  "/v1/reference-data/airlines?airlineCodes="+codCompania, requestOptions)

            const data = await response.json();
            //console.log('response',await data)
        
            if (!data.errors) {
                //console.log('ok',data);
                return data.data;
            }
            else {
                setError(data.errors.detail);
            }

        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return { consultarVuelos, consultarDetaCompania, vuelos, loading, error };
}
export default useFetchConsultarVuelos;