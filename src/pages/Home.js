import { useEffect, useState } from 'react';
import useFetchConsultarVuelos from '../components/useFetchConsultarVuelos';
import { useFormik, Form, Field } from 'formik';
import TextAutocompleteFetchAeropuertos from '../components/TextAutocompleteFetchAeropuertos';
import { Button, DatePicker,Space,Typography,Divider,Spin,Switch,message } from 'antd';
import CantPasajeros from '../components/CantPasajeros';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pasosStart } from '../redux/slices/pasos';
import { busquedaVuelosInit, busquedaVuelosComplete } from '../redux/slices/busqueda';

//import {fetchVuelosStart} from '../redux/slices/resultsVuelos';
//import {vueloStart} from '../redux/slices/detaVuelo';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {Text} = Typography;
    //const [form] = Form.useForm();
    const { RangePicker } = DatePicker;
    const { consultarVuelos } = useFetchConsultarVuelos();
    const [lugarOrigen,setLugarOrigen] = useState('');
    const [lugarDestino,setLugarDestino] = useState('');
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [cantAdultos, setCantAdultos] = useState(1);
    const [cantNinos, setCantNinos] = useState(0);
    const [cantBebes, setCantBebes] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [isSoloIda, setIsSoloIda] = useState(false);

    useEffect(() => {
        //vuelo a cero el contador de pasos
        dispatch(pasosStart());
    },[]);

    //VALIDACION FORMULARIO
    const validateOrigen = () => {
        //console.log('lugarOrigen',lugarOrigen);
        if (lugarOrigen === '' || lugarOrigen === undefined && getIataCode(lugarOrigen) === ''){
            return 'Debe seleccionar un aeropuerto de origen';
        }
        return true;
    }
    const validateDestino = () => {
        if (lugarDestino === '' || lugarDestino === undefined && getIataCode(lugarDestino) === ''){
            return 'Debe seleccionar un aeropuerto de destino';
        }
        return true;
    }
    const validateFecha = () => {
        if (isSoloIda && (fechaInicial === '' || fechaInicial === undefined)){
            return ('Debe seleccionar una fecha de salida');
        }
        if (!isSoloIda && (fechaInicial === '' || fechaInicial === undefined || fechaFinal === '' || fechaFinal === undefined)){
            return ('Debe seleccionar una fecha de salida y una de llegada');
        }
        return true;
    }
    const validatePasajeros = () => {
        if (cantAdultos === undefined || cantAdultos == 0){
            return 'Debe seleccionar algun pasajero adulto';
        }
        if ((cantNinos/2) > cantAdultos){
            return 'Solo se permiten 2 niños por adulto';
        }
        if (cantBebes > cantAdultos){
            return 'No puede haber más bebes que adultos';
        }
        return true;
    }

    const validate = values => {
        const errors = {};
        errors.origen = validateOrigen();
        errors.destino=validateDestino();
        errors.fecha=validateFecha();
        errors.pasajeros=validatePasajeros();
     
        return errors;
      };

    const formik = useFormik({
        initialValues:{
            origen:"", destino:"", fecha:["",""], soloIda:false, pasajeros:{adultos:1, ninios:0, bebes:0}
        }
        ,validate
        ,onSubmit:() => {
            // same shape as initial values
            console.log('errores',formik.errors);
            handleConsultarVuelos();
        },

        
      });

    const handleOnSelectOrigen = (value) => {
        setLugarOrigen(value); 
       
    }
    const handleOnSelectDestino = (value) => {
        setLugarDestino(value); 
    }
    const handGetCantAdultos = (cant) =>{
        setCantAdultos(cant);
    }
    const handGetCantNinios = (cant) =>{
        setCantNinos(cant);
    }
    const handGetCantBebes = (cant) =>{
        setCantBebes(cant);
    }
    const handleRangoFechas = (moment,date) => {
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

    const getIataCode = (txtLugar) => {
        let iataCode = '';
        if (txtLugar === '' || txtLugar === undefined || !txtLugar.includes('(')){
            message.error("Debe seleccionar un aeropuerto");
        }
        try {
            iataCode = txtLugar.split('(')[1].split(')')[0];      
        } catch (error) {
            iataCode = '';
            message.error(error);
        }
        return iataCode;
    }
   
    const disabledDate = (current) => {
        let hoy = new Date()
        //console.log(hoy)
        return !(current > hoy);
      };

    const handleConsultarVuelos = async (e) => {
        e.preventDefault();
        
        const paramBusqueda = {origen:getIataCode(lugarOrigen), destino:getIataCode(lugarDestino), fecha:fechaInicial, fechaRegreso:fechaFinal, 
                                adultos:cantAdultos,ninios:cantNinos,bebes:cantBebes,lugarOrigenCompleto:lugarOrigen,lugarDestinoCompleto:lugarDestino};
        
        //let searchParams = new URLSearchParams(paramBusqueda)

        setIsLoading(true);
        //console.log('lugarOrigen',lugarOrigen,lugarDestino,fechaInicial,fechaFinal,cantAdultos,cantNinos,cantBebes);
        dispatch(busquedaVuelosInit());

        dispatch(busquedaVuelosComplete(paramBusqueda));
        //si hay parametros en la url busco en la carga (posible refresh o F5)
        const detaVuelos = await consultarVuelos(paramBusqueda);
        if (!detaVuelos) {
            message.error("Faltan valores para la búsqueda");
            setIsLoading(false);
            return false;
        }
        setIsLoading(false);
        if (detaVuelos.data.length > 0){
            navigate('/ListaVuelos?'); //+searchParams);
        }else{
            message.warning("No se encontraron vuelos");
        }
    }


    


    

    return (
        <section style={{display: 'flex',justifyContent:'center'}}>
            <Spin spinning={isLoading} tip="Buscando las mejores opciones">
            <div className="contenedor">
                <h1 className="contenedor-titulo">Completa los campos y busca tu vuelo deseado</h1>
               
                    <form  name="form1"  style={{display: 'flex', flexDirection:'column', justifyContent:'space-between', 
                        maxWidth:'800px'}} 
                        onSubmit={formik.handleSubmit}>
                         <div>
                         <Divider>Aeropuerto de Origen</Divider>
                            {/* <Text strong>Aeropuerto de Origen</Text> */}
                            
                            <TextAutocompleteFetchAeropuertos name="origen" placeholder="Buscar lugar de origen"
                                onSelected={(e)=>handleOnSelectOrigen(e)} />
                    
                            {validateOrigen && <Text type="danger">{formik.errors.origen}</Text>}
                            
                            <Divider>Aeropuerto de Destino</Divider>
                            
                            <TextAutocompleteFetchAeropuertos name="destino" placeholder="Buscar lugar de destino"
                                onSelected={(e)=>handleOnSelectDestino(e)}/>
                            {formik.errors.destino && <Text type="danger">{formik.errors.destino}</Text>}
                    
                           
                            <Divider>Fechas del vuelo </Divider>
                        
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                Solo Ida
                                <div style={{width:'50px'}}> 
                                    <Switch onChange={() => setIsSoloIda(!isSoloIda)} ></Switch>     
                                </div>
                                {isSoloIda ? 
                                    <DatePicker name="fechaD" placeholder={'Fech. partida'}  disabledDate={disabledDate} 
                                    onChange={(m,f) => handleRangoFechas(m,f)} />
                                : 
                                    <RangePicker name="fechaD" placeholder={["Fech. partida","Fech. llegada"]} disabledDate={disabledDate} 
                                    onChange={(m,f) => handleRangoFechas(m,f)}  />
                                }
                            </div>
                            {formik.errors.fecha && <Text type="danger">{formik.errors.fecha}</Text>}            

                            
                            <div style={{paddingTop:'18px'}} >
                                <Divider>Cantidad de pasajeros</Divider>
                            
                                <CantPasajeros name="adultos" text="Adultos" defaultCant="1" onChange={(e) => handGetCantAdultos(e,'')} />
                                <CantPasajeros name="ninios" text="Niños" defaultCant="0" onChange={(e) => handGetCantNinios(e,'')} />
                                <CantPasajeros name="bebes" text="Bebes" defaultCant="0" onChange={(e) => handGetCantBebes(e,'')} />
                                
                                {formik.errors.pasajeros && <Text type="danger">{formik.errors.pasajeros}</Text>}
                            </div> 
                         
                        </div>
                        <Divider plain></Divider>
                    
                        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={(e)=>handleConsultarVuelos(e)}
                                >
                                Buscar Vuelos
                            </Button>
                        </div>
                      
                    </form>
                </div>
            </Spin>
        </section>
    )
}

export default Home;