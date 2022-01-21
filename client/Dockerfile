FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
#COPY yarn.lock /app
COPY . /app

RUN npm install
#RUN yarn install 

CMD ["npm", "start"]