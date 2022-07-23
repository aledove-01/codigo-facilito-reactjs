import { useSelector, useDispatch } from "react-redux";
import useFetchConsultarVuelos from "../components/useFetchConsultarVuelos";
import { Card, Button, Image} from 'antd';
import { useEffect } from "react";
import '../css/paises.css';
import {DetaVuelo, DetaVueloDetalle} from '../components/DetaVuelo';

import { useNavigate, useSearchParams } from 'react-router-dom';
import {vueloStart, vueloComplete} from '../redux/slices/detaVuelo';
import { pasosChange } from "../redux/slices/pasos";

const ListaVuelos = (params) => {
    const dispatch = useDispatch();
    const {consultarVuelos} = useFetchConsultarVuelos();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const vuelosResultado  = useSelector(state => state.resultsVuelos.data);
   
    useEffect(() => {
        async function consultar(){
            setSearchParams(new URLSearchParams(params));
            const paramBusqueda = {origen:searchParams.get('origen'), destino:searchParams.get('destino'), fecha:searchParams.get('fecha'), fechaRegreso:searchParams.get('fechaRegreso'), 
                adultos:searchParams.get('adultos'),ninios:searchParams.get('ninios'),bebes:searchParams.get('bebes')};

            const detaVuelos = await consultarVuelos(paramBusqueda);
            
            return detaVuelos;
        }

        if (vuelosResultado?.data.length == 0) {
            const detaVuelos =  consultar()
            if (detaVuelos.length === 0){
                console.log('no hay vuelos');
                navigate('/');
            }
        }

        //seteo el contador de pasos
        dispatch(pasosChange(1));
      
    }, []);

    

    //Acomodo la hora en fromato XXDXXHXXM en string legible XX dias XX horas XX minutos
    const duracionString = (dato) => {
        let diaDuracion = dato?.split('D')[0];
        if (diaDuracion === dato) diaDuracion = '';
        let horaMinSplit = dato?.split('H');
        let horasDuracion = (horaMinSplit.length > 1 ? horaMinSplit[0]:'');
        let minutosDuracion = (horasDuracion === '' ? dato?.split('M')[0]:horaMinSplit[1].split('M')[0]);
        let ret =(diaDuracion?diaDuracion + ' Dia ':'') + (horasDuracion?horasDuracion + ' Horas ':'') + (minutosDuracion?minutosDuracion + ' Minutos':'');
        return ret;  
    }

    const handleClickComprar = (id) => {
        console.log(id)
        dispatch(vueloStart());
        dispatch(vueloComplete(vuelosResultado.data[id-1]));
       
        navigate('/DetalleVuelo');
    }
    return (
        <div>
            {vuelosResultado?.data.map((vuelo,index) => 
            
            <Card name={vuelo.id.toString()} key={vuelo.id.toString()}>
                <div style={{display:'flex', justifyContent: 'space-around' }}>
                    {vuelo.itineraries.length > 1?(
                    <> {/* ida y vuelta */}
                    <section>
                        <h3>Escalas {vuelo.itineraries[0].segments.length} Asientos disponibles: {vuelo.numberOfBookableSeats}</h3>
                        <Image  src={require('../images/aerolineas/' + vuelo.itineraries[0].segments[0].carrierCode + '.gif')} />
                    </section>
                    <div>
                        <div>
                            <h2>Ida: </h2><span>Duracion estimada {duracionString(vuelo.itineraries[0].duration.split('T')[1])} </span>
                            <DetaVuelo itirenarie={vuelo.itineraries[0]} oneWay="false"   />
                        </div>
                    </div>
                    <div>
                        <h2>Vuelta: </h2><span>Duracion estimada {vuelo.itineraries[1].duration.split('T')[1]}</span>
                        <DetaVuelo itirenarie={vuelo.itineraries[1]}  oneWay="false" />
                    </div>
                    </>):(
                        <>
                            <section>
                                <h3>Escalas {vuelo.itineraries[0].segments.length} Asientos disponibles: {vuelo.numberOfBookableSeats}</h3>
                                <Image  src={require('../images/aerolineas/' + vuelo.itineraries[0].segments[0].carrierCode + '.gif')} />
                            </section>
                            <div>
                                <div>
                                    <h2>Salida: </h2><span>Duracion estimada {duracionString(vuelo.itineraries[0].duration.split('T')[1])} </span>
                                    <DetaVuelo itirenarie={vuelo.itineraries[0]} oneWay="false"   />
                                </div>
                            </div>
                        
                        

                    </>)}
                    <div>
                        <h1>Precio: {vuelo.price.total} {vuelo.price.currency}</h1>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={()=> handleClickComprar(vuelo.id)}>
                            Comprar Vuelo
                        </Button>
                    </div>
                </div>
            </Card>
            
           
            )}

        </div>
    )
}

export default ListaVuelos;
