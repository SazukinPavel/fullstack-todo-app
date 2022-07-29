FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

COPY .env ./dist/

WORKDIR ./dist

ENV PORT=4200

EXPOSE $PORT

CMD ["npm","start"]