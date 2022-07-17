import { useEffect, useState, forwardRef } from 'react';
import useFetchConsultarAeropCiudades from './useFetchConsultarAeropCiudades';
import './TextAutocompleteFetchAeropuertos.css';
import '../css/paises.css';
import { AutoComplete, Input,message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import edificioImg from '../images/edificio.png';
import avionImg from '../images/plano-alt.png';

const TextAutocompleteFetchAeropuertos = (props) => {
    const [txtBusqueda, setTxtBusqueda] = useState('');

    const { name, placeholder, onSelected } = props;
    const [aeropuertos, setAeropuertos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const { consultarAeropuertos, loading, error } = useFetchConsultarAeropCiudades();
    const [localidadesAeropuertos, setLocalidadesAeropuertos] = useState([{}]);
    // const [showNoResultsText, SetShowNoResultsText] = useState('No hay resultados');
    // const [lugarSeleccionado, setLugarSeleccionado] = useState('');
     

   
    const seleccionoUbicacion = (e) => {
        console.log(e);
    }

    const renderTitle = (titulo, tipo) => (
        <div>
            {tipo === 'CITY'?<img style={{
                width:'20px', height:'15px', float: 'left', paddingRight:'10px'
            }} src={edificioImg} />:<img style={{
                width:'20px', height:'15px', float: 'left', paddingRight:'10px'
            }} src={avionImg} />}
            <span>
                { titulo}
            </span>
        </div>
      );
    const options = [
      {
        label: renderTitle('Ciudades', 'CITY'),
        options: ciudades,
      },
      {
        label: renderTitle('Aeropuertos', 'AIRPORTS'),
        options: aeropuertos,
      }
    ];
    const renderItem = (titulo, nombre, id, iata, pais, cssPais ) => ({
        value: nombre+' - ('+iata+') '+pais+' ['+ id + ']',
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {titulo}
            
                {nombre} - {pais} - {iata}
              <div style={{
                  float: 'left', paddingRight:'10px'}}>
                  <div className={cssPais} />
              </div>
          </div>
        ),
      });

      
    // const handleOnSelect = (value,options) => {
    //   try {
    //     console.log(options)
    //     setLugarSeleccionado(value.split('(')[1].split(')')[0]);      
    //   } catch (error) {
    //     setLugarSeleccionado('');
    //     console.log('error',error);
    //   }
    //}
    const handleOnSearch = async (ctr) => {
        console.log(ctr);
         
        if (ctr.length > 2) {
            message.info('Buscando ['+ctr+']');
            setTxtBusqueda(ctr);
            
            const consultaDatos = async () => {
              if (txtBusqueda.length >= 3) {
                consultarAeropuertos(ctr).then((datos)=>{
                  console.log('dat:',datos)
                  setAeropuertos([]);
                  setCiudades([]);
                  let colCiudades = [];
                  let colAeropuertos = [];
          
                  //SetShowNoResultsText('Buscando...');
                  //await consultarAeropuertos(ctr)
                  //const detalleCiudadesAuerpResult = await datos;
                  
                  
                  setLocalidadesAeropuertos(datos?.map((dato)=>{
                      console.log(dato.titulo,dato.subType,dato.name,dato.iata)
                      if(dato.subType === 'CITY'){
                          colCiudades.push(renderItem(dato.titulo,dato.name,dato.id,dato.iataCode, dato.address.countryName, 'flag flag-'+dato.address.countryCode.toLowerCase()));
                      }else{
                          colAeropuertos.push(renderItem(dato.titulo,dato.name,dato.id,dato.iataCode, dato.address.countryName, 'flag flag-'+dato.address.countryCode.toLowerCase()));
                      }
                      
                  }))
                  setAeropuertos(colAeropuertos);
                  setCiudades(colCiudades);
                        
                  
          
                  if (datos?.length <= 0) {
                      message.info('No hay resultados');
                      setLocalidadesAeropuertos([{}])
                  };

                });
              }
            }
            consultaDatos();
           

        }
        
    }
    return (
        <>
             
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: '300px', paddingBottom:'25px' }}
                options={options}
                onSearch={handleOnSearch}
                onSelect={onSelected}
                name={name}
            >
                <Input.Search  placeholder={placeholder} />
            </AutoComplete>
             
            {error && <p>{error}</p>}
        </>
    );
}

export default (TextAutocompleteFetchAeropuertos);