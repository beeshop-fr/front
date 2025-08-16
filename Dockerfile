# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app

# installe pnpm
RUN npm install -g pnpm

# copier uniquement les fichiers nécessaires pour installer
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# copier le reste du code
COPY . .

# build Nuxt en prod
ENV NODE_ENV=production
RUN pnpm build

# ---- Runtime stage ----
FROM node:18-alpine AS runner
WORKDIR /app

# variables nécessaires à Nuxt/Nitro
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

# copier seulement le build
COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
