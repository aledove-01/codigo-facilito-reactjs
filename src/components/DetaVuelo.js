export const DetaVuelo = (params) => {
    const {itirenarie, oneWay} = params; 
    
    const fSalida = itirenarie.segments[0].departure.at;
    const fLlegada = itirenarie.segments[itirenarie.segments.length-1].arrival.at;
    return (
        <div>
            <span>Sale {itirenarie.segments[0].departure.at.split('T')[0]} Terminal: {itirenarie.segments[0].departure.terminal} </span>
            {(!oneWay?
                <span>Llega {itirenarie.segments[itirenarie.segments.length-1].arrival.at.split('T')[0]}</span>
            :
                <></>
            )}
        </div>
    )
}

export const DetaVueloDetalle = (params) => {
    const {itirenarie, oneWay} = params; 
    
    const fSalida = itirenarie.segments[0].departure.at;
    const fLlegada = itirenarie.segments[itirenarie.segments.length-1].arrival.at;
    return (
        <div>
            <span>Sale {itirenarie.segments[0].departure.at.split('T')[0]} Terminal: {itirenarie.segments[0].departure.terminal} </span>
            {(!oneWay?
                <span>Llega {itirenarie.segments[itirenarie.segments.length-1].arrival.at.split('T')[0]}</span>
            :
                <></>
            )}
        </div>
    )
}
