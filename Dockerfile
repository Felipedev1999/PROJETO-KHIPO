FROM node:16-alpine as dependencies

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

FROM dependencies as builder

RUN npm run build

EXPOSE 3000

CMD npm run start
