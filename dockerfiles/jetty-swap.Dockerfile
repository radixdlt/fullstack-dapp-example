FROM node:21.4-bullseye-slim AS base

ARG PUBLIC_NETWORK_ID
ARG PUBLIC_LOG_LEVEL
ARG NPM_LOCAL_CACHE=.cache

ENV PUBLIC_NETWORK_ID=${PUBLIC_NETWORK_ID}
ENV PUBLIC_LOG_LEVEL=${PUBLIC_LOG_LEVEL}

FROM base AS prepare-build

WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=jetty-swap --docker

FROM base AS build

WORKDIR /app

COPY --from=prepare-build /app/out/json/ .
COPY --from=prepare-build /app/out/package-lock.json ./package-lock.json

RUN npm install

COPY --from=prepare-build /app/out/full/ .

RUN npx turbo run build --filter=jetty-swap

FROM base AS application

EXPOSE 3001

WORKDIR /app

COPY --from=build /app/apps/ apps
COPY --from=build /app/node_modules node_modules

RUN npm install pm2 -g && \
    pm2 install pm2-metrics

CMD ["pm2-runtime","apps/jetty-swap/build/index.js"]
