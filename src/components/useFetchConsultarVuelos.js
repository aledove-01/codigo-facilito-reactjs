import { useState } from "react";
import useConfFecthAmadeus from '../api/useConfFetchAmadeus';

const useFetchConsultarVuelos = () => {
    const [vuelos, setVuelos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getToken, urlPpal } = useConfFecthAmadeus();

    //fechas en formato yyyy-mm-dd
    //fecha regreso es opcional
    const consultarVuelos = async (params) => {
        const {origen, destino, fecha, fechaRegreso, adultos,ninios,bebes} = params;
        
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
                //console.log('ok',data);
                setVuelos(data.data);
            }
            else {
                setError(data.errors.detail);
            }

        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return { consultarVuelos, vuelos, loading, error };
}
export default useFetchConsultarVuelos;