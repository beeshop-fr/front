# ---- Build stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# outils pour compiler les bindings natifs
RUN apk add --no-cache libc6-compat python3 make g++

RUN npm install -g pnpm@8

COPY package.json pnpm-lock.yaml ./

# install basé sur le lockfile
RUN pnpm install --frozen-lockfile

# 🔑 Forcer la reconstruction des bindings natifs
RUN pnpm rebuild

COPY . .

RUN pnpm build
