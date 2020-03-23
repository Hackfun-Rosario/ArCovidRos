# AR COVID-19 ROS

## API Server
El server se encuentra dentro del folder server

### Stack
* Docker
* docker-compose
* MongoDB
* Nodejs (express, mongoose, jwt)

### Variables de entorno seteadas en el docker-compose
* JWTKEY: key para encriptar el token de JWT (requerida)
* ADMINKEY: key necesaria para registrar nuevos usuarios (requerida)
* JWTEXPIRE: ttl para el token de JWT (por defecto 1440 si no está seteada)

### Pasos para ejecutar el server en ambiente local

El proyecto está configurado para development!! (para producción setear MODE=production en el archivo .env de la carpeta server)
* Clonar el proyecto.
* Las variables de entorno se setean con un erchivo .env tanto en el root del proyecto (que son utilizadas por el docker-compose) como en la carpeta server (que son utilizadas por el node y el script de inicio)
 En ambas carpetas existe un .env.example que muestra las opciones disponibles.
* El docker-compose crea una contenedor de mongo db. Los datos se almacenan en la carpeta mongo.
* Ejecutar `docker-compose up` y va a instalar librerías y ejecutar el server.
 El comando up va a iniciar los contenedores en el bash y mostrar los respectivos logs, si se desea correrlos en background el comando es `docker-compose up -d`
* El node se ejecuta mediante nodemon por lo que va a recrear el server en vivo mientras se desarrolla.

* Link para ver la documentación de la API:
https://inspector.swagger.io/?url=https://raw.githubusercontent.com/Hackfun-Rosario/ArCovidRos/master/server/swagger.yaml


## Client

El cliente se encuentra dentro del folder client

Scripts disponibles:

* Para instalar las dependencias `yarn`
* Para correr el cliente en modo dev `yarn dev`
* Para generar el build de producción `yarn build`
