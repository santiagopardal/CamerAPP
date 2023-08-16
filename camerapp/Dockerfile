FROM node:alpine

WORKDIR /camerapp

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "preview"]
