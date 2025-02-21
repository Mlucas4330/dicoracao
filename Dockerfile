FROM node:18 AS build

WORKDIR /app

COPY front-end/package.json front-end/package-lock.json ./
RUN npm install

COPY ../front-end/ ./

RUN npm run build

FROM node:16

WORKDIR /app

COPY back-end/package.json back-end/package-lock.json ./
RUN npm install

COPY --from=build /app/dist /app/public

COPY . .

EXPOSE 3000

CMD ["node", "back-end/server.js"]