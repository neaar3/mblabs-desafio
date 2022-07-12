FROM node:16.13-alpine As build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
COPY .env ./
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build


FROM node:16.13-alpine 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
COPY .env ./
RUN npm ci
RUN npx prisma generate
EXPOSE 8080
CMD [ "node", "dist/server.js" ]
