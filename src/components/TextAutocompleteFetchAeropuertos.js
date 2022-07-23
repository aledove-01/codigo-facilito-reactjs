import { useEffect,useRef, useState } from 'react';
import useFetchConsultarAeropCiudades from './useFetchConsultarAeropCiudades';
import './TextAutocompleteFetchAeropuertos.css';
import '../css/paises.css';
import { AutoComplete, Input,message, Spin } from 'antd';
import 'antd/dist/antd.css';
import edificioImg from '../images/edificio.png';
import avionImg from '../images/plano-alt.png';

const TextAutocompleteFetchAeropuertos = (props) => {
    const { name, placeholder, onSelected } = props;
    const [aeropuertos, setAeropuertos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const { consultarAeropuertos, error } = useFetchConsultarAeropCiudades();
    const [isLoading, setIsLoading] = useState(false);
    const autoComplete = useRef();

    const renderTitle = (titulo, tipo) => (
        <div>
            {tipo === 'CITY'?<img style={{
                width:'25px', height:'15px', float: 'left', paddingRight:'10px'
            }} src={edificioImg} />:<img style={{
                width:'25px', height:'15px', float: 'left', paddingRight:'10px'
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

    const handleOnSearch = async (ctr) => {
        //console.log(ctr);
        if (ctr.length > 2 ) {
            //message.info('Buscando ['+ctr+']');
           
            setIsLoading(true);
            const consultaDatos = async () => {
              if (ctr.length >= 3 && !isLoading) {
                consultarAeropuertos(ctr).then((datos)=>{
                  //console.log('dat:',datos)
                  setAeropuertos([]);
                  setCiudades([]);
                  let colCiudades = [];
                  let colAeropuertos = [];
             
                  datos?.map((dato)=>{
                      //console.log(dato.titulo,dato.subType,dato.name,dato.iata)
                      if(dato.subType === 'CITY'){
                          colCiudades.push(renderItem(dato.titulo,dato.name,dato.id,dato.iataCode, dato.address.countryName, 'flag flag-'+dato.address.countryCode.toLowerCase()));
                      }else{
                          colAeropuertos.push(renderItem(dato.titulo,dato.name,dato.id,dato.iataCode, dato.address.countryName, 'flag flag-'+dato.address.countryCode.toLowerCase()));
                      }
                      
                  });
                  setAeropuertos(colAeropuertos);
                  setCiudades(colCiudades);
                        
                  if (datos?.length <= 0) {
                      message.info('No hay resultados');
                  };
                  
                  
                  setIsLoading(false);
                  autoComplete.current.focus({
                    cursor: 'all',
                  });
                });
              }
            }
            consultaDatos();
        }   
    }
    return (
        <>
          <Spin spinning={isLoading} tip="Buscando ...">
            <AutoComplete
                ref={autoComplete}
                
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: '300px' }}
                options={options}
                onSearch={handleOnSearch}
                onSelect={onSelected}
                name={name}
            >
                <Input.Search  placeholder={placeholder} />
            </AutoComplete>
             
            {error && <p>{error}</p>}
          </Spin>
        </>
    );
}

export default (TextAutocompleteFetchAeropuertos);