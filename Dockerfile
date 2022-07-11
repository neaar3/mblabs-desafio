FROM node:16.13-alpine As build
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM node:16.13-alpine 
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm ci --only=production && npm cache clean --force
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 8080
CMD [ "node", "dist/server.js" ]
