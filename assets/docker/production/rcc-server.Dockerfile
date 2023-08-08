FROM alpine:latest
EXPOSE 8081

RUN apk update && apk upgrade && apk add nodejs 

WORKDIR /app
COPY ./dist dist
CMD ["node", "./dist/index.js"]
