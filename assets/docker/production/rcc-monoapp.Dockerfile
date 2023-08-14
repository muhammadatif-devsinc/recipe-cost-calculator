FROM node:20-slim AS rcc-base
ENV PATH="$PATH:/pnpm"
ENV PNPM_HOME="/pnpm"
RUN corepack enable
WORKDIR /app
COPY . /app

FROM rcc-base AS rcc-prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod 

FROM rcc-base AS rcc-build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM rcc-base AS rcc-shared
ENV PACKAGE_ROOT="/app/packages/shared"
COPY --from=rcc-prod-deps $PACKAGE_ROOT/node_modules/ $PACKAGE_ROOT/node_modules
COPY --from=rcc-build $PACKAGE_ROOT/dist $PACKAGE_ROOT/dist

FROM rcc-shared AS rcc-server
ENV PACKAGE_ROOT="/app/packages/server"
COPY --from=rcc-prod-deps $PACKAGE_ROOT/node_modules/ $PACKAGE_ROOT/node_modules
COPY --from=rcc-build $PACKAGE_ROOT/dist $PACKAGE_ROOT/dist
WORKDIR $PACKAGE_ROOT
EXPOSE 8001
CMD [ "pnpm", "start" ]

FROM nginx:latest AS rcc-client
ENV PACKAGE_ROOT="/app/packages/client"
COPY --from=rcc-build $PACKAGE_ROOT/dist /usr/share/nginx/html
WORKDIR $PACKAGE_ROOT
EXPOSE 8000
