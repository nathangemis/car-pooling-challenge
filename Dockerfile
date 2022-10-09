FROM node:alpine as base

WORKDIR /usr/app

RUN apk update && apk add libstdc++ && apk add build-base && apk add bash

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY ./src ./src
RUN npm run build

EXPOSE 9091


FROM node:alpine as production

WORKDIR /usr/app
RUN apk update && apk add libstdc++ && apk add build-base && apk add bash

COPY --from=base /usr/app/dist ./dist

COPY package*.json ./
RUN npm i --omit=dev

EXPOSE 9091

CMD npm start


FROM base as dev

CMD npm run dev
