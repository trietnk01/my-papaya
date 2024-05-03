FROM node:18-alpine as build-stage
WORKDIR /usr/frontend
COPY ..
FROM nginx:1.23.3
COPY --from=build-stage /usr/frontend /usr/share/nginx/html

