# AR COVID-19 ROS

## API Server
El proyecto está configurado para development!!
* Clonar el proyecto
* Ejecutar `docker-compose up` y va a instalar librerías y ejecutar el server

Ejecuta un nodemon por lo que va a recrear el server en vivo mientras se desarrolla.

* Para ver la documentación del api dirigirse a la url editor.swagger.io y luego importar la siguiente url:
`https://raw.githubusercontent.com/Hackfun-Rosario/ArCovidRos/master/server/swagger.yaml`

## Client

Primero que nada, `cd client`,

Luego, para instalar las dependencias: `yarn`
Para levantar el cliente en modo dev: `yarn dev`
Para build en modo producción: `yarn build`