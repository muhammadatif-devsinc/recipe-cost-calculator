FROM nginx:latest
EXPOSE 8080
COPY ./dist /usr/share/nginx/html
