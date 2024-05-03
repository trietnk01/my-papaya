# Stage 1
FROM node:18-alpine as build-stage
WORKDIR /usr/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
COPY /usr/frontend/dist /usr/share/nginx/html

