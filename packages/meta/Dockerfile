FROM node:18-alpine AS base
LABEL org.opencontainers.image.source="https://github.com/ZeppelinBot/feedback-portal"

# == DEPENDENCIES ==
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json .
RUN npm ci

# == BUILD ==
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# == RUNNER ==
FROM base AS runner

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json
