import { useState } from 'react';
import useFetchConsultarVuelos from '../components/useFetchConsultarVuelos';
import {Formik} from 'formik';
import TextAutocompleteFetchAeropuertos from '../components/TextAutocompleteFetchAeropuertos';
import { Button, Card, Form, DatePicker,Typography,Divider,Spin,Switch,message } from 'antd';
import CantPasajeros from '../components/CantPasajeros';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;
    const { Text } = Typography;
    //const Adultos = CantPasajeros();//({text:'Adultos', defaultCant:1});
    //const Ninos = useCantPasajeros('Ninos',0);
    //const Bebes = useCantPasajeros('Bebes',0);
    const [lugarOrigen,setLugarOrigen] = useState('');
    const [lugarDestino,setLugarDestino] = useState('');
    const [iataOrigen, setIataOrigen] = useState('BAR');
    const [iataDestino, setIataDestino] = useState('LON');
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [cantAdultos, setCantAdultos] = useState(1);
    const [cantNinos, setCantNinos] = useState(0);
    const [cantBebes, setCantBebes] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [isSoloIda, setIsSoloIda] = useState(false);

    const { consultarVuelos, vuelos, loading, error } = useFetchConsultarVuelos();
    //const [muestroResultados, setMuestroResultados] = useState(false);

    const getIataCode = (txtLugar) => {
        let iataCode = '';
        try {
            iataCode = txtLugar.split('(')[1].split(')')[0];      
        } catch (error) {
            iataCode = '';
            console.log('error',error);
        }
        return iataCode;
    }
   

     
    const handleConsultarVuelos = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('lugarOrigen',lugarOrigen,lugarDestino,fechaInicial,fechaFinal,cantAdultos,cantNinos,cantBebes);
        
        const paramBusqueda = {origen:getIataCode(lugarOrigen), destino:getIataCode(lugarDestino), fecha:fechaInicial, fechaRegreso:fechaFinal, 
                                adultos:cantAdultos,ninios:cantNinos,bebes:cantBebes};
        await consultarVuelos(paramBusqueda);
        console.log('detalle',vuelos);
        //console.log('error',error);
        //setMuestroResultados(true);  
        setIsLoading(false);
        navigate(`/ListaVuelos/${lugarOrigen}/${lugarDestino}/${fechaInicial}/${fechaFinal}/${cantAdultos}/${cantNinos}/${cantBebes}`);
    }

    const disabledDate = (current) => {
        let hoy = new Date()
        //console.log(hoy)
        return !(current > hoy);
      };

    const onFinish = (values) => {
        console.log('Finish:', values);
      };
    
    const handGetCantAdultos = (cant) =>{
        //console.log('cantAdultos',cant);
        setCantAdultos(cant);
    }
    const handGetCantNinios = (cant) =>{
        //console.log('cantAdultos',cant);
        setCantNinos(cant);
    }
    const handGetCantBebes = (cant) =>{
        //console.log('cantAdultos',cant);
        setCantBebes(cant);
    }

    const handleRangoFechas = (moment,date) => {
        //console.log('fechas',date,date.length);
        try {
            if (date.length <= 2) {
                setFechaInicial(date[0]);
                setFechaFinal(date[1]);
            }else{
                setFechaInicial(date);
                setFechaFinal(undefined);
            }
        } catch (error) {
            message.error(error);
        }
        //console.log(fechaInicial,fechaFinal);
    }
    return (
        <>
            <Spin spinning={isLoading} tip="Buscando las mejores opciones">
            <h1>Completa los campos y busca tu vuelo deseado</h1>
            <Formik
                initialValues={{origen:"", destino:"", fecha:"", adultos:1, ninios:0, bebes:0}}
                >
                <Form form={form} name="horizontal_login" layout="inline" 
                 onFinish={onFinish} 
                 style={{alignContent:'center', maxWidth:'800px'}}>
                      
                            <Form.Item
                                label="Origen"
                                name="Origen">
                                <TextAutocompleteFetchAeropuertos name="origen" placeholder="Buscar lugar de origen"
                                onSelected={(e)=>setLugarOrigen(e)}/>
                            </Form.Item>
                       
                            <Form.Item
                                label="Destino"
                                name="Destino">
                                <TextAutocompleteFetchAeropuertos name="destino" placeholder="Buscar lugar de destino"
                                onSelected={(e)=>setLugarDestino(e)}/>
                            </Form.Item>
                       
                            <Form.Item name="switch" label="Solo Ida:"><Switch onChange={() => setIsSoloIda(!isSoloIda)} ></Switch>&nbsp;&nbsp;</Form.Item>
                            <Form.Item
                                
                                name="Fechas">
                                    
                                {isSoloIda ? 
                                 <Form.Item name="fechaIda"><DatePicker  disabledDate={disabledDate} onChange={handleRangoFechas} /></Form.Item> : 
                                 <Form.Item name="Fechas"><RangePicker  disabledDate={disabledDate} onChange={handleRangoFechas}  /></Form.Item>
                                 }
                               
                            </Form.Item>
                       
                            <Form.Item >
                                <div >
                                    <CantPasajeros text="Adultos" defaultCant="1" onChange={handGetCantAdultos} />
                                    <CantPasajeros text="Niños" defaultCant="0" onChange={handGetCantNinios} />
                                    <CantPasajeros text="Bebes" defaultCant="0" onChange={handGetCantBebes} />
                                </div>
                            </Form.Item>
                            <Divider plain></Divider>
                            <Form.Item shouldUpdate>
                                {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={ handleConsultarVuelos}>
                                    Buscar Vuelos
                                </Button>
                                )}
                            </Form.Item>
                    
                        
                    </Form>
                </Formik>
               {/* // {loading && <p>Cargando...</p>}
               // {error && <p>{error}</p>}
        
                //{muestroResultados && vuelos.map(vuelo => <p key={vuelo.id}>Origen: {vuelo.source} - Asientos:{vuelo.numberOfBookableSeats} - Precio: {vuelo.price.total} {vuelo.price.currency}</p>)} */}

            </Spin>
        </>
    )
}

export default Home;