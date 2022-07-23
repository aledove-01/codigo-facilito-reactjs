import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { Card, Button, Statistic, Typography,Space,Divider} from 'antd';
import { DetaVueloDetalle } from "../components/DetaVuelo";
import '../css/paises.css';
import useFetchConsultarVuelos from "../components/useFetchConsultarVuelos";
import { pasosChange } from "../redux/slices/pasos";

const DetalleVuelo = () => {
    const dispatch = useDispatch();
    const detalleRes = useSelector(state => state.detalleVuelo.data);
    const { Title } = Typography;
    
    useEffect(() => {
        //seteo el contador de pasos
        dispatch(pasosChange(2));
    },[]);

   // const [vueloResultado,setVueloResultado]= useState([]);

    //const detalleVueloResultado = useSelector(state => state);

    console.log('detaRes',detalleRes ); 
    return (
        <Card>
            <section>
                <Title>Detalle vuelo seleccionado</Title>
                <Statistic title="Price" prefix="$" value={568.08} />
            </section>
            
            <Divider />
            IDA
            {
                detalleRes.itineraries[0].segments.map((vuelo,index) => {
                    return Escala(vuelo,index,detalleRes.itineraries[0].duration);
                })
            }
            <Divider />
            
            VUELTA
            {
                detalleRes.itineraries[1].segments.map((vuelo,index) => {
                    return Escala(vuelo,index,detalleRes.itineraries[0].duration);
                })
            }
           
        </Card>
    )
}

const Escala = (vuelo,index,duracion) => {
    const { Title } = Typography;
    const {consultarDetaCompania} = useFetchConsultarVuelos();
    const [compania,setCompania] = useState('');
    const hora = duracion.replace('PT','').split('H')[0];
    const min = duracion.replace('PT','').split('H')[1].split('M')[0];
    useEffect(() => {
        consultarDetaCompania(vuelo.carrierCode).then(res => {
            if(res.length > 0) setCompania(res[0].businessName);
        });
    }, []);
    console.log(index, vuelo)
    return (
        <Card hoverable>
                <section style={{display: "flex", justifyContent: "space-around",verticalAlign:"middle" }}>
                    <img  src={require('../images/aerolineas/' + vuelo.carrierCode + '.gif')} />
                     
                    <h3>   
                        {compania}
                    </h3>

                    <Title level={5} type="secondary">   
                        {vuelo.aircraft.code}
                    </Title>
                </section>
                <Divider />
                <section style={{display: "flex", justifyContent: "space-around"}}>
                    <div style={{textAlign:"center"}}>
                        <Space direction="vertical">
                            <Title level={4}>{vuelo.departure.at.split('T')[0]}</Title>
                            <Title level={3} strong>{vuelo.departure.at.split('T')[1]}</Title>
                            <Title level={4} strong>{vuelo.departure.iataCode}</Title>
                            <Title level={5} type="secondary">Terminal {vuelo.departure.terminal}</Title>
                        </Space>
                    </div>
                    <div>
                        <Space direction="vertical">
                            <Title level={3} type="secondary">Duración</Title>
                            <Title level={2} strong>{hora}H {min}M</Title>
                        </Space>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <Space direction="vertical">
                            <Title level={4}>{vuelo.arrival.at.split('T')[0]}</Title>
                            <Title level={3} strong>{vuelo.arrival.at.split('T')[1]}</Title>
                            <Title level={4} strong>{vuelo.arrival.iataCode}</Title>
                            <Title level={5} type="secondary">Terminal {vuelo.arrival.terminal}</Title>
                        </Space>
                    </div>
                </section>
                {/* <Card key={index}>
                    <DetaVueloDetalle itirenarie={vuelo} oneWay={false} />
                </Card> */}
            </Card>

        
    )
}

export default DetalleVuelo;