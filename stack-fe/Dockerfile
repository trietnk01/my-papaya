# Stage 1
FROM node:16-alpine as build-stage
WORKDIR /usr/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
# Stage 2
FROM nginx:1.23.3
COPY --from=build-stage /usr/frontend/.next /usr/share/nginx/html
CMD nginx -g "daemon off;"
