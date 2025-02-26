FROM node:lts AS build

WORKDIR /app

COPY package*.json .
RUN npm install  

COPY . . 
RUN npm run build

FROM node:lts

WORKDIR /app

COPY package*.json .
RUN npm install

COPY --from=build /app/dist /app/dist
COPY server.js .

CMD ["node", "server.js"]
