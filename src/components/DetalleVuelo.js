const DetalleVuelo = () => {
    const { detaVuelo } = useParams();
    
    return (
        <div>
            <h1>Detalle Vuelo</h1>
            <p>{detaVuelo}</p>
        </div>
    )
}

export default DetalleVuelo;