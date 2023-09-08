FROM node:18.10.0-alpine3.16 as node
WORKDIR /app

COPY *.json .
COPY src src/

RUN npm install
RUN npm run build --omit-dev

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d 
COPY --from=node /app/dist/seat-booking /usr/share/nginx/html
EXPOSE 80