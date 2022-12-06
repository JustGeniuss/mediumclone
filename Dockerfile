FROM node:18.10.0

WORKDIR /app

EXPOSE 5000

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD [ "npm", "run", "start:dev"]