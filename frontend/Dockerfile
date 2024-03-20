FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app/react-app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","preview" ]