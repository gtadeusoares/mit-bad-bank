FROM node:slim

WORKDIR /

COPY . .

RUN npm install

CMD ["npm", "start"]