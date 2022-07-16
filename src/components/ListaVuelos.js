const ListaVuelos = ({vuelos}) => {
    return (
        <div>
            {vuelos.map(vuelo => <p key={vuelo.id}>Origen: {vuelo.source} - Asientos:{vuelo.numberOfBookableSeats} - Precio: {vuelo.price.total} {vuelo.price.currency}</p>)}
        </div>
    )
}

export default ListaVuelos;
