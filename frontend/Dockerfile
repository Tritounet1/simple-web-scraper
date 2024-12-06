FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx @chakra-ui/cli snippet add

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]