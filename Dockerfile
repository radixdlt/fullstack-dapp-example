ARG BUILDKIT_SBOM_SCAN_CONTEXT=true

FROM node:20.8-bookworm AS base
ARG BUILDKIT_SBOM_SCAN_STAGE=true

ARG NETWORK_NAME
ARG NPM_LOCAL_CACHE=.cache

# RUN apt-get update && apt-get install -y openssh-client=1:9.2p1-2+deb12u1

FROM base AS dapp-builder
ARG BUILDKIT_SBOM_SCAN_STAGE=true

# RUN apt-get update && apt-get install -y libc6 openssl

WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=dapp --docker

FROM base AS dapp-installer
ARG BUILDKIT_SBOM_SCAN_STAGE=true

# RUN apt-get update && apt-get install -y libc6

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=dapp-builder /app/out/json/ .
COPY --from=dapp-builder /app/out/package-lock.json ./package-lock.json

RUN npm ci

COPY --from=dapp-builder /app/out/full/ .
RUN echo "PUBLIC_NETWORK_NAME=$NETWORK_NAME" >> apps/dapp/.env.production
RUN cat apps/dapp/.env.production

RUN npx turbo run build --filter=dapp
RUN rm -f .npmrc

FROM node:20.8-bookworm AS dapp

ARG BUILDKIT_SBOM_SCAN_STAGE=true

WORKDIR /app

# COPY --from=dapp-installer /app/apps/dapp/prisma/ prisma
COPY --from=dapp-installer /app/apps/ apps
COPY --from=dapp-installer /app/packages/ packages
COPY --from=dapp-installer /app/node_modules node_modules

RUN npm install pm2 -g && \
    pm2 install pm2-metrics

CMD ["pm2-runtime","apps/dapp/build/index.js"]