FROM node:22.3.0-bullseye-slim AS base

ARG PUBLIC_NETWORK_ID
ARG PUBLIC_LOG_LEVEL
ARG NPM_LOCAL_CACHE=.cache

ENV PUBLIC_NETWORK_ID=${PUBLIC_NETWORK_ID}
ENV PUBLIC_LOG_LEVEL=${PUBLIC_LOG_LEVEL}

FROM base AS prepare-build

WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=dapp --docker

FROM base AS build

WORKDIR /app

COPY --from=prepare-build /app/out/json/ .
COPY --from=prepare-build /app/out/package-lock.json ./package-lock.json

RUN npm install

COPY --from=prepare-build /app/out/full/ .

COPY turbo.json turbo.json

RUN npx turbo run build --filter=dapp

FROM base AS application

WORKDIR /app

COPY --from=build /app/apps/ apps
COPY --from=build /app/packages/ packages
COPY --from=build /app/node_modules node_modules

COPY --from=build /app/packages/database/src/ .

RUN npx prisma generate

RUN npm install pm2 -g && \
    pm2 install pm2-metrics

CMD ["pm2-runtime","apps/dapp/build/index.js"]
