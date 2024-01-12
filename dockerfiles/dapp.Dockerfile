FROM node:21.4-bullseye-slim AS base

ARG PUBLIC_NETWORK_ID
ARG NPM_LOCAL_CACHE=.cache

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
RUN echo "PUBLIC_NETWORK_NAME=$NETWORK_NAME" >> apps/dapp/.env.production

RUN npx turbo run build --filter=dapp

FROM base AS application

WORKDIR /app

COPY --from=build /app/apps/ apps
COPY --from=build /app/packages/ packages
COPY --from=build /app/node_modules node_modules

RUN npm install pm2 -g && \
    pm2 install pm2-metrics

CMD ["pm2-runtime","apps/dapp/build/index.js"]

FROM nginx:alpine AS storybook

WORKDIR /app

COPY --from=build /app/apps/dapp/storybook-static /usr/share/nginx/html
COPY --from=build /app/apps/dapp/nginx/mime.types /etc/nginx/mime.types
COPY --from=build /app/apps/dapp/nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]