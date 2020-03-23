#-----imagen para el build
FROM node:lts-alpine as build-image
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache git
RUN yarn install
COPY . .
RUN yarn run build

#------imagen para produccion
FROM nginx:alpine as client-prod
COPY --from=build-image /app/dist /usr/share/nginx/html
EXPOSE 80
RUN sed -i '11i\\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
