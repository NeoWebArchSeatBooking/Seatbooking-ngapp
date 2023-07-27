FROM node:18.10.0-alpine3.16 as node
WORKDIR /app

COPY .angular .
COPY *.json .
COPY src src/

RUN npm install
RUN npm run build --omit-dev

FROM nginx:alpine3.17
COPY --from=node /app/dist/seat-booking /usr/share/nginx/html