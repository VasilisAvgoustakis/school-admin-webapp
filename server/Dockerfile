FROM node:16

RUN apt-get update
RUN apt-get install nano

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install --global nodemon

RUN npm install

CMD ["npm", "start"]
