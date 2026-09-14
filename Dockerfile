FROM node:22-alpine AS builder

ARG SITE_ENV
ENV SITE_ENV=${SITE_ENV}
ARG BLOG_PREVIEW_UNPUBLISHED=0
ENV BLOG_PREVIEW_UNPUBLISHED=${BLOG_PREVIEW_UNPUBLISHED}

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

ENV HOST=0.0.0.0
ENV PORT=4328

EXPOSE ${PORT}

CMD ["node", "dist/server/entry.mjs"]
