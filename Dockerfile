FROM node:16.14.0-alpine3.14 as dev
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
    
RUN npm i


RUN npm run build 


