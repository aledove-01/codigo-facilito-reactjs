import logo from './logo.svg';
import './App.css';
import { Layout,Steps } from 'antd';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import DetalleVuelo from './pages/DetalleVuelo';
import ListaVuelos from './pages/ListaVuelos';
import { useSelector } from 'react-redux';

function App() {
  

  return (
    
      <Routes>
        <Route  element={<Container />} >
          <Route element={<Home />} index />
          <Route path="ListaVuelos" element={<ListaVuelos  />} />
          <Route path="DetalleVuelo" element={<DetalleVuelo  />} />
          <Route path="*" element={<h1>Pagina no encontrada 404</h1>}/>
        </Route>
      </Routes>
    
    // <div className="App">
    //   <header className="App-header">
    //     {loading && <p>Cargando...</p>}
    //     {error && <p>{error}</p>}
    //     <button onClick={handleConsultarVuelos }>Consultar Vuelos</button>
    //     {muestroResultados && vuelos.map(vuelo => <p key={vuelo.id}>Origen: {vuelo.source} - Asientos:{vuelo.numberOfBookableSeats} - Precio: {vuelo.price.total} {vuelo.price.currency}</p>)}

        
    //   </header>
    // </div>
  );
}
const Container = () => {
  const { Header, Content, Footer } = Layout;
  const { Step } = Steps;

  return (
      <Layout >
        <Header >
          <h1 style={{color:'white'}}><a href="/" style={{color:"#FFF"}} >APP Busca tu vuelo</a></h1>
          
        </Header>
        
          <Content style={{
              padding: '0 50px',
              minHeight: '280px',
              padding: '24px',
              background: '#fff',
            }}>
            <Steps current={useSelector(state => state.pasos.data)}>
              <Step title="Busca tu vuelo" description="Selecciona tu destino" />
              <Step title="Eligue las opciones" description="Las mejores opciones" />
              <Step title="Finaliza la compra" description="Visualiza el detalle de tu seleccion." />
            </Steps>
            <Outlet />  
          </Content>
      
        <Footer className='footer'
          style={{
            textAlign: 'center',
          }}
        > Realizado por Ale Ovejero para el proyecto final Bootcamp ReactJS de Codigo Facilito</Footer>
      </Layout>
   
  )
}
export default App;
