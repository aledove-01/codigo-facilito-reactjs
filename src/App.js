import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from './components/Home';
import DetalleVuelo from './components/useFetchConsultarVuelos';
import ListaVuelos from './components/ListaVuelos';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} >
          <Route path="/" element={<Home />} />
          <Route path="ListaVuelos" element={<ListaVuelos  />} />
          <Route path="DetalleVuelo/:id" element={<DetalleVuelo  />} />
        </Route>
      </Routes>
    </BrowserRouter>
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

  return (
      <Layout>
        <Header ><h1 style={{color:'white'}}>APP Busca tu vuelo</h1></Header>
        
          <Content style={{
              padding: '0 50px',
              minHeight: '280px',
              padding: '24px',
              background: '#fff',
            }}>
            <Outlet />  
          </Content>
      
        <Footer 
          style={{
            textAlign: 'center',
          }}
        > Realizado por Ale Ovejero para el proyecto final Bootcamp ReactJS de Codigo Facilito</Footer>
      </Layout>
   
  )
}
export default App;