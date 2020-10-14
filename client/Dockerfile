FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npx npm-force-resolutions

RUN npm install

COPY . .

EXPOSE 1234

CMD ["npm", "run", "dev"]