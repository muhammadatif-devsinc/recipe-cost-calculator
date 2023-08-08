FROM alpine:latest

EXPOSE 8080
EXPOSE 8081

RUN apk update && apk upgrade && \
apk add nodejs && apk add npm && npm -g install pnpm && \
echo "enable-pre-post-scripts=true" >> ~/.npmrc

WORKDIR /app
CMD ["pnpm", "start:dev"]