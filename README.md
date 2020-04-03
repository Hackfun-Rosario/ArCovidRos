# AR COVID-19 ROS

## API Server
El servidor de la API se encuentra dentro del directorio `server`.

### Stack
* Docker
* docker-compose
* MongoDB
* Nodejs (express, mongoose, jwt)

### Variables de entorno configuradas en docker-compose
* JWTKEY: key para encriptar el token de JWT (requerida)
* ADMINKEY: key necesaria para registrar nuevos usuarios (requerida)
* JWTEXPIRE: TTL para el token de JWT (por defecto 1440 si no está configurada)

Se puede ver un ejemplo de estas variables de entorno en .env.example

### Pasos para ejecutar el server en un ambiente local de desarrollo

El proyecto está configurado para un entorno de desarrollo. Para ejecutar en modo producción configurar `MODE=production` en el archivo .env del directorio server. 

* Clonar el proyecto.
* Configurar las variables de entorno con un erchivo .env tanto en el root del proyecto (que son utilizadas por el docker-compose) como en la carpeta server (que son utilizadas por el node y el script de inicio). En ambas carpetas existe un .env.example que muestra las opciones disponibles.
* El docker-compose.yml está configurado para crear un contenedor de mongo db. Los datos se almacenan en la carpeta mongo.
* Ejecutar `docker-compose up` y va a instalar librerías y ejecutar el servidor de la API.
 El comando up va a iniciar los contenedores en el bash y mostrar los respectivos logs, si se desea correrlos en background el comando es `docker-compose up -d`
* El node se ejecuta mediante nodemon por lo que va a recrear el server en vivo mientras se desarrolla.


## API Client

* Enlace para ver la documentación de la API:

https://editor.swagger.io/?url=https://raw.githubusercontent.com/Hackfun-Rosario/ArCovidRos/master/server/swagger.yaml

El cliente de la API se encuentra dentro del directorio `client`.

Scripts disponibles:

* Para instalar las dependencias `yarn`
* Para correr el cliente en modo dev `yarn dev`
* Para generar el build de producción `yarn build`

## Licenciamiento 

El software de este repositorio se encuentra publicado con una licencia AGPL v3.0
