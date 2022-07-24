
# Objetivo del proyecto:

La idea del proyecto es que un usuario pueda realizar una búsqueda indicando fecha de partida, fecha de llegada, personas que integran el viaje, lugar de origen, lugar de destino.

busqie que no hayan datos pre-cargados en un archivo, sino que todos los datos los brinde la API de Amadeus ([https://developers.amadeus.com/self-service/apis-docs](https://developers.amadeus.com/self-service/apis-docs)), desde las ciudades, los vuelos, el nombre de la aerolinea y el listado de viajes.

Como es un proyecto de Reactjs y al no ser de diseño no inverti demasiado tiempo en la UI. Si traté de que sea armonica, pero no hay un esfuerzo en el diseño. 

## Resumen de lo implementado:

Utilice useEffect, useState, formik, custom hooks (arme customs hooks para implementar las llamadas a la api Amadeus), fetch para realizar las llamadas a la api, 

custom controls, por ejemplo en la seleccion de pasajeros o en la seleccion de la ciudad (agregue el spinner y la busqueda a la API para ver las ciudades), entre otros.

![imagen 1](https://raw.githubusercontent.com/aledove-01/codigo-facilito-reactjs/main/imgReadme/control1.png)

![imagen 2](https://raw.githubusercontent.com/aledove-01/codigo-facilito-reactjs/main/imgReadme/control2.png)

Redux para mantener el estado en un solo sitio, de la busqueda, y la seleccion del vuelo. Si bien se podria haber realizado con context decidi utilizar redux para tener mas experiencia en su utilizacion.

Utilice el framework ant design, vi que tenia componentes simples.

## Figma entregado por codigo facilito

Pantalla inicial:

![figma 1](https://raw.githubusercontent.com/aledove-01/codigo-facilito-reactjs/main/imgReadme/figma1.png)

Pantalla de detalle de vuelos

![figma 2](https://raw.githubusercontent.com/aledove-01/codigo-facilito-reactjs/main/imgReadme/figma2.png)

Pantalla final de información del vuelo seleccionado

![figma 3](https://raw.githubusercontent.com/aledove-01/codigo-facilito-reactjs/main/imgReadme/figma3.png)

