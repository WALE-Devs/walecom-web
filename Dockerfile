# ================================================
# Stage 1: Base image with shared setup
# ================================================
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

# ================================================
# Stage 2: Development
# ================================================
FROM base AS development

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ================================================
# Stage 3: Builder
# ================================================
FROM base AS builder

RUN npm ci

COPY . .

RUN npm run build

# ================================================
# Stage 4: Production
# ================================================
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]