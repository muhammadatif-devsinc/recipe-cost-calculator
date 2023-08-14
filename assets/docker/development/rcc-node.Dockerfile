FROM node:20-slim AS rcc-base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PATH:/pnpm"

EXPOSE 8080
EXPOSE 8081
RUN corepack enable
WORKDIR /app
CMD ["pnpm", "start:dev"]